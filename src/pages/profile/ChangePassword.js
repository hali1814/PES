import { StyleSheet, Text, View, SafeAreaView, TouchableOpacity, Image, TextInput, ScrollView, Modal, Alert } from 'react-native'
import React, { useState, useContext } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import {
    isValidPassword,
    isValidNewPassword
} from '../../utils/Validations';

import { UserContext } from '../../api/authservice/UserContext';
import {
    SuccessDialog,
    FailDialog,
} from '../../components'


const ChangePassword = ({ navigation }) => {
    const [password, setPassword] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [newPassword, setNewPassword] = useState('')
    const [errorNewPassword, setErrorNewPassword] = useState('')
    const [confirmPassword, setConfirmPassword] = useState('')
    const [successDialogVisible, setSuccessDialogVisible] = useState(false);
    const [failedDialogVisible, setFailedDialogVisible] = useState(false);

    const {
        onChangePassword,
    } = useContext(UserContext)

    const showSuccessAlert = () => {
        Alert.alert('change password successfully')
    }

    const handleSuccess = () => {
        setSuccessDialogVisible(true);
    };
    const handleSuccessDialogClose = () => {
        setSuccessDialogVisible(false);
    };

    const handleFailed = () => {
        setFailedDialogVisible(true);
    };
    const handleFailedDialogClose = () => {
        setFailedDialogVisible(false);
    };
    const ChangeUserPassword = async () => {
        try {
            const res = await onChangePassword(password, newPassword)
            if (res == false) {
                handleFailed()
            } else {
                handleSuccess()
                setTimeout(() => { navigation.navigate('Profile') }, 1500)
            }
        } catch (error) {
            alert('change password failed')
            console.log('change password failed: ' + error)
            throw error
        }
    }

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView>
                <View style={styles.headerContainer}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Đổi mật khẩu</Text>
                </View>
                <Text style={({ fontSize: 10, fontWeight: '400', lineHeight: 14, color: colorsPES.transText, marginTop: 25, marginHorizontal: 24 })}>Để đảm bảo tài khoản của bạn luôn được an toàn, vui lòng nhập đúng mật khẩu PES và không quá 3 lần.</Text>
                <View style={styles.textInputContainer}>
                    <TextInput
                        style={styles.input}
                        placeholder='Mật khẩu hiện tại'
                        value={password}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setErrorPassword(isValidPassword(text) == true
                                ? ''
                                : 'Mật khẩu phải đủ 3 ký tự trở lên')
                            setPassword(text)
                        }}
                    />
                    <Text style={{ color: 'red', fontSize: 14 }}>{errorPassword}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập mật khẩu mới'
                        value={newPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => {
                            setErrorNewPassword(isValidNewPassword(text) == true || isValidNewPassword(text) != password
                                ? ''
                                : 'Mật khẩu không được trùng')
                            setNewPassword(text)
                        }}
                    />
                    <Text style={{ color: 'red', fontSize: 14 }}>{errorNewPassword}</Text>
                    <TextInput
                        style={styles.input}
                        placeholder='Nhập lại mật khẩu mới'
                        value={confirmPassword}
                        secureTextEntry={true}
                        onChangeText={(text) => setConfirmPassword(text)}
                    />
                    <TouchableOpacity
                        onPress={ChangeUserPassword}
                        style={styles.buttonUpdate}
                    >
                        <Text style={({ fontSize: 16, fontWeight: '500', color: colorsPES.white })}>Cập nhật</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.buttonForget}>
                        <Text style={({ fontSize: 15, fontWeight: '400', color: colorsPES.primary })}>Quên mật khẩu?</Text>
                    </TouchableOpacity>
                    <SuccessDialog
                        visible={successDialogVisible}
                        onPress={handleSuccessDialogClose}
                        message="Đổi mật khẩu thành công !"
                    />
                    <FailDialog
                        visible={failedDialogVisible}
                        onPress={handleFailedDialogClose}
                        message="Đổi mật khẩu thất bại !"
                    />
                </View>
            </ScrollView>
        </SafeAreaView>
    )
}

export default ChangePassword

const styles = StyleSheet.create({

    buttonForget: {
        marginVertical: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },

    buttonUpdate: {
        paddingVertical: 11,
        marginTop: 27,
        backgroundColor: colorsPES.borderColorBlue,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
    },


    input: {
        paddingVertical: 13,
        paddingHorizontal: 16,
        borderRadius: 60,
        borderWidth: 1,
        borderColor: colorsPES.borderColorBlue,
        marginTop: 16,
    },

    textInputContainer: {
        marginTop: 16,
        marginHorizontal: 12,
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: colorsPES.white
    },

    headerText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: colorsPES.blackText,
        marginLeft: 130,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: colorsPES.white,
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: '100%'
    },

    container: {
        backgroundColor: colorsPES.grey,
        height: '100%',
    },
})