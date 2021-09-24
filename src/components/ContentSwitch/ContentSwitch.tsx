import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CartPage from '../../pages/CartPage/CartPage';
import LoginRegister from '../../pages/LoginRegister/LoginRegister';
import MainPage from '../../pages/MainPage/MainPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import { useAuth } from '../../utils/customHooks/useAuth';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const ContentSwitch = () => {
  const isAuth = useAuth();
  return (
    <Switch>
      <Route exact path="/">
        <MainPage />
      </Route>
      <PrivateRoute isAuth={isAuth} redirectPath={'/login'} path="/settings">
        <SettingsPage />
      </PrivateRoute>
      <Route path="/cart">
        <CartPage />
      </Route>
      <PrivateRoute isAuth={!isAuth} redirectPath={'/'} path="/login">
        <LoginRegister />
      </PrivateRoute>
      <Route path="*">
        <div>Error page</div>
      </Route>
    </Switch>
  );
};

export default ContentSwitch;
