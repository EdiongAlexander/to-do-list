import React from "react";
import taskList from "../../static/tasks";
import './tasks.css'
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd'
import { useState } from "react";

export default function Tasks() {
    const [taskRoll, updateTaskRoll] = useState(taskList)

    const handleOnDragEnd = result => {
        if (!result.destination) return;
        const items = Array.from(taskRoll);
        const [reorderedItem] = items.splice(result.source.index, 1);
        items.splice(result.destination.index, 0, reorderedItem);

        updateTaskRoll(items)
     }

    return (
        <div className="tasker">
            <DragDropContext onDragEnd={handleOnDragEnd}>
                <div className="container">
                    <Droppable droppableId="tasket">
                        {(provided) => {
                            return(
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
                                            )}}
                                            
                                        </Draggable>
                                    )
                                })}
                                {provided.placeholder}
                            </div>
                        )}}

                    </Droppable>

                    <Droppable droppableId="tasketer">
                        {(provided) =>(
                                <div className="daily box" {...provided.droppableProps} ref={provided.innerRef}>
                                    <h3>Daily Target</h3>
                                    {provided.placeholder} 
                                </div>  
                                
                        )
                        
                        }
                        {/* check here incase of further error */}
                    </Droppable>
                </div>
            </DragDropContext>
        </div>
    )
}
