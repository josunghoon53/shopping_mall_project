// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBNOvwVcXhU0J1gcAmGUkcZbCbtniMKMVk",
  authDomain: "shopping-mall-e4611.firebaseapp.com",
  projectId: "shopping-mall-e4611",
  storageBucket: "shopping-mall-e4611.appspot.com",
  messagingSenderId: "75594523936",
  appId: "1:75594523936:web:8c9992766e2a2b4d4b6345",
  measurementId: "G-B9PY6M3K6M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);