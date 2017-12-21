import {
  LOGIN_UPDATE,
  LOGIN_UPDATE_PASSWORD,
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOGOUT,
} from '../constants/login';

const initialState = {
  input: {
    login: '',
    password: '',
  },
  loggedIn: false,
  inProgress: false,
  hasError: false,
  name: null,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case LOGIN_UPDATE:
      return {
        ...state,
        input: {
          ...state.input,
          login: action.login,
        },
        hasError: false,
      };

    case LOGIN_UPDATE_PASSWORD:
      return {
        ...state,
        input: {
          ...state.input,
          password: action.password,
        },
        hasError: false,
      };

    case LOGIN_SEND:
      return {
        ...state,
        hasError: false,
        inProgress: true,
      };

    case LOGIN_SUCCESS:
      return {
        ...state,
        inProgress: false,
        loggedIn: true,
        name: action.user.name,
        input: {
          login: '',
          password: '',
        },
      };

    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        hasError: true,
      };

    case LOGIN_LOGOUT:
      return initialState;

    default:
      return state;
  }
};
