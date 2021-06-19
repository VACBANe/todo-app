import addIcon from "../../assets/icons/add.svg";
import React, {useState} from "react";
import axios from "axios";

const AddTaskForm = ({list, onAddTask}) => {
    const [visibleForm, setVisibleForm] = useState(false);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const toggleFormVisible = () => {
        setVisibleForm(!visibleForm);
        setInputValue('');
    }
    const addTask = () => {
        const obj = {
            listId: list.id,
            text: inputValue,
            completed: false
        };
        setIsLoading(true);
        axios.post('http://localhost:3001/tasks', obj).then(({data}) =>{
            onAddTask(list.id, data);
            toggleFormVisible();
        }).catch(() => {
            alert('Error');
        }).finally(() => {
            setIsLoading(false);
        });
    }
    return (
        <div className="tasks__form">
            {!visibleForm ?
                <div onClick={toggleFormVisible} className="tasks__form-new">
                    <img src={addIcon} alt={"Add icon"}/>
                    <span>New Task</span>
                </div>
                :
                <div className="tasks__form-block">
                    <input className={"field"}
                           type={"text"}
                           value={inputValue}
                           onChange={(e) => setInputValue(e.target.value)}
                           placeholder={"Task name"}/>
                    <button disabled={isLoading} onClick={addTask} className={"button"}>{isLoading ? 'Adding' : 'Add task'}</button>
                    <button onClick={toggleFormVisible} className={"button button--gray"}>Close</button>
                </div>}
        </div>
    );
}


export default AddTaskForm;
