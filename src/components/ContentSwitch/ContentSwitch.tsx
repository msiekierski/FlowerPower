import React from 'react';
import { Switch, Route } from 'react-router-dom';
import { Roles } from '../../common/types';
import CartPage from '../../pages/CartPage/CartPage';
import ComparePricesPage from '../../pages/ComparePricesPage/ComparePricesPage';
import ErrorPage from '../../pages/ErrorPage/ErrorPage';
import FlowerShopPage from '../../pages/FlowerShopPage/FlowerShopPage';
import LoginPage from '../../pages/LoginPage/LoginPage';
import MainPage from '../../pages/MainPage/MainPage';
import ProductPage from '../../pages/ProductPage/ProductPage';
import RegisterPage from '../../pages/RegisterPage.tsx/RegisterPage';
import SearchItemPage from '../../pages/SearchItemPage/SearchItemPage';
import SearchResultPage from '../../pages/SearchResultPage/SearchResultPage';
import SettingsPage from '../../pages/SettingsPage/SettingsPage';
import { useAuth } from '../../utils/customHooks/useAuth';
import NavBar from '../NavBar/NavBar';
import ClientContentSwitch from './ClientContentSwitch';
import OwnerContentSwitch from './OwnerContentSwitch';
import PrivateRoute from './PrivateRoute/PrivateRoute';

const ContentSwitch = () => {
  const role = useAuth();
  if (role === Roles.NONE || role === Roles.CLIENT) {
    return (
      <>
        <ClientContentSwitch />
      </>
    );
  }
  if (role === Roles.OWNER) {
    return <OwnerContentSwitch />;
  }
  return <ErrorPage />;
};

export default ContentSwitch;
