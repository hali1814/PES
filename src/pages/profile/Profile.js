import { StyleSheet, Text, View, TouchableOpacity, ImageBackground, Image, SafeAreaView, StatusBar } from 'react-native'
import React, { useContext, useEffect } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';



const Profile = ({ navigation }) => {

    const {
        onGetUserInfor,
        user,
        setUser
    } = useContext(UserContext)

    useEffect(() => {
        onGetUserInfor()
        return () => { }
    }, [])


    return (
        <SafeAreaView style={styles.container} >
            <StatusBar
                barStyle="dark-content"
                backgroundColor={colorsPES.white}
            />
            <View style={styles.headerContainer}>
                <Image source={images.vectorBG} style={styles.vectorBG} />
                <View style={styles.notificationContainer}>
                    <TouchableOpacity>
                        <Image source={icons.notificationIcon} />
                    </TouchableOpacity>
                </View>
                <TouchableOpacity onPress={() => { navigation.push('MyProfileDetail') }} style={styles.userInforContainer}>
                    <View style={styles.userInfor}>
                        <View style={styles.avatar}>
                            <Image style={{ width: '100%', height: '100%', borderRadius: 100 }} source={{ uri: user.avatar }} resizeMode='cover' />
                        </View>
                        <View style={styles.userNameContainer}>
                            <Text style={styles.usernameText}>{user.nickName}</Text>
                            <Text style={StyleSheet.create({ fontWeight: '400', fontSize: 11, color: colorsPES.white })}>Xem/chỉnh sửa thông tin cá nhân</Text>
                        </View>
                    </View>
                    <View>
                        <Image source={icons.nextIcon} />
                    </View>
                </TouchableOpacity>
                <View style={styles.navBarContainer}>
                    <TouchableOpacity style={styles.navBar}>
                        <Image source={icons.awaitingConfirmIcon} />
                        <Text style={styles.navBarText}>Chờ xác nhận</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBar}>
                        <Image source={icons.awaitingBillIcon} />
                        <Text style={styles.navBarText}>Chờ lấy    đơn</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBar}>
                        <Image source={icons.onDeliveryIcon} />
                        <Text style={styles.navBarText}>Đang giao hàng</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.navBar}>
                        <Image source={icons.ratingIcon} />
                        <Text style={styles.navBarText}>Đánh giá sản phẩm</Text>
                    </TouchableOpacity>
                </View>
                <View style={styles.memberRatingContainer}>
                    <Image source={icons.crowIcon} resizeMode='contain' style={({ position: 'absolute', opacity: 0.1 })} />
                    <View>
                        <Text style={({ fontSize: 14, fontWeight: '600', lineHeight: 18, color: colorsPES.white })}>Xếp hạng thành viên</Text>
                        <Text style={({ fontSize: 12, fontWeight: '400', lineHeight: 16, color: colorsPES.white })}>Mua thêm để được thăng hạng</Text>
                    </View>
                    <Image source={images.memberImage} />
                </View>
            </View>
            <View style={styles.utilityContainer}>
                <Text style={({ marginTop: 16, fontWeight: '600', fontSize: 15, lineHeight: 20, color: colorsPES.blackText })}>Tiện ích</Text>
                <View style={styles.ulityListContainer}>
                    <View style={styles.topList}>
                        <TouchableOpacity onPress={() => navigation.push('Voucher')} style={styles.ulityItem}>
                            <Image source={icons.superVoucherIcon} />
                            <Text style={({ textAlign: 'center' })}>Gói siêu voucher</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ulityItem}>
                            <Image source={icons.gameIcon} />
                            <Text style={({ textAlign: 'center' })}>Game PES</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ulityItem}>
                            <Image source={icons.coinEarnIcon} />
                            <Text style={({ textAlign: 'center' })}>Play to Earn Xu</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ulityItem}>
                            <Image source={icons.heartIcon} />
                            <Text style={({ textAlign: 'center' })}>Sản phẩm yêu thích</Text>
                        </TouchableOpacity>
                    </View>
                    <View style={styles.botList}>
                        <TouchableOpacity onPress={() => { navigation.push('MyFeedback') }} style={styles.ulityItem}>
                            <Image source={icons.likeIcon} />
                            <Text style={({ textAlign: 'center' })}>Đánh giá của tôi</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ulityItem}>
                            <Image source={icons.clockIcon} />
                            <Text style={({ textAlign: 'center' })}>Lịch sử mua hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.ulityItem}>
                            <Image source={icons.customerSupportIcon} />
                            <Text style={({ textAlign: 'center' })}>Hỗ trợ khách hàng</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => { navigation.push('MyProfileDetail') }} style={styles.ulityItem}>
                            <Image source={icons.userIcon} />
                            <Text style={({ textAlign: 'center' })}>Thông tin cá nhân</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            <View style={styles.coinVoucherContainer}>
                <TouchableOpacity>
                    <Image source={images.coinVoucherImage} resizeMode='cover' />
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    )
}

export default Profile

const styles = StyleSheet.create({

    coinVoucherContainer: {
        marginTop: 16,
        alignItems: 'center',
    },

    botList: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 24,
    },

    ulityItem: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 74,
    },

    topList: {
        flexDirection: 'row',
        justifyContent: 'space-around'
    },

    ulityListContainer: {
        marginTop: 30,
    },

    utilityContainer: {
        marginHorizontal: 16,
        height: 240,
    },

    memberRatingContainer: {
        marginHorizontal: 16,
        marginTop: 16,
        height: 63,
        backgroundColor: '#0F294D',
        borderTopLeftRadius: 8,
        borderTopRightRadius: 8,
        paddingVertical: 12,
        paddingHorizontal: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    navBarText: {
        fontWeight: '500',
        fontSize: 13,
        color: colorsPES.white,
        lineHeight: 18,
        marginTop: 8,
        textAlign: 'center',
    },


    navBar: {
        justifyContent: 'center',
        alignItems: 'center',
        width: 70,
        height: 76
    },

    navBarContainer: {
        width: '100%',
        height: 108,
        marginTop: 25,
        padding: 16,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-around',
    },

    usernameText: {
        color: colorsPES.white,
        fontWeight: '600',
        fontSize: 15,
        lineHeight: 20,
    },

    userNameContainer: {
        marginLeft: 12,
    },

    avatar: {
        width: 54,
        height: 54,
        borderRadius: 100,
    },

    userInfor: {
        flexDirection: 'row',
        alignItems: 'center',
    },

    userInforContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    notificationContainer: {
        flexDirection: 'row',
        paddingVertical: 12,
        paddingHorizontal: 16,
        justifyContent: 'flex-end'
    },

    vectorBG: {
        width: '100%',
        position: 'absolute'
    },

    headerContainer: {
        width: '100%',
        height: 318,
        backgroundColor: colorsPES.borderColorBlue,
    },

    container: {
        flex: 1,
    },
})