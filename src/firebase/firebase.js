// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBHUngdnuPQajH_dMOVlUI49LNzMr5ZV_A",
  authDomain: "mern-blog-5ae7f.firebaseapp.com",
  projectId: "mern-blog-5ae7f",
  storageBucket: "mern-blog-5ae7f.appspot.com",
  messagingSenderId: "143374339399",
  appId: "1:143374339399:web:074f07439d374227885062"
};

// Initialize Firebase
export const app = initializeApp(firebaseConfig);