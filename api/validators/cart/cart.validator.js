const Joi = require('joi');

const {cartStatusEnum} = require("../../constants");

module.exports = {
  productOrderValidator: Joi.object({
    products: Joi.array().items({
      productId: Joi.required(),
      count: Joi.number().min(0).required(),
      cost: Joi.number().min(0).required(),
    }).required(),
    userId: Joi.required(),
    status: Joi.string().valid(...Object.values(cartStatusEnum)).trim().required(),
    sum: Joi.number().min(0).required(),
  }),
};




