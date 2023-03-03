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
    Voucher,
    ProfileStackScreen

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
                            iconName = focused ? 'add-circle' : 'add-circle';
                            break;
                        case 'Notification':
                            iconName = focused ? 'notifications' : 'notifications-outline';
                            break;
                        case 'Profile':
                            iconName = focused ? 'people' : 'people-outline';
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
            initialRouteName={'ProfileStack'}
        >
            <Tab.Screen name="Home" component={Profile} options={{ title: 'Trang chủ', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Favorites" component={Profile} options={{ title: 'Yêu thích', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Add" component={Profile} options={{ title: 'Thêm', headerTitleAlign: 'center' }} />
            <Tab.Screen name="Notification" component={Profile} options={{ title: 'Thông báo', headerTitleAlign: 'center' }} />
            <Tab.Screen name="ProfileStack" component={ProfileStackScreen} options={{ title: 'Tài khoản', headerTitleAlign: 'center' }} />
        </Tab.Navigator>
    )
}

export default MyTab

