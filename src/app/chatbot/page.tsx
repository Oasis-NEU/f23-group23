'use client';
import { useState } from "react";
// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

import { useRouter } from 'next/navigation';
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
firebase.initializeApp(firebaseConfig);

// const auth = getAuth(app);

// Initialize Firestore
// const db = getFirestore(app);
const db = firebase.firestore();
const auth = firebase.auth();

var user: { uid: string | undefined; email: any; };
auth.onAuthStateChanged(userN => {

  if (userN) {
      user = userN

  } else {
      console.log("signing out")
  }

})

interface Message {
  role: string;
  content: string;
}


export default function Chat() {
  const router = useRouter;
  const [chat, setChat] = useState<Message[]>([]); // Initialize with an empty array of Message
  const [userInput, setUserInput] = useState<string>("");

  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: Message = { role: "user", content: userInput };

    const message = [...chat, userMessage];

    var userI  = userMessage["content"];

    try {
      const response = await fetch('http://localhost:5000/openai/chat', {
        method: 'POST',
        body: JSON.stringify(message),
        headers: {
          'Content-Type': 'application/json'
        }
      });

      if (response.ok) {
        const responseData = await response.json();
        console.log(responseData);

        const assistantMessage: Message = { role: "assistant", content: responseData };

        setChat([...chat, userMessage, assistantMessage]);
        var assistantI = assistantMessage["content"]




      } else {
        console.error("Failed to submit user data");
      }
    } catch (error) {
      console.error("Network error:", error);
    }


    var date = new Date();
        var day = date.getDate() + 1
        var month = date.getMonth() + 1
        var year = date.getFullYear()
        var currentDate = year.toString()  +  month.toString() +  day.toString();  

        if(user) {
          db.collection("users").doc(user.uid).get().then(doc => {
            const data = doc.data();
            var dict = data![currentDate]
            var innerlst = []
            console.log(dict)
            if(dict === undefined){
              innerlst = [userI, "This is where the first assistant reply would go"]
              db.collection("users").doc(user.uid).update({
                name: user.email,
                [currentDate]: {0: [userI, "This is where the first assistant reply would go"]},
                
              })
              
            } else {
              console.log("IT WORKS HERE")
              innerlst.push([userI, "This is where assistant reply would go"])
              dict[parseInt(Object.keys(dict)[Object.keys(dict).length-1]) + 1] = [userI, "This is where assistant reply would go"]
              db.collection("users").doc(user.uid).update({
                name: user.email,
                [currentDate]: dict,
                
              })
            }
          })
    } else {
      console.log("Timed out, need to sign back in")
      window.location.href = "http://localhost:3000";
    }
  }


  return (
    <div>
      <h1>Hi, I am a chatbot that will help with your mental health, ask me anything!</h1>
      <div>
        {chat.map((message, index) => {
          return (
            <div key={index}>
              {message.role}: {message.content}
            </div>
          )
        })}
      </div>
      <form onSubmit={handleSubmit}>
        <input style={{ color: 'black' }} type="text" onChange={(event) => { setUserInput(event.target.value) }} />
        <input type="submit" value="Submit!" />
      </form>
    </div>
  )
}
