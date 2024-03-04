import pkg from 'jsonwebtoken';
const { sign, verify } = pkg;

import CustomError from '../../errors/CustomError.js';
import {tokenTypeEnum} from "../../constants/index.js";
import {config} from "../../configs/index.js";

export const tokenService = {
    generateAuthTokens: (payload = {}) => {
        const access_token = sign(payload, config.ACCESS_TOKEN, {
            expiresIn: '24h',
        });
        const refresh_token = sign(payload, config.REFRESH_TOKEN, {
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
                secret = config.ACCESS_TOKEN;
            if (tokenType === tokenTypeEnum.REFRESH)
                secret = config.REFRESH_TOKEN;

            return verify(token, secret);
        } catch (e) {
            throw new CustomError('Token not valid', 401);
        }
    },
};
