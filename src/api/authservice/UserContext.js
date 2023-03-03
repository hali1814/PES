import { login } from "./UserService";
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
                await AsyncStorage.setItem('token', token);
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

    return (
        <UserContext.Provider
            value={{ isLoggedIn, onLogin, user }}
        >
            {children}
        </UserContext.Provider>
    )
}



