import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createStackNavigator } from '@react-navigation/stack';
import colorsPES from '../constants/colors';
import {
    AddAddress,
    ChangeAddress,
    ChangePassword,
    CustomerSupport,
    MyFeedback,
    MyProfileDetail,
    Profile,
    Voucher
} from "../pages/profile/index";

const ProfileStack = createStackNavigator();

const ProfileStackScreen = () => {
    return (
        <ProfileStack.Navigator
            screenOptions={{
                headerStyle: {
                    backgroundColor: colorsPES.white
                },
                headerTintColor: colorsPES.background,
                headerShown : false
            }}
        >
            <ProfileStack.Screen name="Profile" component={Profile} />
            <ProfileStack.Screen name="MyProfileDetail" component={MyProfileDetail} />
            <ProfileStack.Screen name="MyFeedback" component={MyFeedback} />
            <ProfileStack.Screen name="ChangePassword" component={ChangePassword} />
            <ProfileStack.Screen name="ChangeAddress" component={ChangeAddress} />
            <ProfileStack.Screen name="AddAddress" component={AddAddress} />
            <ProfileStack.Screen name="Voucher" component={Voucher} />
        </ProfileStack.Navigator>
    )
}

export default ProfileStackScreen

