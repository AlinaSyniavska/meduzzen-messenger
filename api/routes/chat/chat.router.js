import express from 'express';
import {chatController} from "../../controllers/index.js";
import {chatMiddleware, commonMiddleware} from "../../middlewares/index.js";
import {chatValidator} from "../../validators/index.js";

export const chatRouter = express.Router();

chatRouter.get('/',
    chatController.getAll);
chatRouter.post('/',
    commonMiddleware.isDataValid(chatValidator.newDataValidator),
    chatController.create,);

chatRouter.get('/:id',
    chatMiddleware.isMessagePresent,
    chatController.getById);
chatRouter.put('/:id',
    commonMiddleware.isDataValid(chatValidator.updateDataValidator),
    chatMiddleware.isMessagePresent,
    chatController.update);
chatRouter.delete('/:id',
    chatMiddleware.isMessagePresent,
    chatController.delete);
