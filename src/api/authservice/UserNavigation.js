import React from 'react'

import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Login from '../../pages/login/Login';

const UserNavigation = () => {
  return (
    <Stack.Navigator  screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Login" component={Login} />
    </Stack.Navigator>
  )
}

export default UserNavigation