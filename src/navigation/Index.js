import {
  StatusBar,
  StyleSheet,
  Text,
  View,
  ActivityIndicator,
} from 'react-native';
import React, {useContext, useState, useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import {createStackNavigator} from '@react-navigation/stack';
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
import {Cart} from '../pages/cart';
import {ProductsNavigation} from '../api/authservice/ProductAPI/ProductNavigation';
import OrderConfirmation from '../pages/ orderconfirmation/ OrderConfirmation';
import Loading from '../pages/loading/Loading';
import Detail from '../pages/detail/Detail';
import {Product} from '../pages/product';
import Shop from '../pages/shop/Shop';
import ShopDetail from '../pages/detail/ShopDetail';
import SelectVoucher from '../pages/voucher/SelectVoucher';
import {createMaterialTopTabNavigator} from '@react-navigation/material-top-tabs';
import {
  Awaiting,
  Delivered,
  AwaitingPickUp,
  Shipping,
  Canceled,
} from '../pages/order-status';
import PESHeader from '../components/PESHeader';
import OrderHeader from '../components/OrderHeader';
import {SafeAreaView} from 'react-native-safe-area-context';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Notification from '../pages/notification/Notification';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import messaging from '@react-native-firebase/messaging';
import notifee, {EventType} from '@notifee/react-native';
import color from '../styles/colors';
import PostRate from '../pages/profile/PostRate';
import Fonts from '../assets/fonts/fonts';
import Bill from '../pages/bill/Bill';
import Search from '../pages/search/Search';
import SearchEmpty from '../pages/search/SearchEmpty';
import ProductSearched from '../pages/search/ProductSearched';

const Tab = createBottomTabNavigator();
const topTab = createMaterialTopTabNavigator();

const appStack = createStackNavigator();

const AppStackScreen = ({navigation}) => {
  return (
    <appStack.Navigator
      screenOptions={{
        headerStyle: {
          backgroundColor: colorsPES.white,
        },
        headerTintColor: colorsPES.background,
        headerShown: false,
        headerTitleAlign: 'center',
      }}>
      <appStack.Screen name="Loading" component={Loading} />
      <appStack.Screen name="MyTab" component={MyTab} />
      <appStack.Screen name="Detail" component={Detail} />
      <appStack.Screen name="Shop" component={Shop} />
      <appStack.Screen name="ShopDetail" component={ShopDetail} />
      <appStack.Screen name="MyProfileDetail" component={MyProfileDetail} />
      <appStack.Screen name="Bill" component={Bill} />
      <appStack.Screen
        name="OrderTab"
        component={OrderTab}
        options={({navigation}) => ({
          headerShown: true,
          title: 'Đơn mua',
          headerLeft: () => (
            <TouchableOpacity
              style={{marginStart: 10}}
              onPress={() => navigation.navigate('MyTab')}>
              <Ionicons
                name="arrow-back-outline"
                size={30}
                color={color.MAIN}
              />
            </TouchableOpacity>
          ),
        })}
      />
      <appStack.Screen name="MyFeedback" component={MyFeedback} />
      <appStack.Screen name="ChangePassword" component={ChangePassword} />
      <appStack.Screen name="ChangeAddress" component={ChangeAddress} />
      <appStack.Screen name="AddAddress" component={AddAddress} />
      <appStack.Screen name="Voucher" component={Voucher} />
      <appStack.Screen name="Cart" component={Cart} />
      <appStack.Screen name="OrderConfirmation" component={OrderConfirmation} />
      <appStack.Screen name="SelectVoucher" component={SelectVoucher} />
      <appStack.Screen name="PostRate" component={PostRate} />
      <appStack.Screen name="Search" component={Search} />
      <appStack.Screen name="SearchEmpty" component={SearchEmpty} />
      <appStack.Screen name="ProductSearched" component={ProductSearched} />
    </appStack.Navigator>
  );
};
import {useIsFocused} from '@react-navigation/native';
const MyTab = ({navigation}) => {
  const isFocused = useIsFocused();
  const {countNotificationContext} = useContext(ProductContext);
  const [countNotification, setCountNotification] = useState(0);

  const callCountNotification = async () => {
    const data = await countNotificationContext();
    // console.log(data);
    setCountNotification(data);
  };

  useEffect(() => {
    if (isFocused) callCountNotification();
  }, [isFocused]);

  useEffect(() => {
    //notification
    // Assume a message-notification contains a "type" property in the data payload of the screen to open
    console.log('setup firebase notification');
    messaging().onNotificationOpenedApp(remoteMessage => {
      console.log(
        'Notification caused app to open from background state:',
        remoteMessage.notification,
      );
    });
    messaging().setBackgroundMessageHandler(async remoteMessage => {
      console.log('Message handled in the background!', remoteMessage);
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

    // messaging().onMessage(async remoteMessage => {
    //   console.log('notification on froground state ......', remoteMessage);
    // });
    messaging().onMessage(async message => {
      console.log('Message received:', message);

      // Extract data from message
      const {title, body} = message?.notification;
      // Show notification
      displayNotification(title, body, navigation);
    });
  }, []);

  return (
    <>
      <Tab.Navigator
        screenOptions={({route}) => ({
          tabBarIcon: ({focused, color, size}) => {
            let iconName;

            switch (route.name) {
              case 'Home':
                iconName = focused ? 'ios-home' : 'ios-home-outline';
                break;
              // case 'Cart':
              //   iconName = focused ? 'cart' : 'cart-outline';
              //   break;
              // case 'Bill':
              //   iconName = focused ? 'wallet' : 'wallet-outline';
              //   break;
              case 'Notification':
                iconName = focused ? 'notifications' : 'notifications-outline';
                break;
              case 'Profile':
                iconName = focused ? 'person' : 'person-outline';
                break;
              default:
                break;
            }

            if (route.name == 'Notification') {
              return (
                <View>
                  <Ionicons name={iconName} size={size} color={color} />
                  <View
                    style={{
                      height: 20,
                      width: 20,
                      position: 'absolute',
                      top: -5,
                      right: -7,
                      justifyContent: 'center',
                      alignItems: 'center',
                      backgroundColor: '#F05F4B',
                      borderRadius: 20,
                    }}>
                    <Text style={{color: 'white'}}>{countNotification}</Text>
                  </View>
                </View>
              );
            } else
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
          component={Product}
          options={{title: 'Trang chủ', headerTitleAlign: 'center'}}
        />
        {/* <Tab.Screen
          name="Bill"
          component={OrderConfirmation}
          options={{title: 'Bill', headerTitleAlign: 'center'}}
        /> */}
        <Tab.Screen
          name="Notification"
          component={Notification}
          options={{title: 'Thông báo', headerTitleAlign: 'center'}}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{title: 'Tài khoản', headerTitleAlign: 'center'}}
        />
      </Tab.Navigator>
    </>
  );
};

const displayNotification = async (title, body, navigation) => {
  try {
    // Request permissions (required for iOS)
    await notifee.requestPermission();

    // Create a channel (required for Android)
    const channelId = await notifee.createChannel({
      id: 'default',
      name: 'Default Channel',
    });

    await notifee.onBackgroundEvent(async ({type, detail}) => {
      console.log('notifee.onBackgroundEvent');
      if (type === EventType.PRESS) {
        // Thực hiện một hành động nào đó khi người dùng nhấn vào thông báo
        console.log('Notification pressed!');
        navigation.navigate('Notification');
      }
    });

    await notifee.onForegroundEvent(async ({type, detail}) => {
      // Do something here, such as navigate to a specific screen using the navigation prop
      if (type === EventType.PRESS) {
        // Thực hiện một hành động nào đó khi người dùng nhấn vào thông báo
        console.log('Notification pressed!');
        navigation.navigate('Notification');
      }
    });

    await notifee.createChannel({
      id: 'custom-sound',
      name: 'Channel with custom sound',
      sound: 'notification',
    });
    // Display a notification
    await notifee.displayNotification({
      id: 'haohoa1805',
      title: title,
      body: body,
      android: {
        channelId,
        // largeIcon:
        //   'http://pes.store/images/0de49237-516d-4ddc-851a-f1b4d6072ad2.png',
        smallIcon: 'ic_pes',
        sound: 'notification',
    
        // Đường dẫn đến thư mục raw của dự án

        // pressAction is needed if you want the notification to open the app when pressed
        pressAction: {
          id: 'default',
        },
      },
    });
    //thêm cái id vô
  } catch (err) {
    console.log(err.toString());
  }
};

const OrderTab = ({navigation}) => {
  return (
    <topTab.Navigator
      screenOptions={{
        tabBarLabelStyle: {fontSize: 10},
        tabBarStyle: {backgroundColor: colorsPES.white},
        tabBarPressColor: color.MAIN,
        tabBarActiveTintColor: color.MAIN,
        tabBarIndicatorStyle: {backgroundColor: color.MAIN},
        tabBarLabelStyle: {
          fontSize: 10,
          fontFamily: Fonts.Man_Medium,
          fontWeight: 'bold',
        },
      }}>
      <topTab.Screen
        name="Awaiting"
        component={Awaiting}
        options={{title: 'Chờ xác nhận'}}
      />
      <topTab.Screen
        name="AwaitingPickup"
        component={AwaitingPickUp}
        options={{title: 'Chờ lấy hàng'}}
      />
      <topTab.Screen
        name="Shipping"
        component={Shipping}
        options={{title: 'Đang giao'}}
      />
      <topTab.Screen
        name="Delivered"
        component={Delivered}
        options={{title: 'Đã giao'}}
      />
      <topTab.Screen
        name="Cancel"
        component={Canceled}
        options={{title: 'Đã hủy'}}
      />
    </topTab.Navigator>
  );
};

export default AppStackScreen;
