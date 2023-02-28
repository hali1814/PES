import { StyleSheet, Text, View, Image, TouchableOpacity, SafeAreaView } from 'react-native'
import React from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';

const MyProfileDetail = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thông tin cá nhân</Text>
            </View>
            <View style={styles.body}>
                <View style={({ justifyContent: 'center', alignItems: 'center' })}>
                    <Image style={({ width: 80, height: 80 })} source={images.avatar} resizeMode='cover' />
                </View>
                <View style={styles.inforDetail}>
                    <Text style={styles.titleText}>Tên của bạn</Text>
                    <Text style={styles.contentText}>Hoàng Quốc Hưng</Text>
                </View>
                <View style={styles.inforDetail}>
                    <Text style={styles.titleText}>Số điện thoại</Text>
                    <Text style={styles.contentText}>0123456789</Text>
                </View>
                <View style={styles.inforDetail}>
                    <Text style={styles.titleText}>Email</Text>
                    <Text style={styles.contentText}>hoangquochung0209@gmail.com</Text>
                </View>
                <TouchableOpacity onPress={()=>{navigation.push('ChangeAddress')}} style={styles.addressDetail}>
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
                        136/9B Đào Duy Anh, phường 15, Quận Tân Bình, TP.HCM
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity onPress={()=>{navigation.push('ChangePassword')}} style={styles.adjustContainer}>
                    <Text style={styles.adjustText}>Đổi mật khẩu</Text>
                    <Image source={icons.nextIconBlack} />
                </TouchableOpacity>
                <TouchableOpacity style={styles.adjustContainer}>
                    <Text style={styles.adjustText}>Tài khoản/ Thẻ ngân hàng</Text>
                    <Image source={icons.nextIconBlack} />
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.button}>
                <Text style={({ fontSize: 16, fontWeight: '500', color: colorsPES.white })}>Lưu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default MyProfileDetail

const styles = StyleSheet.create({

    button: {
        marginTop: 100,
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