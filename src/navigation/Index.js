import { StatusBar, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import colorsPES from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
  Profile,
  AddAddress,
  ChangeAddress,
  ChangePassword,
  Voucher,
  MyProfileDetail,
  MyFeedback,

} from '../pages/profile';
import { Cart } from '../pages/cart'
import { ProductsNavigation } from '../api/authservice/ProductAPI/ProductNavigation';
import OrderConfirmation from '../pages/ orderconfirmation/ OrderConfirmation';
import Loading from '../pages/loading/Loading';

const Tab = createBottomTabNavigator();

const appStack = createStackNavigator();

const AppStackScreen = () => {
  return (
    <appStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorsPES.white,
        },
        headerTintColor: colorsPES.background,
        headerShown: false,
      }}>
      <appStack.Screen name="Loading" component={Loading} />
      <appStack.Screen name="MyTab" component={MyTab} />
      <appStack.Screen name="MyProfileDetail" component={MyProfileDetail} />
      <appStack.Screen name="MyFeedback" component={MyFeedback} />
      <appStack.Screen name="ChangePassword" component={ChangePassword} />
      <appStack.Screen name="ChangeAddress" component={ChangeAddress} />
      <appStack.Screen name="AddAddress" component={AddAddress} />
      <appStack.Screen name="Voucher" component={Voucher} />
    </appStack.Navigator>
  );
};

const MyTab = () => {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          switch (route.name) {
            case 'Home':
              iconName = focused ? 'ios-home' : 'ios-home-outline';
              break;
            case 'Cart':
              iconName = focused ? 'cart' : 'cart-outline';
              break;
            case 'Bill':
              iconName = focused ? 'wallet' : 'wallet-outline';
              break;
            case 'Notification':
              iconName = focused ? 'notifications' : 'notifications-outline';
              break;
            case 'Profile':
              iconName = focused ? 'person' : 'person-outline';
              break;
            default:
              break;
          }
          return <Ionicons name={iconName} size={size} color={color} />;
        },
        tabBarActiveTintColor: colorsPES.borderColorBlue,
        tabBarInactiveTintColor: colorsPES.inActive,
        tabBarStyle: {
          backgroundColor: colorsPES.white,
          height: 65,
          paddingBottom: 10,
        },
        tabBarLabelStyle: {
          fontSize: 13,
        },
        headerShown: false,
      })}
      initialRouteName={'Home'}>
      <Tab.Screen
        name="Home"
        component={ProductsNavigation}
        options={{ title: 'Trang chủ', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Cart"
        component={Cart}
        options={{ title: 'Yêu thích', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Bill"
        component={OrderConfirmation}
        options={{ title: 'Bill', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Notification"
        component={Profile}
        options={{ title: 'Thông báo', headerTitleAlign: 'center' }}
      />
      <Tab.Screen
        name="Profile"
        component={Profile}
        options={{ title: 'Tài khoản', headerTitleAlign: 'center' }}
      />
    </Tab.Navigator>
  );
};

export default AppStackScreen;
