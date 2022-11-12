import React, { useEffect, useState } from "react";
import {
  DragDropContext,
  Droppable,
  Draggable,
  resetServerContext,
} from "react-beautiful-dnd";
import { v4 as uuid } from "uuid";
import Ticket from "../../components/Ticket/Ticket";
import { TASK_MANAGEMENT } from "../../constants/api";
import Modal from "../Modal";

const responseFormatter = (response) => {
  let responseObj = {
    NEW: { items: [] },
    ACTIVE: { items: [] },
    DONE: { items: [] },
  };
  response.forEach((item) => {
    if (responseObj[item.Status]) {
      responseObj[item.Status]["items"] = [
        ...responseObj[item.Status]["items"],
        item,
      ];
    } else {
      responseObj[item.Status] = { items: [{ ...item }] };
    }
  });
  console.log("respone format", responseObj);
  return responseObj;
};

/**
 * For ordering of the status type
 */
const StatusType = {
  NEW: "NEW",
  ACTIVE: "ACTIVE",
  DONE: "DONE",
};

function DndBoard({ responseCols, updateTasksStatus }) {
  const [columns, setColumns] = useState(responseFormatter(responseCols));
  const onDragHandle = (result, columns, setColumns) => {
    if (!result.destination) return;
    const { source, destination } = result;

    if (source.droppableId !== destination.droppableId) {
      debugger;
      const sourceCol = columns[source.droppableId];
      const destiCol = columns[destination.droppableId];
      const sourceColUpdate = [...sourceCol.items];
      const destiColUpdate = [...destiCol.items];

      ///delete  item from source column
      const [removed] = sourceColUpdate.splice(source.index, 1);

      /// insert item into the destination column
      removed.Status = destination.droppableId;
      destiColUpdate.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceCol,
          items: sourceColUpdate,
        },
        [destination.droppableId]: {
          ...destiCol,
          items: destiColUpdate,
        },
      });

      updateTasksStatus(result.draggableId, removed.Status);
    } else {
      const column = columns[source.droppableId];
      const copiedItems = [...column.items];
      const [removed] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removed);

      setColumns({
        ...columns,
        [source.droppableId]: {
          ...column,
          items: copiedItems,
        },
      });
    }
  };
  return (
    <div className="flex h-[100%] flex-[0.75]">
      <DragDropContext
        onDragEnd={(result) => onDragHandle(result, columns, setColumns)}
      >
        {Object.keys(StatusType).map((key, index) => {
          const column = columns[key];
          return (
            <DropList
              key={StatusType[key]}
              id={StatusType[key]}
              column={column}
              columnName={key}
            />
          );
        })}
      </DragDropContext>
    </div>
  );
}

const DropList = ({ id, column, columnName }) => {
  const [showModal, setShowModal] = useState(false);
  return (
    <Droppable droppableId={id} className="border-2 border-fuchsia-600">
      {(provided, snapshot) => {
        return (
          <div
            {...provided.droppableProps}
            ref={provided.innerRef}
            // className={`${snapshot.isDraggingOver ? 'bg-blue-500' : 'bg-slate-400'}
            //p-1 w-[250px] min-h-[500px]`}
            className="mb-2 h-auto min-h-[inherit] w-[300px] flex-auto border-r-2 border-b-2
             border-r-neutral-100 border-b-neutral-100 bg-zinc-800/50 p-2"
          >
            <h4 className=" text-center text-neutral-50">{columnName}</h4>
            {columnName === StatusType.NEW ? (
              <div>
                <button
                  className="block rounded-lg bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  type="button"
                  data-modal-toggle="defaultModal"
                  onClick={() => setShowModal(!showModal)}
                >
                  Toggle modal
                </button>
                <Modal show={showModal} setIsShow={setShowModal} />
              </div>
            ) : null}
            {column?.items.map((item, index) => {
              return <DragItem key={item.Id} item={item} index={index} />;
            })}
            {provided.placeholder}
          </div>
        );
      }}
    </Droppable>
  );
};

const DragItem = ({ item, index }) => {
  return (
    <Draggable draggableId={item.Id.toString()} index={index}>
      {(dragProvided, snapshot) => {
        return (
          <div
            ref={dragProvided.innerRef}
            {...dragProvided.draggableProps}
            {...dragProvided.dragHandleProps}
            style={{ ...dragProvided.draggableProps.style }}
          >
            <Ticket
              Id={item.Id}
              Title={item.Title}
              Completed={item.Completed}
              Original_Estimate={item.Original_Estimate}
              Status={item.Status}
              isDragging={snapshot.isDragging}
            />
          </div>
        );
      }}
    </Draggable>
  );
};

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default DndBoard;
