import React from "react";
import Avatar from "../Avatar/Avatar";

function Chats({ id, userName, avatar, createdDatetime, message }) {
  return (
    <li key={id} className={`flex items-start gap-2 p-2`}>
      <Avatar className=" mt-2" avatarUrl={avatar} />
      <div className="user_message flex-1 rounded-lg bg-fuchsia-100 p-2">
        <h3>
          {userName}&nbsp;&nbsp;&nbsp;
          {new Date(createdDatetime).toLocaleTimeString()}{" "}
        </h3>
        <p className="">{message}</p>
      </div>
    </li>
  );
}

export default Chats;
