import {compare, hash} from 'bcrypt';

import CustomError from "../../errors/CustomError.js";

export const passwordService = {
    hashPassword: (password) => hash(password, 10),
    comparePassword: async (hashPassword, password) => {
        const isPasswordsSame = await compare(password, hashPassword);

        if (!isPasswordsSame) {
            throw new CustomError('Wrong email or password');
        }
    },
};
