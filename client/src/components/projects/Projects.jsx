import React from 'react';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';
import { useQuery } from '@tanstack/react-query';
import { makeRequest } from '../../axios';
import ProjectCard from '../projectCard/ProjectCard';

const Item = styled(Paper)(({ theme }) => ({
  backgroundColor: theme.palette.mode === 'dark' ? '#1A2027' : '#fff',
  ...theme.typography.body2,
  padding: theme.spacing(1),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));

const Projects = () => {
  const { isLoading, error, data } = useQuery(['projects'], () => makeRequest.get('/projects')
  .then(res => res.data));

  if(error) return (
    <div>Something went wrong! </div>
  )

  if(isLoading) {
    return (
      <div>Loading...</div>
    )
  }

  return (
    <>
        <Grid 
          container
          spacing={2} 
          direction="row"
          justifyContent="center"
          alignItems="center"
      >
        {data && data.map((project) => {
          return (
            <Grid item xs={6} md={3} key={project.id}>
              <Item>
                <ProjectCard project={project} key={project.id} />
              </Item>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};

export default Projects;