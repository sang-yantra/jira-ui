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

function AppSidebar() {
  const [open, setOpen] = useState(true);

  return (
    <div
      className={`bg-fuchsia-800 shadow-lg h-screen p-5 pt-8 ${
        open ? "w-72" : "w-20"
      } relative duration-300`}
    >
      <MdDoubleArrow
        className={`bg-white text-fuchsia-900 rounded-full text-3xl absolute -right-3 top-9 cursor-pointer
        ${open && "rotate-180"}
        `}
        onClick={() => setOpen(!open)}
      />
      <div className="inline-flex">
        <FaPhoenixSquadron
          className={`bg-fuchsia-800 text-red-500 text-4xl rounded cursor-pointer block duration-500
          ${!open && "rotate-[360deg]"}
        `}
        />
        <h2
          className={`logo text-white text-3xl origin-left font-bold duration-300 ${
            !open && "scale-0"
          }`}
        >
          JIRA
        </h2>
      </div>
      <div className="space-y-3 text-white font-semibold">
        <div className="relative">
          <span className="absolute inset-y-0 left-0 flex items-center py-4">
            <button type="submit" className="p-2 focus:outline-none focus:ring">
              <svg
                fill="currentColor"
                viewBox="0 0 512 512"
                className="w-5 h-5 dark:dark:text-gray-400"
              >
                <path d="M479.6,399.716l-81.084-81.084-62.368-25.767A175.014,175.014,0,0,0,368,192c0-97.047-78.953-176-176-176S16,94.953,16,192,94.953,368,192,368a175.034,175.034,0,0,0,101.619-32.377l25.7,62.2L400.4,478.911a56,56,0,1,0,79.2-79.195ZM48,192c0-79.4,64.6-144,144-144s144,64.6,144,144S271.4,336,192,336,48,271.4,48,192ZM456.971,456.284a24.028,24.028,0,0,1-33.942,0l-76.572-76.572-23.894-57.835L380.4,345.771l76.573,76.572A24.028,24.028,0,0,1,456.971,456.284Z"></path>
              </svg>
            </button>
          </span>
          <input
            type="search"
            name="Search"
            placeholder="Search..."
            className="w-full py-2 pl-10 text-sm dark:dark:border-transparent rounded-md focus:outline-none dark:dark:bg-gray-800 dark:dark:text-gray-100 focus:dark:dark:bg-gray-900"
          />
        </div>
        <div className="h-[80%] flex flex-col justify-around">
          <div className="">
            <ul className="pt-2 pb-4 space-y-1 text-lg">
              <SidebarItem
                Icon={FaHome}
                itemName={"Overview"}
                color={"text-cyan-500"}
                open={open}
              />
              <SidebarItem
                Icon={FaIndustry}
                itemName={"Backlog"}
                color={"text-green-300"}
                open={open}
              />
              <SidebarItem
                Icon={FaChalkboardTeacher}
                itemName={"Boards"}
                color={"text-red-300"}
                open={open}
              />
              <SidebarItem
                Icon={FaFacebookMessenger}
                itemName={"Messages"}
                color={"text-pink-600"}
                open={open}
              />
              <SidebarItem
                Icon={FaSlideshare}
                itemName={"Blog"}
                color={"text-yellow-300"}
                open={open}
              />
            </ul>
          </div>
        </div>
      </div>
      <div className="absolute bottom-1 text-xl text-white">
        <div className="flex items-center p-2 mt-12 space-x-4 justify-self-end">
          <img
            src="https://source.unsplash.com/100x100/?portrait"
            alt=""
            className="w-12 h-12 rounded-lg dark:dark:bg-gray-500"
          />
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

const SidebarItem = ({ Icon, itemName, color, open }) => {
  return (
    <li className="rounded-md hover:bg-fuchsia-600">
      <a
        rel="noopener noreferrer"
        href="#"
        className="flex justify-start p-2 rounded-md"
      >
        <Icon className={`${color} text-2xl`} />
        <span className={`${!open && "hidden"} ml-3`}>{itemName}</span>
      </a>
    </li>
  );
};

export default AppSidebar;
