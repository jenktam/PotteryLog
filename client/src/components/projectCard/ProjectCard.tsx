import React from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from '@mui/material';
import NoImage from '../../assets/defaultProjectImage.jpeg';
import { Link } from 'react-router-dom';

interface IProject {
  id: number;
  name: string;
  dateStarted: string;
  dateFinished: string;
  status: string;
  weight: number;
  size: string;
  notes: string;
  coverPic: string;
}

const ProjectCard = ({
  project,
  setOrders,
}: {
  project: IProject;
  setOrders?: any;
}) => {
  const {
    name,
    dateStarted,
    dateFinished,
    status,
    weight,
    size,
    notes,
    coverPic,
    id,
  } = project;
  return (
    <>
      <Card
        className='card'
        style={{
          marginBottom: '15px',
          boxShadow: '1px 4px 11px -2px rgba(135,135,135,0.75)',
        }}
      >
        <CardContent>
          <Typography sx={{ fontSize: 14 }} color='text.secondary' gutterBottom>
            {dateStarted} - {dateFinished}
          </Typography>
          <CardMedia
            component='img'
            height='194'
            image={coverPic ? `/upload/${coverPic}` : NoImage}
            alt='Project Image'
          />
          <Typography sx={{ mb: 1.5 }} color='text.secondary'>
            {status}
          </Typography>
          <Typography variant='body2'>Weight: {weight}</Typography>
          <Typography variant='body2'>Size: {size}</Typography>
          <Typography variant='body2'>Notes: {notes}</Typography>
        </CardContent>
        <CardActions>
          <Link to={`/projects/${id}`}>Learn More</Link>
        </CardActions>
      </Card>
    </>
  );
};

export default ProjectCard;
