import customAxios from "../helper/Axios";

export const login = async (userName, password) => {
    const data = { userName: userName, password: password };
    const result = await customAxios().post('/api/login', data);
    return result;
}

