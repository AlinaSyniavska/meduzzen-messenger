const express = require("express");
export const userRouter = express.Router();

const { commonMiddleware, userMiddleware } = require('../../middlewares');
const { userValidator } = require('../../validators');
const { userController } = require('../../controllers');

userRouter.get('/',
    userController.getAll);
userRouter.post('/',
    commonMiddleware.isDataValid(userValidator.newUserValidator),
    userMiddleware.isUserUniq,
    userController.create,);

userRouter.get('/:id',
    userMiddleware.isUserPresent,
    userController.getById);

module.exports = userRouter;
