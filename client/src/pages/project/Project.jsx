// projects/:id
import React from 'react';
import { useQuery } from '@tanstack/react-query';
import { useParams } from 'react-router';
import {Typography, ImageList, Button, Divider, Paper } from '@mui/material';
import { Link } from 'react-router-dom';
import ImageListItem from '@mui/material/ImageListItem';
import { makeRequest } from '../../axios';


const StandardImageList = ({images}) => {
  let itemData = [
    {
      img: images[0],
      title: 'Breakfast',
    },
    {
      img: images[0],
      title: 'Breakfast',
    },
    {
      img: images[0],
      title: 'Breakfast',
    },
    {
      img: images[0],
      title: 'Breakfast',
    },
    {
      img: images[0],
      title: 'Breakfast',
    },
    {
      img: images[0],
      title: 'Breakfast',
    },
  ]
  return (
    <>
      <ImageList sx={{ width: 500, height: 450 }} cols={3} rowHeight={164}>
        {itemData.map((item) => (
          <ImageListItem key={item.img}>
            <img
              src={`/upload/${item.img}?w=164&h=164&fit=crop&auto=format`}
              // srcSet={`/upload/${item.img}?w=164&h=164&fit=crop&auto=format&dpr=2 2x`}
              alt={item.title}
              loading="lazy"
            />
          </ImageListItem>
        ))}
      </ImageList>
      <div>+ add new image</div>
    </>
  );
}

const Project = () => {
  let { id } = useParams();
  const { isLoading, error, data } = useQuery(['projects', id], () => makeRequest.get(`/projects/${id}`)
  .then(res => res.data));
  
  // TODO:
  // const handleClick = (e) => {
  //   console.log('go to form edit page');
  // }

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
        <StandardImageList images={[data.img]}/>
        <Typography variant="subtitle2">Status: {data.status}</Typography>
        <Divider />
        <Typography variant="h3">
          Details
        </Typography>
        <Typography variant="body1">Date Started: {data.dateStarted}</Typography>
        <Typography variant="body1">Weight (lbs): {data.clayBody}</Typography>
        <Typography variant="body1">Size (in): {data.size}</Typography>
        {/* Todo: add categories. outside glazes, inside glaxes, under-glazes, slips */}
        {/* Database:
          glazes
          type - glaze, underglaze, slip, terrasig
          name - shadow green
          id
          glazes = [
            outside_glazes: {
              { name: 'white satin', type: glaze, numCoats: 3,}, 
              { name: 'turquoise blue', type: 'glaze', numCoats: 3},
              {
                name: 'deep crystal blue' type: 'glaze', brand: 'Seattle Pottery Supply'
              },
            },
            inside_glazes: {
              { name: 'white satin', type: glaze, numCoats: 3, brand: 'Seattle Pottery Supply'}, 
            }
          ]

          notes: [
            {
              title: string: optional,
              status: enum: optional,
              description: string: required
            }
          ]
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