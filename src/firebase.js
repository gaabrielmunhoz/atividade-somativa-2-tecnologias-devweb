// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBNFjxaTp2TbLn3BSLVcIrX-x_8yqT7cmY",
  authDomain: "atividade-somativa-2-tecdevweb.firebaseapp.com",
  projectId: "atividade-somativa-2-tecdevweb",
  storageBucket: "atividade-somativa-2-tecdevweb.firebasestorage.app",
  messagingSenderId: "110939419914",
  appId: "1:110939419914:web:a29de52287643674f576f3"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const db = getFirestore(app)