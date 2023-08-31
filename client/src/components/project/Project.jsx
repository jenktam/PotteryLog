import React, { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';

const Project = ({ project }) => {
  const handleClick = (e) => {
    e.preventDefault();

    // TODO: go to /projects/:id page
    console.log("go to /projects/:id page!");
  }
  return (
    <>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
            {project.dateStarted} - {project.dateFinished}
          </Typography>
          <Typography variant="h5" component="div">
            {project.name}
          </Typography>
          <Typography sx={{ mb: 1.5 }} color="text.secondary">
            {project.status}
          </Typography>
          <Typography variant="body2">
            Weight: {project.weight}
          </Typography>
          <Typography variant="body2">
            Size: {project.size}
          </Typography>
          <Typography variant="body2">
            Notes: {project.notes}
          </Typography>
        </CardContent>
        <CardActions>
          <Button size="small" onClick={handleClick}>Learn More</Button>
        </CardActions>
      </Card>
    </>
  );
};

export default Project;