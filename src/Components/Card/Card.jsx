// src/components/TaskCard.js
import React from 'react';
import './Card.css';
import Priority from './Priority/Priority';

const Card = ({taskId,title,priority,tags,status,usr}) => {
  const statusMapping = {
    "Todo":'/icons_FEtask/To-do.svg',
    "In progress":'/icons_FEtask/in-progress.svg',
    "Backlog":"/icons_FEtask/Backlog.svg",
    "Done":"/icons_FEtask/Done.svg",
    "Cancelled":"/icons_FEtask/Cancelled.svg"
  };
  const getInitials = (name) => {
    return name
      .split(' ')
      .map(part => part[0].toUpperCase()) // Take the first letter of each part and capitalize it
      .join(''); // Combine the letters
  };

  return (
    <div className="task-card">
      <div className="task-header">
        <span className="task-id">{taskId}</span>
        { usr ? <div className="avatar">{getInitials(usr.name)}</div> : '' }
      </div>
      <div className="task-body">
        <h3 className="task-title"> <div className='task-icon'>      <img src={statusMapping[status]} alt={`Status - ${status}`} />
        </div>{title}</h3>
        <div style={{display:'flex',justifyContent:'start',alignItems:'center'}}>
        <Priority level={priority}></Priority>
        {
        tags.map(tg=>(    
        <span className="task-tag">{tg}</span>))
        }
        </div>
      </div>
    </div>
  );
};

export default Card;
