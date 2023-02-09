import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import colorsPES from '../../constants/colors';
import { icons } from '../../assets';

const Login = () => {
    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity>
                <Image source={icons.backIcon} />
            </TouchableOpacity>
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
                    keyboardType='phone-pad'
                />
            </View>
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
            <TouchableOpacity style={styles.registerContainer}>
                <Text style={styles.registerText}>Đăng ký tài khoản mới</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.loginButton}>
                <Text style={styles.loginText}>Tiếp</Text>
            </TouchableOpacity>
            <View style={styles.termContainer}>
                <Text style={styles.termText}>
                    Chấp nhận mọi Điều khoản sử dụng & Chính sách bảo mật khi đăng nhập sử dụng dịch vụ của chúng tôi
                </Text>
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
        backgroundColor: colorsPES.primary,
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
        marginTop: 200,
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
        marginHorizontal: 16,
        marginTop: 16
    }
})