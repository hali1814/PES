import {StyleSheet, Text, View} from 'react-native';
import React, {useEffect, useContext} from 'react';
import AppNavigation from './src/navigation/AppNavigation';
import {UserContextProvider} from './src/api/authservice/UserContext';
import {ProductsContextProvider} from './src/api/authservice/ProductAPI/ProductContext';

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
