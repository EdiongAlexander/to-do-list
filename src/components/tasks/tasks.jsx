import React from "react";
import './tasks.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from "react";

export default function Tasks({ data, deleteTask }) {
    const [taskRoll, updateTaskRoll] = useState(data)
    const [taskSwap, updateTaskSwap] = useState([])

    const handleOnDragEnd = (result) => {
        if (!result.destination) return;

        if (
            result.destination.droppableId === result.source.droppableId && result.destination.index === result.source.index
        ) {
            return;
        }

        const start = result.source.droppableId
        const finish = result.destination.droppableId
        console.log("start:", start)
        console.log("finish:", finish)


        if (start === finish) {
            if (start === "tasket") {

                const items = Array.from(data);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);

                updateTaskRoll(items)
                console.log(taskRoll)
            } else {
                const items = Array.from(taskSwap);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);

                updateTaskSwap(items)
            }
        }


        if (start !== finish) {
            const items = Array.from(taskRoll)
            const splity = Array.from(taskSwap)

            if (finish === "tasketer") {
                const [extractedItem] = items.splice(result.source.index, 1);
                splity.splice(result.destination.index, 0, extractedItem);

            } else {
                const [extractedItem] = splity.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, extractedItem);
            }


            updateTaskRoll(items)
            updateTaskSwap(splity)

        }

    }

    return (
        <div className="tasker">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="container">
                    <Droppable droppableId="tasket">
                        {(provided) => {
                            return (
                                <div className="weekly box" {...provided.droppableProps} ref={provided.innerRef}>
                                    <h3>Weekly Tasks</h3>
                                    <div className="scroll">
                                    {data.map(({ id, name, time_created, scrumgoalhistory_set }, index) => {
                                        return (
                                            <Draggable key={id} draggableId={id} index={index}>
                                                {(provided) => {
                                                    return (
                                                        <>
                                                            <p className="task" onClick={() => { deleteTask(id) }} {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>
                                                                
                                                                {name}

                                                                <div id="time">Created: {time_created.slice(0, 10)} at {time_created.slice(12, 16)}</div>

                                                                <div className="blue">
                                                                    {scrumgoalhistory_set.map(({id, done_by}) => {
                                                                        return(
                                                                            <p key={id}>{done_by}</p>
                                                                        )
                                                                    })}
                                                                </div>

                                                            </p>
                                                            {provided.placeholder}
                                                        </>
                                                    )
                                                }}

                                            </Draggable>
                                        )
                                    })}
                                    </div>
                                    {provided.placeholder}
                                </div>
                            )
                        }}

                    </Droppable>

                    <Droppable droppableId="tasketer">
                        {(provided) => (
                            <div className="daily box" {...provided.droppableProps} ref={provided.innerRef}>
                                <h3>Daily Target</h3>
                                {taskSwap.map(({ id, item }, index) => {
                                    return (
                                        <Draggable key={id} draggableId={id} index={index}>
                                            {(provided) => {
                                                return (
                                                    <>
                                                        <p className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef} >{item}</p>
                                                        {provided.placeholder}
                                                    </>
                                                )
                                            }}
                                        </Draggable>

                                    )
                                })}
                                {provided.placeholder}
                            </div>

                        )
                        }
                        {/* {taskRoll.map(({ id, item }, index) => {
                            return (
                                <Draggable key={id} draggableId={id} index={index}>
                                    {(provided) => {
                                        return (
                                            <>
                                                <p className="task" {...provided.draggableProps} {...provided.dragHandleProps} ref={provided.innerRef}>{item}</p>
                                                {provided.placeholder}
                                            </>
                                        )
                                    }}

                                </Draggable>
                            )
                        })} */}
                        {/* check here incase of further error */}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}
