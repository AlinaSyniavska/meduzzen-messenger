const {emailService, cartService, productService} = require("../../services");
const {emailActionEnum} = require("../../constants");
const {Cart} = require("../../dataBase");

module.exports = {
    create: async (req, res, next) => {
        try {
            const {products} = req.body;
            const productsFromDB = req.productsFromDB;

            for (const [index, product] of products.entries()) {
                await productService.updateOne({_id: product.productId}, {total: productsFromDB[index].total - product.count});
            }

            const newOrder = await cartService.createOne({...req.body});
            const orderInfo = await Cart.findOne({_id: newOrder._id}).populate('userId');

            res.sendStatus(201);

            await emailService.sendMail(orderInfo.userId.email, emailActionEnum.ORDER,
                {
                    userName: `${orderInfo.userId.name} ${orderInfo.userId.surname}`,
                    noOrder: newOrder._id,
                    sum: newOrder.sum,
                });
        } catch (e) {
            next(e);
        }
    },

}

