"use client"

import React, { useEffect, useState } from "react";
import { io } from "socket.io-client";

const socket = io();
const username = Math.random().toString(36).slice(-6);

const ChatPage = () => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [chat, setChat] = useState([]);

  const sendData = async (e) => {
    e.preventDefault();
    if (currentMsg !== "") {
      const msgData = {
        user: username,
        msg: currentMsg
      };
      await socket.emit("send_msg", msgData);
      setCurrentMsg("");
    }
  };


  useEffect(() => {
    socket.on("receive_msg", (data) => {
      setChat((pre) => [...pre, data]);
    });
  }, [socket]);


  return (
    <div className="flex flex-col justify-center items-center">
      <ul role="list" className="divide-y divide-gray-100 w-9/12">
        {chat.map(({ user, msg }, key) => {
          const isUser = (user == username);
            return (
              <li key={key} className={`flex justify-between gap-x-6 py-2 ${isUser ? 'flex-row-reverse' : 'flex-row'}`}>
                <div className={`h-8 w-8 flex flex-col justify-center items-center rounded-full ${isUser ? 'bg-green-300' : 'bg-gray-200'}`}>{user.charAt(0)}</div>
                <div className="min-w-0 flex-auto">
                  <p className={`text-sm font-semibold leading-6 text-gray-900 ${isUser ? 'text-right' : ''}`}>{msg}</p>
                </div>
              </li>
            )
          })
        }
      </ul>
      <form onSubmit={(e) => sendData(e)} className="mt-6 flex max-w-md gap-x-4">
        <input
          id="chat"
          name="chat"
          type="text"
          required
          value={currentMsg}
          className="min-w-0 flex-auto rounded-md border-0 bg-white/5 px-3.5 py-2 shadow-sm ring-1 ring-inset ring-white/10 focus:ring-2 focus:ring-inset focus:ring-indigo-500 sm:text-sm sm:leading-6 text-black"
          placeholder="Chat with your friends"
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button
          type="submit"
          className="flex-none rounded-md bg-indigo-500 px-3.5 py-2.5 text-sm font-semibold text-white shadow-sm hover:bg-indigo-400 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-500"
        >
          Send
        </button>
      </form>
    </div>
  );
};

export default ChatPage;