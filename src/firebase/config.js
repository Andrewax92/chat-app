// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'
import { getStorage } from 'firebase/storage'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAWgvwc1ARyDOTJBSQ7sxOjlFNaGd6ZV1Y",
    authDomain: "chatapp-e3c47.firebaseapp.com",
    projectId: "chatapp-e3c47",
    storageBucket: "chatapp-e3c47.appspot.com",
    messagingSenderId: "89229464734",
    appId: "1:89229464734:web:26ef15d1af015bb99d178f"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Data base
const db = getFirestore(app)

// auth 

const auth = getAuth(app)

// Cloud Storage 
const storage = getStorage(app)

export { app, db, auth, storage }



