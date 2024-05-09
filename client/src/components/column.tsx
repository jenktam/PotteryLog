import React from 'react';
import { Row, Col } from 'antd';
import { useDrop } from 'react-dnd';
import { cardType } from './constants/enums.ts';

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
      // This connects the card to the column via the name in dropResult in card.tsx
      return {
        name,
      };
    },
    collect: (monitor) => {
      // console.log('monitor: ', monitor);
      return {
        isOver: monitor.isOver(),
        canDrop: monitor.canDrop(),
      };
    },
  });

  return (
    <Row gutter={30}>
      <Col
        style={{
          backgroundColor: '#e3e7ee',
          width: '270px',
          padding: '15px',
          minHeight: '170px',
          maxHeight: '690px',
          borderRadius: '5px',
          overflowY: 'scroll',
        }}
      >
        <div
          style={{
            fontSize: '17px',
            marginLeft: '10px',
            marginBottom: '15px',
            color: '#84878c',
          }}
        >
          {name}
        </div>
        <div
          ref={dropRef}
          style={{
            width: '100%',
            height: '75%',
            padding: '4px',
            border: isOver ? 'dashed 1px black' : '',
          }}
        >
          {children}
        </div>
      </Col>
    </Row>
  );
}

export default Column;
