// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from "firebase/compat/app";

import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNoejHNhIMu-JPhPpIc2OIDwYgnF751GQ",
  authDomain: "react-expense-tracker-8cc99.firebaseapp.com",
  databaseURL: "https://react-expense-tracker-8cc99-default-rtdb.firebaseio.com",
  projectId: "react-expense-tracker-8cc99",
  storageBucket: "react-expense-tracker-8cc99.firebasestorage.app",
  messagingSenderId: "1061281620632",
  appId: "1:1061281620632:web:9bc36a70194add190ee6ed",
  measurementId: "G-2QTPN4KDHY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
export const imageDb = getStorage(app)