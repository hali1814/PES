import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { icons } from '../../assets';
import { images } from '../../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import { Picker } from '@react-native-picker/picker';
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';


import {
    SuccessDialog,
    FailDialog,
    ConfirmDialog
} from '../../components'
import PESHeader from '../../components/PESHeader';

const MyProfileDetail = (props) => {
    const { navigation } = props
    const {
        onLogout,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        onGetUserInfor,
        onChangeProfile,
        onUpload
    } = useContext(UserContext)

    const logout = async () => {
        try {
            const res = await onLogout()
            const token = await AsyncStorage.getItem('token')
            // console.log('token', token)
            // console.log(res)
            // setIsLoggedIn(!isLoggedIn)
            if (res) {
                alert('logout failed')
            }
        } catch (error) {
            console.log('error', error)
        }
    }

    const [visible, setVisible] = useState(false);
    const [successDialogVisible, setSuccessDialogVisible] = useState(false);
    const [failedDialogVisible, setFailedDialogVisible] = useState(false);
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);

    const handleConfirm = () => {
        setConfirmDialogVisible(true);
    };
    const handleConfirmDialogClose = () => {
        setConfirmDialogVisible(false);
    };

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

    const showDialog = () => {
        setVisible(true);
    };

    const hideDialog = () => {
        setVisible(false);
    };

    const [avatar, setAvatar] = useState('')
    const [date, setDate] = useState('')
    const [address, setAddress] = useState('')
    const [nickName, setNickName] = useState('')
    const [errorNickName, setErrorNickName] = useState('')
    const [email, setEmail] = useState('')
    const [errorEmail, setErrorEmail] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false);

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

    const isValidationOK = () => {
        if (nickName.length > 0 && email.length > 0 && errorNickName == ''
            && errorEmail == ''
        ) {
            return true
        } else {
            return false
        }
    }


    const checkEmail = () => {
        if (email == "") {
            setEmail(user.email)
        }
    }
    const checkAvatar = () => {
        if (avatar == "") {
            setAvatar(user.avatar)
        } else { user.avatar }
    }
    const checkNickName = () => {
        if (nickName == "") {
            setNickName(user.nickName)
        }
    }
    const checkAddress = () => {
        if (address == "") {
            setAddress(user.address)
        }
    }

    async function requestCameraPermission() {
        try {
            const granted = await PermissionsAndroid.request(
                PermissionsAndroid.PERMISSIONS.CAMERA,
                {
                    title: 'Yêu cầu quyền truy cập vào máy ảnh',
                    message: 'Ứng dụng này yêu cầu truy cập vào máy ảnh của bạn',
                    buttonNeutral: 'Ask Me Later',
                    buttonNegative: 'Cancel',
                    buttonPositive: 'OK',
                },
            );
            if (granted === PermissionsAndroid.RESULTS.GRANTED) {
                openCamera()
            } else {
                console.log('Camera permission denied');
            }
        } catch (err) {
            console.warn(err);
        }
    }

    const openCamera = async () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            // includeBase64: true,
        };

        launchCamera(options, async response => {
            console.log('Response', response.assets)
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // Call API to upload the image to the server
                console.log('rs', response)
                const formData = new FormData();
                formData.append('image', {
                    uri: response.assets[0].uri,
                    type: response.assets[0].type,
                    name: response.assets[0].fileName,
                });
                // console.log('uriiii', response.assets[0].uri)
                const result = await onUpload(formData);
                // console.log('link hinh neeeeee', result);
                setAvatar(result.link);
                // console.log(avatar)
            }
        });
    };


    useEffect(() => {
        onGetUserInfor();
        checkAvatar()
        checkNickName()
        checkEmail()
        checkAddress()

        return () => { }
    }, [])

    const updateProfile = async () => {
        try {
            const res = await onChangeProfile(avatar, date, address, nickName, email)
            if (res == false) {
                handleFailed()
            } else {
                handleSuccess()
                setTimeout(() => { navigation.navigate('Profile'), 2000 })
            }
        } catch (error) {
            console.log('change profile failed', error);
            throw error
        }
    }


    const handleDateChange = (event, selectedDate) => {
        const currentDate = selectedDate || date;
        setShowDatePicker(false);
        setDate(currentDate);
    };





    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <StatusBar
                    backgroundColor='#FFFFFF'
                    barStyle='dark-content'
                />
                <PESHeader title={'Thông tin cá nhân'} navigation={navigation} />
                <View style={styles.body}>
                    <View style={({ justifyContent: 'center', alignItems: 'center', borderRadius: 50 })}>
                        <Image style={({ width: 80, height: 80, borderRadius: 50 })} source={{ uri: user.avatar }} />
                    </View>
                    <View style={styles.inforDetail}>
                        <Text style={styles.titleText}>Tên của bạn</Text>
                        <Text style={styles.contentText}>{user.nickName}</Text>
                    </View>
                    <View style={styles.inforDetail}>
                        <Text style={styles.titleText}>Số điện thoại</Text>
                        <Text style={styles.contentText}>{user.userName}</Text>
                    </View>
                    <View style={styles.inforDetail}>
                        <Text style={styles.titleText}>Email</Text>
                        <Text style={styles.contentText}>{user.email}</Text>
                    </View>
                    <View style={styles.inforDetail}>
                        <Text style={styles.titleText}>Ngày sinh</Text>
                        <Text style={styles.contentText}>{user.date.slice(0, 10)}</Text>
                    </View>
                    <View style={styles.addressDetail}>
                        <View style={styles.addressTitle}>
                            <Text style={styles.titleText}>Địa chỉ giao hàng</Text>
                        </View>
                        <Text style={styles.contentText}>
                            {user.address}
                        </Text>
                    </View>
                    <TouchableOpacity onPress={() => { navigation.push('ChangePassword') }} style={styles.adjustContainer}>
                        <Text style={styles.adjustText}>Đổi mật khẩu</Text>
                        <Image source={icons.nextIconBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.adjustContainer}>
                        <Text style={styles.adjustText}>Tài khoản/ Thẻ ngân hàng</Text>
                        <Image source={icons.nextIconBlack} />
                    </TouchableOpacity>
                    <TouchableOpacity onPress={handleConfirm} style={styles.adjustContainer}>
                        <Text style={[styles.adjustText, { color: colorsPES.red }]}>Đăng xuất</Text>
                        <Image source={icons.nextIconBlack} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity
                    onPress={showDialog}
                    style={styles.button}
                >
                    <Text style={({ fontSize: 16, fontWeight: '500', color: colorsPES.white })}>Cập nhật</Text>
                </TouchableOpacity>
                {/* Update Modal Dialog*/}
                <Modal
                    visible={visible}
                    animationType="slide"
                    transparent
                >
                    <View style={styles.containerModal}>
                        <View style={styles.content}>
                            <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                                <Text style={styles.title}>Cập nhật thông tin cá nhân</Text>
                            </View>
                            <TouchableOpacity
                                onPress={requestCameraPermission}
                                style={{
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    marginBottom: 10,
                                    flexDirection: 'row'
                                }}
                            >
                                <View>
                                    <Image style={{ height: 80, width: 80, borderRadius: 50 }}
                                        source={{ uri: avatar }}
                                    />
                                    <View style={{
                                        position: 'absolute',
                                        bottom: -15,
                                        right: -5,
                                        padding: 8,
                                        backgroundColor: colorsPES.grey,
                                        borderRadius: 20
                                    }}>
                                        <Icon
                                            name="camera" size={20}
                                            color="#5865F2"
                                        />
                                    </View>
                                </View>

                            </TouchableOpacity>
                            <TextInput
                                style={styles.text}
                                placeholder={`Tên : ${nickName}`}
                                value={nickName}
                                onChangeText={handleNickNameChange}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            {errorNickName ? <Text style={{ color: colorsPES.red, fontSize: 15 }}>{errorNickName}</Text> : null}
                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                onPress={() => { setShowDatePicker(true) }}
                            >
                                <TextInput
                                    style={[styles.textDate, {}]}
                                    placeholder={`Ngày sinh : ${user.date.slice(0, 10)}`}
                                    value={date ? user.date.slice(0, 10) : ''}
                                    editable={false}
                                />
                                <Icon
                                    name="chevron-forward-outline"
                                    color="#4F8EF7"
                                    size={30}
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
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <TextInput
                                style={styles.text}
                                placeholder={`email : ${email}`}
                                value={email}
                                onChangeText={handleEmailChange}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            {errorEmail ? <Text style={{ color: colorsPES.red, fontSize: 15 }}>{errorEmail}</Text> : null}
                            <Picker
                                style={{ marginHorizontal: -10 }}
                                selectedValue={address}
                                onValueChange={(itemValue) => setAddress(itemValue)}
                            >
                                {cities.map((city) => (
                                    <Picker.Item key={city} label={city} value={city} />
                                ))}
                            </Picker>
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={hideDialog} style={styles.buttonModal}>
                                    <Text style={styles.closeText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity
                                    disabled={isValidationOK() == false}
                                    onPress={updateProfile}
                                    style={[styles.buttonModal, {}]}
                                >
                                    <Text style={[
                                        styles.updateText,
                                        {
                                            color: isValidationOK() == false
                                                ? colorsPES.inActive
                                                : colorsPES.borderColorBlue
                                        }]}
                                    >Cập nhật</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                    </View>
                </Modal>
                <SuccessDialog
                    visible={successDialogVisible}
                    onPress={handleSuccessDialogClose}
                    message="Cập nhật hồ sơ thành công !"
                />
                <FailDialog
                    visible={failedDialogVisible}
                    onPress={handleFailedDialogClose}
                    message="Cập nhật hồ sơ thất bại !"
                />
                <ConfirmDialog
                    visible={confirmDialogVisible}
                    onCancelPress={handleConfirmDialogClose}
                    onPress={logout}
                    message="Bạn chắc chắn muốn đăng xuất ?"
                    confirmMessage='Đăng xuất'
                />
            </SafeAreaView>
        </ScrollView >
    )
}

export default MyProfileDetail

const styles = StyleSheet.create({

    containerModal: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colorsPES.borderColorBlue,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 16,
        color: colorsPES.blackText
    },
    textDate: {
        fontSize: 16,
        color: colorsPES.blackText
    },
    buttonModal: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: colorsPES.red,
        fontSize: 16,
        fontWeight: '700'
    },
    updateText: {
        fontSize: 16,
        fontWeight: '700'
    },

    button: {
        marginTop: 10,
        paddingVertical: 11,
        backgroundColor: colorsPES.borderColorBlue,
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 16,
        borderRadius: 60,
    },

    adjustText: {
        fontWeight: '500',
        fontSize: 13,
        lineHeight: 18,
        color: colorsPES.blackText,
    },

    adjustContainer: {
        paddingBottom: 16,
        marginTop: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    addressTitle: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    addressDetail: {
        marginTop: 16,
        paddingBottom: 16,
    },

    contentText: {
        fontSize: 14,
        fontWeight: '400',
        color: colorsPES.transText,
    },

    titleText: {
        fontSize: 13,
        fontWeight: '400',
        color: colorsPES.blackText,
    },

    inforDetail: {
        marginTop: 16,
        paddingBottom: 16,
    },

    body: {
        paddingHorizontal: 12,
        paddingVertical: 16,
        marginTop: 12,
        marginHorizontal: 12,
    },

    headerText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: colorsPES.blackText,
        marginLeft: 120,
    },

    header: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        alignItems: 'center',
    },

    container: {
        backgroundColor: colorsPES.white
    },
})