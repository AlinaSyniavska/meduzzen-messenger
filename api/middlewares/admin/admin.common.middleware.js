const {CustomError} = require("../../errors");

module.exports = {
    isItemValid: (validationSchema, dataType = 'body') => async (req, res, next) => {
        try {
            const {error, value} = validationSchema.validate(req[dataType]);
            if(error) {
                return next(new CustomError(error.details[0].message));
            }
            req[dataType] = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isItemUniq: (schema) => async (req, res, next) => {
        try {
            const {name} = req.body;

            const item = await schema.findOne({name});

            if(item){
                return next(new CustomError(`Item with title ${name} is exist`, 409));
            }
            next();
        } catch (e) {
            next(e);
        }
    },

    isItemPresent: (schema) => async (req, res, next) => {
        try {
            const {id} = req.params;

            const item = await schema.findOne({_id: id});

            if(!item){
                return next(new CustomError(`Item with id ${id} not found`, 404));
            }

            req.item = item;
            next();
        } catch (e) {
            next(e);
        }
    },
}
