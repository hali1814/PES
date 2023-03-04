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
            if (res.status == 'success') {
                const token = res.data.token;
                if (token) {
                    await AsyncStorage.setItem('token', token);
                    setIsLoggedIn(true);
                    return true;
                } else {
                    setIsLoggedIn(false);
                    return false;
                }
            } else {
                // setIsLoggedIn(false);
                // // return false;
            }
        } catch (e) {
            console.log('onLogin error', e);
        }
        return false;
    }

    const onLogout = async () => {
        try {
            const res = await logout();
            const token = AsyncStorage.getItem('token');
            console.log(token)
            console.log(res)
            if (res.status == 'success') {
                await AsyncStorage.removeItem('token')
                setIsLoggedIn(false)
            }
        } catch (e) {
            console.log('onLogout error', e);
        }
        return false;
    }

    return (
        <UserContext.Provider
            value={{ isLoggedIn, onLogin, user, onLogout, setIsLoggedIn }}
        >
            {children}
        </UserContext.Provider>
    )
}



