import React from "react";
import taskList from "../../static/tasks";
import './tasks.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from "react";

export default function Tasks() {
    const [taskRoll, updateTaskRoll] = useState(taskList)
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

        if (start === finish) {
            if (start === "tasket"){

                const items = Array.from(taskRoll);
                const [reorderedItem] = items.splice(result.source.index, 1);
                items.splice(result.destination.index, 0, reorderedItem);
    
                updateTaskRoll(items)
            }else{
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

            }else{
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
                                    {taskRoll.map(({ id, item }, index) => {
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
                                    })}
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
