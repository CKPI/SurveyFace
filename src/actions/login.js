import {
  LOGIN_UPDATE,
  LOGIN_UPDATE_PASSWORD,
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOGOUT,
} from '../constants/login';

import api from '../api';

export const updateLogin = login => ({
  type: LOGIN_UPDATE,
  login,
});

export const updatePassword = password => ({
  type: LOGIN_UPDATE_PASSWORD,
  password,
});

export const signIn = (login, password) => (dispatch) => {
  dispatch({
    type: LOGIN_SEND,
  });

  api.signIn(login, password, (error, user) => {
    if (error) {
      console.error('Login error:', error);
      dispatch({
        type: LOGIN_FAILED,
        error,
      });
    } else {
      dispatch({
        type: LOGIN_SUCCESS,
        user,
      });
    }
  });
};

export const signOut = () => ({
  type: LOGIN_LOGOUT,
});
