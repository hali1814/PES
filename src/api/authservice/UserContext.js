import {
    login,
    logout,
    getUserInfor,
    ChangePassword,
    getVoucher,
    register,
    changeProfile
} from "./UserService";
import React, { useState, createContext } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const UserContext = createContext();

export const UserContextProvider = (props) => {
    const { children } = props;
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState([]);
    const [voucher, setVoucher] = useState([])

    const onRegister = async (userName, password, date, address, nickName, email) => {
        try {
            const res = await register(userName, password, date, address, nickName, email)
            if (res.status == 'success') {
                const message = res.data.message
                console.log('message ==>', message)
                return true
            }
        } catch (error) {
            console.log('onRegister error', error)
            throw error
        }
        return false
    }

    const onLogin = async (userName, password) => {
        try {
            const res = await login(userName, password);
            if (res.status == 'success') {
                const token = res.data.token;
                await AsyncStorage.setItem('token', token);
                setIsLoggedIn(true);
                return true;
            }
            else {
                setIsLoggedIn(false);
                // return false;
            }
        } catch (e) {
            console.log('onLogin error', e);
        }
        return false;
    }

    const onChangePassword = async (password, newPassword) => {
        try {
            const res = await ChangePassword(password, newPassword)
            if (res.status == 'success') {
                const message = res.data
                console.log('message ===>', message)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log('on change password failed', error)
        }
        return false
    }

    const onChangeProfile = async (avatar, date, address, nickName, email) => {
        try {
            const res = await changeProfile(avatar, date, address, nickName, email)
            if (res.status == 'success') {
                console.log('change profile ===>', res.data.message)
                return true
            } else {
                return false
            }
        } catch (error) {
            console.log('error', error)
            throw error
        }
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

    const ongetVoucher = async () => {

        try {
            const res = await getVoucher()
            if (res.status == 'success') {
                setVoucher(res.data)
                console.log('Voucher ====>', voucher)
            }
        } catch (error) {
            console.log('onGetVoucher error', error);
            throw error
        }
    }

    const onGetUserInfor = async () => {
        try {
            const res = await getUserInfor()
            console.log('res', res);
            if (res.status == 'success') {
                setUser(res.data)
                console.log(res.data)
            } else if (res.status == 'inactive') {
                const message = res.data.message
                console.log('message ==> ', message)
                return false
            }
        } catch (error) {
            console.log('onGetUserInfor error', error);
        }
        return null;
    }

    return (
        <UserContext.Provider
            value={{ isLoggedIn, onLogin, user, onLogout, setIsLoggedIn, onGetUserInfor, onChangePassword, ongetVoucher, voucher, onRegister, setVoucher, onChangeProfile }}
        >
            {children}
        </UserContext.Provider>
    )
}