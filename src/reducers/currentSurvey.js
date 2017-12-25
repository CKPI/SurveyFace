import {
  SURVEY_LOAD,
  SURVEY_LOAD_SUCCESS,
  SURVEY_LOAD_FAILED,
  SURVEY_CHANGE_STEP,
} from '../constants/currentSurvey';

const initialState = {
  survey: {
    title: '',
    date: '1970-01-01T00:00:00.000Z',
    questions: [],
  },
  loading: false,
  error: false,
  activeStep: 0,
};

export default (state = initialState, action) => {
  switch (action.type) {
    case SURVEY_LOAD:
      return {
        ...initialState,
        loading: true,
      };

    case SURVEY_LOAD_SUCCESS:
      return {
        ...state,
        loading: false,
        survey: action.survey,
      };

    case SURVEY_LOAD_FAILED:
      return {
        ...initialState,
        error: true,
      };

    case SURVEY_CHANGE_STEP:
      return {
        ...state,
        activeStep: action.step,
      };

    default:
      return state;
  }
};
