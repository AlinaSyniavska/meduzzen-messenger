import {getFirestore, collection, query, where, getDocs} from 'firebase/firestore';

import firebase from "../../firebase.js";
import {authValidator} from "../../validators/index.js";
import CustomError from "../../errors/CustomError.js";
import {tokenService, userService} from "../../services/index.js";

const db = getFirestore(firebase);

export const authMiddleware = {
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
            const accessToken = req.get(process.env.AUTHORIZATION);

            if (!accessToken) {
                return next(new CustomError('No token', 401));
            }

            tokenService.checkToken(accessToken);

            const collectionRef = collection(db, 'oauth');
            const q = query(collectionRef, where('access_token', '==', accessToken));
            const docSnap = await getDocs(q);

            if (!docSnap.docs[0]) {
                return next(new CustomError('Token not found', 401));
            }

            const token = docSnap.docs[0];

            req.access_token = token.data().access_token;
            req.user = token.data().userId;

            next();
        } catch (e) {
            next(e);
        }
    },
};
