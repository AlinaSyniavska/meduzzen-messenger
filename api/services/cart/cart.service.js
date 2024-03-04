const {Cart} = require("../../dataBase");

module.exports = {
    findOne: (params = {}) => {
        return Cart.findOne(params);
    },

    updateOne: (params = {}, productData, options = {new: true}) => {
        return Cart.findOneAndUpdate(params, productData, options);
    },

    createOne: (order) => {
        return Cart.create(order);
    },

}
