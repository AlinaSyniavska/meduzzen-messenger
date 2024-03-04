const Joi = require('joi');

const {commonDataValidator} = require("../common/common.validator");
const {priceSignEnum, tagEnum} = require("../../constants");

module.exports = {
    newProductValidator: Joi.object({
        name: commonDataValidator.required(),
        brand: commonDataValidator.required(),
        price: Joi.number().required(),
        priceSign: Joi.string().default(Object.values(priceSignEnum.UAN)).max(3).valid(...Object.values(priceSignEnum)).required(),
        total: Joi.number().required(),
        imageLink: Joi.string().required(),
        description: Joi.string().default('Some description about product'),
        rating: Joi.string(),
        category: commonDataValidator.required(),
        productType: commonDataValidator.required(),
        tagList: Joi.array().items(Joi.string().valid(...tagEnum.FILTER_TAGS)),
        // productColors: Joi.array().items({
        //     hexValue: Joi.string().regex(/^#[A-Fa-f\d]{6}/),
        //     colorName: Joi.string(),
        // })
    }),

    updateProductValidator: Joi.object({
        name: commonDataValidator,
        brand: commonDataValidator,
        price: Joi.number(),
        priceSign: Joi.string().max(3).valid(...Object.values(priceSignEnum)),
        total: Joi.number(),
        imageLink: Joi.string(),
        description: Joi.string(),
        rating: Joi.string(),
        category: commonDataValidator,
        productType: commonDataValidator,
        tagList: Joi.array().items(Joi.string().valid(...tagEnum.FILTER_TAGS)),
/*        productColors: Joi.array().items({
            hexValue: Joi.string().regex(/^#[A-Fa-f\d]{6}/),
            colorName: Joi.string(),
        })*/
    }),
};