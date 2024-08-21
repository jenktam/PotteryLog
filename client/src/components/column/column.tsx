import React from 'react';
import { Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { cardType } from '../constants/enums';
import './column.css';

function Column({
  children,
  name,
  setOrders,
}: {
  children: any;
  name: string;
  setOrders: Function;
}) {
  // Creates border around column when dragging card
  const [{ isOver }, dropRef] = useDrop({
    accept: cardType.ORDER,
    drop: (item, monitor) => {
      return {
        name,
      };
    },
    collect: (monitor) => {
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  return (
    <>
      <Typography variant='h6' className='column-title'>
        {name}
      </Typography>
      <Typography
        ref={dropRef}
        className={`card-container' ${isOver ? 'card-container-over' : ''}`}
      >
        {children}
      </Typography>
    </>
  );
}

export default Column;
