// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCeCMXeNH9UqWpFLf2cHhhXSimyFKiMkE4",
  authDomain: "ilkapp-a3f68.firebaseapp.com",
  projectId: "ilkapp-a3f68",
  storageBucket: "ilkapp-a3f68.appspot.com",
  messagingSenderId: "322437079700",
  appId: "1:322437079700:web:75b85d1a0d93b1a9d14a81"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };