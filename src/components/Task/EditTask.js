import React, { useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { getListTasks } from '../../storage/useLocalStorage';
import TaskForm from './TaskForm'


export default function EditTask() {

    const {id} = useParams();
    const [ tasks, setTasks] = useState(getListTasks());
    const taskToEdit = tasks.find((task) => task.id === id);


    return (
        <div>
            <TaskForm id={id} />
        </div>
    )
}
