// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  //protect the apikey given by google firebase behing a .env file for extra protection from hackers.
  apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
  authDomain: "mern-auth-1e60b.firebaseapp.com",
  projectId: "mern-auth-1e60b",
  storageBucket: "mern-auth-1e60b.appspot.com",
  messagingSenderId: "74337521418",
  appId: "1:74337521418:web:25ad9bc8e677dff84df4f3",
};

// Initialize Firebase
//export this "app" variable and put it inside of OAuth.js file and put it as a param inside the getAuth()
export const app = initializeApp(firebaseConfig);
