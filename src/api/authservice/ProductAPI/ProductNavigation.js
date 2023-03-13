import React from 'react';

import {createStackNavigator} from '@react-navigation/stack';
import Detail from '../../../pages/detail/Detail';
import {Product} from '../../../pages/product';
import PESListItem from '../../../components/PESListItem';
const Stack = createStackNavigator();

export const ProductsNavigation = () => {
  return (
    <Stack.Navigator screenOptions={{headerShown: false}}>
      <Stack.Screen name="Products" component={Product} />
      <Stack.Screen name="Detail" component={Detail} />
    </Stack.Navigator>
  );
};
