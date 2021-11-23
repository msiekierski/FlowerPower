import { combineReducers } from 'redux';
import userReducer from './user/user.reducer';
import storage from 'redux-persist/lib/storage';
import persistReducer from 'redux-persist/es/persistReducer';
import { createWhitelistFilter } from 'redux-persist-transform-filter';
import cartReducer from './cart/cart.reducer';
import shopReducer from './shop/shop.reducer';
import searchReducer from './searchResult/search.reducer';
import warehouseReducer from './warehouse/warehouse.reducer';

const rootPersistConfig = {
  key: 'root',
  storage,
  transforms: [
    createWhitelistFilter('user', ['user', 'location']),
    createWhitelistFilter('cart', ['items']),
  ],
  blacklist: ['shop', 'search', 'warehouse'],
};

const rootReducer = combineReducers({
  user: userReducer,
  cart: cartReducer,
  shop: shopReducer,
  search: searchReducer,
  warehouse: warehouseReducer,
});

export const pReducer = persistReducer(rootPersistConfig, rootReducer);

export default rootReducer;
export type RootState = ReturnType<typeof rootReducer>;
