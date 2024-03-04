import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore';

import User from "../../dataBase/User.js";
import firebase from "../../firebase.js";

const db = getFirestore(firebase);

export const userService = {
    findAll: async () => {
        const users = await getDocs(collection(db, 'users'));
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

        const user = doc(db, 'users', id);
        return getDoc(user);
    },

    createOne: (data) => {
        return addDoc(collection(db, 'users'), data);
    },
};
