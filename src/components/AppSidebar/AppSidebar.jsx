import { useState } from "react";
import { Sidebar } from "flowbite-react";
import React from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { IoLogoXbox } from "react-icons/io";
import { MdDoubleArrow } from "react-icons/md";
import {
  FaPhoenixSquadron,
  FaHome,
  FaIndustry,
  FaChalkboardTeacher,
  FaFacebookMessenger,
  FaSlideshare,
} from "react-icons/fa";
import Link from "next/link";

import { useSelector, useDispatch } from "react-redux";
import { setIsOpened, getSidebarOpened } from "@/store/reducers/sideBarReducer";

function AppSidebar() {
  ///const [open, setOpen] = useState(true);
  const open = useSelector(getSidebarOpened);
  const dispatchSideBar = useDispatch();

  return (
    <div
      className={`h-screen bg-fuchsia-800 p-5 pt-8 shadow-lg ${
        open ? "w-72" : "w-20"
      } relative duration-300`}
    >
      <MdDoubleArrow
        className={`absolute -right-3 top-9 cursor-pointer rounded-full bg-white text-3xl text-fuchsia-900
        ${open && "rotate-180"}
        `}
        onClick={() => dispatchSideBar(setIsOpened())}
      />
      <div className="inline-flex">
        <FaPhoenixSquadron
          className={`block cursor-pointer rounded bg-fuchsia-800 text-4xl text-red-500 duration-500
          ${!open && "rotate-[360deg]"}
        `}
        />
        <h2
          className={`logo origin-left text-3xl font-bold text-white duration-300 ${
            !open && "scale-0"
          }`}
        >
          JIRA
        </h2>
      </div>
      <div className="space-y-3 font-semibold text-white">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="h-5 w-5 dark:dark:text-gray-400"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full rounded-md py-2 pl-10 text-sm focus:outline-none dark:dark:border-transparent dark:dark:bg-gray-800 dark:dark:text-gray-100 focus:dark:dark:bg-gray-900"
          />
        </div>
        <div className="flex h-[80%] flex-col justify-around">
          <div className="">
            <ul className="space-y-1 pt-2 pb-4 text-lg">
              <SidebarItem
                Icon={FaHome}
                itemName={"Overview"}
                path={""}
                color={"text-cyan-500"}
                open={open}
              />
              <SidebarItem
                Icon={FaIndustry}
                itemName={"Backlog"}
                path={"backlog"}
                color={"text-green-300"}
                open={open}
              />
              <SidebarItem
                Icon={FaChalkboardTeacher}
                itemName={"Boards"}
                path={"board/tasks"}
                color={"text-red-300"}
                open={open}
              />
              <SidebarItem
                Icon={FaFacebookMessenger}
                itemName={"Chat"}
                path={"chat"}
                color={"text-pink-600"}
                open={open}
              />
              <SidebarItem
                Icon={FaSlideshare}
                itemName={"Blog"}
                path={"blog"}
                color={"text-yellow-300"}
                open={open}
              />
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 text-xl text-white">
        <div className="mt-12 flex items-center space-x-4 justify-self-end p-2">
          <div>
            <h2 className="text-lg font-semibold">Leroy Jenkins</h2>
            <span className="flex items-center space-x-1">
              <a
                rel="noopener noreferrer"
                href="#"
                className="text-xs hover:underline dark:dark:text-gray-400"
              >
                View profile
              </a>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}

const SidebarItem = ({ Icon, itemName, path, color, open }) => {
  return (
    <li className="rounded-md hover:bg-fuchsia-600">
      <Link href={`/${path}`}>
        <a
          rel="noopener noreferrer"
          href="#"
          className="flex justify-start rounded-md p-2"
        >
          <Icon className={`${color} text-2xl`} />
          <span className={`${!open && "hidden"} ml-3`}>{itemName}</span>
        </a>
      </Link>
    </li>
  );
};

export default AppSidebar;
