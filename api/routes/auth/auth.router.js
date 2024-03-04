import express from "express";

import {authMiddleware} from "../../middlewares/index.js";
import {authController} from "../../controllers/index.js";

export const authRouter = express.Router();

authRouter.post('/login',
    authMiddleware.isLoginBodyValid,
    authMiddleware.isUserPresentForAuth,
    authController.login,);

authRouter.post('/logout',
    authMiddleware.checkAccessToken,
    authController.logout,);
