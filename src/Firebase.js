// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAv8bu-B8KAYxtFCXuWeDvvTcLcrJZdHCc",
  authDomain: "project-e07d6.firebaseapp.com",
  projectId: "project-e07d6",
  storageBucket: "project-e07d6.appspot.com",
  messagingSenderId: "798566484200",
  appId: "1:798566484200:web:892fec041ad61a1da8215d",
  measurementId: "G-3FSDGD64BZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export { db, auth };
