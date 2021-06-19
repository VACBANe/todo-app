import React, {useEffect, useState} from "react";
import addListIcon from "../../assets/icons/add.svg";
import List from "../List/List";
import Badge from "../Badge/Badge";

import closeIcon from '../../assets/icons/close.svg';

import './AddList.scss';
import axios from "axios";

const AddList = ({colors, onAdd}) => {
    const [showForm, setShowForm] = useState(false);
    const [selectedColor, setColor] = useState(2);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    useEffect(() => {
        if(Array.isArray(colors)) {
            setColor(colors[0].id);
        }
    }, [colors]);

    const onClose = () => {
        setInputValue('');
        setColor(colors[0].id);
        setShowForm(false);
    }

    const addList = () => {
        if(!inputValue) {
            alert('Input is empty');
            return;
        }
        setIsLoading(true);
        axios.post('http://localhost:3001/lists', {"name": inputValue, colorId: selectedColor}
        ).then(({data}) => {
            const color = colors.filter(c => c.id === selectedColor)[0];
            const listObj = {...data, color, tasks: []}
            onAdd(listObj);
            setIsLoading(false);
            onClose();
        }).finally(() => {
            setIsLoading(false);
        });
    }

    return (
        <div className={"add-list"}>
            <List
                onClick={() => setShowForm(!showForm)}
                items={[
                    {
                        className: 'list__add-button',
                        icon: addListIcon,
                        name: 'Add list',
                    }
                ]}
            />
            {showForm && (
                <div className={"add-list__form"}>
                    <img src={closeIcon}
                         alt={"Close button"}
                         onClick={onClose}
                         className="add-list__form-close"/>

                    <input className={"field"}
                           type={"text"}
                           value={inputValue}
                           placeholder={"List name"}
                           onChange={e => setInputValue(e.target.value)}/>
                    <div className={"add-list__form-colors"}>
                        {
                            colors.map(color => (
                                    <Badge onClick={() => setColor(color.id)}
                                           key={color.id}
                                           color={color.name}
                                           className={selectedColor === color.id && 'active'}
                                    />
                                )
                            )
                        }
                    </div>
                    <button className={"button"} onClick={addList}>
                        {isLoading? 'Adding' : 'Add'}
                    </button>
                </div>
            )}
        </div>
    );
}


export default AddList;
