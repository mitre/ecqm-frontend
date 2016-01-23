import React from 'react';
import ReactDOM from 'react-dom';
import { compose, createStore, combineReducers, applyMiddleware } from 'redux';
import { Provider } from 'react-redux';
import { Router, Route, browserHistory } from 'react-router';
import { createHistory } from 'history';
import { syncHistory, routeReducer, routeActions } from 'redux-simple-router';
import { App } from './components/App';
import Header from './components/common/header';

const reducer = combineReducers({
  routing: routeReducer
});

// Sync dispatched route actions to the history
const reduxRouterMiddleware = syncHistory(browserHistory);
const createStoreWithMiddleware = applyMiddleware(reduxRouterMiddleware)(createStore);

const store = createStoreWithMiddleware(reducer);

// Required for replaying actions from devtools to work
reduxRouterMiddleware.listenForReplays(store)

window.store = store;
window.routeActions = routeActions;

ReactDOM.render(
  <Provider store={store}>
    <div>
      <Header />
      <Router history={browserHistory}>
        <Route path="/" component={App} />
      </Router>
    </div>
  </Provider>,
  document.getElementById('app')
);
