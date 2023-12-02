'use client';

import {endOfWeekSummary} from "../chatbot/page"

let weekArr = endOfWeekSummary()
let newweekArr = [];
for (let x = 0; x < weekArr.length; x++) {
    newweekArr.push({Role:'User', Content:'New Day'})
    for (let y = 0; y < weekArr[x].length; y++) {
        let day = weekArr[x];
        newweekArr.push(day[y]);
    }
}
console.log("NEW WEEK")
console.log(newweekArr);

export default function Summary() {
    
}