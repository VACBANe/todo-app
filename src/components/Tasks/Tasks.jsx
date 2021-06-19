import React from "react";
import axios from "axios";
import {Link} from "react-router-dom";

import AddTaskForm from './AddTaskForm'
import editIcon from '../../assets/icons/edit.svg';
import './Tasks.scss';
import Task from "./Task";

const Tasks = ({list, onEditTitle, onAddTask, withoutEmpty, onRemoveTask, onEditTask, onCompleteTask}) => {

    const editTitle = () => {
        const newTitle = window.prompt('List name', list.name);
        if(newTitle) {
            onEditTitle(list.id, newTitle);
            axios.patch('http://localhost:3001/lists/' + list.id, {
                name: newTitle
            }).catch(() => {
                alert('Error');
            });
        }
    }

    return (
        <div className="tasks">
            <Link to={`/lists/${list.id}`}>
            <h2 style={{color: list.color.hex}} className={"tasks__title"}>
                {list.name}
                <img onClick={editTitle} src={editIcon} alt={'Edit icon'}/>
            </h2>
            </Link>

            <div className="tasks__items">
                {!withoutEmpty && list.tasks && !list.tasks.length && <h2>Tasks not found</h2>}
                {list.tasks && list.tasks.map(task => (
                    <Task key={task.id} list={list} onRemove={onRemoveTask} onEdit={onEditTask} onCompleteTask={onCompleteTask} {...task}/>
                ))}
                <AddTaskForm key={list.id} list={list} onAddTask={onAddTask}/>
            </div>
        </div>
    );
}

export default Tasks;
