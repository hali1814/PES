import {Alert, StyleSheet, Text, View} from 'react-native';
import Product from './src/pages/product/Product';
import Loading from './src/pages/loading/Loading';
import Onboarding from './src/pages/onboarding/Onboarding';
import Shop from './src/pages/shop/Shop';
import Voucher from './src/pages/voucher/Voucher';
import Detail from './src/pages/detail/Detail';
import OrderConfirmation from './src/pages/ orderconfirmation/ OrderConfirmation';
import React, {useEffect, useContext} from 'react';
import {Login} from './src/pages/login';
import {NavigationContainer} from '@react-navigation/native';
import MyTab from './src/navigation/Index';
import {login} from './src/api/authservice/UserService';
import UserNavigation from './src/api/authservice/UserNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import {UserContextProvider} from './src/api/authservice/UserContext';
import {ProductsContextProvider} from './src/api/authservice/ProductAPI/ProductContext';
import {PermissionsAndroid} from 'react-native';
PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS);


const App = () => {

  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <AppNavigation />
      </ProductsContextProvider>
    </UserContextProvider>
  );
};

export default App;
