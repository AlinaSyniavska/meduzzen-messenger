import { chatService } from '../../services/index.js';

export const chatController = {
    getAll: async (req, res, next) => {
        try {
            const messages = await chatService.findAll();

            res.json([
                ...messages,
            ]);
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
            const { user } = req;

            res.json(user);
        } catch (e) {
            next(e);
        }
    },
};
