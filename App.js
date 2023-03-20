import { Alert, StyleSheet, Text, View } from 'react-native';
import Product from './src/pages/product/Product';
import Loading from './src/pages/loading/Loading';
import Onboarding from './src/pages/onboarding/Onboarding';
import Shop from './src/pages/shop/Shop';
import Voucher from './src/pages/voucher/Voucher';
import Detail from './src/pages/detail/Detail';
import OrderConfirmation from './src/pages/ orderconfirmation/ OrderConfirmation';
import React, { useEffect, useContext } from 'react';
import { Login } from './src/pages/login';
import { NavigationContainer } from '@react-navigation/native';
import MyTab from './src/navigation/Index';
import { login } from './src/api/authservice/UserService';
import UserNavigation from './src/api/authservice/UserNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import { UserContextProvider } from './src/api/authservice/UserContext';
import { ProductsContextProvider } from './src/api/authservice/ProductAPI/ProductContext';
import { ProductContext } from './src/api/authservice/ProductAPI/ProductContext';
import { UserContext } from './src/api/authservice/UserContext';

const App = () => {
  // const checkLogin = async () => {
  //   const data = await login('', '123')
  //   console.log('===>', data)
  // // }

  // useEffect(() => {
  //   ProductContext();
  //   return () => {};
  // }, []);


  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <AppNavigation />
      </ProductsContextProvider>
    </UserContextProvider>
  );
};
// <NavigationContainer>
//   <MyTab />
// </NavigationContainer>

// <Register/>
// <NavigationContainer>
//   <UserNavigation />
// </NavigationContainer>

export default App;

const styles = StyleSheet.create({});
