import React from "react";
import Chats from "./Chats";

function ChatsContainer({ socket, username, room }) {
  return (
    <div className="">
      <Chats socket={socket} username={username} room={room} />
    </div>
  );
}

export default ChatsContainer;
