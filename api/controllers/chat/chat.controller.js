import { chatService } from '../../services/index.js';

export const chatController = {
    getAll: async (req, res, next) => {
        try {
            const messages = await chatService.findAll();

            res.json([...messages]);
        } catch (e) {
            next(e);
        }
    },

    create: async (req, res, next) => {
        try {
            // const { message } = req.body;

            const newMessage = await chatService.createOne({
                ...req.body,
            });

            res.status(201).json(newMessage);
        } catch (e) {
            next(e);
        }
    },

    getById: async (req, res, next) => {
        try {
            const { message } = req;

            res.json(message);
        } catch (e) {
            next(e);
        }
    },

    update: async (req, res, next) => {
        try {
            const { id } = req.params;
            await chatService.updateOne(
                { id: id },
                req.body,
            );

            res.status(201).json('OK');
        } catch (e) {
            next(e);
        }
    },

    delete: async (req, res, next) => {
        try {
            const { id } = req.params;
            await chatService.deleteOne({ id: id });
            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
