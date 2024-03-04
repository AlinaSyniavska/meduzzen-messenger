const {Category} = require("../../dataBase");

module.exports = {
    findAll: (params = {}) => {
        return Category.find(params).sort('name');
    },

    findOne: (params = {}) => {
        return Category.findOne(params);
    },

    createOne: (category) => {
        return Category.create(category);
    },

    updateOne: (params = {}, categoryData, options = {new: true}) => {
        return Category.findOneAndUpdate(params, categoryData, options);
    },

    deleteOne: (params = {}) => {
        return Category.deleteOne(params);
    },
}
