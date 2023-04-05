import { NavigationContainer } from '@react-navigation/native';
import React, { useContext, useEffect } from 'react';
import UserNavigation from '../api/authservice/UserNavigation';
import AppStackScreen from './Index';
import { UserContext } from '../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigation = () => {
    const { isLoggedIn, setIsLoggedIn, user } = useContext(UserContext)
    const token = AsyncStorage.getItem('token');
    
    return (
        <NavigationContainer>
            {
                isLoggedIn == false || token == null ? <UserNavigation /> : <AppStackScreen />
            }
        </NavigationContainer>
    )
}

export default AppNavigation;
