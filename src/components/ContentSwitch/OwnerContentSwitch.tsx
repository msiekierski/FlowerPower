import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Roles } from '../../common/types';
import CartPage from '../../pages/CartPage/CartPage';
import ComparePricesPage from '../../pages/ComparePricesPage/ComparePricesPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import FlowerShopPage from '../../pages/FlowerShopPage/FlowerShopPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/Owner/MainPage/MainPage';
import WarehousePage from '../../pages/Owner/WarehousePage/Warehouse';
import ProductPage from '../../pages/ProductPage/ProductPage';
import RegisterPage from '../../pages/RegisterPage.tsx/RegisterPage';
import SearchItemPage from '../../pages/SearchItemPage/SearchItemPage';
import SearchResultPage from '../../pages/SearchResultPage/SearchResultPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import { useAuth } from '../../utils/customHooks/useAuth';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const OwnerContentSwitch = () => {
  const isAuth = useAuth() === Roles.OWNER;
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <PrivateRoute
        isAuth={isAuth}
        redirectPath={'/login'}
        path="/settings/:option"
      >
        <SettingsPage />
      </PrivateRoute>
      <Route path="/cart">
        <CartPage />
      </Route>
      <PrivateRoute isAuth={!isAuth} redirectPath={'/'} path="/login">
        <LoginPage />
      </PrivateRoute>
      <PrivateRoute isAuth={!isAuth} redirectPath={'/'} path="/register">
        <RegisterPage />
      </PrivateRoute>
      <Route exact path="/search/item/:itemName">
        <SearchItemPage />
      </Route>
      <Route exact path="/compare/item/:itemId">
        <ComparePricesPage />
      </Route>
      <Route path="/search/">
        <SearchResultPage />
      </Route>
      <Route exact path="/store/:shopName/:shopAddress">
        <FlowerShopPage />
      </Route>
      <Route exact path="/store/:shopName/:shopAddress/item/:itemName">
        <ProductPage />
      </Route>
      <Route exact path="/owner/warehouse">
        <WarehousePage />
      </Route>
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
};

export default OwnerContentSwitch;
