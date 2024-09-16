import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, Checkbox, FormControlLabel } from '@mui/material';
import { Navigate } from 'react-router-dom';
import { profileSchema } from './validationSchemas';
import { FormValues, LoginProps, LoginState } from './types';
import Box from '@mui/material/Box';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormLabel from '@mui/material/FormLabel';
import Link from '@mui/material/Link';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import { styled } from '@mui/material/styles';

class Login extends Component<LoginProps, LoginState> {
  state: LoginState = {
    navigate: false
  };

  handleSubmit = (values: FormValues) => {
    localStorage.setItem('formData', JSON.stringify(values));
    this.props.onLoginSuccess();
    this.setState({ navigate: true });
  };

  render() {
    if (this.state.navigate) {
      return <Navigate to="/dashboard" />;
    }

    return (
      <div style={{ display: 'flex', justifyContent:'center',alignItems:'center' }}>
          {/* <div style={{ width: '55%' }}>
            <h1 >Login Your Account <br /> <span>Access your personalized dashboard.</span></h1>
            <img
              src="https://images.pexels.com/photos/373394/pexels-photo-373394.jpeg?auto=compress&cs=tinysrgb&w=600"
              alt=""
            />
          </div> */}
        <Formik
          initialValues={{ name: '', number: '', position: '', gender: '', address: '', agree: false }}
          validationSchema={profileSchema}
          onSubmit={this.handleSubmit}
        
        >
          {() => (
            <Form className="p-4 w-[45%] ">
              <Field name="name" as={TextField} label="Name" fullWidth margin="normal" />
              <ErrorMessage name="name" component="div" className="text-red-500" />

              <Field name="number" as={TextField} label="Mobile Number" fullWidth margin="normal" />
              <ErrorMessage name="number" component="div" className="text-red-500" />

              <FormControl fullWidth margin="normal">
                <InputLabel>Position</InputLabel>
                <Field name="position" as={Select} label="Position">
                  <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                  <MenuItem value="HR">HR</MenuItem>
                  <MenuItem value="Manager">Manager</MenuItem>
                </Field>
              </FormControl>
              <ErrorMessage name="position" component="div" className="text-red-500" />

              <FormControl fullWidth margin="normal">
                <InputLabel>Gender</InputLabel>
                <Field name="gender" as={Select} label="Gender">
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Female">Female</MenuItem>
                  <MenuItem value="Other">Other</MenuItem>
                </Field>
              </FormControl>
              <ErrorMessage name="gender" component="div" className="text-red-500" />

              <Field name="address" as={TextField} label="Address" multiline rows={4} fullWidth margin="normal" />
              <ErrorMessage name="address" component="div" className="text-red-500" />

              <Field name="agree" as={FormControlLabel} control={<Checkbox />} label="Agree to terms" />
              <ErrorMessage name="agree" component="div" className="text-red-500" />

              <Button type="submit" variant="contained" color="primary">
                Login
              </Button>
            </Form>
          )}
        </Formik>


      </div>
    );
  }
}

export default Login;
