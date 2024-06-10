import React, { useState } from "react";
import io from "socket.io-client";

const MessageInput = ({ sendMessage, joinRoom }) => {
  const [message, setMessage] = useState("");
  const [room, setRoom] = useState("");
  const [socketId, setSocketId] = useState(""); // New state for recipient socket ID

  const handleSendMessage = (e) => {
    e.preventDefault();
    sendMessage(message, socketId);
    setMessage("");
    setSocketId("");
  };

  const handleJoinRoom = (e) => {
    e.preventDefault();
    joinRoom(room);
    setRoom("");
  };

  return (
    <div className="bg-white shadow-md rounded-lg p-4 mt-8 flex flex-col items-center">
      <div className="mb-4 w-full">
        <label htmlFor="room" className="block text-gray-700 font-bold mb-2">
          Room
        </label>
        <input
          type="text"
          id="room"
          value={room}
          onChange={(e) => setRoom(e.target.value)}
          placeholder="Enter room name"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleJoinRoom}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline mb-4"
      >
        Join Room
      </button>
      <div className="mb-4 w-full">
        <label
          htmlFor="socketId"
          className="block text-gray-700 font-bold mb-2"
        >
          Socket ID
        </label>
        <input
          type="text"
          id="socketId"
          value={socketId}
          onChange={(e) => setSocketId(e.target.value)}
          placeholder="Enter recipient socket ID"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <div className="mb-4 w-full">
        <label htmlFor="message" className="block text-gray-700 font-bold mb-2">
          Message
        </label>
        <input
          type="text"
          id="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          placeholder="Type a message"
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        onClick={handleSendMessage}
        className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline"
      >
        Send
      </button>
    </div>
  );
};

export default MessageInput;
