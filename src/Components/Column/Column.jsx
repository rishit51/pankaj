import React from 'react';
import './Column.css';
import Card from '../Card/Card';
const Column = ({header, cards,orderBy}) => {
  cards.sort(orderBy);
  return (
    <div className="column">
      {header}
      <div className="column-cards">
        {
            cards.map(tcks=> <Card taskId={tcks.id} title={tcks.title} tags={tcks.tag} priority={tcks.priority} status={tcks.status} usr = {tcks.usr}></Card>)
        }
      </div>
    </div>
  );
};

export default Column;
