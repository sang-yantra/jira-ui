import React from "react";
import { Draggable, Droppable } from "react-beautiful-dnd";
import Ticket from "./Ticket";

function TicketList({
  ignoreContainerClipping,
  internalScroll,
  scrollContainerStyle,
  isDropDisabled,
  isCombineEnabled,
  listId = "LIST",
  listType,
  style,
  quotes,
  title,
}) {
  console.log("title", listId);
  return (
    <Droppable
      droppableId={listId}
      type={listType}
      ignoreContainerClipping={ignoreContainerClipping}
      isDropDisabled={isDropDisabled}
      isCombineEnabled={isCombineEnabled}
    >
      {(dropProvided, dropSnapshot) => (
        <div
          className="warpper flex flex-col p-2 border-[8px] pb-0 transition-colors duration-200 ease-in-out
             w-[250px]
            "
          style={style}
          {...dropProvided.droppableProps}
        >
          {
            <InnerList
              quotes={quotes}
              title={title}
              dropProvided={dropProvided}
            />
          }
        </div>
      )}
    </Droppable>
  );
}

const InnerList = ({ quotes, title, dropProvided }) => {
  return (
    <div>
      <h4>{title}</h4>
      <div className="drop-zone pb-2" ref={dropProvided.innerRef}>
        <InnerQuoteList quotes={quotes} />
        {dropProvided.placeholder}
      </div>
    </div>
  );
};

const InnerQuoteList = ({ quotes }) => {
  return (
    <>
      {quotes?.map((quote, index) => (
        <Draggable
          key={quote.Id}
          draggableId={quote.Id.toString()}
          index={index}
          shouldRespectForceTouch={false}
        >
          {(dragProvided, dragSnapshot) => (
            <Ticket
              key={quote.Id}
              Title={quote.Title}
              Completed={quote.Completed}
              Original_Estimate={quote.Original_Estimate}
              Assigned_To={quote.Assigned_To}
              Status={quote.Status}
              provided={dragProvided}
            />
          )}
        </Draggable>
      ))}
    </>
  );
};

export default TicketList;
