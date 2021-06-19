import React from 'react';
import './List.scss';
import classNames from 'classnames';
import Badge from "../Badge/Badge";
import axios from "axios";

import removeIcon from '../../assets/icons/remove.svg'

const List = ({items, isRemovable, onClick, onRemove, onClickItem, activeItem}) => {
    const removeList = item => {
        if (window.confirm('Delete this list?')) {
            axios.delete('http://localhost:3001/lists/' + item.id).then(() => {
                onRemove(item.id);
            });
        }
    }

    return (
        <ul onClick={onClick} className="list">
            {
                items.map((item, index) => (
                    <li key={index}
                        className={classNames(item.className, {
                            active: item.active ? item.active : activeItem && activeItem.id === item.id
                        })}
                        onClick={onClickItem ? () => onClickItem(item) : null}
                    >
                        <i>{item.icon ? <img src={item.icon} alt="Icon"/>
                            : <Badge color={item.color.name}/>}</i>
                        <span>{item.name}{item.tasks && ` (${item.tasks.length})`}</span>
                        {isRemovable &&
                        <img className={'list__remove-icon'} onClick={() => removeList(item)} src={removeIcon}
                             alt={'removeIcon'}/>}
                    </li>))
            }
        </ul>
    );
}

export default List;
