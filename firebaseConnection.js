// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAHin4T9zvkTtmsPhNYypT6pwjQfPSwaRo",
  authDomain: "atividadepratica-a5fcd.firebaseapp.com",
  projectId: "atividadepratica-a5fcd",
  storageBucket: "atividadepratica-a5fcd.firebasestorage.app",
  messagingSenderId: "253852180734",
  appId: "1:253852180734:web:387ce1abe0f3f5aff4c5af",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export { db };
