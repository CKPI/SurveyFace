import {
  SURVEYS_LOAD,
  SURVEYS_LOAD_FINISHED,
  SURVEYS_LOAD_FAILED,
} from '../constants/surveys';

const initialState = {
  loading: false,
  error: false,
  surveys: [],
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SURVEYS_LOAD:
      return {
        ...initialState,
        loading: true,
      };

    case SURVEYS_LOAD_FINISHED:
      return {
        ...state,
        loading: false,
        surveys: action.surveys,
      };

    case SURVEYS_LOAD_FAILED:
      return {
        ...state,
        loading: false,
        error: true,
      };

    default:
      return state;
  }
};
