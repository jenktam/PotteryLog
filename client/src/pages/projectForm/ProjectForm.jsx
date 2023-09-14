import React, { useState } from 'react';
import "./ProjectForm.scss";
import { Formik, Field, Form } from 'formik';
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
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
 import { TextField } from "formik-material-ui"
import { makeRequest } from "../../axios";
import { ProjectSchema, options } from './ProjectFormSchema';
import CloudUploadIcon from "@mui/icons-material/CloudUpload";

const ProjectForm = () => {
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [file, setFile] = useState(null);
  // const classes = useStyle();

  const upload = async () => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post('/upload', formData)
      return res.data;
    }
    catch (err) {
      console.log(err)
    }
  }

  const mutation = useMutation((newProject) => {
    // send form fields to server
    return makeRequest.post('/projects', newProject);
  }, {
    // invalidate and refetch
    // if successful, refetch projects because our query name is projects
    // -->**search for useQuery(["projects"])
    onSuccess: () => {
      queryClient.invalidateQueries(['projects']);
    }
  });


  const handleSubmit = async (values) => {
    let imgUrl = "";

    // make api call and get async response back and name imgUrl
    if(file) imgUrl = await upload();
    // if get back imgUrl, then pass into mutation fn and this creates a new project with the fields and img uploaded
    mutation.mutate({ ...values, img: imgUrl });

    setFile(null);
    navigate("/");
  };

  return (
    <>
      <Grid container justify="center" spacing={1}>
        <Grid item md={6}>
          <Card>
            <CardHeader title="Add New Project"></CardHeader>

            <Formik
              initialValues={{
                name: '',
                status: '',
                img: '',
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
                  <FormControl fullWidth variant="outlined">
                    <Box className="imgContainer">
                      {file && (
                        <img
                          className="file"
                          alt="" 
                          src={URL.createObjectURL(file)}
                          style={{ maxWidth: '600px', maxHeight: '600px', marginBottom: '18px'}}
                        />
                      )}
                    </Box>
                    {/* will create a fake url to upload project */}
                    <Box sx={{ mb: 2 }}>
                    <Fab variant="extended" color="primary">
                      <input
                        type="file"
                        id="file"
                        style={{ display: "none" }}
                        // only allow to upload 1 single file
                        onChange={(e) => setFile(e.target.files[0])}
                      />
                      <label htmlFor="file">
                        <div className="item" sx={{ display: 'flex' }}>
                          <CloudUploadIcon sx={{ mr: 1 }} />
                          <Typography component="span">Add Image</Typography>
                        </div>
                      </label>
                    </Fab>
                    </Box>
                  </FormControl>
                </Grid>
                
                <Grid item container spacing={1} justify="center">
                  {/* Name */}
                  <Grid item xs={12} sm={6} md={6}>
                    <Field
                      label="Name"
                      variant="outlined"
                      fullWidth
                      name="name"
                      value={values.name}
                      component={TextField}
                      required
                    />
                  </Grid>

                  <Grid item xs={12} sm={6} md={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Status
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Status"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.status}
                        name="status"
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
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Clay Type
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Clay Type"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.clayType}
                        name="clayType"
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
                      label="Weight"
                      variant="outlined"
                      fullWidth
                      name="weight"
                      value={values.weight}
                      component={TextField}
                      required
                    />
                  </Grid>
                 
                  <Grid item xs={12} sm={6} md={6}>
                    <Field
                      label="Size"
                      variant="outlined"
                      fullWidth
                      name="size"
                      value={values.size}
                      component={TextField}
                      required
                    />
                  </Grid>
                
                  <Grid item xs={12} sm={6} md={6}>
                    <Field
                      label="Handbuilt"
                      variant="outlined"
                      fullWidth
                      name="handbuilt"
                      value={values.handbuilt}
                      component={TextField}
                      required
                    />
                  </Grid>
                  
                  <Grid item xs={12} sm={6} md={12}>
                    <FormControl fullWidth variant="outlined">
                      <InputLabel id="demo-simple-select-outlined-label">
                        Location
                      </InputLabel>
                      <Select
                        labelId="demo-simple-select-outlined-label"
                        id="demo-simple-select-outlined"
                        label="Location"
                        onChange={handleChange}
                        onBlur={handleBlur}
                        value={values.location}
                        name="Location"
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
                      label="Firing"
                      variant="outlined"
                      fullWidth
                      name="firing"
                      value={values.firing}
                      component={TextField}
                    />
                  </Grid>
                 
                  <Grid item xs={12} sm={6} md={6}>
                    <Field
                      label="Glazing"
                      placeholder="Glazes used"
                      variant="outlined"
                      fullWidth
                      name="glazing"
                      value={values.glazing}
                      component={TextField}
                    />
                  </Grid>
                 
                  <Grid item xs={12} sm={6} md={6}>
                    <Field
                      label="Notes"
                      variant="outlined"
                      fullWidth
                      name="notes"
                      value={values.notes}
                      component={TextField}
                    />
                  </Grid>

                </Grid>
                </CardContent>

                <CardActions>
                  <Button
                    disabled={!dirty || !isValid}
                    variant="contained"
                    color="primary"
                    type="Submit"
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