import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { withRouter } from 'react-router-dom';

import { withStyles } from 'material-ui/styles';

import MenuIcon from 'material-ui-icons/Menu';

import AppBar from 'material-ui/AppBar';
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
  },
});

class Main extends Component {
  constructor(...args) {
    super(...args);
    this.state = {
      showDrawer: false,
    };
  }

  openDrawer = () => {
    this.setState({
      showDrawer: true,
    });
  }

  closeDrawer = () => {
    this.setState({
      showDrawer: false,
    });
  }

  handleSidebarClick = callback => () => {
    callback();
    this.closeDrawer();
  }

  render() {
    const { showDrawer } = this.state;
    const { classes, loggedIn, userName, onSignOut } = this.props;

    const sidebar = loggedIn ? (
      <AccountSidebar
        userName={userName}
        onMyPolls={this.handleSidebarClick(() => {})}
        onSignOut={this.handleSidebarClick(onSignOut)}
      />
    ) : (
      <GuestSidebar
        onSignIn={this.handleSidebarClick(() => {})}
      />
    );

    return (
      <div className={classes.root}>
        <AppBar position="static">
          <Toolbar>
            <IconButton
              color="contrast"
              aria-label="Menu"
              onClick={this.openDrawer}
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
          onClose={this.closeDrawer}
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
  classes: PropTypes.object.isRequired,
  children: PropTypes.node.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  userName: PropTypes.string,
  onSignOut: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    loggedIn: login.loggedIn,
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
