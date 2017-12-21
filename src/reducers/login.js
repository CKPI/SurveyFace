import {
  LOGIN_UPDATE,
  LOGIN_UPDATE_PASSWORD,
  LOGIN_SEND,
  LOGIN_SUCCESS,
  LOGIN_FAILED,
  LOGIN_LOGOUT,
  LOGIN_CANCEL_PRELOAD,
  LOGIN_PRELOAD,
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
  preloading: false,
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
        preloading: false,
      };

    case LOGIN_FAILED:
      return {
        ...state,
        inProgress: false,
        hasError: true,
      };

    case LOGIN_LOGOUT:
      return initialState;

    case LOGIN_PRELOAD:
      return {
        ...state,
        preloading: true,
      };

    case LOGIN_CANCEL_PRELOAD:
      return initialState;

    default:
      return state;
  }
};
