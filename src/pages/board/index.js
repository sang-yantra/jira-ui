import Head from 'next/head'
import Image from 'next/image'
import { useTheme } from "next-themes"

import { Dropdown } from "flowbite-react";
import AppSidebar from '../../components/AppSidebar/AppSidebar';
import AppDrawer from '../../components/AppDrawer';
import Ticket from '../../components/Ticket/Ticket';
import { useEffect, useState } from 'react';

import { TASK_MANAGEMENT } from '../../constants/api';
import DndBoard from '../../components/DnD/DndBoard';

export default function Board() {

    const [allTasks, setallTasks] = useState([])
    const [pbis, setPbis] = useState([])
    console.log("Base url", process.env.BASE_URL)

    useEffect(() => {
        const abortController = new AbortController();

        const fetchTasks = async () => {
            await fetch(TASK_MANAGEMENT.TASKS)
                .then(res => res.json())
                .then(response => {
                    const pbiFormArr = {}
                    response.forEach(task => {
                        /// load pbi
                        const pbiId = task.Pbi[0].Id

                        if (pbiFormArr[pbiId]) {
                            pbiFormArr[pbiId] = {
                                ...pbiFormArr[pbiId],
                                Tasks: [...pbiFormArr[pbiId].Tasks, task]
                            }
                        }
                        else {
                            pbiFormArr[pbiId] = {
                                Pbi: task.Pbi[0],
                                Tasks: [{ ...task }]
                            }
                        }

                    });
                    setPbis(pbiFormArr)
                    console.log("pbis", pbiFormArr)
                })
                .catch(error => {
                    console.log(error)
                    //// abort controller signal aborted
                })
        }

        fetchTasks();

        return () => {
            abortController.abort()
        }
    }, [])

    return (
        <div className="w-screen h-screen flex justify-start bg-fuchsia-100">
            <AppSidebar />
            {/* <AppDrawer className="" /> */}
            <section className=' text-black text-lg font-semibold flex-auto bg-fuchsia-100
             ml-4 p-4 h-[100%] overflow-scroll overflow-x-hidden'>
                {
                    pbis && Object.keys(pbis).map((key, index) => {
                        return (<div key={index}
                            className='flex justify-start'
                        >
                            <div className='flex-[0.25]'>
                                <Ticket
                                    Title={pbis[key].Pbi.Title}
                                />
                            </div>
                            <DndBoard responseCols={pbis[key].Tasks} />
                        </div>
                        )
                    })
                }

            </section>
        </div>
    )
}

const PbiContainer = (props) => {
    return <div className=' flex-[0.25] border-2 border-fuchsia-900 ml-2 min-h-[inherit] h-auto p-2'>
        <Ticket key={props.Id} Title={props.Title} Completed={props.Completed}
            Original_Estimate={props.Original_Estimate}
            Assigned_To={props.Assigned_To}
        />
    </div>
}


const TasksContainer = (props) => {
    return <div className=' flex-[0.25] border-2 border-fuchsia-900 ml-2 min-h-[inherit] h-auto p-2'>
        {
            props.Tasks?.map(task => {
                console.log(task)
                return <Ticket key={task.Id} Title={task.Title} Completed={task.Completed}
                    Original_Estimate={task.Original_Estimate}
                    Assigned_To={task.Assigned_To}
                    Status={task.Status}
                />
            })
        }

    </div>
}


