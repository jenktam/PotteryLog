import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
  Select,
  InputLabel,
  MenuItem,
  FormControl,
  CardContent,
  Grid,
  Card,
  CardHeader,
  CardActions,
  Fab,
  Box,
  Typography,
  Button,
} from '@mui/material';
import AddIcon from '@mui/icons-material/Add';
import { useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import { TextField } from 'formik-material-ui';
import { useParams } from 'react-router';
import { makeRequest } from '../../axios';
import { ProjectSchema, options } from '../projectForm/ProjectFormSchema';

const ProjectEdit = () => {
  const queryClient = useQueryClient();
  let { id } = useParams();
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);

  const { isLoading, error, data } = useQuery(['projects', id], () =>
    makeRequest.get(`/projects/${id}`).then((res) => res.data)
  );

  const upload = async () => {
    try {
      const formData = new FormData();

      for (let index in files) {
        formData.append('files', files[index]);
      }

      const res = await makeRequest.post('/upload', formData);

      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (updatedProject) => {
      return makeRequest.put(`/projects/${data.id}`, updatedProject);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['projects']);
      },
    }
  );

  const handleSubmit = (values) => {
    mutation.mutate(values);

    navigate(`/projects/${data.id}`);
  };

  if (error) {
    return <div>Something went wrong!</div>;
  }

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      <Grid container justify='center' spacing={1}>
        <Grid item md={6}>
          <Card>
            <CardHeader title='Edit Project'></CardHeader>

            <Formik
              initialValues={{
                name: data.name,
                status: data.status,
                clayType: data.clayType,
                weight: data.weight,
                size: data.size,
                handbuilt: data.handbuilt,
                location: data.location,
                firing: data.firing,
                glazing: data.glazing,
                notes: data.notes,
                images: data.images || [],
              }}
              enableReinitialize
              validationSchema={ProjectSchema}
              validateOnBlur={false}
              onSubmit={handleSubmit}
            >
              {({
                dirty,
                isValid,
                values,
                handleChange,
                handleBlur,
                handleSubmit,
                isSubmitting,
                /* and other goodies */
              }) => (
                <Form onSubmit={handleSubmit} sx={{ m: 1, minWidth: 400 }}>
                  <CardContent>
                    {/* Upload Image */}
                    <Grid item xs={12} sm={6} md={12}>
                      <FormControl fullWidth variant='outlined'>
                        {/* shows images */}
                        <Box className='imgContainer'>
                          {data?.images &&
                            Object.values(data?.images).map((file) => {
                              return (
                                <img
                                  className='file'
                                  alt=''
                                  key={file.id}
                                  // if react state for files exists, then update images with the files from there, otherwise, show existing images
                                  // TODO: fix additional uploads for images in /ProjectEdit form
                                  src={
                                    files
                                      ? URL.createObjectURL(file)
                                      : `/upload/${file.filename}`
                                  }
                                  style={{
                                    maxWidth: '600px',
                                    maxHeight: '600px',
                                    marginBottom: '18px',
                                  }}
                                />
                              );
                            })}
                        </Box>
                        {/* will create a fake url to upload project */}
                        {/* upload images */}
                        <Box sx={{ mb: 2 }}>
                          <Fab variant='extended' color='primary'>
                            <input
                              type='file'
                              multiple
                              id='file'
                              style={{
                                display: 'none',
                              }}
                              // only allow to upload 1 single file
                              onChange={(e) => setFiles(e.target.files)}
                            />
                            <label htmlFor='file'>
                              <div
                                className='item'
                                sx={{
                                  display: 'flex',
                                }}
                              >
                                <AddIcon
                                  sx={{
                                    mr: 1,
                                  }}
                                />
                                <Typography component='span'>
                                  Add Image
                                </Typography>
                              </div>
                            </label>
                          </Fab>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item container spacing={1} justify='center'>
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Name'
                          variant='outlined'
                          fullWidth
                          name='name'
                          value={values.name}
                          component={TextField}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant='outlined'>
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Status
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            label='Status'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.status}
                            name='status'
                            required
                          >
                            {options.status.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant='outlined'>
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Clay Type
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            label='Clay Type'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.clayType}
                            name='clayType'
                            required
                          >
                            {options.clayType.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Weight'
                          variant='outlined'
                          fullWidth
                          name='weight'
                          value={values.weight}
                          component={TextField}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Size'
                          variant='outlined'
                          fullWidth
                          name='size'
                          value={values.size}
                          component={TextField}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Handbuilt'
                          variant='outlined'
                          fullWidth
                          name='handbuilt'
                          value={values.handbuilt}
                          component={TextField}
                          required
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={12}>
                        <FormControl fullWidth variant='outlined'>
                          <InputLabel id='demo-simple-select-outlined-label'>
                            Location
                          </InputLabel>
                          <Select
                            labelId='demo-simple-select-outlined-label'
                            id='demo-simple-select-outlined'
                            label='Location'
                            onChange={handleChange}
                            onBlur={handleBlur}
                            value={values.location}
                            name='Location'
                            required
                          >
                            {options.location.map((item) => (
                              <MenuItem key={item.value} value={item.value}>
                                {item.label}
                              </MenuItem>
                            ))}
                          </Select>
                        </FormControl>
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Firing'
                          variant='outlined'
                          fullWidth
                          name='firing'
                          value={values.firing}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Glazing'
                          placeholder='Glazes used'
                          variant='outlined'
                          fullWidth
                          name='glazing'
                          value={values.glazing}
                          component={TextField}
                        />
                      </Grid>

                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Notes'
                          variant='outlined'
                          fullWidth
                          name='notes'
                          value={values.notes}
                          component={TextField}
                        />
                      </Grid>
                    </Grid>
                  </CardContent>

                  <CardActions>
                    <Button variant='contained' color='primary' type='Submit'>
                      Submit
                    </Button>
                  </CardActions>
                </Form>
              )}
            </Formik>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

export default ProjectEdit;
