import Joi from 'joi';

export const chatValidator = {
    newDataValidator: Joi.object({
        userId: Joi.string().required(),
        userName: Joi.string().required(),
        text: Joi.string().required(),
        attachedFiles: Joi.array().items(Joi.string()).required(),
    }),
    updateDataValidator: Joi.object({
        userId: Joi.string(),
        userName: Joi.string(),
        text: Joi.string(),
        attachedFiles: Joi.array().items(Joi.string()),
    }),
};
