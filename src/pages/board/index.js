import Head from 'next/head'
import Image from 'next/image'
import { useTheme } from "next-themes"

import { Dropdown } from "flowbite-react";
import AppSidebar from '../../components/AppSidebar/AppSidebar';
import AppDrawer from '../../components/AppDrawer';
import { useEffect, useState } from 'react';

import { TASK_MANAGEMENT } from '../../constants/api';

export default function Board() {

    const [tasksNew, setTasksNew] = useState([])
    const [tasksActive, setTasksActive] = useState([])
    const [tasksDone, setTasksDone] = useState([])
    const [pbis, setPbis] = useState([])
    console.log("Base url", process.env.BASE_URL)

    useEffect(() => {
        const abortController = new AbortController();

        const fetchTasks = async () => {
            await fetch(TASK_MANAGEMENT.TASKS)
                .then(res => res.json())
                .then(response => {
                    const pbiFormArr = []
                    response.forEach(task => {
                        /// load pbi
                        debugger;
                        const taskPbi = task.Pbi[0]
                        if (pbiFormArr.length === 0) {
                            pbiFormArr[0] = {
                                ...taskPbi,
                                NewTasks: [],
                                ActiveTasks: [],
                                ClosedTasks: []
                            }
                        }


                        const pbiIndex = pbiFormArr.findIndex(pbi => pbi.Id === taskPbi.Id)
                        if (pbiIndex === -1) {
                            pbiFormArr.push({
                                ...taskPbi,
                                NewTasks: [],
                                ActiveTasks: [],
                                ClosedTasks: []
                            })
                        }

                        if (task.Status === "New") {
                            pbiFormArr[pbiIndex].NewTasks.push({
                                Id: task.Id,
                                Title: task.Title,
                                Status: task.Status
                            })
                        }

                        if (task.Status === "Active") {
                            pbiFormArr[pbiIndex].ActiveTasks.push({
                                Id: task.Id,
                                Title: task.Title,
                                Status: task.Status
                            })
                        }

                        if (task.Status === "Closed") {
                            pbiFormArr[pbiIndex].ClosedTasks.push({
                                Id: task.Id,
                                Title: task.Title,
                                Status: task.Status
                            })
                        }

                        /// load new task
                        /// load active task
                        /// load done task
                    });
                    setPbis(pbiFormArr)
                    console.log("pbis", pbiFormArr)
                    console.log("response", response)
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

    const loadPbi = () => {

    }

    const loadTaskNew = () => {

    }

    const loadTaskActive = () => {

    }
    const loadTaskDone = () => {

    }
    return (
        <div className="w-screen h-screen flex justify-start bg-fuchsia-100">
            <AppSidebar />
            {/* <AppDrawer className="" /> */}
            <section className=' text-black text-lg font-semibold flex-auto bg-fuchsia-300
             ml-4 p-4 h-[100%] overflow-scroll overflow-x-hidden'>
                {
                    pbis?.map(pbi => {
                        return (<div key={pbi.Id}>

                            <div className='flex min-h-[600px] h-auto'>
                                <PbiContainer Title={pbi.Title} />
                                <TasksContainer Tasks={pbi.NewTasks} />
                                <TasksContainer Tasks={pbi.ActiveTasks} />
                                <TasksContainer Tasks={pbi.ClosedTasks} />

                            </div>
                            <hr className='w-[100%] mt-4' />
                            <br />
                        </div>
                        )
                    })
                }

            </section>
        </div>
    )
}

const PbiContainer = (props) => {
    return <div className=' flex-[0.25] border-2 ml-2 min-h-[inherit] h-auto p-2'>
        <Task Title={props.Title} />
    </div>
}


const TasksContainer = (props) => {
    return <div className=' flex-[0.25] border-2 ml-2 min-h-[inherit] h-auto p-2'>
        {
            props.Tasks?.map(task => {
                return <Task key={task.Id} Title={task.Title} />
            })
        }

    </div>
}

const Task = ({ Title }) => {
    return (<div className=' bg-violet-300 border-l-4 border-violet-900 min-h-[100px]
     p-2 rounded-sm mt-2
    '>
        {Title}
    </div>)
}

