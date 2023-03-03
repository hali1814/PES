import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import UserNavigation from '../api/authservice/UserNavigation';
import MyTab from './Index';
import { UserContext } from '../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigation = () => {
    const { setIsLoggedIn, isLoggedIn } = useContext(UserContext)
    const token = AsyncStorage.getItem('token');
    if (token.length > 0) {
        isLoggedIn == true
    }

    return (
        <NavigationContainer>
            {
                isLoggedIn == false ? <UserNavigation /> : <MyTab />
            }
        </NavigationContainer>
    )
}

export default AppNavigation