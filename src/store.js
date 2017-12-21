import { applyMiddleware, compose, createStore } from 'redux';
import thunk from 'redux-thunk';

import root from './reducers';

const args = [root];

if (
  process.env.NODE_ENV === 'development' &&
  window.__REDUX_DEVTOOLS_EXTENSION__
) {
  args.push(window.__REDUX_DEVTOOLS_EXTENSION__());
}

export default compose(applyMiddleware(thunk))(createStore)(...args);
