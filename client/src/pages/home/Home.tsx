import React, { useEffect, useState } from 'react';
import './Home.css';
import { Box } from '@mui/material';
import Column from 'src/components/column';
import ProjectCard from 'src/components/projectCard/ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import Accordion from 'src/components/accordion/Accordion';
import { ColumnTypes } from 'src/components/constants/enums';

const Home = () => {
  const [orders, setOrders] = useState<any[]>([]);
  // expandedPanel is used to keep track of which panel is expanded. Each panel's expansion is managed individually.
  const [expandedPanels, setExpandedPanels] = useState<Record<string, boolean>>(
    {}
  );

  const { data } = useQuery(['projects'], () =>
    makeRequest.get('/projects').then((res) => res.data)
  );

  const { THROWN, TRIMMED, BISQUED, GLAZED, COMPLETED, SOLD, GIFTED } =
    ColumnTypes;

  useEffect(() => {
    if (data) {
      setOrders(data);
    }
  }, [data]);

  const handleChange = React.useCallback(
    (id: string, expanded: boolean) => {
      // Update so all prev panels are closed
      setExpandedPanels((prev) => ({
        prev: false,
        // Toggles the panel's expansion state
        [id]: !prev[id],
      }));
    },
    [setExpandedPanels]
  );

  const renderAccordion = (columnName: string) => {
    return (
      orders &&
      orders
        .filter((order) => order.status === columnName)
        .map((order, index) => {
          const orderId = order.id;
          return (
            <Accordion
              key={orderId}
              id={orderId}
              onChange={() => handleChange(orderId, expandedPanels[orderId])}
              expanded={expandedPanels[orderId] || false}
              title={order.name}
              setOrders={setOrders}
              content={<ProjectCard project={order} setOrders={setOrders} />}
            />
          );
        })
    );
  };

  return (
    <div className='board-canvas'>
      <div className='kanban-board'>
        {[THROWN, TRIMMED, BISQUED, GLAZED, COMPLETED, SOLD, GIFTED].map(
          (columnName) => (
            <Box key={columnName} className='box'>
              <Column name={columnName} setOrders={setOrders}>
                {renderAccordion(columnName)}
              </Column>
            </Box>
          )
        )}
      </div>
    </div>
  );
};

export default Home;
