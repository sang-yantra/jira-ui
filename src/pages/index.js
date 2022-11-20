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

import { TEAMS_MANAGEMENT_ACTIONS, TEAMS_MANAGEMENT } from "../constants/api";
import { TEAMS_ASSETS } from "../constants/assets/teams";

import TeamsGrid from "../views/home/TeamsGrid";
import {
  QueryClient,
  QueryClientProvider,
  useQuery,
} from "@tanstack/react-query";

import httprequest from "@/utils/client/axios";
import { getUser, setUser } from "@/store/reducers/userReducer";
import TeamCard from "@/components/TeamCard";
import { useRouter } from "next/router";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
    },
  },
});
export default function Home() {
  const { userid } = useSelector(getUser);
  const router = useRouter();

  return (
    <div className="flex h-screen w-screen justify-start gap-5">
      <AppSidebar />
      <QueryClientProvider client={queryClient}>
        <Overview />
      </QueryClientProvider>
    </div>
  );
}

const fetchTeams = async () => {
  return await fetch(TEAMS_MANAGEMENT_ACTIONS.TEAMS, {
    credentials: "include",
  })
    .then((res) => res.json())
    .then((response) => response);
};
const Overview = () => {
  const { data, isLoading } = useQuery(["teams"], () => fetchTeams());

  if (isLoading) {
    return <h1>Loading...</h1>;
  } else {
    const teams = TeamsApiMapper(data);
    return (
      <>
        <section className="body-font w-full overflow-y-auto text-gray-600">
          <div className="container mx-auto px-5 py-10">
            <div className="-m-4 flex flex-wrap gap-4">
              {teams?.map((team, index) => {
                return (
                  <TeamCard
                    key={team.Id}
                    Name={team.Name}
                    Description={team.Description}
                    Teams_Photo={team.Teams_Photo}
                  ></TeamCard>
                );
              })}
            </div>
          </div>
        </section>
      </>
    );
  }
};

const TeamTile = ({ Name, Description, Teams_Photo }) => {
  return (
    <div className="h-[450px] p-2 md:w-1/3">
      <div className="h-full overflow-hidden rounded-lg border-2 border-fuchsia-600 border-opacity-60">
        <div className="rea w-full p-2">
          <Image
            // src={`data:image/png;base64,${Teams_Photo}`}
            src={Teams_Photo}
            alt="team photo"
            width={450}
            height={250}
            className="rounded-md"
          />
          <h2 className="title-font mb-1 text-lg font-medium">{Name}</h2>
          <p className="mb-1 leading-relaxed">{Description}</p>
        </div>
      </div>
    </div>
  );
};

const TeamsApiMapper = (teams) => {
  var teamsMapper = teams?.map((team) => {
    return {
      Id: team.id,
      Name: team.name,
      Description:
        team.description.length > 50
          ? team.description.substring(0, 100) + "..."
          : team.description,
      Teams_Photo: TEAMS_ASSETS.RELATIVE_IMG_PATH(team.imagePath),
    };
  });

  return teamsMapper;
};
