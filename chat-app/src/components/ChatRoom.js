import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import MessageList from "./MessageList";
import MessageInput from "./MessageInput";

const socket = io("http://localhost:5000");

const ChatApp = () => {
  const [messages, setMessages] = useState([]);
  const [socketId, setSocketId] = useState("");

  useEffect(() => {
    socket.on("connect", () => {
      setSocketId(socket.id);
    });

    socket.on("receive-message", (messageObj) => {
      console.log("message received");
      setMessages((prevMessages) => [...prevMessages, messageObj]);
    });

    return () => {
      socket.off("connect");
      socket.off("receive-message");
    };
  }, []);

  const sendMessage = (message, recipientSocketId) => {
    if (recipientSocketId) {
      socket.emit("private_message", { message, socketId: recipientSocketId });
      console.log(message, recipientSocketId);
    } else {
      socket.emit("message", message);
    }
  };

  const joinRoom = (room) => {
    socket.emit("join", room);
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
      <MessageList messages={messages} socketId={socketId} />
      <MessageInput sendMessage={sendMessage} joinRoom={joinRoom} />
    </div>
  );
};

export default ChatApp;
