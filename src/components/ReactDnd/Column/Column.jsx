import React from "react";
import { Draggable } from "react-beautiful-dnd";
import TicketList from "./TicketList";

function Column({ index, title, quotes, isScrollable, isCombineEnabled }) {
  return (
    <Draggable draggableId={title} index={index}>
      {(provided, snapshot) => (
        <div
          className="container flex flex-col m-2 w-[250px]"
          ref={provided.innerRef}
          {...provided.draggableProps}
        >
          <div
            className={`header flex items-center justify-center rounded-sm
          ${snapshot.isDragging ? " bg-green-400" : "bg-slate-400"}
           transition-colors duration-200 ease-in-out hover:bg-green-400
          `}
          >
            <h4 {...provided.dragHandleProps}>{title}</h4>
          </div>
          <TicketList
            listId={title}
            listType="QUOTE"
            style={{
              backgroundColor: snapshot.isDragging ? "green" : null,
            }}
            quotes={quotes}
            internalScroll={isScrollable}
            isCombineEnabled={Boolean(isCombineEnabled)}
            isDropDisabled={false}
            ignoreContainerClipping={true}
          />
        </div>
      )}
    </Draggable>
  );
}

export default Column;
