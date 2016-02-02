import React from 'react';
import ReactDOM from 'react-dom';
import { createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { syncHistory, routeReducer, routeActions } from 'redux-simple-router';

import App from './components/App';
import Header from './components/common/Header';
import Index from './components/Index';
import SignIn from './components/SignIn';

const reducer = combineReducers({
  routing: routeReducer
});

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store);

window.store = store;
window.routeActions = routeActions;

ReactDOM.render(
  <Provider store={store}>
    <Router history={browserHistory}>
      <Route name="app" component={App}>
        <Route name="index" path="/" component={Index} />
        <Route name="sign-in" path="/users/sign_in" component={SignIn} />
      </Route>
    </Router>
  </Provider>,
  document.getElementById('app')
);
