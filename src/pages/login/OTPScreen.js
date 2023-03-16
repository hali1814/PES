import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, TextInput } from 'react-native'
import React, { useState, useEffect } from 'react'
import colorsPES from '../../constants/colors'
import { icons } from '../../assets';
import Icon from 'react-native-vector-icons/Ionicons'



const OTPScreen = ({ navigation, route }) => {
    const { phoneNumber } = route.params 

    const [remainingTime, setRemainingTime] = useState(300);

    useEffect(() => {
        const interval = setInterval(() => {
            setRemainingTime(remainingTime - 1);
        }, 1000);

        return () => clearInterval(interval);
    }, [remainingTime]);

    const minutes = Math.floor(remainingTime / 60);
    const seconds = remainingTime % 60;

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity
                onPress={() => { navigation.goBack() }}
            >
                <Icon
                    name='arrow-back-outline'
                    size={30}
                    color='#000000'
                />
            </TouchableOpacity>
            <Text style={{ fontSize: 24, marginTop: 30, fontWeight: 'bold', color: colorsPES.black }}>Nhập mã xác thực</Text>
            <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <Text style={{ fontSize: 16, color: colorsPES.blackText }}>Nhập mã 6 số được gửi đến :</Text>
                <Text style={{ fontSize: 16, color: colorsPES.blackText, marginStart: 10 }}>+84 {phoneNumber.toString().slice(1, 9)}</Text>
            </View>
            <View style={styles.OTPContainer}>
                <View style={styles.OTPInput}>
                    <TextInput
                        placeholder=''
                    />
                </View>
                <View style={styles.OTPInput}>
                    <TextInput
                        placeholder=''
                    />
                </View>
                <View style={styles.OTPInput}>
                    <TextInput
                        placeholder=''
                    />
                </View>
                <View style={styles.OTPInput}>
                    <TextInput
                        placeholder=''
                    />
                </View>
                <View style={styles.OTPInput}>
                    <TextInput
                        placeholder=''
                    />
                </View>
                <View style={styles.OTPInput}>
                    <TextInput
                        placeholder=''
                    />
                </View>
            </View>
            <View style={{ flexDirection: 'row', marginTop: 80, justifyContent: 'center' }}>
                <Text style={{ fontSize: 16, color: colorsPES.blackText }}>Bạn không nhận được mã?</Text>
                <Text style={{ fontSize: 16, color: colorsPES.borderColorBlue, marginStart: 10 }}>Gửi lại : {minutes}:{seconds < 10 ? '0' : ''}{seconds}</Text>
            </View>
            <TouchableOpacity
                style={{ justifyContent: 'center', alignItems: 'center', marginTop: 100 }}
                onPress={() => { navigation.navigate('Register') }}
            >
                <Text style={{ fontSize: 16, color: colorsPES.borderColorBlue }}>
                    Đăng ký tài khoản mới
                </Text>
            </TouchableOpacity>
            <TouchableOpacity
                style={{
                    justifyContent: 'center', alignItems: 'center', marginTop: 20, width: '100%',
                    paddingVertical: 13, backgroundColor: colorsPES.borderColorBlue, borderRadius: 60
                }}
            >
                <Text style={{ fontSize: 16, color: colorsPES.white }}>
                    Tiếp
                </Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default OTPScreen

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingVertical: 10,
        paddingHorizontal: 20,
        backgroundColor: colorsPES.white
    },

    OTPContainer: {
        flexDirection: 'row',
        width: '100%',
        height: 60,
        marginTop: 40,
        justifyContent: 'space-between'
    },

    OTPInput: {
        padding: 10,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: colorsPES.borderColorBlue
    },
})