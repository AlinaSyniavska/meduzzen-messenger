const Joi = require('joi');

const { emailValidator, passwordValidator } = require("../common/common.validator");

module.exports = {
  newUserValidator: Joi.object({
    email: emailValidator.required(),
    password: passwordValidator.required(),
  }),
};



