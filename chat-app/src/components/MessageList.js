import React from "react";

const MessageList = ({ messages, socketId }) => {
  return (
    <div className="w-[70%] flex flex-col items-center justify-center">
      <div>
        My Socket Id:<strong> {socketId}</strong>
      </div>
      <div className="w-[70%] mt-4 bg-white flex flex-col items-center shadow-md rounded-lg p-4 max-h-[60vh] overflow-y-auto">
        <div className="text-xl font-bold mb-4">Messages</div>
        {messages.map((messageObj, index) => (
          <div
            key={index}
            className="w-[50%] bg-gradient-to-r from-gray-100 to-gray-200 p-3 my-2 rounded-md shadow-sm hover:shadow-md transition-shadow"
          >
            <div className="text-sm text-gray-500">
              From: {messageObj.socketId}{" "}
              {messageObj.private && <span>(Private)</span>}
            </div>
            <div>{messageObj.message}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MessageList;
