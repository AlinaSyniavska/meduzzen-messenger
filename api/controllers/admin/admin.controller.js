const {adminBrandService, adminCategoryService, adminProductTypeService} = require("../../services");

module.exports = {
    // /brand
    getAllBrands: async (req, res, next) => {
        try {
            const brands = await adminBrandService.findAll();

            res.json({
                data: brands
            });
        } catch (e) {
            next(e);
        }
    },

    createBrand: async (req, res, next) => {
        try {
            const newBrand = await adminBrandService.createOne({...req.body});
            res.status(201).json(newBrand);
        } catch (e) {
            next(e);
        }
    },

    getBrandById: async (req, res, next) => {
        try {
            const {item} = req;
            res.json(item);
        } catch (e) {
            next(e);
        }
    },

    updateBrand: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedBrand = await adminBrandService.updateOne({_id: id}, req.body);
            res.status(201).json(updatedBrand);
        } catch (e) {
            next(e);
        }
    },

    deleteBrand: async (req, res, next) => {
        try {
            const {id} = req.params;
            await adminBrandService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    // /category
    getAllCategories: async (req, res, next) => {
        try {
            const categories = await adminCategoryService.findAll();

            res.json({
                data: categories
            });
        } catch (e) {
            next(e);
        }
    },

    createCategory: async (req, res, next) => {
        try {
            const newCategory = await adminCategoryService.createOne({...req.body});
            res.status(201).json(newCategory);
        } catch (e) {
            next(e);
        }
    },

    getCategoryById: async (req, res, next) => {
        try {
            const {item} = req;
            res.json(item);
        } catch (e) {
            next(e);
        }
    },

    updateCategory: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedCategory = await adminCategoryService.updateOne({_id: id}, req.body);
            res.status(201).json(updatedCategory);
        } catch (e) {
            next(e);
        }
    },

    deleteCategory: async (req, res, next) => {
        try {
            const {id} = req.params;
            await adminCategoryService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },

    // /productType
    getAllProductTypes: async (req, res, next) => {
        try {
            const productTypes = await adminProductTypeService.findAll();

            res.json({
                data: productTypes
            });
        } catch (e) {
            next(e);
        }
    },

    createProductType: async (req, res, next) => {
        try {
            const newProductType = await adminProductTypeService.createOne({...req.body});
            res.status(201).json(newProductType);
        } catch (e) {
            next(e);
        }
    },

    getProductTypeById: async (req, res, next) => {
        try {
            const {item} = req;
            res.json(item);
        } catch (e) {
            next(e);
        }
    },

    updateProductType: async (req, res, next) => {
        try {
            const {id} = req.params;
            const updatedProductType= await adminProductTypeService.updateOne({_id: id}, req.body);
            res.status(201).json(updatedProductType);
        } catch (e) {
            next(e);
        }
    },

    deleteProductType: async (req, res, next) => {
        try {
            const {id} = req.params;
            await adminProductTypeService.deleteOne({_id: id});
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
}

