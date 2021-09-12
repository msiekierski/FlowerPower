import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';

const persistConfig = {
  key: 'root',
  storage,
  whitelist: ['user'],
};

const rootReducer = combineReducers({
  user: userReducer,
});

export const pReducer = persistReducer(persistConfig, rootReducer);

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
