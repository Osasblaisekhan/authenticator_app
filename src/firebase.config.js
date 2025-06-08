// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDrK8c3W1G6ckWrVWWbYHdVpHNKaDbVx58",
  authDomain: "authenticator-app-e6a88.firebaseapp.com",
  projectId: "authenticator-app-e6a88",
  storageBucket: "authenticator-app-e6a88.firebasestorage.app",
  messagingSenderId: "766453298491",
  appId: "1:766453298491:web:bc2ff1956553f24555731e"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const Auth = getAuth(app)

