import Image from "next/image";
import Link from "next/link";
import React from "react";
import { FaClipboardCheck } from "react-icons/fa";

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
  return (
    <div
      className={`m-auto mt-7 min-h-[100px] w-[250px] select-none rounded-md p-3 font-medium text-black 
      ${statusColor[Status]}
       border-l-8 ${borderColors[Status]}
      cursor-pointer shadow-md
      hover:shadow-lg
      ${isDragging ? " opacity-50" : ""}
  `}
    >
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
