import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import MenuIcon from 'material-ui-icons/Menu';

import AppBar from 'material-ui/AppBar';
import { CircularProgress } from 'material-ui/Progress';
import Drawer from 'material-ui/Drawer';
import Toolbar from 'material-ui/Toolbar';
import IconButton from 'material-ui/IconButton';
import Typography from 'material-ui/Typography';

import AccountSidebar from '../components/AccountSidebar';
import GuestSidebar from '../components/GuestSidebar';

import labels from '../labels/uk';

import { signOut } from '../actions/login';

const styles = theme => ({
  root: {
    width: '100%',
  },

  drawer: {
    width: 250,
  },

  main: {
    padding: theme.spacing.unit * 3,
    [theme.breakpoints.up('md')]: {
      paddingLeft: theme.spacing.unit * 5,
      paddingRight: theme.spacing.unit * 5,
    },
    marginTop: theme.typography.fontSize * 4,
  },
});

class Main extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showDrawer: false,
    };
  }

  handleOpenDrawer = () => {
    this.setState({
      showDrawer: true,
    });
  }

  handleCloseDrawer = () => {
    this.setState({
      showDrawer: false,
    });
  }

  handleSidebarClick = callback => () => {
    callback();
    this.handleCloseDrawer();
  }

  navigateToSurveys = () => {
    this.props.history.push('/surveys');
  }

  navigateToLogin = () => {
    this.props.history.push('/login');
  }

  render() {
    const { showDrawer } = this.state;
    const { classes, loggedIn, userName, onSignOut } = this.props;

    if (this.props.preloadingUser) {
      return (
        <CircularProgress />
      );
    }

    const sidebar = loggedIn ? (
      <AccountSidebar
        userName={userName}
        onMySurveys={this.handleSidebarClick(this.navigateToSurveys)}
        onSignOut={this.handleSidebarClick(onSignOut)}
      />
    ) : (
      <GuestSidebar
        onSignIn={this.handleSidebarClick(this.navigateToLogin)}
      />
    );

    return (
      <div className={classes.root}>
        <AppBar>
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="Menu"
              onClick={this.handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              type="title"
              color="inherit"
            >
              {labels.appTitle}
            </Typography>
          </Toolbar>
        </AppBar>
        <Drawer
          type="temporary"
          open={showDrawer}
          onClose={this.handleCloseDrawer}
        >
          <div className={classes.drawer}>
            {sidebar}
          </div>
        </Drawer>
        <main className={classes.main}>
          {this.props.children}
        </main>
      </div>
    );
  }
}

Main.propTypes = {
  children: PropTypes.node.isRequired,
  classes: PropTypes.object.isRequired,
  history: PropTypes.object.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  preloadingUser: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    loggedIn: login.loggedIn,
    preloadingUser: login.preloading,
    userName: login.name,
  };
};

const mapDispatchToProps = dispatch => ({
  onSignOut() {
    dispatch(signOut());
  },
});

export default withRouter(connect(
  mapStateToProps,
  mapDispatchToProps,
)(withStyles(styles)(Main)));
