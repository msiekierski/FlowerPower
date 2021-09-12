import { applyMiddleware, createStore } from 'redux';
import persistStore from 'redux-persist/es/persistStore';
import thunk from 'redux-thunk';
import { pReducer } from './root-reducer';

export const store = createStore(pReducer, {}, applyMiddleware(thunk));

export const persistor = persistStore(store);
