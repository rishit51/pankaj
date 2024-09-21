import React from 'react';
import urgentIcon from '/public/icons_FEtask/SVG - Urgent Priority grey.svg';
import highIcon from '/public/icons_FEtask/Img - High Priority.svg';
import mediumIcon from '/public/icons_FEtask/Img - Medium Priority.svg';
import lowIcon from '/public/icons_FEtask/Img - Low Priority.svg';
import noPriorityIcon from '/public/icons_FEtask/No-priority.svg';
import './Priority.css';
const Priority = ({ level }) => {
  const priorityMapping = {
    4: urgentIcon,
    3: highIcon,
    2: mediumIcon,
    1: lowIcon,
    0: noPriorityIcon,
  };

  // Get the corresponding image path based on the priority level
  const iconPath = priorityMapping[level] || noPriorityIcon;

  return (
    <div className="priority-icon">
      <img src={iconPath} alt={`Priority level ${level}`} />
    </div>
  );
};

export default Priority;
