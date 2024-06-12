import {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    query,
    where,
    getDocs,
} from 'firebase/firestore';

import firebase from '../../firebase.js';
import { passwordService, tokenService } from '../../services/index.js';

const db = getFirestore(firebase);

export const authController = {
    login: async (req, res, next) => {
        try {
            const { password: hashPassword, id } = req.user;
            const { password } = req.body;

            await passwordService.comparePassword(hashPassword, password);

            const tokens = tokenService.generateAuthTokens();

            await addDoc(collection(db, 'oauth'), {
                userId: id,
                ...tokens,
            });

            res.json({
                user: req.user,
                ...tokens,
            });
        } catch (e) {
            next(e);
        }
    },

    logout: async (req, res, next) => {
        try {
            const { access_token } = req;

            const data = query(
                collection(db, 'oauth'),
                where('access_token', '==', access_token),
            );
            const docSnap = await getDocs(data);
            docSnap.forEach((doc) => {
                deleteDoc(doc.ref);
            });

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
