// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCFUAkSrzqIhwtPdufxBfdaqpxyU3MLNCs",
  authDomain: "quiz-app-firebase-b830a.firebaseapp.com",
  databaseURL: "https://quiz-app-firebase-b830a-default-rtdb.firebaseio.com",
  projectId: "quiz-app-firebase-b830a",
  storageBucket: "quiz-app-firebase-b830a.appspot.com",
  messagingSenderId: "491966849760",
  appId: "1:491966849760:web:ee8a9eba0cd031b4e3e685",
  measurementId: "G-0YYWKWTEH8"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);