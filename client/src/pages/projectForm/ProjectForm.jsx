import React, { useState } from 'react';
import './ProjectForm.scss';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
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
  Button,
  Fab,
  Typography,
  Box,
} from '@mui/material';
import { TextField } from 'formik-material-ui';
import { makeRequest } from '../../axios';
import { ProjectSchema, options } from './ProjectFormSchema';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProjectForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [files, setFiles] = useState(null);

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
    (newProject) => {
      // Send form fields to server
      return makeRequest.post('/projects', newProject);
    },
    {
      // Invalidate and refetch
      // if successful, refetch projects by searching for useQuery(["projects"])
      onSuccess: () => {
        queryClient.invalidateQueries(['projects']);
      },
    }
  );

  const handleSubmit = async (values) => {
    let imgResponse;
    // Make api call and get async response back and name imgUrl
    if (files) imgResponse = await upload();

    mutation.mutate({
      ...values,
      coverPic: imgResponse.files[0].filename,
      files: imgResponse.files,
    });

    setFiles(null);
  };

  return (
    <>
      <Grid container justify='center' spacing={1}>
        <Grid item md={6}>
          <Card>
            <CardHeader title='Add New Project'></CardHeader>

            <Formik
              initialValues={{
                name: '',
                status: '',
                coverPic: '',
                clayType: '',
                weight: '',
                size: '',
                handbuilt: false,
                location: 'Studio',
                firing: '',
                glazing: '',
                notes: '',
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
              }) => (
                <Form onSubmit={handleSubmit} sx={{ m: 1, minWidth: 400 }}>
                  <CardContent>
                    {/* Upload Image */}
                    <Grid item xs={12} sm={6} md={12}>
                      <FormControl fullWidth variant='outlined'>
                        {/* shows images */}
                        <Box className='imgContainer'>
                          {files &&
                            Object.values(files).map((file) => {
                              return (
                                <img
                                  className='file'
                                  alt=''
                                  key={file.id}
                                  src={URL.createObjectURL(file)}
                                  style={{
                                    maxWidth: '600px',
                                    maxHeight: '600px',
                                    marginBottom: '18px',
                                  }}
                                />
                              );
                            })}
                        </Box>
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
                              onChange={(e) => setFiles(e.target.files)}
                            />
                            <label htmlFor='file'>
                              <div
                                className='item'
                                sx={{
                                  display: 'flex',
                                }}
                              >
                                <CloudUploadIcon
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
                      {/* Name */}
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
                          <InputLabel id='status-input'>Status</InputLabel>
                          <Select
                            labelId='status-input'
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
                          <InputLabel id='clay-type-input'>
                            Clay Type
                          </InputLabel>
                          <Select
                            labelId='clay-type-input'
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
                          <InputLabel id='location-input'>Location</InputLabel>
                          <Select
                            labelId='location-input'
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
                          as='textarea'
                          placeholder='Any notes about the project.'
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
                    <Button
                      disabled={!dirty || !isValid}
                      variant='contained'
                      color='primary'
                      type='Submit'
                    >
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

export default ProjectForm;
