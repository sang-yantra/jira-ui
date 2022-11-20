import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { CHATS_MANAGEMENT_ACTIONS } from "../../constants/api";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpened, getSidebarOpened } from "@/store/reducers/sideBarReducer";
import AppSidebar from "../../components/AppSidebar/AppSidebar";
import Image from "next/image";
import Channels from "@/views/Messages/Channels/Channels";
import Chats from "@/views/Messages/Chats/Chats";
import dynamic from "next/dynamic";
import { GiConsoleController } from "react-icons/gi";
import { flushSync } from "react-dom";
import { getUser } from "@/store/reducers/userReducer";

function Chat() {
  const open = useSelector(getSidebarOpened);
  const dispatchSideBar = useDispatch();
  if (open) {
    dispatchSideBar(setIsOpened());
  }
  const { userid, username, email, avatar } = useSelector(getUser);
  const [rooms, setRooms] = useState([]);
  const [roomId, setRoomId] = useState();

  useEffect(() => {
    fetch(
      CHATS_MANAGEMENT_ACTIONS.ROOMS +
        "?" +
        new URLSearchParams({
          UserId: userid,
          Email: email,
        })
    )
      .then((res) => res.json())
      .then((res) => {
        setRooms(res);
        if (res.length > 0) {
          setRoomId(res[0].id);
        }
      });
  }, []);

  return (
    <div className="flex h-screen w-screen justify-start bg-fuchsia-100 text-black">
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
                  <Channels
                    key={room.id}
                    id={room.id}
                    users={room.users}
                    updatedDatetime={room.updatedDatetime}
                    title={roomTitleTrim}
                    setRoomId={setRoomId}
                  />
                );
              })}
          </ul>
        </div>
        {roomId && (
          <div className=" flex-[0.8]">
            <Messages
              channelId={roomId}
              userid={userid}
              username={username}
              email={email}
              avatar={avatar}
            />
          </div>
        )}
      </section>
    </div>
  );
}

function Messages({ channelId, userid, username, email, avatar }) {
  // const channelId = "5d6e437b-a493-4042-973a-85248b018050";
  const queryparams =
    "?UserId=0c898fba-7086-449d-9d5d-463a4025a61e&Email=anupmahato033%40gmail.com";
  const [message, setMessage] = useState("");
  const [chats, setChats] = useState();
  const chatref = useRef();
  const chatListDomRef = useRef();
  const chatInputRef = useRef();
  const chatBreakfRef = useRef();

  useEffect(() => {
    async function getChats() {
      const fetchChats = await fetch(
        CHATS_MANAGEMENT_ACTIONS.GET_CHATS(channelId)
      );
      const chats = await fetchChats.json();
      console.log("chats", chats);
      flushSync(() => {
        setChats([...chats]);
      });
      /// dealing with refs
      if (chatListDomRef.current.lastElementChild) {
        chatListDomRef.current.lastElementChild.scrollIntoView();
        chatInputRef.current.focus();
      }
      chatref.current = [...chats];
    }

    getChats();
    Pusher.logToConsole = true;
    var pusher = new Pusher("c5fb0254ec7c19210ac1", {
      cluster: "ap2",
    });
    var channel = pusher.subscribe(channelId);
    channel.bind("my-event", (data) => {
      if (data.userName !== username) {
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
      senderId: userid,
      senderUsername: username,
      senderAvatar:
        avatar ||
        "https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/792.jpg",
    };
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
        console.log(chatListDomRef.current);
        chatBreakfRef.current.scrollIntoView();
        // if (chatListDomRef.current.lastElementChild) {
        //   debugger;
        //   chatListDomRef.current.lastElementChild.scrollIntoView({
        //     behavior: "smooth",
        //     block: "nearest",
        //     inline: "start",
        //   });
        //   chatInputRef.current.focus();
        // }
      });
  }

  return (
    <section className="m-auto flex h-full w-full flex-col justify-end overflow-y-auto rounded-md p-3 text-black">
      <ul
        id="chats"
        className="chats flex flex-col gap-2 overflow-y-auto "
        ref={chatListDomRef}
      >
        {chats &&
          chats.map((chat) => {
            return (
              <Chats
                key={chat.id}
                id={chat.id}
                userName={chat.userName}
                avatar={chat.avatar}
                createdDatetime={chat.createdDatetime}
                message={chat.message}
              />
            );
          })}
      </ul>
      <br ref={chatBreakfRef} />
      <form>
        <input
          ref={chatInputRef}
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
      </form>
    </section>
  );
}

export default dynamic(() => Promise.resolve(Chat), {
  ssr: false,
});
