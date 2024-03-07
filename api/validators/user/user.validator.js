import Joi from 'joi';

import { commonValidator } from '../common/common.validator.js';

export const userValidator = {
    newUserValidator: Joi.object({
        name: Joi.string(),
        email: commonValidator.emailValidator.required(),
        password: commonValidator.passwordValidator.required(),
    }),
};
