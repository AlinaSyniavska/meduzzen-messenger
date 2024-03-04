import express from "express";

export const authRouter = express.Router();

const { authController } = require('../../controllers');
const { authMiddleware } = require('../../middlewares');

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login,);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout,);
