import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import {
    Button,
    TextField,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    Checkbox,
    FormControlLabel,
} from '@mui/material';
import { Navigate } from 'react-router-dom';
import { FormValues, ProfileProps, ProfileState } from './types';
import { profileSchema } from './validationSchemas';

class Profile extends Component<ProfileProps, ProfileState> {
    state: ProfileState = {
        navigate: false,
        initialValues: {
            name: '',
            number: '',
            position: '',
            gender: '',
            address: '',
            agree: false,
        },
        isEditing: false,
    };

    componentDidMount() {
        const formData = localStorage.getItem('formData');
        if (formData) {
            this.setState({ initialValues: JSON.parse(formData) });
        }
    }

    handleSubmit = (values: FormValues) => {
        localStorage.setItem('formData', JSON.stringify(values));
        this.props.onSaveSuccess();
        this.setState({ navigate: false, isEditing: false });
    };

    toggleEditMode = () => {
        this.setState((prevState) => ({
            isEditing: !prevState.isEditing,
        }));
    };

    render() {
        const { initialValues, navigate, isEditing } = this.state;

        if (navigate) {
            return <Navigate to="/dashboard" />;
        }

        return (
            <div>


                <Formik
                    initialValues={initialValues}
                    validationSchema={profileSchema}
                    onSubmit={this.handleSubmit}
                    enableReinitialize
                >
                    {() => (
                        <Form className="p-4">
                            <Field
                                name="name"
                                as={TextField}
                                label="Name"
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                            />
                            <ErrorMessage name="name" component="div" className="text-red-500" />

                            <Field
                                name="number"
                                as={TextField}
                                label="Mobile Number"
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                            />
                            <ErrorMessage name="number" component="div" className="text-red-500" />

                            <FormControl fullWidth margin="normal" disabled={!isEditing}>
                                <InputLabel>Position</InputLabel>
                                <Field name="position" as={Select} label="Position">
                                    <MenuItem value="Software Engineer">Software Engineer</MenuItem>
                                    <MenuItem value="HR">HR</MenuItem>
                                    <MenuItem value="Manager">Manager</MenuItem>
                                </Field>
                            </FormControl>
                            <ErrorMessage name="position" component="div" className="text-red-500" />

                            <FormControl fullWidth margin="normal" disabled={!isEditing}>
                                <InputLabel>Gender</InputLabel>
                                <Field name="gender" as={Select} label="Gender">
                                    <MenuItem value="Male">Male</MenuItem>
                                    <MenuItem value="Female">Female</MenuItem>
                                    <MenuItem value="Other">Other</MenuItem>
                                </Field>
                            </FormControl>
                            <ErrorMessage name="gender" component="div" className="text-red-500" />

                            <Field
                                name="address"
                                as={TextField}
                                label="Address"
                                multiline
                                rows={4}
                                fullWidth
                                margin="normal"
                                disabled={!isEditing}
                            />
                            <ErrorMessage name="address" component="div" className="text-red-500" />
                            <Button variant="contained" color="primary"
                                style={{ margin: '5px'}}
                                onClick={this.toggleEditMode}>
                                {isEditing ? 'Cancel' : 'Edit'}
                            </Button>

                            {isEditing && (
                                <Button type="submit" style={{margin:'5px'}} variant="contained" color="primary">
                                    Save Profile
                                </Button>
                            )}
                        </Form>
                    )}
                </Formik>
            </div>
        );
    }
}

export default Profile;
