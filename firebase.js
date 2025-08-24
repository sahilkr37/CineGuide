// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyBZ9tmpkRxgqhXLaaSVpU5mrM1g6zDQtFs",
    authDomain: "cineguide0.firebaseapp.com",
    projectId: "cineguide0",
    storageBucket: "cineguide0.firebasestorage.app",
    messagingSenderId: "443427597435",
    appId: "1:443427597435:web:590c90bce1dc86692846de",
    measurementId: "G-CC4SNRQQ1T"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);