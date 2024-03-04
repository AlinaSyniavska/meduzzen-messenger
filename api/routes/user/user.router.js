const {commonMiddleware, userMiddleware, authMiddleware} = require("../../middlewares");
const {userValidator, queryValidator} = require("../../validators");
const {userController} = require("../../controllers");
const userRouter = require('express').Router();

userRouter.get('/',
    userController.getAll);
userRouter.post('/',
    commonMiddleware.isDataValid(userValidator.newUserValidator),
    userMiddleware.isUserUniq,
    userController.create);

userRouter.get('/:id',
    commonMiddleware.isIdValid,
    userMiddleware.isUserPresent,
    userController.getById);

module.exports = userRouter;
