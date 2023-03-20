import React from 'react'
import { Draggable } from 'react-beautiful-dnd';
import styles from './styles/TaskCard.module.css'



function TaskCard({item, index}) {
    // console.log("dvsvsd",item, index)
    return (
        <Draggable key={item.id} draggableId={item.id} index={index}>
            {(provided) => (
                <div
                    ref={provided.innerRef}
                    {...provided.draggableProps}
                    {...provided.dragHandleProps}
                >
                    <div className={styles.card}>
                        <p className={styles.title}>{item.title}</p>
                        <p className={styles.description}>{item.description}</p>
                    </div>
                </div>
            )}
            
        </Draggable>
    )
}

export default TaskCard
