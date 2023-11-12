
'use client';

// Import the functions you need from the SDKs you need

import Head from 'next/head';

import { useEffect, useRef, useState } from 'react';

// Import the functions you need from the SDKs you need

import { getFirestore, doc, setDoc, Timestamp, snapshotEqual } from "firebase/firestore"; // firestore module
import { getAuth, GoogleAuthProvider, signInWithPopup, User } from "firebase/auth";
import { useRouter } from 'next/navigation';

export { Home }

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

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
const analytics = getAnalytics(app);
firebase.initializeApp(firebaseConfig);
const googleProvider = new GoogleAuthProvider()

// const auth = getAuth(app);

// Initialize Firestore
// const db = getFirestore(app);
const db = firebase.firestore();
const auth = firebase.auth();

auth.onAuthStateChanged(user => {
  if (user) {


  } else {
      console.log("signing out")
  }

})

export default function Home() {
  // Add beforeunload listener
  addEventListener("beforeunload", (event) => {
    firebase.auth().signOut().then(() => {
      
    }).catch((error) => {
      // An error happened.
    });
  });

  
  const [user, setUser] = useState<User | (() => User | null) | null>();
  // const [status, setStatus] = useState<ResponseStatus>(ResponseStatus.Waiting);
  const router = useRouter()

  const signup = async (e: any) => {
    e.preventDefault()
    
    signInWithPopup(auth, googleProvider)
      .then(cred => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(cred);
        // The signed-in user info.
        const u = cred.user;
        setUser(u)
        navigateToDashboard(e)
        // IdP data available using getAdditionalUserInfo(result)
        // ...
        addEmail(u.email!)
        
      }).catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
        
      });
  }

  const navigateToDashboard = async (e: any) => {
    e.preventDefault()
    router.push("/chatbot")
  }

  const addEmail = async (email: string) => {
    console.log("user entered email: ", email)

    // reference to the currently logged in user
    const userRef = doc(db, 'users', email)

    // creating user data from auth to be stored

    // storing it in a document on Firestore
    
  };

  

  return (
    <div className="h-full min-h-screen lg:h-screen w-full flex flex-col bg-white">
      <Head>
        <title> ENTER YOUR APP NAME </title>
        <meta name="description" content={`A social productivity tool designed to help you find your flow.`} />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div id="nav" className="flex flex-row justify-between w-full py-8 px-12">
      </div>

      <div id="main" className="flex flex-col md:flex-row justify-center items-center w-full h-full gap-12 mx-auto mx-8 sm:px-8">
        <div id="hero" className='flex flex-col gap-y-5 sm:min-w-[24rem] px-6 sm:px-0'>
          <img className="h-24 w-24 sm:h-32 sm:w-32" alt="logo" src="https://st4.depositphotos.com/1364916/22429/v/450/depositphotos_224295072-stock-illustration-logo-yoga-man-vector-image.jpg" />
          <h1 className='text-6xl sm:text-7xl font-bold text-[#001122]'> Peace of Mind </h1>
          <h2 className='text-[#999999] text-xl font-medium'> Mental Health AI Chatbot </h2>
          <div className="flex flex-row gap-x-3">
            <div>
              <button className="w-full flex items-center justify-center bg-white border border-gray-300 text-gray-600 hover:bg-gray-100 px-4 py-2 rounded shadow"
              onClick={async (e) => { !user ? signup(e) : navigateToDashboard(e)}}
              >{!user ? (
                <div className="flex flex-row items-center">
                  <img src="google_icon.png"></img>
                  Log In with Google
                </div>) : (
                <div>
                  Go to Dashboard
                </div>
              )}
              </button>
            </div>
          </div>
        </div>
        <div id="demo" className="w-full sm:w-[40rem] h-auto aspect-auto">
          <img
            src="https://st4.depositphotos.com/1364916/22429/v/450/depositphotos_224295072-stock-illustration-logo-yoga-man-vector-image.jpg"
            className="object-cover w-96 h-96 sm:shadow-2xl sm:rounded-lg bg-black"
          />
        </div>
      </div>
      <div id="footer" className="flex flex-row justify-between w-full py-8 px-12 flex-grow items-end">
        <p className="text-metallic-gray font-medium">© 2023 <a href="https://rev.school" target='_blank' referrerPolicy='no-referrer' className="hover:underline">rev</a></p>
        <div className="flex flex-row gap-x-4">
          <a target='_blank' referrerPolicy='no-referrer' href="https://twitter.com/rev_neu" className="text-metallic-gray font-medium hover:underline">Twitter</a>
          <a target='_blank' referrerPolicy='no-referrer' href="https://github.com/teamrevspace/flowwork" className="text-metallic-gray font-medium hover:underline">Github</a>
        </div>
      </div>
    </div>
  )
}
