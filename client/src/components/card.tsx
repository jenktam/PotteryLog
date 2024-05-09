import React from 'react';
import { Card, CardContent, Typography, CardMedia } from '@mui/material';
import { ColumnTypes, cardType } from './constants/enums.ts';
import { IProduct } from './constants/models.ts';
import { useDrag } from 'react-dnd';
const Cards = ({
  name,
  material,
  setOrders,
}: {
  name: string;
  material: string;
  setOrders: any;
  index: number;
}) => {
  // TODO: should be updating order of columns
  const orderColumnChange = (CurrentOrder: any, columnName: string) => {
    setOrders((prevState: string[]) => {
      return prevState.map((item: any) => {
        console.log('item: ', item);
        console.log('CurrentOrder: ', CurrentOrder);

        let newState = {
          ...item,
          column: item.name === CurrentOrder.name ? columnName : item.column,
        };
        console.log('newState: ', newState);
        return newState;
      });
    });
  };

  const [{ isDragging }, drag] = useDrag({
    type: cardType.ORDER,
    item: { name },
    end: (order, monitor) => {
      const dropResult = monitor.getDropResult<IProduct>();
      console.log('dropResult: ', dropResult);

      if (dropResult !== null) {
        // TODO: this is undefined and shouldn't be
        const { name } = dropResult;
        const { ORDERS, IN_PROGRESS, DELIVERED, RETURNED } = ColumnTypes;

        switch (name) {
          case ORDERS:
            orderColumnChange(order, ColumnTypes.ORDERS);
            break;
          case IN_PROGRESS:
            orderColumnChange(order, ColumnTypes.IN_PROGRESS);
            break;
          case DELIVERED:
            orderColumnChange(order, ColumnTypes.DELIVERED);
            break;
          case RETURNED:
            orderColumnChange(order, ColumnTypes.RETURNED);
            break;
          default:
            break;
        }
      }
    },
    collect: (monitor) => ({
      isDragging: monitor.isDragging(),
    }),
  });

  return (
    <Card
      ref={drag}
      className='card'
      style={{
        opacity: isDragging ? '0.5' : '1',
        marginBottom: '15px',
        boxShadow: '1px 4px 11px -2px rgba(135,135,135,0.75)',
      }}
    >
      <CardMedia
        sx={{ height: 140 }}
        image='/static/images/cards/contemplative-reptile.jpg'
        title='green iguana'
      />
      <CardContent>
        <Typography variant='h5' component='div' gutterBottom>
          {name}
        </Typography>
      </CardContent>
      Material: {material}
    </Card>
  );
};

export default Cards;
