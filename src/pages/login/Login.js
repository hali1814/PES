import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Alert, StatusBar } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import colorsPES from '../../constants/colors';
import { icons } from '../../assets';
import { isValidPassword, isValidPhoneNumber } from '../../utils/Validations';
import { UserContext } from '../../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { FailDialog, SuccessDialog, ConfirmDialog } from '../../components';

const Login = (props) => {
    const { navigation, route } = props;
    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const isValidationOK = () => phoneNumber.length > 0 && password.length > 0
        && isValidPhoneNumber(phoneNumber) == true
        && isValidPassword(password) == true;
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

    useEffect(() => {

    }, [])
    const {
        onLogin,
    } = useContext(UserContext)

    const login = async () => {
        try {
            const res = await onLogin(phoneNumber, password)
            const token = await AsyncStorage.getItem('token')
            console.log('token: ' + token)
            if (res == true) {
                handleSuccess()
            } if (typeof res === 'string') {
                handleConfirm()
            }
            else {
                handleFailed()
            }
        } catch (error) {
            console.log('error', error)
        }
    }






    return (
        <SafeAreaView style={styles.container}>
            {/* <TouchableOpacity>
                <Image source={icons.backIcon} />
            </TouchableOpacity> */}

            <StatusBar
                barStyle="dark-content"
                backgroundColor={colorsPES.white}
            />
            <View style={styles.titleContainer}>
                <Text style={styles.title}> Nhập số điện thoại</Text>
            </View>
            <View style={styles.welcomeContainer}>
                <Text style={styles.welcome}> Rất vui khi bạn đã quay trở lại với chúng tôi !</Text>
            </View>
            <View style={styles.InputContainer}>
                <Image source={icons.vietnamIcon} />
                <Text style={StyleSheet.create({ marginRight: 10 })}>+84</Text>
                <TextInput
                    placeholder='Nhập số điện thoại'
                    value={phoneNumber}
                    keyboardType='phone-pad'
                    onChangeText={(text) => {
                        setErrorPhoneNumber(isValidPhoneNumber(text) == true
                            ? ''
                            : 'Số điện thoại phải đủ 10 ký tự')
                        setPhoneNumber(text)
                    }}
                />
            </View>
            <Text style={{ color: 'red', fontSize: 14 }}>{errorPhoneNumber}</Text>
            <View style={styles.InputContainer}>
                <TextInput
                    placeholder='Nhập mật khẩu'
                    value={password}
                    keyboardType='default'
                    secureTextEntry={true}
                    onChangeText={(text) => {
                        setErrorPassword(isValidPassword(text) == true
                            ? ''
                            : 'Mật khẩu phải đủ 3 ký tự trở lên')
                        setPassword(text)
                    }}
                />
            </View>
            <Text style={{ color: 'red', fontSize: 14 }}>{errorPassword}</Text>
            <View style={styles.socialLoginContainer}>
                <TouchableOpacity style={styles.googleLogin}>
                    <Image source={icons.googleIcon} />
                    <Text>GOOGLE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.facebookLogin}>
                    <Image source={icons.facebookIcon} />
                    <Text>FACEBOOK</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => { navigation.push('Register') }} style={styles.registerContainer}>
                <Text style={styles.registerText}>Đăng ký tài khoản mới</Text>
            </TouchableOpacity>
            <TouchableOpacity
                disabled={isValidationOK() == false}
                style={[styles.loginButton,
                {
                    backgroundColor: isValidationOK() == false
                        ? colorsPES.inActive
                        : colorsPES.primary,
                }]
                }
                onPress={login}
            >
                <Text style={styles.loginText}>Đăng nhập</Text>
            </TouchableOpacity>
            <View style={styles.termContainer}>
                <Text style={styles.termText}>
                    Chấp nhận mọi Điều khoản sử dụng & Chính sách bảo mật khi đăng nhập sử dụng dịch vụ của chúng tôi
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
                    onPress={() => { navigation.navigate('OTP', { phoneNumber: phoneNumber }) }}
                    message="Tài khoản của bạn chưa được kích hoạt"
                    confirmMessage='Nhập OTP'
                />
            </View>
        </SafeAreaView>
    )
}

export default Login

const styles = StyleSheet.create({

    termText: {
        color: colorsPES.transText,
        fontWeight: '400',
        fontSize: 12,
    },

    termContainer: {
        width: '100%',
        height: 32,
        marginTop: 16,
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
        borderWidth: 1,
        borderColor: colorsPES.borderColorBlue,
        borderRadius: 60,
    },

    registerText: {
        fontWeight: '600',
        fontSize: 14,
        color: colorsPES.borderColorBlue,
    },

    registerContainer: {
        width: '100%',
        height: 44,
        marginTop: 150,
        justifyContent: 'center',
        alignItems: 'center',
    },

    facebookLogin: {
        width: '40%',
        height: '100%',
        borderWidth: 1,
        borderColor: colorsPES.borderColorBlue,
        borderRadius: 8,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        alignItems: 'center',
    },

    googleLogin: {
        width: '40%',
        height: '100%',
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
        marginBottom: 10,
        paddingHorizontal: 16,
        flexDirection: 'row',
        justifyContent: 'flex-start',
        alignItems: 'center',
        borderWidth: 1,
        borderRadius: 40,
        borderColor: colorsPES.borderColorPrimary,
    },

    welcome: {
        fontWeight: '400',
        fontSize: 14,
        color: colorsPES.blackText
    },

    welcomeContainer: {
        width: '100%',
        height: 19,
        marginTop: 8,
    },

    titleContainer: {
        width: 182,
        height: 27,
        marginTop: 40,
    },

    title: {
        width: '100%',
        height: '100%',
        fontWeight: '800',
        fontSize: 20,
        color: colorsPES.blackText,
    },

    container: {
        flex: 1,
        paddingHorizontal: 16,
        paddingTop: 16,
        backgroundColor: colorsPES.white
    }
})