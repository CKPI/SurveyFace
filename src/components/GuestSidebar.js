import React, { Component } from 'react';
import PropTypes from 'prop-types';

import List, { ListItem, ListItemIcon, ListItemText } from 'material-ui/List';
import AccountCircleIcon from 'material-ui-icons/AccountCircle';

import labels from '../labels/uk';

class GuestSidebar extends Component {
  render() {
    const { onSignIn } = this.props;
    return (
      <List>
        <ListItem button onClick={onSignIn}>
          <ListItemIcon>
            <AccountCircleIcon />
          </ListItemIcon>
          <ListItemText primary={labels.signIn} />
        </ListItem>
      </List>
    );
  }
}

GuestSidebar.propTypes = {
  onSignIn: PropTypes.func.isRequired,
};

export default GuestSidebar;
