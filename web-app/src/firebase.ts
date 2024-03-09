// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDOggniNJwQ2vGsI0p7y4YkcM0-W-dvDxU",
    authDomain: "meduzzen-messenger-3b718.firebaseapp.com",
    projectId: "meduzzen-messenger-3b718",
    storageBucket: "meduzzen-messenger-3b718.appspot.com",
    messagingSenderId: "879089626050",
    appId: "1:879089626050:web:9776fa46946d9406ac845b"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Firebase storage reference
export const storage = getStorage(app);

export const db = getFirestore(app);

