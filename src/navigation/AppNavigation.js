import {NavigationContainer} from '@react-navigation/native';
import React, {useContext} from 'react';
import UserNavigation from '../api/authservice/UserNavigation';
import AppStackScreen from './Index';
import { UserContext } from '../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

const AppNavigation = () => {
    const { isLoggedIn, setIsLoggedIn } = useContext(UserContext)
    // const token = AsyncStorage.getItem('token');
    // if (token.length !== null) {
    //     isLoggedIn == true
    // } else {
    //     isLoggedIn == false
    // }
    

    return (
        <NavigationContainer>
            {
                isLoggedIn == false ? <UserNavigation /> : <AppStackScreen />
            }
        </NavigationContainer>
    )
}

export default AppNavigation;
