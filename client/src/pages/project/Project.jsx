// projects/:id
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {Typography, ImageList, Button, Divider, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import { makeRequest } from '../../axios';


const StandardImageList = ({ images }) => {
  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {images.map((item) => (
          <ImageListItem key={item.filename}>
            <img
              src={`/upload/${item.filename}?w=164&h=164&fit=crop&auto=format`}
              alt={item.filename}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
    </>
  );
}

const Project = () => {
  let { id } = useParams();
  const { isLoading, error, data } = useQuery(['projects', id], () => makeRequest.get(`/projects/${id}`)
  .then(res => res.data));
  if(error) {
    return (
    <div>Something went wrong!</div>
    );
  }

  if(isLoading) {
    return (
      <div>Loading...</div>
    );
  };

  return (
    <>
      <Paper>
        <Typography variant="h2">
          {data.name}
        </Typography>
        <StandardImageList images={data.images}/>
        <Typography variant="subtitle2">Status: {data.status}</Typography>
        <Divider />
        <Typography variant="h3">
          Details
        </Typography>
        <Typography variant="body1">Date Started: {data.dateStarted}</Typography>
        <Typography variant="body1">Weight (lbs): {data.clayBody}</Typography>
        <Typography variant="body1">Size (in): {data.size}</Typography>
    
        */}
        <Typography variant="body1">Glazes: should be collapsible array{data.glazing}</Typography>
        <Typography variant="body1">Notes: Should be collapsible array {data.notes}</Typography>
        <Typography variant="body1">Location: {data.location}</Typography>
        <Divider />
        <Typography variant="h3">
          Ratings
        </Typography>
        <Typography variant="body1">Details: {data.detailsRating}</Typography>
        <Typography variant="body1">Difficulty: {data.difficultyRating}</Typography>
        <Typography variant="body1">Finishing: {data.finishingRating}</Typography>
        <Link to={`/projects/${data.id}/edit`}>
          <Button variant="contained">Edit</Button>
        </Link>
      </Paper>
    </>
    
  );
};

export default Project;