import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Product from './src/pages/product/Product';
import Loading from './src/pages/loading/Loading';
import Onboarding from './src/pages/onboarding/Onboarding';
import Shop from './src/pages/shop/Shop';
import Voucher from './src/pages/voucher/Voucher';
import Detail from './src/pages/detail/Detail';
import OrderConfirmation from './src/pages/ orderconfirmation/ OrderConfirmation';

const App = () => {
  return (
    <View>
      {/* <Product /> */}
      {/* <Loading /> */}
      {/* <Onboarding /> */}
      {/* <Shop /> */}
      {/* <Voucher /> */}
      {/* <Detail /> */}
      <OrderConfirmation />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
