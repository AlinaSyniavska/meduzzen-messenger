import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
} from 'firebase/firestore';

import User from '../../dataBase/User.js';
import firebase from '../../firebase.js';

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
                    doc.id,
                    doc.data().email,
                    doc.data().password,
                );
                usersArray.push({...user});
            });
        }

        return usersArray;
    },

    findOneByEmail: async (params = {}) => {
        const { email } = params;

        const usersArray = await userService.findAll();

        return usersArray.find(item => item.email === email);
    },

    findOneById: async (params = {}) => {
        const { id } = params;

        const user = doc(db, 'users', id);
        const res = await getDoc(user);

        return new User(res.id, res.data().email, res.data().password);
        // return res._document.data.value.mapValue.fields;
    },

    createOne: async (data) => {
        const res = await addDoc(collection(db, 'users'), data);
        return res._key.path.lastSegment();
    },
};
