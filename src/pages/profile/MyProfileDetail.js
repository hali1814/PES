import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import Icon from 'react-native-vector-icons/Ionicons'
import DateTimePicker from '@react-native-community/datetimepicker';
import customAxios from '../../api/helper/Axios';
import ImagePicker from 'react-native-image-picker'
import { launchCamera, launchImageLibrary } from 'react-native-image-picker';
import { PermissionsAndroid } from 'react-native';


import {
    SuccessDialog,
    FailDialog,
    ConfirmDialog
} from '../../components'

const MyProfileDetail = (props) => {
    const { navigation } = props
    const {
        onLogout,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        onGetUserInfor,
        onChangeProfile
    } = useContext(UserContext)

    const logout = async () => {
        try {
            const res = await onLogout()
            const token = await AsyncStorage.getItem('token')
            console.log('token', token)
            console.log(res)
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
    const [email, setEmail] = useState('')
    const [showDatePicker, setShowDatePicker] = useState(false);

    const checkEmail = () => {
        if (email == "") {
            setEmail(user.email)
        }
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







    const openCamera = () => {
        const options = {
            storageOptions: {
                path: 'images',
                mediaType: 'photo'
            },
            includeBase64: true,
        };
        launchCamera(options, response => {
            console.log('Response', response)
            if (response.didCancel) {
                console.log('User cancelled camera picker');
            } else if (response.error) {
                console.log('ImagePicker Error: ', response.error);
            } else {
                // Call API to upload the image to the server
                const formData = new FormData();
                formData.append('image', {
                    uri: response.uri,
                    type: response.type,
                    name: response.fileName,
                });
                customAxios('multipart/form-data').post('/api/upLoadOne', formData)
                    .then((response) => {
                        console.log(response);
                    })
                    .catch((error) => {
                        console.log(error);
                    });
            }
        });
    };

    useEffect(() => {
        onGetUserInfor();
        checkEmail()
        checkNickName()
        checkAddress()
        return () => { }
    }, [])

    const updateProfile = async () => {
        try {
            const res = await onChangeProfile(avatar, date, address, nickName, email)
            if (res == false) {
                handleFailed()
            } else {
                setTimeout(() => { navigation.navigate('Profile'), 2000 })
                handleSuccess()
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
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Thông tin cá nhân</Text>
                </View>
                <View style={styles.body}>
                    <View style={({ justifyContent: 'center', alignItems: 'center', borderRadius: 50, backgroundColor: colorsPES.grey })}>
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
                    <TouchableOpacity onPress={() => { navigation.push('ChangeAddress', { address: user.address }) }} style={styles.addressDetail}>
                        <View style={styles.addressTitle}>
                            <Text style={styles.titleText}>Địa chỉ giao hàng</Text>
                            <View style={({
                                flexDirection: 'row', alignItems: 'center', backgroundColor: '#D3F3ED', paddingVertical: 4,
                                paddingLeft: 15, paddingRight: 20, justifyContent: 'center', borderRadius: 10
                            })}>
                                <Text style={({ fontSize: 13, fontWeight: '400', color: '#24C4A4' })}>Thay đổi địa chỉ giao hàng</Text>
                                <Image source={icons.nextIcon} />
                            </View>
                        </View>
                        <Text style={styles.contentText}>
                            {user.address}
                        </Text>
                    </TouchableOpacity>
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
                                <Text style={styles.title}>Cập nhật thông tin người dùng</Text>
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
                                    <Image style={{ height: 80, width: 80 }}
                                        source={images.avatar}
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
                                onChangeText={(text) => { setNickName(text) }}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />

                            <TouchableOpacity
                                style={{ flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}
                                onPress={() => { setShowDatePicker(true) }}
                            >
                                <TextInput
                                    style={[styles.textDate, {}]}
                                    placeholder={`Ngày sinh : ${user.date.slice(0, 10)}`}
                                    value={date ? date.toLocaleDateString() : ''}
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
                                onChangeText={(text) => { setEmail(text) }}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <TextInput
                                style={styles.text}
                                placeholder={`Địa chỉ : ${address}`}
                                value={address}
                                onChangeText={(text) => { setAddress(text) }}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                                <TouchableOpacity onPress={hideDialog} style={styles.buttonModal}>
                                    <Text style={styles.closeText}>Hủy</Text>
                                </TouchableOpacity>
                                <TouchableOpacity onPress={updateProfile} style={[styles.buttonModal, {}]}>
                                    <Text style={styles.updateText}>Cập nhật</Text>
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
        color: colorsPES.borderColorBlue,
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