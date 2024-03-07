import {
    getFirestore,
    collection,
    addDoc,
    getDocs,
    doc,
    getDoc,
    serverTimestamp,
    query,
    orderBy,
    limit,
} from 'firebase/firestore';

import firebase from '../../firebase.js';
import Message from "../../dataBase/Message.js";

const db = getFirestore(firebase);

export const chatService = {
    findAll: async () => {
        const messages = await getDocs(query(collection(db, 'chats'), orderBy('createdAt'), limit(100)));
        const messagesArray = [];

        if (messages.empty) {
            return [];
        } else {
            messages.forEach((doc) => {
                const user = new Message(
                    doc.id,
                    doc.data().userId,
                    doc.data().text,
                    doc.data().attachedFiles,
                    doc.data().createdAt,
                );
                messagesArray.push({ ...user });
            });
        }

        return messagesArray;
    },

    findOneById: async (params = {}) => {
        const { id } = params;

        const message = doc(db, 'chats', id);
        const res = await getDoc(message);

        return new Message(res.id, res.data().userId, res.data().text, res.data().attachedFiles);
    },

    createOne: async (data) => {
        const res = await addDoc(collection(db, 'chats'), {
            ...data,
            createdAt: serverTimestamp(),
        });
        return res._key.path.lastSegment();
    },
};
