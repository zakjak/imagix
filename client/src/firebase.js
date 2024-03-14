// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: import.meta.env.FIREBASE_KEY,
  authDomain: "imagix-baf5d.firebaseapp.com",
  projectId: "imagix-baf5d",
  storageBucket: "imagix-baf5d.appspot.com",
  messagingSenderId: "59763962666",
  appId: "1:59763962666:web:42f76cb0b72e776e45a453"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);