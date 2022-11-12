import { Progress } from "flowbite-react";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClipboardCheck } from "react-icons/fa";
import dynamic from "next/dynamic";
import { useEffect } from "react";

import stickynoteNew from "@/assets/images/svgs/stickynote-new.svg";
import stickynoteActive from "@/assets/images/svgs/stickynote-active.svg";
import stickynoteDone from "@/assets/images/svgs/stickynote-done.svg";

const Ticket = ({
  Id,
  Title,
  Completed,
  Original_Estimate,
  Assigned_To,
  Status,
  isDragging,
}) => {
  const statusColor = {
    NEW: "bg-orange-300",
    ACTIVE: "bg-teal-300",
    DONE: "bg-green-300",
  };
  const borderColors = {
    NEW: "border-orange-700",
    ACTIVE: "border-teal-700",
    DONE: "border-green-700",
  };
  const progressColors = {
    NEW: "yellow",
    ACTIVE: "blue",
    DONE: "green",
  };

  const bgImage = {
    NEW: stickynoteNew,
    ACTIVE: stickynoteActive,
    DONE: stickynoteDone,
  };

  return (
    <div
      className={`m-auto mt-7 min-h-[100px] w-[250px] cursor-pointer select-none rounded-md bg-center bg-no-repeat p-3 
      font-medium ${isDragging ? " opacity-50" : ""}
  `}
      style={{
        backgroundImage: `url(${bgImage[Status].src})`,
      }}
    >
      <Progress
        progress={(Completed * 100) / Original_Estimate}
        size="sm"
        color={progressColors[Status]}
      />
      <FaClipboardCheck className="inline-block text-lg text-blue-500" />
      <Link href={`/board/tasks/${Id}`}>
        <a className="ml-3">
          {Title.substring(0, 50)}
          {Title.length > 50 ? "..." : ""}
        </a>
      </Link>
      <div className="ticket-container first-letter:">
        <h3>
          {Completed}/{Original_Estimate}
        </h3>
      </div>
    </div>
  );
};
export default Ticket;
