import Joi from 'joi';

import { regexEnum } from '../../constants/index.js';

export const commonValidator = {
    emailValidator: Joi.string().regex(regexEnum.EMAIL).lowercase().trim(true),
    passwordValidator: Joi.string().regex(regexEnum.PASSWORD),
};
