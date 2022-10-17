import React, { useState } from "react";
import { DndContext } from "@dnd-kit/core";

import Draggable from "../../components/TaskBoard/Draggable";
import Droppable from "../../components/TaskBoard/Droppable";

import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});

function TaskBoardClient() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <TaskBoard />
      </QueryClientProvider>
    </>
  );
}

function TaskBoard() {
  const [isDropped, setIsDropped] = useState(false);
  const draggableMarkup = <Draggable>Drag me</Draggable>;
  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!isDropped ? draggableMarkup : null}
      <Droppable>{isDropped ? draggableMarkup : "Drop here"}</Droppable>
    </DndContext>
  );

  function handleDragEnd(event) {
    if (event.over && event.over.id === "droppable") {
      setIsDropped(true);
    }
  }
}

export default dynamic(() => Promise.resolve(TaskBoardClient), {
  ssr: false,
});
