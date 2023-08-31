import React, { useState } from 'react';
import { useQuery, useQueryClient } from '@tanstack/react-query';
import { styled } from '@mui/material/styles';
import { Grid } from '@mui/material';
import Paper from '@mui/material/Paper';

import { makeRequest } from '../../axios';
import Project from '../project/Project';

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

  // TODO: separate by status and create swim lanes
  // if swim lane empty, say 'You have nothing at this stage'
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
            <Grid item xs={6} md={3}>
              <Item>
                <Project project={project} key={project.id} />
              </Item>
            </Grid>
          )
        })}
      </Grid>
    </>
  );
};

export default Projects;