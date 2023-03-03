import { NavigationContainer } from '@react-navigation/native';
import React, { useContext } from 'react';
import UserNavigation from '../api/authservice/UserNavigation';
import MyTab from './Index';
import { UserContext } from '../api/authservice/UserContext';

const AppNavigation = () => {
    const { isLoggedIn } = useContext(UserContext)
    return (
        <NavigationContainer>
            {
                isLoggedIn == false ? <UserNavigation /> : <MyTab />
            }
        </NavigationContainer>
    )
}

export default AppNavigation