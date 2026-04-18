// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth, GoogleAuthProvider} from "firebase/auth"

const firebaseConfig = {
  apiKey: import.meta.env.VITE_FIREBASE_APIKEY,
  authDomain: "interviewiqai-43f38.firebaseapp.com",
  projectId: "interviewiqai-43f38",
  storageBucket: "interviewiqai-43f38.firebasestorage.app",
  messagingSenderId: "169648220822",
  appId: "1:169648220822:web:779d798743446ec8c470b7"
};


const app = initializeApp(firebaseConfig);

const auth=getAuth(app);

const provider=new GoogleAuthProvider();
export {auth,provider}