import {
  StyleSheet,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Alert,
  StatusBar,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import colorsPES from '../../constants/colors';
import {icons} from '../../assets';
import {isValidPassword, isValidPhoneNumber} from '../../utils/Validations';
import {UserContext} from '../../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import {FailDialog, SuccessDialog, ConfirmDialog} from '../../components';
import Fonts from '../../assets/fonts/fonts';
import color from '../../styles/colors';

const Login = props => {
  const {navigation, route} = props;
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0865658544');
  const [password, setPassword] = useState('123');
  const isValidationOK = () =>
    phoneNumber.length > 0 &&
    password.length > 0 &&
    isValidPhoneNumber(phoneNumber) == true &&
    isValidPassword(password) == true;
  const [failedDialogVisible, setFailedDialogVisible] = useState(false);
  const handleFailed = () => {
    setFailedDialogVisible(true);
  };
  const handleFailedDialogClose = () => {
    setFailedDialogVisible(false);
  };
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const handleSuccess = () => {
    setFailedDialogVisible(true);
  };
  const handleSuccessDialogClose = () => {
    setFailedDialogVisible(false);
  };

  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const handleConfirm = () => {
    setConfirmDialogVisible(true);
  };
  const handleConfirmDialogClose = () => {
    setConfirmDialogVisible(false);
  };

  const {onLogin, setIsLoggedIn} = useContext(UserContext);
  const checkToken = async ()=>{
    const token = await AsyncStorage.getItem('token');
    console.log(token)
      if (token) {
        setIsLoggedIn(true);
      }
  }
  useEffect(()=>{
    checkToken()
  })

  const login = async () => {
    try {
      const res = await onLogin(phoneNumber, password);
      const token = await AsyncStorage.getItem('token');
      console.log('token: ' + token);
      if (res == true) {
        handleSuccess();
      }
      if (typeof res === 'string') {
        handleConfirm();
      } else {
        handleFailed();
      }
    } catch (error) {
      console.log('error', error);
    }
  };

  const [isFocused, setIsFocused] = useState(false);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colorsPES.white} />
      <View style={styles.titleContainer}>
        <Text style={styles.title}> Nhập số điện thoại</Text>
      </View>
      <View style={styles.welcomeContainer}>
        <Text style={styles.welcome}>
          {'Rất vui khi bạn đã quay trở lại với chúng tôi!'}
        </Text>
      </View>
      <View style={styles.InputContainer}>
        <Image source={icons.vietnamIcon} style={{width: 16, height: 16}} />
        <Text
          style={StyleSheet.create({
            marginLeft: 4,
            marginRight: 10,
            fontFamily: Fonts.Man_Medium,
            color: color.BLACK,
          })}>
          {'+84'}
        </Text>
        <TextInput
          style={{width: '80%', fontFamily: Fonts.Man_Medium, fontSize: 14}}
          placeholder="Nhập số điện thoại"
          value={phoneNumber}
          keyboardType="phone-pad"
          onChangeText={text => {
            setErrorPhoneNumber(
              isValidPhoneNumber(text) == true
                ? ''
                : 'Số điện thoại phải đủ 10 ký tự',
            );
            setPhoneNumber(text);
          }}
        />
      </View>
      <Text style={{color: 'red', fontSize: 14, fontFamily: Fonts.Man_Medium}}>
        {errorPhoneNumber}
      </Text>
      <View style={styles.InputContainerMK}>
        <TextInput
          style={{
            width: '80%',
            fontFamily: Fonts.Man_Medium,
            fontSize: 14,
          }}
          placeholder="Nhập mật khẩu"
          value={password}
          keyboardType="default"
          secureTextEntry={true}
          onChangeText={text => {
            setErrorPassword(
              isValidPassword(text) == true
                ? ''
                : 'Mật khẩu phải đủ 3 ký tự trở lên',
            );
            setPassword(text);
          }}
        />
      </View>
      <Text style={{color: 'red', fontSize: 14, fontFamily: Fonts.Man_Medium}}>
        {errorPassword}
      </Text>
      <View style={styles.socialLoginContainer}>
        <TouchableOpacity style={styles.googleLogin}>
          <Image style={{width: 18, height: 18}} source={icons.googleIcon} />
          <View style={{height: 20, marginLeft: 8}}>
            <Text
              style={{
                fontFamily: Fonts.Man_Regular,
                fontSize: 15,
                color: color.MAIN,
              }}>
              {'Google'}
            </Text>
          </View>
        </TouchableOpacity>
        <TouchableOpacity style={styles.googleLogin}>
          <Image style={{width: 18, height: 18}} source={icons.facebookIcon} />
          <View style={{height: 20, marginLeft: 8}}>
            <Text
              style={{
                fontFamily: Fonts.Man_Regular,
                fontSize: 15,
                color: color.MAIN,
              }}>
              {'Facebook'}
            </Text>
          </View>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.push('');
        }}
        style={styles.registerContainer}>
        <Text style={styles.registerText}>{'Quên mật khẩu?'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        onPress={() => {
          navigation.push('Register');
        }}
        style={styles.registerContainer}>
        <Text style={styles.registerText}>{'Đăng ký tài khoản mới'}</Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={isValidationOK() == false}
        style={[
          styles.loginButton,
          {
            backgroundColor:
              isValidationOK() == false
                ? 'rgba(88, 101, 242, 0.6)'
                : colorsPES.primary,
          },
        ]}
        onPress={login}>
        <Text style={styles.loginText}>{'Đăng nhập'}</Text>
      </TouchableOpacity>
      <View style={styles.termContainer}>
        <Text style={styles.termText}>
          {
            'Chấp nhận mọi Điều khoản sử dụng & Chính sách bảo mật khi đăng nhập sử dụng dịch vụ của chúng tôi'
          }
        </Text>
        <FailDialog
          visible={failedDialogVisible}
          onPress={handleFailedDialogClose}
          message="Đăng nhập không thành công, xin hãy thử lại!"
        />
        <SuccessDialog
          visible={successDialogVisible}
          onPress={handleSuccessDialogClose}
          message="Đăng nhập thành công"
        />
        <ConfirmDialog
          visible={confirmDialogVisible}
          onCancelPress={handleConfirmDialogClose}
          onPress={() => {
            navigation.navigate('OTP', {phoneNumber: phoneNumber, password: password});
            handleConfirmDialogClose()
          }}
          message="Tài khoản của bạn chưa được kích hoạt"
          confirmMessage="Nhập OTP"
        />
      </View>
    </SafeAreaView>
  );
};

export default Login;

const styles = StyleSheet.create({
  termText: {
    color: colorsPES.transText,
    fontFamily: Fonts.Man_Medium,
    fontSize: 12,
  },

  termContainer: {
    width: '100%',
    marginTop: 16,
    paddingVertical: 10,
    
  },

  loginText: {
    fontWeight: '600',
    fontSize: 14,
    color: colorsPES.white,
  },

  loginButton: {
    height: 44,
    width: '100%',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderRadius: 5,
  },

  registerText: {
    fontFamily: Fonts.Man_Bold,
    fontSize: 14,
    color: colorsPES.borderColorBlue,
  },

  registerContainer: {
    height: 44,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
  },

  facebookLogin: {
    width: 157.5,
    height: 44,
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderWidth: 1,
    borderColor: colorsPES.borderColorBlue,
    borderRadius: 8,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',

  },

  googleLogin: {
    width: 157.5,
    paddingHorizontal: 16,
    paddingVertical: 12,
    height: 49,
    borderWidth: 1,
    borderColor: colorsPES.borderColorBlue,
    borderRadius: 8,
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
  },

  socialLoginContainer: {
    marginTop: 50,
    width: '100%',
    height: 44,
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  InputContainer: {
    width: '100%',
    height: 44,
    marginTop: 24,
    marginBottom: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 60,
    borderColor: color.BORDER_BOTTOM,
  },
  InputContainerMK: {
    width: '100%',
    height: 44,
    marginTop: 12,
    marginBottom: 6,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 60,
    borderColor: color.BORDER_BOTTOM,
  },

  welcome: {
    fontWeight: '400',
    fontSize: 14,
    color: color.TEXT_PRIMARY,
  },

  welcomeContainer: {
    height: 19,
    marginTop: 8,
  },

  titleContainer: {
    marginTop: 24,
  },

  title: {
    fontFamily: Fonts.Man_ExtraBold,
    fontSize: 20,
    color: color.TEXT_PRIMARY,
  },

  container: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
    backgroundColor: colorsPES.white,
  },
});
