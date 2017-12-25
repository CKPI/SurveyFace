import {
  SURVEY_LOAD,
  SURVEY_LOAD_SUCCESS,
  SURVEY_LOAD_FAILED,
  SURVEY_CHANGE_STEP,
} from '../constants/currentSurvey';

import api from '../api';

export const loadSurvey = id => (dispatch) => {
  dispatch({
    type: SURVEY_LOAD,
  });

  api.loadSurvey(id, (error, survey) => {
    if (error) {
      dispatch({
        type: SURVEY_LOAD_FAILED,
      });
      return;
    }

    dispatch({
      type: SURVEY_LOAD_SUCCESS,
      survey,
    });
  });
};

export const changeStep = step => ({
  type: SURVEY_CHANGE_STEP,
  step,
});
