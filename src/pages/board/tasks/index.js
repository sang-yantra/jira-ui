import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Dropdown } from "flowbite-react";
import AppSidebar from "../../../components/AppSidebar/AppSidebar";
import AppDrawer from "../../../components/AppDrawer";
import Ticket from "../../../components/Ticket/Ticket";
import { useEffect, useState } from "react";
import { TASK_MANAGEMENT } from "../../../constants/api";
import DndBoard from "../../../components/DnD/DndBoard";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";
import dynamic from "next/dynamic";
const queryClient = new QueryClient();
function BoardWrapperClient() {
  return (
    <>
      <QueryClientProvider client={queryClient}>
        <Board />
      </QueryClientProvider>
    </>
  );
}

const BoardDataContoller = {
  /**
   * Function to fetch pbis with react query
   * @returns Promise
   */
  fetchPbis: async () => {
    return await fetch(TASK_MANAGEMENT.TASKS)
      .then((res) => res.json())
      .then((response) => {
        const pbiFormArr = {};
        response.forEach((task) => {
          /// load pbi
          const pbiId = task.Pbi[0].Id;

          if (pbiFormArr[pbiId]) {
            pbiFormArr[pbiId] = {
              ...pbiFormArr[pbiId],
              Tasks: [...pbiFormArr[pbiId].Tasks, task],
            };
          } else {
            pbiFormArr[pbiId] = {
              Pbi: task.Pbi[0],
              Tasks: [{ ...task }],
            };
          }
        });
        return pbiFormArr;
      });
  },
  /**
   *
   * Update status of the task
   * @param {*} id
   * @param {*} status
   */
  updateTasksStatus: (id, status) => {
    const Status = { Status: status };
    console.log("url", TASK_MANAGEMENT.TASKS_UPDATE_STATUS(id));
    fetch(TASK_MANAGEMENT.TASKS_UPDATE_STATUS(id), {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(Status),
    })
      .then((response) => response.json())
      .then((response) => {
        console.log("Task", id, "updated with statsus", status);
      })
      .catch((error) => {
        console.log(error);
      });
  },
};

function Board() {
  const {
    data: pbis,
    isLoading,
    isError,
    error,
  } = useQuery(["pbis"], BoardDataContoller.fetchPbis);

  if (isLoading) return <h1 className="text-orange-400">LOADING ...</h1>;
  if (isError) return <h1 className="text-orange-400">{error.message} ...</h1>;

  return (
    <div className="flex h-screen w-screen justify-start bg-fuchsia-100">
      <AppSidebar />
      <section
        className=" ml-4 h-[100%] flex-auto overflow-scroll overflow-x-hidden
             bg-fuchsia-100 p-4 text-lg font-semibold text-black"
      >
        {pbis &&
          Object.keys(pbis).map((key, index) => {
            return (
              <div key={index} className="flex justify-start">
                <div className="flex-[0.25]">
                  <Ticket Title={pbis[key].Pbi.Title} />
                </div>
                <DndBoard
                  responseCols={pbis[key].Tasks}
                  updateTasksStatus={BoardDataContoller.updateTasksStatus}
                />
              </div>
            );
          })}
      </section>
    </div>
  );
}

export default dynamic(() => Promise.resolve(BoardWrapperClient), {
  ssr: false,
});
