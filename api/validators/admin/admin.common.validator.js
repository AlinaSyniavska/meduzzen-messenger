const Joi = require('joi');

const {commonDataValidator} = require("../common/common.validator");

module.exports = {
    newDataValidator: Joi.object({
        name: commonDataValidator.required(),
    }),

    updateDataValidator: Joi.object({
        name: commonDataValidator,
    }),
};