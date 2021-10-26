import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import cartReducer from './cart/cart.reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  transforms: [
    createWhitelistFilter('user', ['user']),
    createWhitelistFilter('cart', ['items']),
  ],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
});

export const pReducer = persistReducer(rootPersistConfig, rootReducer);

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
