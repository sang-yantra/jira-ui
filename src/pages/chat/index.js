import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { CHATS_MANAGEMENT_ACTIONS } from "../../constants/api";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpened, getSidebarOpened } from "@/store/reducers/sideBarReducer";
import AppSidebar from "../../components/AppSidebar/AppSidebar";
import Image from "next/image";

function Chat() {
  const open = useSelector(getSidebarOpened);
  const dispatchSideBar = useDispatch();
  if (open) {
    dispatchSideBar(setIsOpened());
  }
  const queryparams =
    "?UserId=0c898fba-7086-449d-9d5d-463a4025a61e&Email=anupmahato033%40gmail.com";
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    fetch(CHATS_MANAGEMENT_ACTIONS.ROOMS + queryparams)
      .then((res) => res.json())
      .then((res) => {
        setRooms(res);
        if (res.length > 0) {
          setRoomId(res[0].id);
        }
      });
  }, []);

  return (
    <div className="flex h-screen w-screen justify-start bg-fuchsia-200 text-black">
      <AppSidebar />
      <section className="flex h-full flex-grow">
        <div className=" flex flex-[0.2] flex-col border-r-2 shadow-xl shadow-fuchsia-500/40 ">
          <h2 className="mt-2 mb-2 text-center font-extrabold text-fuchsia-900 ">
            ROOMS
          </h2>
          <ul>
            {rooms &&
              rooms.map((room) => {
                const roomTitleTrim =
                  room.title.length > 10
                    ? room.title.substring(0, 30) + "..."
                    : room.title;
                return (
                  <li
                    key={room.id}
                    className="mb-2 w-full rounded-lg bg-fuchsia-300 shadow-md shadow-fuchsia-400/40
                     hover:cursor-pointer"
                    onClick={() => {
                      console.log(room.id);
                      setRoomId(room.id);
                    }}
                  >
                    <div className="flex items-center gap-2 p-2">
                      <Image
                        width={50}
                        height={50}
                        className="rounded-full"
                        src={room.users[0].avatar}
                        alt="avatar"
                      />
                      <div>
                        <h6 className=" flex-grow text-[12px] font-medium">
                          {new Date(room.updatedDatetime).toLocaleString()}
                        </h6>
                        <h4>{roomTitleTrim}</h4>
                      </div>
                    </div>
                  </li>
                );
              })}
          </ul>
        </div>
        {roomId && (
          <div className=" flex-[0.8]">
            <Messages channelId={roomId} />
          </div>
        )}
      </section>
    </div>
  );
}

function Messages({ channelId }) {
  console.log("messages");
  debugger;
  // const channelId = "5d6e437b-a493-4042-973a-85248b018050";
  const userId = "0c898fba-7086-449d-9d5d-463a4025a61e";
  const userName = "anup.mahato";
  const queryparams =
    "?UserId=0c898fba-7086-449d-9d5d-463a4025a61e&Email=anupmahato033%40gmail.com";
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState();
  const chatref = useRef();

  useEffect(() => {
    async function getChats() {
      const fetchChats = await fetch(
        CHATS_MANAGEMENT_ACTIONS.GET_CHATS(channelId)
      );
      const chats = await fetchChats.json();
      setChats([...chats]);
      chatref.current = [...chats];
    }

    getChats();
    Pusher.logToConsole = true;
    var pusher = new Pusher("c5fb0254ec7c19210ac1", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe(channelId);
    let chatsrefernce = chats;
    channel.bind("my-event", (data) => {
      if (data.userName !== userName) {
        const chatsUpdated = [...chatref.current, data];
        setChats(chatsUpdated);
        chatref.current = chatsUpdated;
      }
    });

    return () => {
      pusher.disconnect();
    };
  }, [channelId]);

  function handleSubmit() {
    const body = {
      channelId: channelId,
      event: "my-event",
      message: message,
      senderId: userId,
      senderUsername: userName,
    };
    const url = CHATS_MANAGEMENT_ACTIONS.SEND_CHAT;
    fetch(CHATS_MANAGEMENT_ACTIONS.SEND_CHAT, {
      method: "POST",
      headers: {
        Accept: "text/plain",
        "Content-Type": "application/json",
      },
      body: JSON.stringify(body),
    })
      .then((res) => res.json())
      .then((res) => {
        const chatsUpdated = [...chatref.current, res];
        setChats(chatsUpdated);
        chatref.current = chatsUpdated;
        setMessage("");
      });
  }
  return (
    <section className="m-auto h-full w-full overflow-y-auto rounded-md p-3 text-black">
      <ul className="chats flex flex-col gap-2">
        {chats &&
          chats.map((chat) => {
            return (
              <li
                key={chat.id}
                className={`flex items-center gap-2 p-2${
                  chat.userName === userName ? " justify-end" : "justify-start"
                }
                
                `}
              >
                <Image
                  className="user_avatar rounded-full"
                  src={chat.avatar}
                  alt="avatar"
                  width={50}
                  height={50}
                />
                <div className="user_message max-w-[50%] rounded-lg bg-fuchsia-100 p-2">
                  <h3>
                    {chat.userName}&nbsp;&nbsp;&nbsp;
                    {new Date(chat.createdDatetime).toLocaleTimeString()}{" "}
                  </h3>
                  {chat.message}
                </div>
              </li>
            );
          })}
      </ul>
      <input
        className=" sticky m-auto mb-0 w-[80%] text-black"
        type={"text"}
        onChange={(e) => setMessage(e.target.value)}
        value={message}
      />
      <button
        onClick={() => handleSubmit()}
        type="button"
        className="mr-2 mb-2 rounded-full bg-blue-700 px-5 py-2.5 text-center text-sm font-medium text-white
         hover:bg-blue-800 focus:outline-none focus:ring-4 focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
      >
        Send
      </button>
    </section>
  );
}

export default Chat;
