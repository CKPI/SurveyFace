import { combineReducers } from 'redux';

import login from './login';
import surveys from './surveys';

export default combineReducers({
  login,
  surveys,
});
