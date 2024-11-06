import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyCyyzSxQlpRGzlbbZu8yGhfKccayR5Ja-Y",
    authDomain: "angular-auth-firebase-c367b.firebaseapp.com",
    projectId: "angular-auth-firebase-c367b",
    storageBucket: "angular-auth-firebase-c367b.firebasestorage.app",
    messagingSenderId: "84638206716",
    appId: "1:84638206716:web:1324ec729a99b0c6c86579"
  };

  const app = initializeApp(firebaseConfig);
  export const auth = getAuth(app)
  export const db = getFirestore(app)
