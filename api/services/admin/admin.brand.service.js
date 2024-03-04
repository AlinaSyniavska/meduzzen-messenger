const {Brand} = require("../../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return Brand.find(params).sort('name');
    },

    findOne: (params = {}) => {
        return Brand.findOne(params);
    },

    createOne: (brand) => {
        return Brand.create(brand);
    },

    updateOne: (params = {}, brandData, options = {new: true}) => {
        return Brand.findOneAndUpdate(params, brandData, options);
    },

    deleteOne: (params = {}) => {
        return Brand.deleteOne(params);
    },
}
