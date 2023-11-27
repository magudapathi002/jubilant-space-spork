import * as Yup from 'yup';
import React, { useEffect, useState } from 'react';
import { Button, Grid, TextField } from '@mui/material';
import { Form, Formik } from 'formik';
import axios from 'axios';

const SignupSchema = Yup.object().shape({
  firstName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  lastName: Yup.string().min(2, 'Too Short!').max(50, 'Too Long!').required('Required'),
  email: Yup.string().email('Invalid email').required('Required'),
  dob: Yup.date()
    .max(new Date(), 'Date of birth must be in the past')
    .required('Required'),
});

function Personal({ onNext }) {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
  });

  useEffect(() => {
    // Fetch data from API when the component mounts
    axios.get('https://655c53bf25b76d9884fcfb77.mockapi.io/data/1')
      .then((response) => {
        setFormData(response.data);
      })
      .catch((error) => {
        console.error('Error fetching data:', error);
      });
  }, []);

  const handleSubmit = (values) => {
    // Update data and proceed to the next step
    axios.put('https://655c53bf25b76d9884fcfb77.mockapi.io/data/1', values)
      .then((response) => {
        console.log('Data updated successfully:', response.data);
        onNext();
      })
      .catch((error) => {
        console.error('Error updating data:', error);
      });
  };

  return (
    <div>
      <h1>Personal Details</h1>
      <Formik
        initialValues={formData}
        validationSchema={SignupSchema}
        onSubmit={(values) => handleSubmit(values)}
      >
        {({ errors, touched, handleChange, handleSubmit }) => (
          <Form onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12}>
                <TextField
                  label="First Name"
                  variant="outlined"
                  fullWidth
                  name="firstName"
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prevData) => ({
                      ...prevData,
                      firstName: e.target.value,
                    }));
                  }}
                  value={formData.firstName}
                  error={touched.firstName && Boolean(errors.firstName)}
                  helperText={touched.firstName && errors.firstName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Last Name"
                  variant="outlined"
                  fullWidth
                  name="lastName"
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prevData) => ({
                      ...prevData,
                      lastName: e.target.value,
                    }));
                  }}
                  value={formData.lastName}
                  error={touched.lastName && Boolean(errors.lastName)}
                  helperText={touched.lastName && errors.lastName}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Email"
                  variant="outlined"
                  fullWidth
                  name="email"
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prevData) => ({
                      ...prevData,
                      email: e.target.value,
                    }));
                  }}
                  value={formData.email}
                  error={touched.email && Boolean(errors.email)}
                  helperText={touched.email && errors.email}
                />
              </Grid>
              <Grid item xs={12}>
                <TextField
                  label="Date of Birth"
                  variant="outlined"
                  fullWidth
                  name="dob"
                  type='date'
                  onChange={(e) => {
                    handleChange(e);
                    setFormData((prevData) => ({
                      ...prevData,
                      dob: e.target.value,
                    }));
                  }}
                  value={formData.dob}
                  InputLabelProps={{
                    shrink: true,
                  }}
                  error={touched.dob && Boolean(errors.dob)}
                  helperText={touched.dob && errors.dob}
                />
              </Grid>
              <Grid item xs={12}>
                <Button type="submit" variant="contained" color="primary">
                  Submit
                </Button>
              </Grid>
            </Grid>
          </Form>
        )}
      </Formik>
    </div>
  );
}

export default Personal;
