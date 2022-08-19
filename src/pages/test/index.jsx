import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";

import { Dropdown } from "flowbite-react";
import AppSidebar from "../../components/AppSidebar/AppSidebar";
import AppDrawer from "../../components/AppDrawer";
import Ticket from "../../components/Ticket/Ticket";
import { useEffect, useState } from "react";

import { TASK_MANAGEMENT } from "../../constants/api";
import DndBoard from "../../components/DnD/DndBoard";

import response from "./data.js";
import Board from "../../components/ReactDnd/Board";
import { resetServerContext } from "react-beautiful-dnd";

const StatusType = {
  New: "New",
  Active: "Active",
  Done: "Done",
};

function TestJiraClone() {
  let New = [];
  let Active = [];
  let Done = [];
  response.forEach((item, index) => {
    if (item.Status === StatusType.New) New.push(item);

    if (item.Status === StatusType.Active) Active.push(item);
    if (item.Status === StatusType.Done) Done.push(item);
  });
  const isCombineEnabled = false;
  const initial = {
    New: [...New],
    Active: [...Active],
    Done: [...Done],
  };

  return (
    <div className="w-[1000px]">
      <Board initial={initial} />
    </div>
  );
}

export default function Test() {
  const [tasksNew, setTasksNew] = useState([]);
  const [tasksActive, setTasksActive] = useState([]);
  const [tasksDone, setTasksDone] = useState([]);
  const [pbis, setPbis] = useState([]);

  const responseAddOrder = response.map((item, index) => {
    return { ...item, order: index + 1 };
  });
  return (
    <div className="w-screen h-screen flex justify-start bg-fuchsia-100">
      <AppSidebar />
      {/* <AppDrawer className="" /> */}
      <section
        className=" text-black text-lg font-semibold flex-auto bg-fuchsia-300
             ml-4 p-4 h-[100%] overflow-scroll overflow-x-hidden"
      >
        <DndBoard ticketLists={responseAddOrder} StatusType={StatusType} />
      </section>
    </div>
  );
}

export async function getServerSideProps(context) {
  resetServerContext();
  return {
    props: {}, // will be passed to the page component as props
  };
}
