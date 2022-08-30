import React, { useEffect, useState } from "react";
import AppSidebar from "@/components/AppSidebar/AppSidebar";

import ChatRooms from "@/components/ChatBoard/ChatRooms/ChatRooms";
import Link from "next/link";
import { useRouter } from "next/router";
import io from "socket.io-client"; // Add this
import dynamic from "next/dynamic";
import Chat from "@/components/chat";

const socket = io.connect("http://localhost:5000");

function Messages() {
  const [username, setUsername] = useState("");
  const [room, setRoom] = useState("");
  const [showChat, setShowChat] = useState(false);

  const joinRoom = () => {
    if (username !== "" && room !== "") {
      socket.emit("join_room", room);
      setShowChat(true);
    }
  };

  return (
    <div className="flex bg-fuchsia-100 text-lg font-medium text-black">
      <AppSidebar />
      <section className="flex w-full">
        <div className="App">
          {!showChat ? (
            <div className="joinChatContainer">
              <h3>Join A Chat</h3>
              <input
                type="text"
                placeholder="John..."
                onChange={(event) => {
                  setUsername(event.target.value);
                }}
              />
              <input
                type="text"
                placeholder="Room ID..."
                onChange={(event) => {
                  setRoom(event.target.value);
                }}
              />
              <button onClick={joinRoom}>Join A Room</button>
            </div>
          ) : (
            <Chat socket={socket} username={username} room={room} />
          )}
        </div>
      </section>
    </div>
  );
}

const joinRoom = () => {};

export default dynamic(() => Promise.resolve(Messages), { ssr: false });
