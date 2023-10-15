import Image from 'next/image'
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAVU2hgf1Yv8uEYftVLEZbgps9K2Pebghc",
  authDomain: "peace-of-mind-c4135.firebaseapp.com",
  projectId: "peace-of-mind-c4135",
  storageBucket: "peace-of-mind-c4135.appspot.com",
  messagingSenderId: "619407910041",
  appId: "1:619407910041:web:2d4a85f85f8031e2628408",
  measurementId: "G-6ZFCPF2RCY"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export default function Home() {
  return (
    <h1>t</h1>
  )
}
