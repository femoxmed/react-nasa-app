import { createStore, Store, applyMiddleware, compose } from 'redux';
import thunk from 'redux-thunk';

import apodReducer from './reducers/apod';

// compose enhancers
const composeEnhancers =
  (window && (window as any)).__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export default () => {
  const store: Store = createStore(
    apodReducer,
    composeEnhancers(applyMiddleware(thunk))
  );

  return store;
};
