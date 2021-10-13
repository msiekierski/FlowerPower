import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { createWhitelistFilter } from 'redux-persist-transform-filter';

const rootPersistConfig = {
  key: 'root',
  storage,
  transforms: [createWhitelistFilter('user', ['user'])],
};

const rootReducer = combineReducers({
  user: userReducer,
});

export const pReducer = persistReducer(rootPersistConfig, rootReducer);

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
