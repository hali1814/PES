import {StyleSheet, Text, View} from 'react-native';
import React from 'react';
import Product from './src/pages/product/Product';
import Loading from './src/pages/loading/Loading';
import Onboarding from './src/pages/onboarding/Onboarding';
import PESCategories from './src/components/PESCategories';
import Shop from './src/pages/shop/Shop';
import Voucher from './src/pages/voucher/Voucher';
import Detail from './src/pages/detail/Detail';

const App = () => {
  return (
    <View>
      {/* <Product /> */}
      {/* <Loading /> */}
      {/* <Onboarding /> */}
      {/* <PESCategories /> */}
      {/* <Shop /> */}
      {/* <Voucher /> */}
      <Detail />
    </View>
  );
};

export default App;

const styles = StyleSheet.create({});
