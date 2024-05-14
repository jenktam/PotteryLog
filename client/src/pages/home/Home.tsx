import React, { useEffect, useState } from 'react';
import Projects from 'src/components/projects/Projects';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, Grid } from '@mui/material';
import { styled } from '@mui/material/styles';
import { useNavigate } from 'react-router-dom';
import Column from 'src/components/column';
import ProjectCard from 'src/components/projectCard/ProjectCard';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import Accordion from 'src/components/accordion/Accordion';
import { ColumnTypes } from 'src/components/constants/enums';

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  minHeight: '170px',
  maxHeight: '500px',
  borderRadius: '5px',
  overflowY: 'scroll',
  marginRight: '20px',
}));

const Home = () => {
  let navigate = useNavigate();
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
      // update so all prev panels are closed
      setExpandedPanels((prev) => ({
        prev: false,
        // Toggles the panel's expansion state
        [id]: !prev[id],
      }));
    },
    [setExpandedPanels]
  );

  const handleNewProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/projects/form');
  };

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
              content={<ProjectCard project={order} setOrders={setOrders} />}
            />
          );
        })
    );
  };

  return (
    <>
      <Grid container spacing={2} style={{ margin: '24px 0' }}>
        {[THROWN, TRIMMED, BISQUED, GLAZED, COMPLETED, SOLD, GIFTED].map(
          (columnName) => (
            <StyledGrid item xs={2} key={columnName}>
              <Column name={columnName} setOrders={setOrders}>
                {renderAccordion(columnName)}
              </Column>
            </StyledGrid>
          )
        )}
      </Grid>

      <Box>
        <Typography variant='h1' style={{ textAlign: 'center' }}>
          Active Pots
        </Typography>
        <Button onClick={handleNewProject}>
          <AddIcon /> Add new project
        </Button>
        <Projects />
      </Box>
    </>
  );
};

export default Home;
