import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { Route, Redirect } from 'react-router-dom';

class PrivateRoute extends Component {
  renderChild = (props) => {
    const { component: Component, loggedIn } = this.props;

    if (!loggedIn) {
      return (
        <Redirect to={{ pathname: '/login' }} />
      );
    }

    return (
      <Component {...props} />
    );
  }

  render() {
    // eslint-disable-next-line no-unused-vars
    const { component: _, ...childProps } = this.props;

    return (
      <Route
        {...childProps}
        render={this.renderChild}
      />
    );
  }
}

PrivateRoute.propTypes = {
  component: PropTypes.func.isRequired,
  loggedIn: PropTypes.bool.isRequired,
};

const mapStateToProps = state => ({
  loggedIn: state.login.loggedIn,
});

export default connect(mapStateToProps)(PrivateRoute);
