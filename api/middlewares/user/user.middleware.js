const {userService} = require("../../services");
const {CustomError} = require("../../errors");

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const {id} = req.params;

            const user = await userService.findOneById({id});

            if (!user) {
                return next(new CustomError(`User with id ${id} not found`, 404));
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserUniq: async (req, res, next) => {
        try {
            const {email} = req.body;

            const user = await userService.findOneByEmail({email});

            if (user) {
                return next(new CustomError(`User with email ${email} is exist`, 409));
            }

            // req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

};
