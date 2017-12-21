import React, { Component } from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';

import store from './store';
import { preloadUser } from './actions/login';

import withRoot from './components/withRoot';
import PrivateRoute from './components/PrivateRoute';

import Main from './containers/Main';

import Login from './screens/Login';
import NotFound from './screens/NotFound';
import Survey from './screens/Survey';
import SurveysList from './screens/SurveysList';

store.dispatch(preloadUser());

class App extends Component {
  render() {
    return (
      <Provider store={store}>
        <Router>
          <Main>
            <Switch>
              <Route exact path="/" component={Login} />
              <Route path="/login" component={Login} />
              <PrivateRoute path="/surveys" component={SurveysList} />
              <PrivateRoute path="/survey/:id" component={Survey} />
              <Route component={NotFound} />
            </Switch>
          </Main>
        </Router>
      </Provider>
    );
  }
}

export default withRoot(App);
