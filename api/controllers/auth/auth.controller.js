const {
    getFirestore,
    collection,
    addDoc,
    deleteDoc,
    doc
} = require('firebase/firestore');

const { passwordService, tokenService } = require('../../services');
const firebase = require("../../firebase");

const db = getFirestore(firebase);

module.exports = {
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

            await deleteDoc(doc(db, 'oauth', access_token));

            res.sendStatus(204);
        } catch (e) {
            next(e);
        }
    },
};
