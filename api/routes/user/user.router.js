import express from 'express';

import { userController } from '../../controllers/index.js';
import { userValidator } from '../../validators/index.js';
import { commonMiddleware, userMiddleware } from '../../middlewares/index.js';

export const userRouter = express.Router();

userRouter.get('/',
    userController.getAll);
userRouter.post('/',
    commonMiddleware.isDataValid(userValidator.newUserValidator),
    userMiddleware.isUserUniq,
    userController.create,);

userRouter.get('/:id',
    userMiddleware.isUserPresent,
    userController.getById);

