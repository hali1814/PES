import AsyncStorage from "@react-native-async-storage/async-storage";
import customAxios from "../helper/Axios";

export const login = async (userName, password) => {
    const data = { userName: userName, password: password };
    const result = await customAxios().post('/api/login', data);
    return result;
}

export const logout = async () => {
    const token = AsyncStorage.getItem('token')
    const result = await customAxios().get('/api/logout', token);
    return result;
}

