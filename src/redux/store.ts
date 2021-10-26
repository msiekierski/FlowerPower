import { applyMiddleware, compose, createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import { pReducer } from './root-reducer';

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose;
  }
}

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;

export const store = createStore(
  pReducer,
  {},
  composeEnhancers(applyMiddleware(thunk))
);

export const persistor = persistStore(store);
