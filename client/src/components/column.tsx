import React from 'react';
import { Typography } from '@mui/material';
import { useDrop } from 'react-dnd';
import { cardType } from './constants/enums';

function Column({
  children,
  name,
  setOrders,
}: {
  children: any;
  name: string;
  setOrders: Function;
}) {
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
      <Typography
        style={{
          fontSize: '17px',
          marginLeft: '10px',
          marginBottom: '15px',
          color: '#84878c',
        }}
      >
        {name}
      </Typography>
      <Typography
        ref={dropRef}
        style={{
          width: '100%',
          height: '100%',
          padding: '4px',
          border: isOver ? 'dashed 1px black' : '',
        }}
      >
        {children}
      </Typography>
    </>
  );
}

export default Column;
