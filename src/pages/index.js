import Head from 'next/head'
import Image from 'next/image'
import styles from '../styles/Home.module.css'
import { useTheme } from "next-themes"

import { Dropdown } from "flowbite-react";


export default function Home() {
  return (
    <div className="w-screen h-screen text-3xl font-bold">
      Hello !!
    </div>
  )
}
