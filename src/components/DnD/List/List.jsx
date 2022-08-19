import React from "react";
import { Droppable, resetServerContext } from "react-beautiful-dnd";
import Ticket from "../../Ticket/Ticket";
import TicketDnd from "../../Ticket/TicketDnD";

function List({ status, ticketLists }) {
  const ticketList = getTicketListByStatus(ticketLists, status);
  console.log("individual tisk list", ticketList);
  console.log("status", status);
  return (
    <Droppable
      key={status}
      droppableId={status}
      direction="horizontal"
      ignoreContainerClipping={false}
      isCombineEnabled={false}
    >
      {(provided) => (
        <div className="flex flex-col m-[0 5px] min-h-[400px] w-1/4 border-r-4 bg-slate-300">
          <h3>{status}</h3>
          <TicketDndListWrapper
            provided={provided}
            innerRef={provided.innerRef}
            ticketLists={ticketList}
            status={status}
            data-testid={`board-list:${status}`}
          />
        </div>
      )}
    </Droppable>
  );
}

const getTicketListByStatus = (tickets, status) => {
  return tickets.filter((ticket) => ticket.Status === status);
};

const TicketDndListWrapper = ({ provided, innerRef, ticketLists, status }) => {
  return (
    <div
      className="h-[100%] p=[0 5px]"
      {...provided.droppableProps}
      ref={innerRef}
      data-testid={`board-list:${status}`}
    >
      {ticketLists?.map((ticket, index) => (
        <TicketDnd
          key={ticket.Id}
          index={index}
          Id={ticket.Id}
          Order={ticket.order}
          Title={ticket.Title}
          Completed={ticket.Completed}
          Original_Estimate={ticket.Original_Estimate}
          Assigned_To={ticket.Assigned_To}
          Status={ticket.Status}
        ></TicketDnd>
      ))}
      {provided.placeholder}
    </div>
  );
};

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default List;
