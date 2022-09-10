import AppSidebar from "@/components/AppSidebar/AppSidebar";
import ChatRooms from "@/components/ChatBoard/ChatRooms/ChatRooms";
import ChatsContainer from "@/components/ChatBoard/Chats/ChatsContainer";
import React from "react";
import io from "socket.io-client";

const socket = io.connect("http://localhost:5000");
function Chat({ socket, username, room }) {
  return (
    <section className="flex w-full">
      <RoomsContainer />
      <ChatsContainer socket={socket} username={username} room={room} />
    </section>
  );
}

const RoomsContainer = () => {
  return (
    <div
      className="m-[0_8px_0_8px] flex w-[20%] flex-col items-center justify-start border-2 
     border-violet-400 bg-violet-200 p-3"
    >
      <h2>Chats</h2>
      <ul>
        <ChatRooms />
      </ul>
    </div>
  );
};

export default Chat;
