import React, { Component } from 'react';
import { withStyles, WithStyles, Theme, createStyles } from '@material-ui/core/styles';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';
import Header from './Header';
import Footer from './Footer';
import Profile from './Profile';
import AddUser from './AddUser';
import {TabPanelProps,DashboardState} from './types'


function TabPanel(props: TabPanelProps) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`vertical-tabpanel-${index}`}
      aria-labelledby={`vertical-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

function a11yProps(index: any) {
  return {
    id: `vertical-tab-${index}`,
    'aria-controls': `vertical-tabpanel-${index}`,
  };
}

const styles = (theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      flexDirection: 'column',
      minHeight: '96.3vh',
      backgroundColor: theme.palette.background.paper,
    },
    header: {
      height: '80px',
      flexShrink: 0,
      backgroundColor: '#f5f5f5',
    },
    tabsContainer: {
      display: 'flex',
      flexGrow: 1,
      overflow: 'hidden',
    },
    tabs: {
      borderRight: `1px solid ${theme.palette.divider}`,
      minWidth: '150px',
    },
    content: {
      flexGrow: 1,
      overflowY: 'auto',
      padding: theme.spacing(3),
    },
    footer: {
      height: '60px', 
      flexShrink: 0,
      backgroundColor: '#f5f5f5',
      textAlign: 'center',
    },
  });

interface VerticalTabsProps extends WithStyles<typeof styles> {
  onLogout?: () => void;
}

interface VerticalTabsState {
  value: number;
}

class VerticalTabs extends Component<VerticalTabsProps, VerticalTabsState, DashboardState> {
  constructor(props: VerticalTabsProps) {
    super(props);
    this.state = {
      value: 0,
    };
  }


  handleChange = (event: React.ChangeEvent<{}>, newValue: number) => {
    this.setState({ value: newValue });
  };

  handleLogout = () => {
    if (this.props.onLogout) {
      this.props.onLogout();
    }
  };

  render() {
    const { classes } = this.props;
    const { value } = this.state;

    return (
      <div className={classes.root}>
        <div className={classes.header}>
          <Header />
        </div>

        <div className={classes.tabsContainer}>
          <Tabs
            orientation="vertical"
            value={value}
            onChange={this.handleChange}
            aria-label="Vertical tabs example"
            className={classes.tabs}
            style={{
              width:'100px'
            }}
          >
            <Tab label="Profile" {...a11yProps(0)} />
            <Tab label="Add User" {...a11yProps(1)} />
            <Tab label="Logout" {...a11yProps(2)} onClick={this.handleLogout} />
          </Tabs>

          <div className={classes.content}>
            <TabPanel value={value} index={0}>
              <Profile onSaveSuccess={() => {}} />
            </TabPanel>
            <TabPanel value={value} index={1}>
              <AddUser/>
            </TabPanel>
          </div>
        </div>

        <div className={classes.footer}>
          <Footer />
        </div>
      </div>
    );
  }
}

export default withStyles(styles)(VerticalTabs);
