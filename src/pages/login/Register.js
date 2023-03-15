import { StyleSheet, Text, View, Image, TextInput, TouchableOpacity, SafeAreaView, Alert, ToastAndroid } from 'react-native'
import React, { useState, useContext } from 'react'
import colorsPES from '../../constants/colors';
import { icons } from '../../assets';
import { isValidPassword, isValidPhoneNumber } from '../../utils/Validations';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { UserContext } from '../../api/authservice/UserContext';
import { Picker } from '@react-native-picker/picker';
import { SuccessDialog, FailDialog } from '../../components';
import Fonts from '../../assets/fonts/fonts';

const Register = ({ navigation }) => {

    const [errorPhoneNumber, setErrorPhoneNumber] = useState('')
    const [errorPassword, setErrorPassword] = useState('')
    const [phoneNumber, setPhoneNumber] = useState('')
    const [password, setPassword] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [nickName, setNickName] = useState('')
    const [errorNickName, setErrorNickName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false);

    const cities = [
        "An Giang",
        "Bà Rịa - Vũng Tàu",
        "Bạc Liêu",
        "Bắc Kạn",
        "Bắc Giang",
        "Bắc Ninh",
        "Bến Tre",
        "Bình Dương",
        "Bình Định",
        "Bình Phước",
        "Bình Thuận",
        "Cà Mau",
        "Cao Bằng",
        "Cần Thơ",
        "Đà Nẵng",
        "Đắk Lắk",
        "Đắk Nông",
        "Điện Biên",
        "Đồng Nai",
        "Đồng Tháp",
        "Gia Lai",
        "Hà Giang",
        "Hà Nam",
        "Hà Nội",
        "Hà Tĩnh",
        "Hải Dương",
        "Hải Phòng",
        "Hậu Giang",
        "Hòa Bình",
        "Hưng Yên",
        "Khánh Hòa",
        "Kiên Giang",
        "Kon Tum",
        "Lai Châu",
        "Lâm Đồng",
        "Lạng Sơn",
        "Lào Cai",
        "Long An",
        "Nam Định",
        "Nghệ An",
        "Ninh Bình",
        "Ninh Thuận",
        "Phú Thọ",
        "Phú Yên",
        "Quảng Bình",
        "Quảng Nam",
        "Quảng Ngãi",
        "Quảng Ninh",
        "Quảng Trị",
        "Sóc Trăng",
        "Sơn La",
        "Tây Ninh",
        "Thái Bình",
        "Thái Nguyên",
        "Thanh Hóa",
        "Thừa Thiên Huế",
        "Tiền Giang",
        "Trà Vinh",
        "Tuyên Quang",
        "Vĩnh Long",
        "Vĩnh Phúc",
        "Yên Bái"
    ];

    const isValidNickName = () => {
        if (nickName == '' || nickName.length <= 2) {
            setErrorNickName('Tên phải trên 2 ký tự và không được để trống !')
        } else {
            setErrorNickName('')
        }
    }
    const handleNickNameChange = (text) => {
        setNickName(text)
        isValidNickName(text)
    }

    const validateEmail = (text) => {
        // Kiểm tra tính hợp lệ của email
        const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (regex.test(text) == false) {
            setErrorEmail('Sai định dạng Email')
        } else {
            setErrorEmail('')
        }
    }

    const handleEmailChange = (text) => {
        setEmail(text)
        validateEmail(text)
    }

    const isValidationOK = () => {
        if (nickName.length > 0 && email.length > 0 && errorNickName == ''
            && phoneNumber.length > 0 && password.length > 0 && errorEmail == ''
            && errorPassword == '' && errorPhoneNumber == ''
        ) {
            return true
        } else {
            return false
        }
    }

    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };
    const [successDialogVisible, setSuccessDialogVisible] = useState(false);
    const [failedDialogVisible, setFailedDialogVisible] = useState(false);

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


    const register = async () => {
        try {
            const res = await onRegister(phoneNumber, password, date, address, nickName, email)
            if (res == false) {
                handleFailed()
            } else {
                handleSuccess()
                setTimeout(() => { navigation.navigate('Login') }, 2000)
            }
        } catch (error) {
            console.log('register failed: ', error)
            throw error
        }
    }

    const {
        onRegister
    } = useContext(UserContext)

    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <TouchableOpacity
                    onPress={() => { navigation.push('Login') }}
                >
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <View style={styles.titleContainer}>
                    <Text style={styles.title}> Nhập số điện thoại</Text>
                </View>
                <View style={styles.welcomeContainer}>
                    <Text style={styles.welcome}>Chào mừng bạn đến với PES SHOP !</Text>
                </View>
                <View style={styles.InputContainer}>
                    {/* <Image source={icons.vietnamIcon} />
                    <Text style={StyleSheet.create({ marginRight: 10 })}>+84</Text> */}
                    <TextInput
                        placeholder='Nhập số điện thoại'
                        keyboardType='phone-pad'
                        value={phoneNumber}
                        onChangeText={(text) => {
                            setErrorPhoneNumber(isValidPhoneNumber(text) == true
                                ? ''
                                : 'Số điện thoại phải đủ 8 ký tự')
                            setPhoneNumber(text)
                        }}
                    />
                </View>
                <Text style={{ color: 'red', fontSize: 14 }}>{errorPhoneNumber}</Text>
                <View style={styles.InputContainer}>
                    <TextInput
                        placeholder='Nhập mật khẩu'
                        keyboardType='default'
                        value={password}
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
                <TouchableOpacity onPress={() => { setShowDatePicker(true) }} style={styles.InputContainer}>
                    <TextInput
                        style={[{ fontSize: 14, color: colorsPES.black }]}
                        placeholder={`Ngày sinh : ${date.toString().slice(4, 13)}`}
                        value={date ? date.toString().slice(4, 13) : ''}
                        editable={false}
                    />
                    <Icon
                        name="chevron-forward-outline"
                        color="rgba(0,0,0,0.5)"
                        size={20}
                    />
                </TouchableOpacity>
                {showDatePicker && (
                    <DateTimePicker
                        testID="dateTimePicker"
                        value={date || new Date()}
                        mode="date"
                        dateFormat='year month day'
                        display="inline"
                        onChange={handleDateChange}
                    />
                )}
                <Picker
                    style={styles.InputContainer}
                    selectedValue={address}
                    onValueChange={(itemValue) => setAddress(itemValue)}
                >
                    {cities.map((city) => (
                        <Picker.Item key={city} label={city} value={city} />
                    ))}
                </Picker>
                <View style={styles.InputContainer}>
                    <TextInput
                        placeholder='Tên bạn muốn sử dụng trong app'
                        keyboardType='default'
                        value={nickName}
                        onChangeText={handleNickNameChange}
                    />
                </View>
                {errorNickName ? <Text style={{ color: colorsPES.red, fontSize: 15 }}>{errorNickName}</Text> : null}
                <View style={styles.InputContainer}>
                    <TextInput
                        placeholder='Email'
                        keyboardType='default'
                        value={email}
                        onChangeText={handleEmailChange}
                    />
                </View>
                {errorEmail ? <Text style={{ color: colorsPES.red, fontSize: 15 }}>{errorEmail}</Text> : null}
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
                <TouchableOpacity onPress={() => { navigation.goBack() }} style={styles.registerContainer}>
                    <Text style={styles.registerText}>Bạn đã có tài khoản ? Đăng nhập ngay</Text>
                </TouchableOpacity>
                <TouchableOpacity
                    disabled={isValidationOK() == false}
                    style={[styles.loginButton,
                    {
                        backgroundColor: isValidationOK() == false
                            ? colorsPES.inActive
                            : colorsPES.borderColorBlue
                    }
                    ]}
                    onPress={register}
                >
                    <Text style={styles.loginText}>Đăng ký</Text>
                </TouchableOpacity>
                <View style={styles.termContainer}>
                    <Text style={styles.termText}>
                        Chấp nhận mọi Điều khoản sử dụng & Chính sách bảo mật khi đăng nhập sử dụng dịch vụ của chúng tôi
                    </Text>
                </View>
                <SuccessDialog
                    visible={successDialogVisible}
                    onPress={handleSuccessDialogClose}
                    message="Đăng ký thành công"
                />
                <FailDialog
                    visible={failedDialogVisible}
                    onPress={handleFailedDialogClose}
                    message="Đăng ký thất bại (Số điện thoại này đã được đăng ký)"
                />
            </SafeAreaView>
        </ScrollView>
    )
}

export default Register

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
        marginTop: 50,
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
        justifyContent: 'space-between',
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