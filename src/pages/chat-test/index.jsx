import React, { useEffect, useRef, useState } from "react";
import { setIsOpened, getSidebarOpened } from "@/store/reducers/sideBarReducer";
import { useSelector, useDispatch } from "react-redux";
import AppSidebar from "../../components/AppSidebar/AppSidebar";
import Messages from "@/views/Messages/Messages";

export default function Chat() {
  const open = useSelector(getSidebarOpened);
  const dispatchSideBar = useDispatch();
  if (open) {
    dispatchSideBar(setIsOpened());
  }
  return (
    <div className="flex h-screen w-screen justify-start bg-fuchsia-100 text-black">
      <AppSidebar />
      <Messages />
    </div>
  );
}
