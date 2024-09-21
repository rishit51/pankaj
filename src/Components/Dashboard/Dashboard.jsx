import React, { useState } from "react";
import "./Dashboard.css"; // Import your CSS
import { useEffect } from 'react'

import Column from '../Column/Column'
import ColumnHeader from "../Column/Headers/ColumnHeader";
import useLocalStorage from "../../hooks/localStorageHook";

const DisplayMenu = () => {
    const [showMenu, setShowMenu] = useState(false);
    const [tickets, setTickets] = useState([]);
    const [users, setUsers] = useState([]);
    const [isLooading, setisLoading] = useState(true);

    const [order, setOrder] = useLocalStorage('order',"priority");
    const [grouping,setGrouping] = useLocalStorage('grouping','Status');
    const [comparator,setComparator]=useState(ticketComparator('priority'))
    function getUser(userId) {
        return users.find((usr) => usr.id == userId);
    }
    useEffect(() => {
        let tickets = fetch(
            "https://api.quicksell.co/v1/internal/frontend-assignment"
        );
        tickets
            .then((response) => response.json())
            .then((ar) => {
                let { tickets, users } = ar;
                setTickets(tickets);
                setUsers(users);
                console.log(users, tickets);
                setisLoading(false);
            });
    }, []);

    function ticketComparator(criteria) {
        return function (a, b) {
            switch (criteria) {
                case "priority":
                    return b?.priority - a?.priority; // Descending order
                case "title":
                    return a.title.localeCompare(b.title); // Ascending order
                default:
                    throw new Error("Unknown sorting criteria");
            }
        };
    }

    function groupCards(criteria) {
      let groups = {};
      
      switch (criteria) {
        case 'Status':
          groups={'Todo':[],"In progress":[],"Backlog":[],"Done":[],"Cancelled":[]}
          tickets.forEach(ticket => {
            if (!groups[ticket.status]) groups[ticket.status] = [];
            groups[ticket.status].push(ticket);
          });
          break;
    
        case 'User':
          tickets.forEach(ticket => {
            let user = getUser(ticket.userId)?.name || "Unknown";
            if (!groups[user]) groups[user] = [];
            groups[user].push(ticket);
          });
          break;
    
        case 'Priority':
          groups = {0:[],1:[],2:[],3:[],4:[]}
          tickets.forEach(ticket => {
            if (!groups[ticket.priority]) groups[ticket.priority] = [];
            groups[ticket.priority].push(ticket);
          });
          break;
    
        default:
          break;
      }
      
      return groups;
    }
    function getColumnHeader(group, itemCount) {
      const priorityMapping = {
        4: '/icons_FEtask/SVG - Urgent Priority colour.svg',
        3: '/icons_FEtask/Img - High Priority.svg',
        2: '/icons_FEtask/Img - Medium Priority.svg',
        1: '/icons_FEtask/Img - Low Priority.svg',
        0: '/icons_FEtask/No-priority.svg',
      };
      const statusMapping = {
        "Todo":'/icons_FEtask/To-do.svg',
        "In progress":'/icons_FEtask/in-progress.svg',
        "Backlog":"/icons_FEtask/Backlog.svg",
        "Done":"/icons_FEtask/Done.svg",
        "Cancelled":"/icons_FEtask/Cancelled.svg"
      }
      const priority_mapping = {
        4: "Urgent",
        3: "High",
        2: "Medium",
        1: "Low",
        0: "No priority"
    }
    
    
      // This is for cases like 'Status'
      const noPriorityIcon = '/icons_FEtask/No-priority.svg';
    
      switch (grouping) {
        case 'Status':
          return (
            <ColumnHeader 
              title={group} 
              itemCount={itemCount} 
              imgSrc={statusMapping[group]} 
            />
          );
        
        case 'User':
          return (
            <ColumnHeader 
              title={group} 
              itemCount={itemCount} 
              imgSrc={priorityMapping[0]} // Assuming no icon for users
            />
          );
    
        case 'Priority':
          return (
            <ColumnHeader 
              title={priority_mapping[group]} 
              itemCount={itemCount} 
              imgSrc={priorityMapping[group] || noPriorityIcon} 
            />
          );
    
        default:
          return null; // Fallback in case group doesn't match any case
      }
    }
    

    const toggleMenu = () => {
        setShowMenu(!showMenu);
    };

    return (
        <>
            <div className="display-menu">
                <div className="display-button" onClick={toggleMenu}>
                    <img src="/icons_FEtask/Display.svg" alt="" />
                    <div>Display &#9662;</div>
                </div>
                {showMenu && (
                    <div className="dropdown-menu">
                        <div className="dropdown-section">
                            <label>Grouping</label>
                            <select value={grouping} onChange={(e)=>(setGrouping(e.currentTarget.value))}>
                                <option value={'Status'}>Status</option>
                                <option value={'User'}>User</option>
                                <option value={'Priority'}>Priority</option>
                            </select>
                        </div>
                        <div className="dropdown-section">
                            <label>Ordering</label>
                            <select value={order} onChange={(e)=>(setOrder(e.currentTarget.value))}>
                                <option value={'priority'}>Priority</option>
                                <option value={'title'}>Title</option>
                            </select>
                        </div>
                    </div>
                )}
            </div>

            {isLooading ? (
  ""
) : (
  <div className="board">
    {Object.entries(groupCards(grouping)).map(([group, ticketsInGroup]) => (
      <Column
        key={group}
        header={getColumnHeader(group,ticketsInGroup.length)}
        orderBy={ticketComparator(order)}
        cards={ticketsInGroup.map(ticket => ({
          ...ticket,
          usr: grouping!='User' ? getUser(ticket.userId) : null  // Adding user details to the ticket
        }))}
      />
    ))}
  </div>
)}
        </>
    );
};

export default DisplayMenu;
