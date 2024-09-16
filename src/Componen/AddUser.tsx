import React, { Component } from 'react';
import { Formik, Form, Field, ErrorMessage } from 'formik';
import * as Yup from 'yup';
import { Button, TextField, MenuItem, Select, FormControl, InputLabel, List, ListItem, ListItemAvatar, Avatar, ListItemText, Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import PersonAddAltIcon from '@mui/icons-material/PersonAddAlt';
interface FormValues {
    name: string;
    number: string;
    position: string;
    gender: string;
    address: string;
}

interface User {
    name: string;
    number: string;
    position: string;
    gender: string;
    address: string;
}

interface State {
    users: User[];
    openForm: boolean;
    openDetails: boolean;
    selectedUser: User | null;
    isEditing: boolean;
}

const validationSchema = Yup.object({
    name: Yup.string().required('Enter your name').min(3, 'Name must be at least 3 characters'),
    number: Yup.string()
        .required('Enter your mobile number')
        .matches(/^[0-9]+$/, 'Must be only numbers')
        .min(10, 'Must be exactly 10 digits')
        .max(10, 'Must be exactly 10 digits'),
    position: Yup.string().required('Select your position'),
    gender: Yup.string().required('Select your gender'),
    address: Yup.string().required('Enter your address'),
});

export default class AddUser extends Component<{}, State> {
    constructor(props: {}) {
        super(props);
        this.state = {
            users: [],
            openForm: false,
            openDetails: false,
            selectedUser: null,
            isEditing: false,
        };
    }

    componentDidMount() {
        const users = localStorage.getItem('users');
        if (users) {
            this.setState({ users: JSON.parse(users) });
        }
    }

    handleSubmit = (values: FormValues, { resetForm }: any) => {
        const newUser: User = { ...values };
        this.setState(prevState => {
            let updatedUsers;
            if (this.state.isEditing && this.state.selectedUser) {
                updatedUsers = prevState.users.map(user =>
                    user === this.state.selectedUser ? newUser : user
                );
            } else {
                updatedUsers = [...prevState.users, newUser];
            }
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            return {
                users: updatedUsers,
                openForm: false,
                selectedUser: null,
                isEditing: false,
            };
        }, () => resetForm());
    };

    handleClickOpenForm = (user?: User) => {
        if (user) {
            this.setState({ openForm: true, selectedUser: user, isEditing: true });
        } else {
            this.setState({ openForm: true, selectedUser: null, isEditing: false });
        }
    };

    handleCloseForm = () => {
        this.setState({ openForm: false, selectedUser: null, isEditing: false });
    };

    handleOpenDetails = (user: User) => {
        this.setState({ openDetails: true, selectedUser: user });
    };

    handleCloseDetails = () => {
        this.setState({ openDetails: false, selectedUser: null });
    };

    handleDeleteUser = (userToDelete: User) => {
        this.setState(prevState => {
            const updatedUsers = prevState.users.filter(user => user !== userToDelete);
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            return {
                users: updatedUsers,
                openDetails: false,
                selectedUser: null,
            };
        });
    };

    render() {
        const { users, openForm, openDetails, selectedUser, isEditing } = this.state;

        return (
            <div style={{width:'100%', height:'70vh'}}>
                

                <Dialog open={openForm} onClose={this.handleCloseForm} fullWidth>
                    <DialogTitle>{isEditing ? 'Edit User' : 'Add New User'}</DialogTitle>
                    <DialogContent>
                        <Formik
                            initialValues={isEditing && selectedUser ? selectedUser : { name: '', number: '', position: '', gender: '', address: '' }}
                            validationSchema={validationSchema}
                            onSubmit={this.handleSubmit}
                        >
                            {() => (
                                <Form>
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
                                    <DialogActions>
                                        <Button onClick={this.handleCloseForm} color="secondary">
                                            Cancel
                                        </Button>
                                        <Button type="submit" variant="contained" color="primary">
                                            {isEditing ? 'Update User' : 'Add User'}
                                        </Button>
                                    </DialogActions>
                                </Form>
                            )}
                        </Formik>
                    </DialogContent>
                </Dialog>

                <div className="mt-8">
                    <h2>Added Users</h2>
                    <List style={{
                        display: 'grid',
                        gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
                        gap: '16px',
                    }}>

                        {users.map((user, index) => (
                            <ListItem key={index} onClick={() => this.handleOpenDetails(user)} style={{
                                width: '300px'
                            }}>
                                <ListItemAvatar>
                                    <Avatar>{user.name.charAt(0)}</Avatar>
                                </ListItemAvatar>
                                <ListItemText
                                    primary={user.name}
                                    secondary={`${user.position} - ${user.number}`}
                                />
                            </ListItem>
                        ))}
                    </List>
                </div>

                <Dialog open={openDetails} onClose={this.handleCloseDetails} fullWidth>
                    <DialogTitle>User Details</DialogTitle>
                    <DialogContent>
                        {selectedUser && (
                            <div>
                                <p><strong>Name:</strong> {selectedUser.name}</p>
                                <p><strong>Mobile Number:</strong> {selectedUser.number}</p>
                                <p><strong>Position:</strong> {selectedUser.position}</p>
                                <p><strong>Gender:</strong> {selectedUser.gender}</p>
                                <p><strong>Address:</strong> {selectedUser.address}</p>
                            </div>
                        )}
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={this.handleCloseDetails} color="primary">
                            Close
                        </Button>
                        {selectedUser && (
                            <>
                                <Button onClick={() => this.handleClickOpenForm(selectedUser)} color="primary">
                                    Edit
                                </Button>
                                <Button onClick={() => this.handleDeleteUser(selectedUser)} color="error">
                                    Delete
                                </Button>
                            </>
                        )}
                    </DialogActions>
                </Dialog>
                <Button  style={{ 
                    position:'absolute',
                    bottom:'15%',
                    right:'4%'
                    }} variant="contained" color="primary" onClick={() => this.handleClickOpenForm()}>
                    <PersonAddAltIcon/> 
                </Button>
            </div>
        );
    }
}
