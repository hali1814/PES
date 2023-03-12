import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert, StatusBar, Modal, TextInput } from 'react-native'
import React, { useContext, useEffect, useState } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';
import {
    SuccessDialog
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

    useEffect(() => {
        onGetUserInfor();
        return () => { }
    }, [])


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

    LogoutAlert = () =>
        Alert.alert('Thông báo!', 'Bạn có chắc chắn muốn đăng xuất', [
            {
                text: 'hủy',
                onPress: () => console.log('Cancel Pressed'),
                style: 'cancel',
            },
            { text: 'Đồng ý', onPress: () => logout() },
        ]);

    const [visible, setVisible] = useState(false);
    const [successDialogVisible, setSuccessDialogVisible] = useState(false);
    const handleSuccess = () => {
        setSuccessDialogVisible(true);
    };
    const handleSuccessDialogClose = () => {
        setSuccessDialogVisible(false);
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

    const updateProfile = async () => {
        try {
            const res = await onChangeProfile(avatar, date, address, nickName, email)
            if (res == false) {
                // alert('updateProfile failed')
                handleSuccess()
            } else {

                setTimeout(() => { navigation.navigate('Profile'), 2000 })
            }
        } catch (error) {
            console.log('change profile failed', error);
            throw error
        }
    }


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
                    <TouchableOpacity onPress={LogoutAlert} style={styles.adjustContainer}>
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
                            <View style={{ justifyContent: 'center', alignItems: 'center', marginBottom: 10 }}>
                                <Image style={{ height: 80, width: 80 }}
                                    source={images.avatar}
                                />
                            </View>
                            <TextInput
                                style={styles.text}
                                placeholder='Tên :'
                                value={nickName}
                                onChangeText={(text) => { setNickName(text) }}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <TextInput
                                style={styles.text}
                                placeholder='Ngày tháng năm sinh :'
                                value={date}
                                onChangeText={(text) => { setDate(text) }}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <TextInput
                                style={styles.text}
                                placeholder='Email :'
                                value={email}
                                onChangeText={(text) => { setEmail(text) }}
                            />
                            <View style={{ borderWidth: 0.19, borderColor: colorsPES.inActive }} />
                            <TextInput
                                style={styles.text}
                                placeholder='Địa chỉ :'
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