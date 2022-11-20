import Image from "next/image";
import React from "react";

const STATUS_COLOR = {
  ACTIVE: "bg-green-500",
  AWAY: "bg-yellow-500",
  OFFLINE: "bg-white",
};

const FALLBACK_AVATAR_URL =
  "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/792.jpg";
function Avatar({ avatarUrl = FALLBACK_AVATAR_URL, status = "ACTIVE" }) {
  return (
    <div className="relative w-[50px]">
      <Image
        width={40}
        height={40}
        className=" rounded-lg"
        src={avatarUrl}
        alt="avatar"
      />
      <div
        className={`absolute bottom-1 -right-1 h-[10px] w-[10px] rounded-full ${STATUS_COLOR[status]}`}
      ></div>
    </div>
  );
}

export default Avatar;
