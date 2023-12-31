const firebaseConfig = {
    apiKey: "AIzaSyBC4RTQuNq6SQGnMxGVgSSV3plyRaASaMs",
    authDomain: "first-project-8b666.firebaseapp.com",
    projectId: "first-project-8b666",
    storageBucket: "first-project-8b666.appspot.com",
    messagingSenderId: "626050859251",
    appId: "1:626050859251:web:588ff7ed4f802c81a3f786",
    measurementId: "G-WY9H5LPV4K"
};

export const actionCodeSettings = {
    url: 'http://localhost:5173',
    handleCodeInApp: true
};

import { initializeApp } from 'firebase/app'
import { getAuth } from 'firebase/auth'

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);