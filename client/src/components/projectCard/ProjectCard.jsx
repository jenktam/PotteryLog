import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
// import NoImage from "../../assets/defaultProjectImage.png";
import NoImage from '../../assets/defaultProjectImage.jpeg';
import { Link } from 'react-router-dom';

const ProjectCard = ({ project }) => {
  return (
    <>
      <Card>
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {project.dateStarted} - {project.dateFinished}
          </Typography>
          <Typography variant='h5' component='div'>
            {project.name}
          </Typography>
          <CardMedia
            component='img'
            height='194'
            image={project.coverPic ? `/upload/${project.coverPic}` : NoImage}
            alt='Project Image'
          />
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {project.status}
          </Typography>
          <Typography variant='body2'>Weight: {project.weight}</Typography>
          <Typography variant='body2'>Size: {project.size}</Typography>
          <Typography variant='body2'>Notes: {project.notes}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/projects/${project.id}`}>Learn More</Link>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectCard;
