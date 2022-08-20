import Image from "next/image";
import React from "react";
import { FaClipboardCheck } from "react-icons/fa";

const Ticket = ({
  Title,
  Completed,
  Original_Estimate,
  Assigned_To,
  Status,
  isDragging,
}) => {
  const statusColor = {
    New: "bg-orange-300",
    Active: "bg-teal-300",
    Done: "bg-green-300",
  };
  const borderColors = {
    New: "border-orange-700",
    Active: "border-teal-700",
    Done: "border-green-700",
  };
  return (
    <div
      className={`select-none w-[250px] min-h-[150px] p-3 m-auto mt-7 text-black font-medium rounded-md 
      ${statusColor[Status]}
       border-l-8 ${borderColors[Status]}
      shadow-md hover:shadow-lg
      cursor-pointer
      ${isDragging ? " opacity-50" : ""}
  `}
    >
      <FaClipboardCheck className="inline-block text-lg text-blue-500" />
      <span className="ml-3">
        {Title.substring(0, 50)}
        {Title.length > 50 ? "..." : ""}
      </span>
      <div className="ticket-container first-letter:">
        <h3>
          {Completed}/{Original_Estimate}
        </h3>
      </div>
    </div>
  );
};
export default Ticket;
