import { chatService } from '../../services/index.js';
import CustomError from '../../errors/CustomError.js';

export const chatMiddleware = {
    isMessagePresent: async (req, res, next) => {
        try {
            const { id } = req.params;

            const message = await chatService.findOneById({ id });

            if (!message) {
                return next(new CustomError(`Message with id ${id} not found`, 404),);
            }

            req.message = message;
            next();
        } catch (e) {
            next(e);
        }
    },

};
