import {
  login,
  logout,
  getUserInfor,
  ChangePassword,
  getVoucher,
  register,
  changeProfile,
  upload,
  setTokenDevice,
  activeUser,
  loginByGG
} from './UserService';
import React, {useState, createContext} from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import messaging from '@react-native-firebase/messaging';
export const UserContext = createContext();

export const UserContextProvider = props => {
  const {children} = props;
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [user, setUser] = useState([]);
  const [voucher, setVoucher] = useState([]);
  const [profileLoading, setProfileLoading] = useState(false);

  const [voucher_shipping, setVoucher_shipping] = useState('');
  const [voucher_pes, setVoucher_pes] = useState('');

  const onRegister = async (
    userName,
    password,
    date,
    address,
    nickName,
    email,
  ) => {
    try {
      const res = await register(
        userName,
        password,
        date,
        address,
        nickName,
        email,
      );
      if (res.status == 'success') {
        const message = res.data.message;
        console.log('message ==>', message);
        return true;
      }
    } catch (error) {
      console.log('onRegister error', error);
      throw error;
    }
    return false;
  };

  const onLogin = async (userName, password) => {
    try {
      const res = await login(userName, password);
      if (res.status == 'success') {
        const token = res.data.token;
        await AsyncStorage.setItem('token', token);
        //set tokenDevice
        messaging()
          .getToken()
          .then(token => {
            setTokenDevice(token);
            // Gửi token lên máy chủ để lưu trữ và sử dụng sau này
          });


        //
        setIsLoggedIn(true);
        return true;
      } else if (res.status == 'inactive') {
        const message = res.data.message;
        console.log('Message ===>', message);
        return message;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    } catch (e) {
      console.log('onLogin error', e);
    }
    return false;
  };

  const onChangePassword = async (password, newPassword) => {
    try {
      const res = await ChangePassword(password, newPassword);
      console.log('change pass ===> ', res);
      if (res.status == 'success') {
        const message = res.data;
        console.log('message ===>', message);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('on change password failed', error);
    }
    return false;
  };

  const onChangeProfile = async (avatar, date, address, nickName, email) => {
    try {
      const res = await changeProfile(avatar, date, address, nickName, email);
      if (res.status == 'success') {
        console.log('change profile ===>', res.data.message);
        return true;
      } else {
        return false;
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const onLogout = async () => {
    try {
      const res = await logout();
      if (res.status == 'success') {
        await AsyncStorage.removeItem('token');
        setIsLoggedIn(false);
      }
    } catch (e) {
      console.log('onLogout error', e);
    }
    return false;
  };

  const ongetVoucher = async () => {
    try {
      const res = await getVoucher();
      if (res.status == 'success') {
        setVoucher(res.data);
      }
    } catch (error) {
      console.log('onGetVoucher error', error);
      throw error;
    }
  };

  const onGetUserInfor = async () => {
    setProfileLoading(true);
    try {
      const res = await getUserInfor();
      if (res.status == 'success') {
        setUser(res.data);
        setProfileLoading(false);
        return res.data
      } else if (res.status == 'inactive') {
        const message = res.data.message;
        console.log('message ==> ', message);
        return false;
      }
    } catch (error) {
      console.log('onGetUserInfor error', error);
    }
    return null;
  };

  const onUpload = async image => {
    try {
      const res = await upload(image);
      console.log('ressssss', res);
      if (res.error == false) {
        return res.data;
      }
    } catch (e) {
      console.log('Upload a image Failed', e);
    }
    return null;
  };

  const setTokenDeviceContext = async tokenDevice => {
    try {
      const res = await setTokenDevice(tokenDevice);
      if (res.status == 'success') {
        return true;
      } else return false;
    } catch (error) {
      console.log('onGetVoucher error', error);
      throw error;
    }
  };

  const activeVoucherController = async (userName) => {
    try {
      const res = await activeUser(userName)
      console.log(res)
      if (res.status == 'success') {
        return true;
      } else return false;
    } catch (error) {
      console.log('activeVoucherController error', error);
      throw error;
    }
  };

  const onLoginGG = async (uid, email, nickName, avatar) => {
    try {
      const res = await loginByGG(uid, email, nickName, avatar);
      if (res.status == 'success') {
        const token = res.data.token;
        await AsyncStorage.setItem('token', token);
        //set tokenDevice
        messaging()
          .getToken()
          .then(token => {
            setTokenDevice(token);
            // Gửi token lên máy chủ để lưu trữ và sử dụng sau này
          });
        //
        const getProfile = await onGetUserInfor()
        setIsLoggedIn(true);
        return true;
      } else if (res.status == 'inactive') {
        const message = res.data.message;
        console.log('Message ===>', message);
        return message;
      } else {
        setIsLoggedIn(false);
        return false;
      }
    } catch (e) {
      console.log('onLogin error', e);
    }
    return false;
  };

  return (
    <UserContext.Provider
      value={{
        isLoggedIn,
        onLogin,
        user,
        onLogout,
        setIsLoggedIn,
        onGetUserInfor,
        onChangePassword,
        ongetVoucher,
        voucher,
        onRegister,
        setVoucher,
        onChangeProfile,
        onUpload,
        profileLoading,
        setProfileLoading,
        voucher_pes,
        setVoucher_pes,
        voucher_shipping,
        setVoucher_shipping,
        setTokenDeviceContext,
        activeVoucherController,
        onLoginGG
      }}>
      {children}
    </UserContext.Provider>
  );
};
