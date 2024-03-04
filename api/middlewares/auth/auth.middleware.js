const { getFirestore, getDoc, doc } = require('firebase/firestore');

const { authValidator } = require('../../validators');
const { CustomError } = require('../../errors');
const { userService, tokenService } = require('../../services');
const { config } = require('../../configs');
const firebase = require('../../firebase');

const db = getFirestore(firebase);

module.exports = {
    isLoginBodyValid: (req, res, next) => {
        try {
            const { error, value } = authValidator.login.validate(req.body);

            if (error) {
                return next(new CustomError('Wrong email or password'));
            }

            req.body = value;
            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresentForAuth: async (req, res, next) => {
        try {
            const { email } = req.body;

            const userByEmail = await userService.findOneByEmail({ email });

            if (!userByEmail) {
                return next(new CustomError('Wrong email or password'));
            }

            req.user = userByEmail;

            next();
        } catch (e) {
            next(e);
        }
    },

    checkAccessToken: async (req, res, next) => {
        try {
            const accessToken = req.get(config.AUTHORIZATION);

            if (!accessToken) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkToken(accessToken);

            const token = doc(db, 'oauth', accessToken);
            const data = await getDoc(token);
            if (data.exists()) {
                res.status(200).send(data.data());
            }

            if (!token) {
                return next(new CustomError('Token not valid', 401));
            }

            req.access_token = token.access_token;
            req.user = token.userId;

            next();
        } catch (e) {
            next(e);
        }
    },
};
