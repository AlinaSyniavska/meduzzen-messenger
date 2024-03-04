import Joi from 'joi';

import { commonValidator } from '../common/common.validator.js';

export const authValidator = {
    login: Joi.object({
        email: commonValidator.emailValidator.required(),
        password: commonValidator.passwordValidator.required(),
    }),
};
