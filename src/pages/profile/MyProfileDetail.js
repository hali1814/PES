import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView, Alert } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ScrollView } from 'react-native-gesture-handler';

const MyProfileDetail = ({ navigation }) => {

    const {
        onLogout,
        isLoggedIn,
        setIsLoggedIn,
        user,
        setUser,
        onGetUserInfor,
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


    return (
        <ScrollView showsVerticalScrollIndicator={false}>
            <SafeAreaView style={styles.container}>
                <View style={styles.header}>
                    <TouchableOpacity onPress={() => navigation.goBack()}>
                        <Image source={icons.backIcon} />
                    </TouchableOpacity>
                    <Text style={styles.headerText}>Thông tin cá nhân</Text>
                </View>
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
                <TouchableOpacity style={styles.button}>
                    <Text style={({ fontSize: 16, fontWeight: '500', color: colorsPES.white })}>Lưu</Text>
                </TouchableOpacity>
            </SafeAreaView>
        </ScrollView >
    )
}

export default MyProfileDetail

const styles = StyleSheet.create({

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

    },
})