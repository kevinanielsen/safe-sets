// Import the functions you need from the SDKs you need
import { getAnalytics } from "firebase/analytics";
import { initializeApp } from "firebase/app";
import { collection, getDocs, getFirestore } from 'firebase/firestore/lite';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDIBEilnzKuXXxRNAn1xUHCEIIdwrvHO2M",
  authDomain: "safe-sets.firebaseapp.com",
  projectId: "safe-sets",
  storageBucket: "safe-sets.appspot.com",
  messagingSenderId: "1081552396202",
  appId: "1:1081552396202:web:f799e115e323114be3d5d3",
  measurementId: "G-PGG2S4J6M8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
const analytics = getAnalytics(app);