import React, { Component } from 'react';
import { AppBar, Toolbar, Typography, Link } from '@material-ui/core';
import { withStyles, WithStyles, createStyles, Theme } from '@material-ui/core/styles';

const styles = (theme: Theme) =>
  createStyles({
    footer: {
      top: 'auto',
      bottom: 0,
      backgroundColor: theme.palette.primary.main,
      color: theme.palette.common.white,
      padding: theme.spacing(2),
    },
    toolbar: {
      justifyContent: 'center',
    },
    link: {
      marginLeft: theme.spacing(1),
      marginRight: theme.spacing(1),
      color: theme.palette.common.white,
    },
  });

interface FooterProps extends WithStyles<typeof styles> {}

class Footer extends Component<FooterProps> {
  render() {
    const { classes } = this.props;

    return (
      <AppBar position="static" className={classes.footer}>
        <Toolbar className={classes.toolbar}>
          <Typography variant="body1" align="center">
            &copy; {new Date().getFullYear()} My Footer
          </Typography>
          <Link href="#" className={classes.link}>
            Privacy Policy
          </Link>
          <Link href="#" className={classes.link}>
            Terms of Service
          </Link>
        </Toolbar>
      </AppBar>
    );
  }
}

export default withStyles(styles)(Footer);
