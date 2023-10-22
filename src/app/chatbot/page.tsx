'use client';
import { useState } from "react";

interface Message {
  role: string;
  content: string;
}

export default function Chat() {
  const [chat, setChat] = useState<Message[]>([]); // Initialize with an empty array of Message
  const [userInput, setUserInput] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const userMessage: Message = { role: "user", content: userInput };

    const message = [...chat, userMessage];

    console.log(message);

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

      } else {
        console.error("Failed to submit user data");
      }
    } catch (error) {
      console.error("Network error:", error);
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
