import React from 'react';
import Projects from '../../components/projects/Projects'
import AddIcon from '@mui/icons-material/Add';
import {
  Box,
  Button,
  Typography,
} from '@mui/material';
import { useNavigate } from "react-router-dom";

const Home = () => {
  let navigate = useNavigate();

  const handleNewProject = (e) => {
    e.preventDefault();

    navigate('/projects/form');
  }
  return (
    <>
      <Box>
        <Typography variant="h1" style={{textAlign: 'center'}}>Active Pots</Typography>
        <Button onClick={handleNewProject}>
          <AddIcon /> Add new project
        </Button>
        <Projects />

      </Box>
    </>
  )
};

export default Home;