import { login, logout } from "./UserService";
import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = React.createContext();

export const UserContextProvider = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState({});

    const onLogin = async (userName, password) => {
        try {
            const res = await login(userName, password);
            if (res.error == false) {
                const token = res.data.token;
                const name = res.data.nickName;
                await AsyncStorage.setItem('token', token);
                await AsyncStorage.setItem('name', name);
                setUser(user);
                setIsLoggedIn(true);
                return true;
            } else {
                setIsLoggedIn(false);
                return false;
            }
        } catch (e) {
            console.log('onLogin error', e);
        }
        return false;
    }

    const onLogout = async () => {
        try {
            const res = await logout();
            if (res.error == false) {
                await AsyncStorage.removeItem('token')
            }
        } catch (e) {
            console.log('onLogout error', e);
        }
        return false;
    }

    return (
        <UserContext.Provider
            value={{ isLoggedIn, onLogin, user, onLogout }}
        >
            {children}
        </UserContext.Provider>
    )
}



