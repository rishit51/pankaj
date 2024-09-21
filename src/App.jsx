import { useEffect, useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import Card from './Components/Card/Card'
import Column from './Components/Column/Column'
import DisplayMenu from './Components/Dashboard/Dashboard'
function App() {
  const [count, setCount] = useState(0)
  const [tickets,setTickets] = useState([]);
  const [users,setUsers] = useState([]);
  const [isLooading,setisLoading] = useState(true);
  const [order,setOrder] = useState('priority');

  function getUser(userId){
    return users.find(usr=>usr.id == userId);
  }
  useEffect(()=>{
    let tickets= fetch('https://api.quicksell.co/v1/internal/frontend-assignment');
    tickets.then(response => response.json()).then(ar=>{let {tickets,users}=ar;setTickets(tickets);setUsers(users) ; console.log(users,tickets);setisLoading(false)});
   },[]);

  function ticketComparator(criteria) {
    return function(a, b) {
        switch (criteria) {
            case 'priority':
                return b.priority - a.priority; // Descending order
            case 'title':
                return a.title.localeCompare(b.title); // Ascending order
            default:
                throw new Error('Unknown sorting criteria');
        }
    };
}

  
  return (
    <>
    <DisplayMenu/>
    </>
  )
}

export default App
