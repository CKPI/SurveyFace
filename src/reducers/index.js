import { combineReducers } from 'redux';

import login from './login';
import surveys from './surveys';
import currentSurvey from './currentSurvey';

export default combineReducers({
  login,
  surveys,
  currentSurvey,
});
