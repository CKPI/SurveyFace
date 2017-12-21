import React, { Component } from 'react';
import PropTypes from 'prop-types';

import { withStyles } from 'material-ui/styles';

import Typography from 'material-ui/Typography';
import ErrorIcon from 'material-ui-icons/Error';

const styles = (theme) => {
  const iconSize = theme.typography.fontSize * 2;

  return {
    container: {
      display: 'flex',
      alignItems: 'center',
    },

    icon: {
      width: iconSize,
      height: iconSize,
      marginRight: theme.spacing.unit,
    },
  };
};

class NotFound extends Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.container}>
        <ErrorIcon color="error" className={classes.icon} />
        <Typography color="error" type="headline">
          Not found
        </Typography>
      </div>
    );
  }
}

NotFound.propTypes = {
  classes: PropTypes.object.isRequired,
};

export default withStyles(styles)(NotFound);
