import React from 'react';
import { Switch, Route } from 'react-router-dom';
import CartPage from '../../pages/CartPage/CartPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/MainPage/MainPage';
import RegisterPage from '../../pages/RegisterPage.tsx/RegisterPage';
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
      <Route path="*">
        <ErrorPage />
      </Route>
    </Switch>
  );
};

export default ContentSwitch;
