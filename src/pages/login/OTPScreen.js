import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  TextInput,
  Alert
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import colorsPES from '../../constants/colors';
import {icons} from '../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';
import auth from '@react-native-firebase/auth';
import {UserContext} from '../../api/authservice/UserContext'


const OTPScreen = ({navigation, route}) => {
  const {phoneNumber, password} = route.params;
  const {activeVoucherController, onLogin} = useContext(UserContext)
  const [remainingTime, setRemainingTime] = useState(300);

  const [OTP, setOTP] = useState('');

  const [confirm, setConfirm] = useState('');

  // Handle login
  function onAuthStateChanged(user) {
    if (user) {
      // Some Android devices can automatically process the verification code (OTP) message, and the user would NOT need to enter the code.
      // Actually, if he/she tries to enter it, he/she will get an error message because the code was already used in the background.
      // In this function, make sure you hide the component(s) for entering the code and/or navigate away from this screen.
      // It is also recommended to display a message to the user informing him/her that he/she has successfully logged in.
    }
  }
  useEffect(() => {
    let formatPhone = phoneNumber.slice(1, phoneNumber.length);
    // console.log(formatPhone, password)
    signInWithPhoneNumber(`+84 ${formatPhone}`);
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  // Handle the button press
  async function signInWithPhoneNumber(phoneNumber) {
    const confirmation = await auth().signInWithPhoneNumber(phoneNumber);
    console.log(confirmation);
    setConfirm(confirmation);
  }

  async function confirmCode(code) {
    try {
      await confirm.confirm(code);
      await activeVoucherController(phoneNumber)
      await onLogin(phoneNumber, password)
    } catch (error) {
      Alert.alert('OTP khong hop le')
    }
  }

  //   useEffect(() => {
  //     const interval = setInterval(() => {
  //       setRemainingTime(remainingTime - 1);
  //     }, 1000);

  //     return () => clearInterval(interval);
  //   }, [remainingTime]);

  const minutes = Math.floor(remainingTime / 60);
  const seconds = remainingTime % 60;

  return (
    <SafeAreaView style={styles.container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}>
        <Icon name="arrow-back-outline" size={30} color="#000000" />
      </TouchableOpacity>
      <Text
        style={{
          fontSize: 24,
          marginTop: 30,
          fontWeight: 'bold',
          color: colorsPES.black,
        }}>
        Nhập mã xác thực
      </Text>
      <View style={{flexDirection: 'row', marginTop: 10}}>
        <Text style={{fontSize: 16, color: colorsPES.blackText}}>
          Nhập mã 6 số được gửi đến :
        </Text>
        <Text
          style={{fontSize: 16, color: colorsPES.blackText, marginStart: 10}}>
          +84 {phoneNumber.toString().slice(1, 9)}
        </Text>
      </View>

      <View style={styles.OTPContainer}>
        <TextInput
          keyboardType="numeric"
          maxLength={6}
          value={OTP}
          onChangeText={setOTP}
          focusable={false}
          textAlign="center"
          style={{
            color: color.TEXT_PRIMARY,
            borderColor: colorsPES.primary,
            borderBottomWidth: 2,
            fontSize: 20,
            width: '100%',
            paddingVertical: 5,
            height: 30,
          }}
        />
      </View>
      <View
        style={{flexDirection: 'row', marginTop: 80, justifyContent: 'center'}}>
        <Text style={{fontSize: 16, color: colorsPES.blackText}}>
          Bạn không nhận được mã?
        </Text>
        <Text
          style={{
            fontSize: 16,
            color: colorsPES.borderColorBlue,
            marginStart: 10,
          }}>
          Gửi lại : {minutes}:{seconds < 10 ? '0' : ''}
          {seconds}
        </Text>
      </View>
      <TouchableOpacity
        style={{justifyContent: 'center', alignItems: 'center', marginTop: 100}}
        onPress={() => {
          navigation.navigate('Register');
        }}>
        <Text style={{fontSize: 16, color: colorsPES.borderColorBlue}}>
          Đăng ký tài khoản mới
        </Text>
      </TouchableOpacity>
      <TouchableOpacity
        disabled={!(OTP.length == 6)}
        onPress={()=>confirmCode(OTP)}
        style={{
          justifyContent: 'center',
          alignItems: 'center',
          marginTop: 20,
          width: '100%',
          paddingVertical: 13,
          backgroundColor:!(OTP.length == 6) ?colorsPES.grey : colorsPES.borderColorBlue,
          borderRadius: 5,
        }}>
        <Text style={{fontSize: 16, color: colorsPES.white}}>Tiếp</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default OTPScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 10,
    paddingHorizontal: 20,
    backgroundColor: colorsPES.white,
  },

  OTPContainer: {
    flexDirection: 'row',
    width: '100%',
    height: 60,
    marginTop: 40,
    justifyContent: 'space-between',
  },

  OTPInput: {
    height: 50,
    width: 50,
    borderRadius: 5,
    borderWidth: 1,
    borderColor: colorsPES.borderColorBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
