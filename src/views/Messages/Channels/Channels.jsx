import Image from "next/image";
import React from "react";
import Avatar from "../Avatar/Avatar";

function Channels({ id, users, updatedDatetime, title, setRoomId }) {
  return (
    <li
      className="mb-2 w-full rounded-lg
                     hover:cursor-pointer"
      onClick={() => {
        console.log(id);
        setRoomId(id);
      }}
    >
      <div className="flex items-center gap-2 p-2">
        <Avatar avatarUrl={users[0].avatar} />
        <div>
          <h6 className=" flex-grow text-[12px] font-medium">
            {new Date(updatedDatetime).toLocaleString()}
          </h6>
          <h4 className="text-[14px]">{title}</h4>
        </div>
      </div>
      <hr />
    </li>
  );
}

export default Channels;
