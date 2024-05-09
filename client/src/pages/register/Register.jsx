import React, { useState } from 'react';
import { Formik, Field, Form } from 'formik';
import { useNavigate } from 'react-router-dom';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import {
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
import { RegisterSchema, options } from './RegisterSchema';
import CloudUploadIcon from '@mui/icons-material/CloudUpload';

const ProjectForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  // const classes = useStyle();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append('file', file);
      const res = await makeRequest.post('/upload', formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const mutation = useMutation(
    (newUser) => {
      // send form fields to server
      return makeRequest.post('/auth/register', newUser);
    },
    {
      onSuccess: () => {
        queryClient.invalidateQueries(['auth']);
      },
    }
  );

  const handleSubmit = async (values) => {
    let profileUrl = '';

    // make api call and get async response back and name profileUrl
    if (file) profileUrl = await upload();
    // if get back profileUrl, then pass into mutation fn and this creates a new project with the fields and img uploaded
    mutation.mutate({ ...values, profilePic: profileUrl });

    setFile(null);
    console.log('User created!');

    navigate('/');
  };

  return (
    <>
      <Grid container justify='center' spacing={1}>
        <Grid item md={6}>
          <Card>
            <CardHeader title='Create an Account'></CardHeader>

            <Formik
              initialValues={{
                username: '',
                email: '',
                password: '',
                firstName: '',
                lastName: '',
                profilePic: '',
              }}
              enableReinitialize
              validationSchema={RegisterSchema}
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
                    {/* Upload Profile Pic */}
                    <Grid item xs={12} sm={6} md={12}>
                      <FormControl fullWidth variant='outlined'>
                        <Box className='imgContainer'>
                          {file && (
                            <img
                              className='file'
                              alt=''
                              src={URL.createObjectURL(file)}
                              style={{
                                maxWidth: '600px',
                                maxHeight: '600px',
                                marginBottom: '18px',
                              }}
                            />
                          )}
                        </Box>
                        {/* will create a fake url to upload project */}
                        <Box sx={{ mb: 2 }}>
                          <Fab variant='extended' color='primary'>
                            <input
                              type='file'
                              id='file'
                              style={{
                                display: 'none',
                              }}
                              // only allow to upload 1 single file
                              onChange={(e) => setFile(e.target.files[0])}
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
                                  Add Profile Picture
                                </Typography>
                              </div>
                            </label>
                          </Fab>
                        </Box>
                      </FormControl>
                    </Grid>

                    <Grid item container spacing={1} justify='center'>
                      {/* Username */}
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Username'
                          variant='outlined'
                          fullWidth
                          name='username'
                          value={values.username}
                          component={TextField}
                          required
                        />
                      </Grid>
                      {/* Email */}
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Email'
                          variant='outlined'
                          fullWidth
                          name='email'
                          value={values.email}
                          component={TextField}
                          required
                        />
                      </Grid>
                      {/* First Name */}
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='First Name'
                          variant='outlined'
                          fullWidth
                          name='firstName'
                          value={values.firstName}
                          component={TextField}
                          required
                        />
                      </Grid>
                      {/* Last Name */}
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Last Name'
                          variant='outlined'
                          fullWidth
                          name='lastName'
                          value={values.lastName}
                          component={TextField}
                          required
                        />
                      </Grid>

                      {/* Password */}
                      <Grid item xs={12} sm={6} md={6}>
                        <Field
                          label='Password'
                          variant='outlined'
                          fullWidth
                          name='password'
                          value={values.password}
                          component={TextField}
                          required
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
