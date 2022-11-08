import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Dropdown } from "flowbite-react";
import AppSidebar from "../../../components/AppSidebar/AppSidebar";
import AppDrawer from "../../../components/AppDrawer";
import Ticket from "../../../components/Ticket/Ticket";
import { useEffect, useState } from "react";
import { TASK_MANAGEMENT, TASK_MANAGEMENT_V2 } from "../../../constants/api";
import DndBoard from "../../../components/DnD/DndBoard";
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
    return await fetch(
      TASK_MANAGEMENT_V2.TASKS("159f154d-cb13-445a-a107-f74cd6507beb")
    )
      .then((res) => res.json())
      .then((response) => {
        console.log("response", response);
        let pbiFormArr = {};
        response.forEach((task) => {
          if (pbiFormArr[task.userStoryId]) {
            debugger;
            pbiFormArr[task.userStoryId].Tasks = [
              ...pbiFormArr[task.userStoryId].Tasks,
              {
                Id: task.taskId,
                Title: task.taskTitle,
                Status: task.taskStatus,
                Original_Estimate: task.taskOriginalEstimate,
                Completed: task.taskCompleted,
              },
            ];
          } else {
            debugger;
            pbiFormArr[task.userStoryId] = {
              Pbi: {
                Id: task.userStoryId,
                Team_Id: task.teamId,
                Title: task.userStoryTitle,
                Status: task.userStoryStatus,
                Effort: task.userStoryEffort,
              },
              Tasks: [
                {
                  Id: task.taskId,
                  Title: task.taskTitle,
                  Status: task.taskStatus,
                  Original_Estimate: task.taskOriginalEstimate,
                  Completed: task.taskCompleted,
                },
              ],
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
    fetch(
      TASK_MANAGEMENT_V2.UPDATE_TASK_STATUS +
        "?" +
        new URLSearchParams({
          id,
          status,
        }),
      {
        method: "PUT",
      }
    )
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
    <div className="bg flex h-screen w-screen justify-start bg-fuchsia-100">
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
      <style></style>
    </div>
  );
}

export default dynamic(() => Promise.resolve(BoardWrapperClient), {
  ssr: false,
});
