import Image from "next/image";
import React from "react";
import { Draggable, resetServerContext } from "react-beautiful-dnd";
import { FaClipboardCheck } from "react-icons/fa";

const TicketDnd = ({
  index,
  Id,
  Order,
  Title,
  Completed,
  Original_Estimate,
  Assigned_To,
  Status,
}) => {
  const statusColor = {
    New: "lime",
    Active: "yellow",
    Done: "green",
  };

  console.log("order", Order);
  return (
    <Draggable draggableId={Order.toString()} index={index}>
      {(provided, snapshot) => (
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
          data-testid="list-ticket"
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
              {Completed}/{Original_Estimate}
            </h3>
          </div>
        </div>
      )}
    </Draggable>
  );
};

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default TicketDnd;
