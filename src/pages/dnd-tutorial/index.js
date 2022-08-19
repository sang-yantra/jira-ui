import React, { useEffect, useState } from 'react'
import { DragDropContext, Droppable, Draggable, resetServerContext } from 'react-beautiful-dnd';
import { v4 as uuid } from "uuid"
import Ticket from '../../components/Ticket/Ticket';
import { TASK_MANAGEMENT } from '../../constants/api';
import response from '../test/data';

const responseFormatter = (reponse) => {
    let responseObj = {}
    response.forEach(item => {
        if (responseObj[item.Status]) {
            responseObj[item.Status]["items"] = [...responseObj[item.Status]["items"], item]
        }
        else {
            responseObj[item.Status] = { items: [{ ...item }] }
        }
    })
    console.log(responseObj)
    return responseObj
}

/**
 * For ordering of the status type
 */
const StatusType = {
    New: "New",
    Active: "Active",
    Done: "Done"
}

function DndTutorial() {
    const [columns, setColumns] = useState({})
    useEffect(() => {
        const abortController = new AbortController();

        const fetchTasks = async () => {
            await fetch(TASK_MANAGEMENT.TASKS)
                .then(res => res.json())
                .then(response => {
                    let responseObj = {}
                    response.forEach(item => {
                        if (responseObj[item.Status]) {
                            responseObj[item.Status]["items"] = [...responseObj[item.Status]["items"], item]
                        }
                        else {
                            responseObj[item.Status] = { items: [{ ...item }] }
                        }
                    })
                    setColumns(responseObj)
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
    const onDragHandle = (result, columns, setColumns) => {
        if (!result.destination) return;
        const { source, destination } = result;

        if (source.droppableId !== destination.droppableId) {
            debugger;
            const sourceCol = columns[source.droppableId]
            const destiCol = columns[destination.droppableId]
            const sourceColUpdate = [...sourceCol.items]
            const destiColUpdate = [...destiCol.items]

            ///delete  item from source column
            const [removed] = sourceColUpdate.splice(source.index, 1)

            /// insert item into the destination column
            removed.Status = destination.droppableId
            destiColUpdate.splice(destination.index, 0, removed)

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...sourceCol,
                    items: sourceColUpdate
                },
                [destination.droppableId]: {
                    ...destiCol,
                    items: destiColUpdate
                }
            })

        } else {

            const column = columns[source.droppableId]
            const copiedItems = [...column.items]
            const [removed] = copiedItems.splice(source.index, 1)
            copiedItems.splice(destination.index, 0, removed)

            setColumns({
                ...columns,
                [source.droppableId]: {
                    ...column,
                    items: copiedItems
                }
            })
        }
    }
    return (
        <div className='flex justify-center h-[100%] gap-1'>
            <DragDropContext onDragEnd={result => onDragHandle(result, columns, setColumns)}>
                {Object.keys(StatusType).map((key, index) => {
                    const column = columns[key]
                    return (
                        <DropList key={StatusType[key]} id={StatusType[key]} column={column} columnName={key} />
                    )
                })}
            </DragDropContext>
        </div>
    )
}

const DropList = ({ id, column, columnName }) => {
    return (<Droppable droppableId={id}
        className=' border-2 border-fuchsia-600'
    >
        {(provided, snapshot) => {
            return (
                <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    // className={`${snapshot.isDraggingOver ? 'bg-blue-500' : 'bg-slate-400'}
                    //p-1 w-[250px] min-h-[500px]`}
                    className='border-2 border-fuchsia-900 ml-2 min-h-[inherit] h-auto p-2'
                >
                    <h4>{columnName}</h4>
                    {column?.items.map((item, index) => {
                        return (<DragItem key={item.Id} item={item} index={index} />)
                    })}
                    {provided.placeholder}
                </div>
            )
        }}
    </Droppable>)
}

const DragItem = ({ item, index }) => {
    return (
        <Draggable draggableId={item.Id.toString()} index={index}>
            {(dragProvided, snapshot) => {
                return (
                    <div
                        ref={dragProvided.innerRef}
                        {...dragProvided.draggableProps}
                        {...dragProvided.dragHandleProps}
                        style={{ ...dragProvided.draggableProps.style }}
                    >
                        <Ticket
                            Title={item.Title}
                            Completed={item.Completed}
                            Original_Estimate={item.Original_Estimate}
                            Status={item.Status}
                            isDragging={snapshot.isDragging}
                        />
                    </div>
                )
            }}
        </Draggable>
    )
}

export async function getServerSideProps(context) {
    resetServerContext();
    return {
        props: {}, // will be passed to the page component as props
    };
}
export default DndTutorial;