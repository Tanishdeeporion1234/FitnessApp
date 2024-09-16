import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Avatar } from '@mui/material';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';
import { HeaderState } from './types';

const styles = (theme: Theme) =>
  createStyles({
    root: {
      flexGrow: 1,
    },
    title: {
      flexGrow: 1,
    },
    avatar: {
      marginRight: theme.spacing(2),
    },
    userName: {
      marginLeft: theme.spacing(2),
    },
  });

interface HeaderProps extends WithStyles<typeof styles> {}

class Header extends Component<HeaderProps, HeaderState> {
  state: HeaderState = {
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
    name: '',
  };

  componentDidMount() {
    const formData = localStorage.getItem('formData');
    if (formData) {
      const parsedData = JSON.parse(formData);
      this.setState({
        name: parsedData.name || '',
        initialValues: parsedData,
      });
    }
  }

  render() {
    const { classes } = this.props;
    const { name } = this.state;
    const firstLetter = name.charAt(0).toUpperCase();

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" className={classes.title}>
              My Header
            </Typography>
            <Avatar className={classes.avatar}>{firstLetter}</Avatar>
            <Typography variant="h6" className={classes.userName}>
              {name || 'N/A'}
            </Typography>
          </Toolbar>
        </AppBar>
      </div>
    );
  }
}

export default withStyles(styles)(Header);
