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
import { ColumnTypes } from 'src/components/constants/enums';

const StyledGrid = styled(Grid)(({ theme }) => ({
  backgroundColor: '#e0e0e0',
  padding: '15px',
  minHeight: '170px',
  maxHeight: '500px',
  borderRadius: '5px',
  overflowY: 'scroll',
  marginRight: '20px',
}));

const Home = () => {
  let navigate = useNavigate();
  const { isLoading, error, data } = useQuery(['projects'], () =>
    makeRequest.get('/projects').then((res) => res.data)
  );

  const [orders, setOrders] = useState<any[] | undefined>([]);
  const { THROWN, TRIMMED, BISQUED, GLAZED, COMPLETED, SOLD, GIFTED } =
    ColumnTypes;

  // Makes sure that if orders changes, moves cards to correct columns
  const columnItem = React.useMemo(
    () => (columnName: string) => {
      return (
        orders &&
        orders
          .filter((order) => order.status === columnName)
          .map((order, index) => (
            <ProjectCard project={order} key={order.id} setOrders={setOrders} />
          ))
      );
    },
    [orders]
  );

  //creating side effects based on the data's response.
  useEffect(() => {
    setOrders(data);
  }, [data]);

  const handleNewProject = (e: any) => {
    e.preventDefault();

    navigate('/projects/form');
  };

  return (
    <>
      {/* Drag and Drop */}
      <Grid container spacing={2}>
        <StyledGrid item xs={1.5}>
          <Column name={THROWN} setOrders={setOrders}>
            {columnItem(THROWN)}
          </Column>
        </StyledGrid>
        <StyledGrid item xs={1.5}>
          <Column name={TRIMMED} setOrders={setOrders}>
            {columnItem(TRIMMED)}
          </Column>
        </StyledGrid>
        <StyledGrid item xs={1.5}>
          <Column name={BISQUED} setOrders={setOrders}>
            {columnItem(BISQUED)}
          </Column>
        </StyledGrid>
        <StyledGrid item xs={1.5}>
          <Column name={GLAZED} setOrders={setOrders}>
            {columnItem(GLAZED)}
          </Column>
        </StyledGrid>
        <StyledGrid item xs={1.5}>
          <Column name={COMPLETED} setOrders={setOrders}>
            {columnItem(COMPLETED)}
          </Column>
        </StyledGrid>
        <StyledGrid item xs={1.5}>
          <Column name={SOLD} setOrders={setOrders}>
            {columnItem(SOLD)}
          </Column>
        </StyledGrid>
        <StyledGrid item xs={1.5}>
          <Column name={GIFTED} setOrders={setOrders}>
            {columnItem(GIFTED)}
          </Column>
        </StyledGrid>
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
