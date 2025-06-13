// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCpBJFJnYrJG0b82bJFEjaT-MdInnKWTxo",
  authDomain: "atividadepratica-b077d.firebaseapp.com",
  projectId: "atividadepratica-b077d",
  storageBucket: "atividadepratica-b077d.firebasestorage.app",
  messagingSenderId: "517943128590",
  appId: "1:517943128590:web:a938c08c0ecfc5001c025f"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

const db = getFirestore(app);
export {db};

