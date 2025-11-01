// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBzNlCqQb84gAKp7LoOeQhrC-FKz7qtL0c",
  authDomain: "smart-deals-f0ff2.firebaseapp.com",
  projectId: "smart-deals-f0ff2",
  storageBucket: "smart-deals-f0ff2.firebasestorage.app",
  messagingSenderId: "558407011975",
  appId: "1:558407011975:web:6188075a9d280b4ff93222",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
