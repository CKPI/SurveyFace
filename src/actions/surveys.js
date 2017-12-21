import {
  SURVEYS_LOAD,
  SURVEYS_LOAD_FINISHED,
  SURVEYS_LOAD_FAILED,
} from '../constants/surveys';

import api from '../api';

export const loadSurveysList = () => (dispatch) => {
  dispatch({
    type: SURVEYS_LOAD,
  });

  api.loadSurveysList((error, surveys) => {
    if (error) {
      dispatch({
        type: SURVEYS_LOAD_FAILED,
      });
      return;
    }

    dispatch({
      type: SURVEYS_LOAD_FINISHED,
      surveys,
    });
  });
};
