import Head from "next/head";
import Image from "next/image";
import { useTheme } from "next-themes";
import { useSelector, useDispatch } from "react-redux";
import {
  increment,
  decrement,
  selectCounter,
} from "@/store/reducers/counterReducer";

import { Dropdown } from "flowbite-react";
import AppSidebar from "../components/AppSidebar/AppSidebar";
import AppDrawer from "../components/AppDrawer";
import { useEffect, useState } from "react";

import { TASK_MANAGEMENT } from "../constants/api";
import TeamsGrid from "../views/home/TeamsGrid";

export default function Home() {
  const [team, setTeam] = useState("");
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen w-screen justify-start gap-5 bg-fuchsia-200">
      <AppSidebar />
    </div>
  );
}
