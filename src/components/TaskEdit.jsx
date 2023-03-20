import React, {useState, useEffect} from 'react'
import styles from './styles/TaskEdit.module.css'


function TaskEdit({data, setShowEdit}) {
    // console.log("this",{data})
    const [ description, setDescription ] = useState("")

    useEffect(() => {
        setDescription(data.description)
    }, [data])

    const handleDescriptionChange = (e) => {
        setDescription(e.target.value)
    }

    const handleClose = () => {
        setShowEdit(false)
    }
    return (
        <div className={styles.container}>
            <div className={styles.closeButton} onClick={handleClose}>X</div>
            <p className={styles.title}>{data.title}</p>
            <div className={styles.contentContainer}>
                <div className={styles.creatorBox}>
                    <p className={styles.createdBy}>Created By</p>
                    <p className={styles.creator}>{data.creator}</p>
                </div>
                <div className={styles.descriptionBox}>
                    <p className={styles.createdBy}>Description</p>
                    <textarea onChange={handleDescriptionChange} className={styles.description} type="text" value={description}/>
                </div>
            </div>
        </div>
    )
}

export default TaskEdit
