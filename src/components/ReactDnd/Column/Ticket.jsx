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
  isGroupedOver,
  provided,
}) => {
  const statusColor = {
    New: "lime",
    Active: "yellow",
    Done: "green",
  };
  return (
    <div
      className={`w-[250px] min-h-[150px] p-3 m-auto mt-7 text-black font-medium rounded-md bg-${
        statusColor[Status] || "blue"
      }-300
      border-l-8 border-${
        statusColor[Status] || "blue"
      }-800 shadow-md hover:shadow-lg
       cursor-pointer
  `}
      ref={provided.innerRef}
      {...provided.draggableProps}
      {...provided.dragHandleProps}
    >
      <FaClipboardCheck className="inline-block text-lg text-blue-500" />
      <span className="ml-3">
        {Title.substring(0, 50)}
        {Title.length > 50 ? "..." : ""}
      </span>
      <div className="ticket-container first-letter:">
        <h3>
          {Completed}/{Original_Estimate}...
        </h3>
      </div>
    </div>
  );
};
export default Ticket;
