import AsyncStorage from '@react-native-async-storage/async-storage';
import customAxios from '../helper/Axios';

export const register = async (
  userName,
  password,
  date,
  address,
  nickName,
  email,
) => {
  const data = {
    userName: userName,
    password: password,
    date: date,
    address: address,
    nickName: nickName,
    email: email,
  };
  const result = await customAxios().post('/api/register', data);
  return result;
};

export const login = async (userName, password) => {
  const data = {userName: userName, password: password};
  const result = await customAxios().post('/api/login', data);
  return result;
};

export const logout = async () => {
  // const token = AsyncStorage.getItem('token');
  const result = await customAxios().get('/api/logout');
  return result;
};

export const getUserInfor = async () => {
  const result = await customAxios().get('/api/profiles');
  return result;
};

export const ChangePassword = async (password, newPassword) => {
  const data = {password: password, newPassword: newPassword};
  const result = await customAxios().post('/api/change_password', data);
  return result;
};

export const getVoucher = async () => {
  const result = await customAxios().get('/api/vouchers');
  return result;
};

export const changeProfile = async (avatar, date, address, nickName, email) => {
  const data = {
    avatar: avatar,
    date: date,
    address: address,
    nickName: nickName,
    email: email,
  };
  const result = await customAxios().post('/api/update/profiles', data);
  return result;
};

export const upload = async data => {
  const result = await customAxios('multipart/form-data').post(
    '/api/upLoadOne',
    data,
  );
  return result;
};

export const setTokenDevice = async tokenDevice => {
  const data = {tokenDevice};
  const result = await customAxios().post('/api/getTokenDevice', data);
  return result;
};


export const activeUser = async (userName) => {
  const data = {userName}
  const result = await customAxios().post('/api/active', data);
  return result;
};


export const loginByGG = async (uid, email, nickName, avatar) => {
  const data = {uid, email, nickName, avatar}
  const result = await customAxios().post('/api/login/google', data);
  return result;
};
