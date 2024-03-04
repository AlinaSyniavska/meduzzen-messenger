const { userService, passwordService } = require('../../services');

module.exports = {
    getAll: async (req, res, next) => {
        try {
            const users = await userService.findAll();

            res.json({
                data: users,
            });
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            const { password } = req.body;

            const hashPassword = await passwordService.hashPassword(password);
            const newUser = await userService.createOne({
                ...req.body,
                password: hashPassword,
            });

            res.status(201).json(newUser);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
