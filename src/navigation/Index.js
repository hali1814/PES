import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import colorsPES from '../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import {
    Profile,
    AddAddress,
    ChangeAddress,
    ChangePassword,
    Voucher

} from "../pages/profile";

const Tab = createBottomTabNavigator()

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
                        case 'Favorites':
                            iconName = focused ? 'ios-heart' : 'ios-heart-outline';
                            break;
                        case 'Add':
                            iconName = focused ? 'add-circle' : 'add-circle-outline';
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
                tabBarInactiveTintColor: colorsPES.grey,
                tabBarStyle: {
                    backgroundColor: colorsPES.borderColorPrimary,
                    height: 65,
                    paddingBottom: 10,
                },
                tabBarLabelStyle: {
                    fontSize: 13,
                },
                headerShown: false,
            })}
            initialRouteName={'Add'}
        >
            <Tab.Screen name="Home" component={Profile} options={{ title: 'Trang chủ', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Favorites" component={AddAddress} options={{ title: 'Yêu thích', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Add" component={ChangeAddress} options={{ title: 'Thêm', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Notification" component={ChangePassword} options={{ title: 'Thông báo', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Profile" component={Voucher} options={{ title: 'Tài khoản', headerTitleAlign: 'center' }} />
        </Tab.Navigator>
    )
}

export default MyTab

