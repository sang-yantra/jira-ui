import React from "react";
import Channels from "./Channels/Channels";
import Chats from "./Chats/Chats";
import Details from "./Details/Details";
import Friends from "./Friends/Friends";

function Messages() {
  return (
    <main className="flex w-full flex-col flex-wrap lg:flex-row">
      <section className="flex flex-[20%] gap-5 bg-fuchsia-200 lg:flex-col">
        <Channels />
        <Friends />
      </section>

      <section className="flex-[80%] border-2">
        <Chats />
      </section>

      {/* <section>
        <Details />
      </section> */}
    </main>
  );
}

export default Messages;
