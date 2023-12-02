'use client';
import firebase from 'firebase/compat/app';
import 'firebase/compat/firestore';
import 'firebase/compat/auth';

const firebaseConfig = {
  apiKey: "AIzaSyAVU2hgf1Yv8uEYftVLEZbgps9K2Pebghc",
  authDomain: "peace-of-mind-c4135.firebaseapp.com",
  projectId: "peace-of-mind-c4135",
  storageBucket: "peace-of-mind-c4135.appspot.com",
  messagingSenderId: "619407910041",
  appId: "1:619407910041:web:2d4a85f85f8031e2628408",
  measurementId: "G-6ZFCPF2RCY"
};


firebase.initializeApp(firebaseConfig);
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

export function endOfWeekSummary(){
    var weekArr : Object[] = [];
    if(user) {
      db.collection("users").doc(user.uid).get().then(doc => {
        const data = doc.data()
        
        // First for loop iterates through each field; which is every different date / day
        for(let i = 0; i < 7; i++){
          var arr = []
  
          // If there isnt another field, the loop ends
          if(Object.values(data)[i] === undefined){
            break
          }
          // If the field is just the email, the loop ends
          if(Object.values(data)[i] == data.name){
            break
          }
          var x = 0
          
          // Iterates through every input/output in one day
          while(true){
  
            // Loop ends if there is not more inputs/outputs
            if (Object.values(data)[i][x] === undefined){
              
              break
            } else{
              
              // This logs the input
              arr.push({'Role': 'User', "Content": Object.values(data)[i][x][0]});
  
              // This logs the output
              arr.push({'Role': 'Assistant', "Content": Object.values(data)[i][x][1]});
              
            }
            x++
          }
  
          // This array contains the conversation of one day in the correct format.
          console.log("DAY")
          console.log(arr)
          weekArr.push(arr)
          
        }
        console.log("WEEK")
        console.log(weekArr)
        
      
      })
      
    }
    return weekArr
}

let weekArr = endOfWeekSummary()
let newweekArr = [];
for (let x = 0; x < weekArr.length; x++) {
    newweekArr.push({Role:'User', Content:'New Day'})
    for (let y = 0; y < Object.keys(weekArr[x]).length; y++) {  
        let day = weekArr[x];
        newweekArr.push(day[y]);
    }
}
console.log("NEW WEEK")
console.log(newweekArr);

export default function Summary() {
    
}