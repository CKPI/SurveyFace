import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Avatar from 'material-ui/Avatar';
import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import Typography from 'material-ui/Typography';

import AccountCircleIcon from 'material-ui-icons/AccountCircle';
import AssessmentIcon from 'material-ui-icons/Assessment';
import ExitToAppIcon from 'material-ui-icons/ExitToApp';

import labels from '../labels/uk';

const styles = theme => ({
  avatarWrapper: {
    margin: '10px 5px 10px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },

  avatar: {
    margin: 10,
    color: theme.palette.common.white,
    backgroundColor: theme.palette.secondary[500],
  },

  name: {
    textAlign: 'center',
  },
});

class AccountSidebar extends Component {
  render() {
    const { classes, userName, onMySurveys, onSignOut } = this.props;

    return (
      <Fragment>
        <div className={classes.avatarWrapper}>
          <Avatar className={classes.avatar}>
            <AccountCircleIcon />
          </Avatar>
          <Typography className={classes.name}>
            {userName}
          </Typography>
        </div>

        <List>
          <ListItem button onClick={onMySurveys}>
            <ListItemIcon>
              <AssessmentIcon />
            </ListItemIcon>
            <ListItemText primary={labels.mySurveys} />
          </ListItem>
          <ListItem button onClick={onSignOut}>
            <ListItemIcon>
              <ExitToAppIcon />
            </ListItemIcon>
            <ListItemText primary={labels.signOut} />
          </ListItem>
        </List>
      </Fragment>
    );
  }
}

AccountSidebar.propTypes = {
  classes: PropTypes.object.isRequired,
  userName: PropTypes.string.isRequired,
  onSignOut: PropTypes.func.isRequired,
  onMySurveys: PropTypes.func.isRequired,
};

export default withStyles(styles)(AccountSidebar);
