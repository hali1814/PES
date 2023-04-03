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
import messaging from '@react-native-firebase/messaging';

const App = () => {
  useEffect(()=>{
    messaging()
    .getToken()
    .then(token => {
      console.log('Token đã lấy được:', token);
      // Gửi token lên máy chủ để lưu trữ và sử dụng sau này
    });
  }, [])

  useEffect(() => {
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    console.log('setup firebase notification')
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });

    // Check whether an initial notification is available
    messaging()
      .getInitialNotification()
      .then(remoteMessage => {
        if (remoteMessage) {
          console.log(
            'Notification caused app to open from quit state:',
            remoteMessage.notification,
          );
          setInitialRoute(remoteMessage.data.type); // e.g. "Settings"
        }
      });

    messaging().onMessage(async remoteMessage => {
      console.log('notification on froground state ......', remoteMessage);
    });
  }, []);

  return (
    <UserContextProvider>
      <ProductsContextProvider>
        <AppNavigation />
      </ProductsContextProvider>
    </UserContextProvider>
  );
};

export default App;
