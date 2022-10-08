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

import { TASK_MANAGEMENT, TEAMS_MANAGEMENT } from "../constants/api";
import TeamsGrid from "../views/home/TeamsGrid";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function Home() {
  const [team, setTeam] = useState("");
  const counter = useSelector(selectCounter);
  const dispatch = useDispatch();

  return (
    <div className="flex h-screen w-screen justify-start gap-5">
      <AppSidebar />
      <QueryClientProvider client={queryClient}>
        <Overview />
        {/* {console.log("component", Overview())} */}
      </QueryClientProvider>
    </div>
  );
}

const fetchTeams = async () => {
  return await fetch(TEAMS_MANAGEMENT.TEAMS)
    .then((res) => res.json())
    .then((response) => response);
};

const Overview = () => {
  const { data, isLoading } = useQuery(["teams"], () => fetchTeams());

  if (isLoading) return <h1>Loading...</h1>;
  return (
    <>
      <section className="body-font overflow-scroll text-gray-600">
        <div className="container mx-auto px-5 py-10">
          <div className="-m-4 flex flex-wrap">
            {data?.map((team, index) => {
              return (
                <TeamTile
                  key={team.Id}
                  Name={team.Name}
                  Description={team.Description}
                  Teams_Photo={team.Teams_Photo}
                ></TeamTile>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
};

const TeamTile = ({ Name, Description, Teams_Photo }) => {
  return (
    <div className="p-2 md:w-1/3">
      <div className="h-full overflow-hidden rounded-lg border-2 border-fuchsia-600 border-opacity-60">
        <div className="rea w-full p-2">
          <Image
            src={`data:image/png;base64,${Teams_Photo}`}
            alt="team photo"
            width={450}
            height={250}
            className="rounded-md"
          />
          <h2 className="title-font mb-1 text-lg font-medium text-gray-900">
            {Name}
          </h2>
          <p className="mb-1 leading-relaxed">{Description}</p>
        </div>
      </div>
    </div>
  );
};
