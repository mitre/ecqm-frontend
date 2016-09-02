import { createStore, applyMiddleware, compose } from 'redux';
import DevTools from '../containers/DevTools';
import thunk from 'redux-thunk';
import createLogger from 'redux-logger';
import rootReducer from '../reducers';

export default function configureStore(initialState) {
  const store = createStore(
    rootReducer,
    initialState,
    compose(
      applyMiddleware(thunk, createLogger()),
      DevTools.instrument()
    )
  );

  return store;
}
