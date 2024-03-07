import express from 'express';
import {chatController} from "../../controllers/index.js";

export const chatRouter = express.Router();

chatRouter.get('/',
    chatController.getAll);
chatRouter.post('/',
    chatController.create,);

/*
chatRouter.get('/brand/:id',
    // adminCommonMiddleware.isItemPresent(Brand),
    chatController.getById);
chatRouter.put('/brand/:id',
    // adminCommonMiddleware.isItemPresent(Brand),
    chatController.update);
chatRouter.delete('/brand/:id',
    // adminCommonMiddleware.isItemPresent(Brand),
    chatController.delete);
*/
