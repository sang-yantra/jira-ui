import React, { useEffect, useRef, useState } from "react";
import Pusher from "pusher-js";
import { CHATS_MANAGEMENT_ACTIONS } from "../../constants/api";
function Chat() {
  const channelId = "5d6e437b-a493-4042-973a-85248b018050";
  const userId = "0c898fba-7086-449d-9d5d-463a4025a61e";
  const userName = "anup.mahato";

  const [message, setMessage] = useState("");
  const [chats, setChats] = useState();
  const chatref = useRef();

  useEffect(() => {
    async function getChats() {
      const fetchChats = await fetch(
        CHATS_MANAGEMENT_ACTIONS.GET_CHATS(channelId)
      );
      const chats = await fetchChats.json();
      setChats(chats);
      chatref.current = chats;
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
  }, []);

  function handleSubmit() {
    const body = {
      channelId: "5d6e437b-a493-4042-973a-85248b018050",
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
    <section className="m-auto h-full w-[80%] overflow-y-auto rounded-md bg-zinc-800 p-3 text-white">
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
                <div className="user_avatar h-[50px] w-[50px] rounded-full bg-white text-center text-black">
                  {chat.userName.substring(0, 2)}
                </div>
                <div className="user_message rounded-lg bg-gray-700 p-2">
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
