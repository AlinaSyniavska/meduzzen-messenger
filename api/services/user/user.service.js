/*const {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
} = require('firebase/firestore');*/

const firestore = require('firebase/firestore');

const firebase = require('firebase');
const { User } = require('../../dataBase');

const db = firestore.getFirestore(firebase);

module.exports = {
    findAll: async () => {
        const users = await firestore.getDocs(firestore.collection(db, 'users'));
        const usersArray = [];

        if (users.empty) {
            return [];
        } else {
            users.forEach((doc) => {
                const user = new User(
                    // doc.id,
                    doc.data().email,
                    doc.data().password,
                );
                usersArray.push(user);
            });
        }

        return usersArray;
    },

    findOneByEmail: (params = {}) => {
        const { email } = params;

        const user = doc(db, 'users', email);
        return getDoc(user);
    },

    findOneById: (params = {}) => {
        const { id } = params;

        const user = firestore.doc(db, 'users', id);
        return firestore.getDoc(user);
    },

    createOne: (data) => {
        return firestore.addDoc(firestore.collection(db, 'users'), data);
    },
};
