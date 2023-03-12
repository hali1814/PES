import AsyncStorage from "@react-native-async-storage/async-storage";
import customAxios from "../helper/Axios";

export const register = async (userName, password, date, address, nickName, email) => {
    const data = { userName: userName, password: password, date: date, address: address, nickName: nickName, email: email };
    const result = await customAxios().post('/api/register', data)
    return result
}

export const login = async (userName, password) => {
    const data = { userName: userName, password: password };
    const result = await customAxios().post('/api/login', data);
    return result;
}

export const logout = async () => {
    const result = await customAxios().get('/api/logout');
    return result;
}

export const getUserInfor = async () => {
    const result = await customAxios().get('/api/profiles')
    return result;
}

export const ChangePassword = async (password, newPassword) => {
    const data = { password: password, newPassword: newPassword }
    const result = await customAxios().post('/api/change_password', data)
    return result
}

export const getVoucher = async () => {
    const result = await customAxios().get('/api/vouchers')
    return result
}

export const changeProfile = async (avatar, date, address, nickName, email) => {
    const data = { avatar: avatar, date: date, address: address, nickName: nickName, email: email }
    const result = await customAxios().post('/update/profiles', data)
    return result
}

