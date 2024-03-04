const {ProductType} = require("../../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return ProductType.find(params).sort('name');
    },

    findOne: (params = {}) => {
        return ProductType.findOne(params);
    },

    createOne: (productType) => {
        return ProductType.create(productType);
    },

    updateOne: (params = {}, productTypeData, options = {new: true}) => {
        return ProductType.findOneAndUpdate(params, productTypeData, options);
    },

    deleteOne: (params = {}) => {
        return ProductType.deleteOne(params);
    },
}
