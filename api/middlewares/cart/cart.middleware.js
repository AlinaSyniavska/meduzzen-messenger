const {Types} = require("mongoose");

const {CustomError} = require("../../errors");
const {productService} = require("../../services");
const {orderHelper} = require("../../helpers");

module.exports = {
    isIdsValid: (req, res, next) => {
        try {
            const {userId, products} = req.body;

            if (!Types.ObjectId.isValid(userId)) {
                return next(new CustomError('Not valid user ID'));
            }

            products.forEach(product => {
                if (!Types.ObjectId.isValid(product.productId)) {
                    return next(new CustomError('Not valid product ID'));
                }
            })

            next();
        } catch (e) {
            next(e);
        }
    },

    isProductPresent: async (req, res, next) => {
        try {
            const {products} = req.body;
            const productsFromDB = [];

            // _id => productId
            for (const element of products) {
                const productFromDB = await productService.findOne({_id: element.productId}).lean();

                if(!productFromDB){
                    return next(new CustomError(`Product with id ${element.productId} not found`, 404));
                }
                productsFromDB.push({...productFromDB});
            }

            req.productsFromDB = productsFromDB;
            next();
        } catch (e) {
            next(e);
        }
    },

    isProductAvailable: (req, res, next) => {
        try {
            const {products} = req.body;
            const productsFromDB = req.productsFromDB;

            if(!orderHelper.isSameOrderWithDB(products, productsFromDB)) {
                return next(new CustomError(`The list of products from the order does not match to DB`, 409));
            }

            // count - total
            products.forEach((orderedProduct, index) => {
                if(orderedProduct.count > productsFromDB[index].total) {
                    return next(new CustomError(
                        `\nThe total quantity of ${productsFromDB[index].name} in DB is ${productsFromDB[index].total}. It is less then the count in the order - ${orderedProduct.count}`,
                        409));
                }
            });

            next();
        } catch (e) {
            next(e);
        }
    },

};
