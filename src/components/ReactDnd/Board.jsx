import React, { useState } from "react";
import {
  DragDropContext,
  Droppable,
  resetServerContext,
} from "react-beautiful-dnd";
import { reorder } from "../../utils/arrayUtils";
import Column from "./Column/Column";

function Board({ initial }) {
  const isCombineEnabled = false;
  const [columns, setColumns] = useState(initial);
  const columnsName = Object.keys(initial);
  const [ordered, setOrdered] = useState(columnsName);

  /**
   * function to handle after drag end
   * @param {} result
   */
  const handleOnDragEnd = (result) => {
    if (result.combine) {
      if (result.type === "COLUMN") {
        const shallow = [...ordered];
        shallow.splice(result.source.index, 1);
        setOrdered([...shallow]);
        return;
      }
      const column = columns[result.source.droppableId];
      const withQuoteRemoved = [...column];
      withQuoteRemoved.splice(result.source.index, 1);
      const columns = {
        ...columns,
        [result.source.droppableId]: withQuoteRemoved,
      };
      setColumns({ ...columns });
      return;
    }

    /// dropped nowhere
    if (!result.destination) {
      return;
    }

    const source = result.source;
    const destination = result.destination;

    // did not move anywhere - can bail early
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    // reordering column
    if (result.type === "COLUMN") {
      const ordered = reorder(ordered, source.index, destination.index);
      setOrdered(ordered);
      return;
    }

    const data = reorderQuoteMap({
      quoteMap: columns,
      source,
      destination,
    });
    setColumns(data.quoteMap);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable
        droppableId="board"
        type="COLUMN"
        direction="horizontal"
        ignoreContainerClipping={false}
        isCombineEnabled={isCombineEnabled}
      >
        {(provided) => (
          <div
            className=" bg-fuchsia-400"
            ref={provided.innerRef}
            {...provided.droppableProps}
          >
            {ordered.map((key, index) => (
              <Column
                key={key}
                index={index}
                title={key}
                quotes={columns[key]}
                isScrollable={false}
                isCombineEnabled={isCombineEnabled}
              />
            ))}
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {}, // will be passed to the page component as props
  };
}
export default Board;
