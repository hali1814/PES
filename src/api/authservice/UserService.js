import AsyncStorage from "@react-native-async-storage/async-storage";
import customAxios from "../helper/Axios";

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

