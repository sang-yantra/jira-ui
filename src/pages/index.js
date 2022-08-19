import Head from 'next/head'
import Image from 'next/image'
import { useTheme } from "next-themes"

import { Dropdown } from "flowbite-react";
import AppSidebar from '../components/AppSidebar/AppSidebar';
import AppDrawer from '../components/AppDrawer';
import { useEffect, useState } from 'react';

import { TASK_MANAGEMENT } from '../constants/api';
import TeamsGrid from '../views/home/TeamsGrid';

export default function Home() {

  const [team, setTeam] = useState('')


  return (
    <div className="w-screen h-screen flex justify-start gap-5 bg-fuchsia-200">
      <AppSidebar />
      {/* <AppDrawer className="" /> */}
      <div className=''>
        <TeamsGrid />
      </div>
    </div>
  )
}






