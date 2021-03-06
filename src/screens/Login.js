import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';

import { withStyles } from 'material-ui/styles';

import Button from 'material-ui/Button';
import { CircularProgress } from 'material-ui/Progress';
import { FormControl } from 'material-ui/Form';
import IconButton from 'material-ui/IconButton';
import Input, { InputAdornment, InputLabel } from 'material-ui/Input';
import Typography from 'material-ui/Typography';

import VisibilityIcon from 'material-ui-icons/Visibility';
import VisibilityOffIcon from 'material-ui-icons/VisibilityOff';

import { updateLogin, updatePassword, signIn } from '../actions/login';

import labels from '../labels/uk';
import { Redirect } from 'react-router-dom';

const styles = theme => ({
  form: {
    width: '100%',
  },

  formControl: {
    marginTop: theme.spacing.unit,
  },

  buttonArea: {
    marginTop: theme.spacing.unit * 3,
    display: 'flex',
  },

  progress: {
    marginLeft: theme.spacing.unit,
  },

  error: {
    marginTop: theme.spacing.unit,
  },
});

class Login extends Component {
  constructor(...args) {
    super(...args);

    this.state = {
      showPassword: false,
    };
  }

  handleLoginChange = (event) => {
    this.props.onLoginChange(event.target.value);
  }

  handlePasswordChange = (event) => {
    this.props.onPasswordChange(event.target.value);
  }

  handleShowPasswordClick = () => {
    this.setState(prevState => ({
      showPassword: !prevState.showPassword,
    }));
  }

  handleShowPasswordMouseDown = (event) => {
    event.preventDefault();
  }

  handleSignInClick = () => {
    const { inProgress, login, password, onSignIn } = this.props;

    if (!inProgress && login !== '' && password !== '') {
      onSignIn(login, password);
    }
  }

  render() {
    const {
      classes,
      login,
      password,
      inProgress,
      loggedIn,
      hasError,
    } = this.props;

    const { showPassword } = this.state;

    if (loggedIn) {
      return (
        <Redirect to={{ pathname: '/surveys' }} />
      );
    }

    let progress = null;
    let errorMessage = null;

    if (inProgress) {
      progress = (
        <CircularProgress className={classes.progress} />
      );
    }

    if (hasError) {
      errorMessage = (
        <Typography color="error" className={classes.error}>
          {labels.loginFailed}
        </Typography>
      );
    }

    return (
      <form className={classes.form}>
        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="login">
            {labels.loginLabel}
          </InputLabel>
          <Input
            id="login"
            value={login}
            onChange={this.handleLoginChange}
          />
        </FormControl>

        <FormControl fullWidth className={classes.formControl}>
          <InputLabel htmlFor="password">
            {labels.passwordLabel}
          </InputLabel>
          <Input
            id="password"
            value={password}
            onChange={this.handlePasswordChange}
            type={showPassword ? 'text' : 'password'}
            endAdornment={(
              <InputAdornment position="end">
                <IconButton
                  onClick={this.handleShowPasswordClick}
                  onMouseDown={this.handleShowPasswordMouseDown}
                >
                  {showPassword ? <VisibilityOffIcon /> : <VisibilityIcon />}
                </IconButton>
              </InputAdornment>
            )}
          />
        </FormControl>

        {errorMessage}

        <div className={classes.buttonArea}>
          <Button
            raised
            color="primary"
            onClick={this.handleSignInClick}
          >
            {labels.signIn}
          </Button>
          {progress}
        </div>
      </form>
    );
  }
}

Login.propTypes = {
  classes: PropTypes.object.isRequired,
  hasError: PropTypes.bool.isRequired,
  inProgress: PropTypes.bool.isRequired,
  loggedIn: PropTypes.bool.isRequired,
  login: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired,
  onLoginChange: PropTypes.func.isRequired,
  onPasswordChange: PropTypes.func.isRequired,
  onSignIn: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { login } = state;
  return {
    login: login.input.login,
    password: login.input.password,
    inProgress: login.inProgress,
    loggedIn: login.loggedIn,
    hasError: login.hasError,
  };
};

const mapDispatchToProps = dispatch => ({
  onLoginChange(login) {
    dispatch(updateLogin(login));
  },

  onPasswordChange(password) {
    dispatch(updatePassword(password));
  },

  onSignIn(login, password) {
    dispatch(signIn(login, password));
  },
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(withStyles(styles)(Login));
