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
  Modal,
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
import auth from '@react-native-firebase/auth';
import {GoogleSignin} from '@react-native-google-signin/google-signin';
import Loading from '../../components/Loading';
// import { LoginManager, AccessToken } from 'react-native-fbsdk-next';
GoogleSignin.configure({
  // scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  webClientId:
    '225166278712-vhtrmm2qqkp2m0sgcoal8ffkunc8vukm.apps.googleusercontent.com',
});

const Login = props => {
  const {navigation, route} = props;
  const [errorPhoneNumber, setErrorPhoneNumber] = useState('');
  const [errorPassword, setErrorPassword] = useState('');
  const [phoneNumber, setPhoneNumber] = useState('0865658544');
  const [password, setPassword] = useState('123');
  const [loading, setLoading] = useState(false);

  //auth gg
  // Set an initializing state whilst Firebase connects
  const [initializing, setInitializing] = useState(true);
  const [user, setUser] = useState();
  // Handle user state changes
  function onAuthStateChanged(user) {
    setUser(user);
    if (initializing) setInitializing(false);
  }
  useEffect(() => {
    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);
    return subscriber; // unsubscribe on unmount
  }, []);

  ///GG
  async function onGoogleButtonPress() {
    try {
      // Check if your device supports Google Play
      setLoading(true);
      await GoogleSignin.hasPlayServices({showPlayServicesUpdateDialog: true});
      // Get the users ID token
      const {idToken} = await GoogleSignin.signIn();
      setLoading(false);
      // console.log(idToken, '11111111');
      // Create a Google credential with the token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Sign-in the user with the credential
      return auth().signInWithCredential(googleCredential);
    } catch (err) {
      console.log(err);
    }
  }

  // console.log(user, 'ahihi')

  async function onLoginGoogle() {
    onGoogleButtonPress().then(user => {
      const data = user.user
      // uid, email, nickName, avatar
      console.log(data.uid, data.email, data.nickName, data.photoURL)
      onLoginGG(data.uid, data.email, data.displayName, data.photoURL)

    }
      ,
    );
  }

  ///////////////////////////////////
  //FB
  // async function onFacebookButtonPress() {
  //   // Attempt login with permissions
  //   const result = await LoginManager.logInWithPermissions(['public_profile', 'email']);

  //   if (result.isCancelled) {
  //     throw 'User cancelled the login process';
  //   }

  //   // Once signed in, get the users AccesToken
  //   const data = await AccessToken.getCurrentAccessToken();

  //   if (!data) {
  //     throw 'Something went wrong obtaining access token';
  //   }

  //   // Create a Firebase credential with the AccessToken
  //   const facebookCredential = auth.FacebookAuthProvider.credential(data.accessToken);

  //   // Sign-in the user with the credential
  //   return auth().signInWithCredential(facebookCredential);
  // }

  // async function onLoginGoogle() {
  //   onFacebookButtonPress().then(() => console.log('Signed in with Facebook!'))
  // }

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

  const {onLogin, setIsLoggedIn, onLoginGG} = useContext(UserContext);
  const checkToken = async () => {
    const token = await AsyncStorage.getItem('token');
    console.log(token);
    if (token) {
      setIsLoggedIn(true);
    }
  };
  useEffect(() => {
    checkToken();
  }, []);

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
        <Text style={styles.title}>{'Nhập số điện thoại'}</Text>
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
      <Text style={{color: 'red', fontSize: 14, fontFamily: Fonts.Roboto_Medium}}>
        {errorPhoneNumber}
      </Text>
      <View style={styles.InputContainerMK}>
        <TextInput
          style={{
            width: '80%',
            fontFamily: Fonts.Roboto_Medium,
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
      <View style={{justifyContent:'space-between',flexDirection:'row'}}>
      <Text style={{ marginTop:4, width:'65%', color: 'red', fontSize: 14, fontFamily: Fonts.Roboto_Medium}}>
        {errorPassword}
      </Text>
      <TouchableOpacity
        onPress={() => {
          navigation.push('');
        }}
        style={styles.registerContainer}>
        <Text style={styles.registerText}>{'Quên mật khẩu?'}</Text>
      </TouchableOpacity>
      </View>

      <View>
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
      </View>
      <TouchableOpacity
        onPress={() => {
          navigation.push('Register');
        }}
        style={styles.newAccout}>
        <Text style={styles.registerText}>{'Đăng ký tài khoản mới'}</Text>
      </TouchableOpacity>

      <View style={styles.socialLoginContainer}>
        <TouchableOpacity onPress={onLoginGoogle} style={styles.facebookLogin}>
          <Image style={{width: 18, height: 18}} source={icons.googleIcon} />
        </TouchableOpacity>
        <TouchableOpacity style={styles.facebookLogin}>
          <Image style={{width: 24, height: 24}} source={icons.facebookIcon} />
        </TouchableOpacity>
      </View>
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
            navigation.navigate('OTP', {
              phoneNumber: phoneNumber,
              password: password,
            });
            handleConfirmDialogClose();
          }}
          message="Tài khoản của bạn chưa được kích hoạt"
          confirmMessage="Nhập OTP"
        />
      </View>
      <Loading visible={loading} />
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
    marginTop: 54,
    borderRadius: 60,
  },

  registerText: {
    fontFamily: Fonts.Roboto_Bold,
    fontWeight:'700',
    fontSize: 14,
    color: colorsPES.borderColorBlue,
  },

  registerContainer: {
    marginTop:4,
    alignItems:'flex-end'
  },
  newAccout: {
    marginTop:24,
    alignItems:'center'
  },

  facebookLogin: {
    borderWidth: 1,
    width:44,
    height:44,
    padding:12,
    borderRadius:360,
    borderColor: colorsPES.borderColorBlue,
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft:12
  },


  socialLoginContainer: {
    width: '97%',
    flexDirection: 'row',
    alignItems:'center',
    justifyContent:'center',
    marginTop:300,
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
    marginTop: 8,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderRadius: 60,
    borderColor: color.BORDER_BOTTOM,
  },

  welcome: {
    fontFamily:Fonts.Roboto_Regular,
    fontSize: 14,
    color: color.TEXT_PRIMARY,
  },

  welcomeContainer: {
    height: 19,
    marginTop: 8,
  },

  titleContainer: {
    marginTop: 44,
  },

  title: {
    fontFamily: Fonts.Roboto_Bold,
    fontWeight:'700',
    fontSize: 24,
    color: color.TEXT_PRIMARY,
  },

  container: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 16,
    backgroundColor: colorsPES.white,
  },
});
