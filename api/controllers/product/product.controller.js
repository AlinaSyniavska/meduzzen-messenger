const {productService} = require("../../services");
const {productHelper} = require("../../helpers");

module.exports = {
    getAllProducts: async (req, res, next) => {
        try {
            const paginationResponse = await productService.findAllWithPagination(req.query);

            const {page, perPage, data, count} = paginationResponse;

            res.json({
                page,
                perPage,
                data,
                count,
            });
        } catch (e) {
            next(e);
        }
    },

    getAllProductsByCategory: async (req, res, next) => {
        try {
            const [productType, category] = productHelper.getTypeAndCategory(req.path);

            const paginationResponse = await productService.findAllByCategory(productType, category, req.query);

            const {page, perPage, data, count} = paginationResponse;

            res.json({
                page,
                perPage,
                data,
                count,
            });
        } catch (e) {
            next(e);
        }
    },

    createProduct: async (req, res, next) => {
        try {
            const newProduct = await productService.createOne({...req.body});
            res.status(201).json(newProduct);
        } catch (e) {
            next(e);
        }
    },

    getProductById: async (req, res, next) => {
        try {
            const {item} = req;
            res.json(item);
        } catch (e) {
            next(e);
        }
    },

    updateProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedProduct = await productService.updateOne({_id: id}, req.body);
            res.status(201).json(updatedProduct);
        } catch (e) {
            next(e);
        }
    },

    deleteProduct: async (req, res, next) => {
        try {
            const {id} = req.params;
            await productService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}

