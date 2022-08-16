import React from 'react'
import { FaClipboardList, FaClipboardCheck } from "react-icons/fa"


function Test() {
    const title = "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum."
    return (
        <div className=''>
            <TicketComp Title={title}
                Completed={5}
                Original_Estimate={10}
                Assigned_To={"Anup"}
                Status={"Done"}
            />
        </div>
    )
}

const TicketComp = ({ Title, Completed, Original_Estimate, Assigned_To, Status }) => {
    const statusColor = {
        New: 'bg-lime-300',
        Active: 'bg-yellow-300',
        Done: 'bg-green-300'
    }
    return <div className={`w-[250px] min-h-[150px] p-3 m-auto mt-7 text-black font-medium rounded-md
    ${statusColor[Status]}
    `}>

        <FaClipboardCheck className='inline-block text-lg text-blue-500' />
        <span className='ml-3'>{Title.substring(0, 50)}
            {Title.length > 50 ? "..." : ""}
        </span>
        <div className='ticket-container first-letter:'>
            <h3>{Completed}/{Original_Estimate}</h3>

        </div>
    </div>

}

export default Test