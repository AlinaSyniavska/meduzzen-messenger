import Joi from 'joi';

import { commonValidator } from '../common/common.validator.js';

export const userValidator = {
    newUserValidator: Joi.object({
        email: commonValidator.emailValidator.required(),
        password: commonValidator.passwordValidator.required(),
    }),
};
