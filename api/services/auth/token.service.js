import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import CustomError from '../../errors/CustomError.js';
import {tokenTypeEnum} from "../../constants/index.js";

export const tokenService = {
    generateAuthTokens: (payload = {}) => {
        const access_token = sign(payload, process.env.ACCESS_TOKEN, {
            expiresIn: '7d',
        });
        const refresh_token = sign(payload, process.env.REFRESH_TOKEN, {
            expiresIn: '30d',
        });

        return {
            access_token,
            refresh_token,
        };
    },

    checkToken: (token = '', tokenType = tokenTypeEnum.ACCESS) => {
        try {
            let secret;

            if (tokenType === tokenTypeEnum.ACCESS)
                secret = process.env.ACCESS_TOKEN;
                // secret = process.env.ACCESS_TOKEN;
            if (tokenType === tokenTypeEnum.REFRESH)
                secret = process.env.REFRESH_TOKEN;

            return verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },
};
