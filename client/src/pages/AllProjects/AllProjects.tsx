import React from 'react';
import Projects from 'src/components/projects/Projects';
import { useNavigate } from 'react-router-dom';
import AddIcon from '@mui/icons-material/Add';
import { Box, Button, Typography, Grid } from '@mui/material';

const AllProjects = () => {
  const navigate = useNavigate();

  const handleNewProject = (e: React.MouseEvent<HTMLButtonElement>) => {
    e.preventDefault();
    navigate('/projects/form');
  };

  return (
    <Box>
      <Typography variant='h1' style={{ textAlign: 'center' }}>
        Active Pots
      </Typography>
      <Button onClick={handleNewProject}>
        <AddIcon /> Add new project
      </Button>
      <Projects />
    </Box>
  );
};

export default AllProjects;
