import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Detail from '../../../pages/detail/Detail';
import {Product} from '../../../pages/product';
import Shop from '../../../pages/shop/Shop';
import PESListItem from '../../../components/PESListItem';
import ShopDetail from '../../../pages/detail/ShopDetail';
const Stack = createStackNavigator();

export const ProductsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Products" component={Product} />
      <Stack.Screen name="Detail" component={Detail} />
      <Stack.Screen name="Shop" component={Shop} />
      <Stack.Screen name="ShopDetail" component={ShopDetail} />
    </Stack.Navigator>
  );
};
