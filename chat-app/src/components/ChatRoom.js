import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:3000");

const ChatRoom = () => {
  const [messages, setMessages] = useState([]);
  const [receivedMessages, setReceivedMessages] = useState([]);
  socket.on("recieve-message", (message) => {
    console.log("Received message:", message);
    setReceivedMessages((prevReceivedMessages) => [
      ...prevReceivedMessages,
      message,
    ]);
  });

  socket.on("message", (message) => {
    console.log("Received message:", message);
    setMessages((prevMessages) => [...prevMessages, message]);
  });

  const sendMessage = (message) => {
    socket.emit("message", message);
  };

  return (
    <div className="chat-room flex flex-col items-center">
      {messages}
      <MessageList messages={receivedMessages} socketId={socket.id} />
      <MessageInput sendMessage={sendMessage} />
    </div>
  );
};

export default ChatRoom;
