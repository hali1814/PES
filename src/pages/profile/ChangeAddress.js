import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, FlatList } from 'react-native'
import React, { useState, useContext, useEffect } from 'react'
import { icons } from '../../assets';
import { images } from '../../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';

const DATA = [
    {
        id: 1,
        address: '120/25,khu phố 6, phường Tân Tiến, Quận Cam, TP.HCM',
        check: icons.checkedIcon,
    },
    {
        id: 2,
        address: '120/25,khu phố 6, phường Tân Tiến, Quận Cam, TP.HCM',
        check: icons.unCheckedIcon,
    },
    {
        id: 3,
        address: '120/25,khu phố 6, phường Tân Tiến, Quận Cam, TP.HCM',
        check: icons.unCheckedIcon,
    },
    {
        id: 4,
        address: '120/25,khu phố 6, phường Tân Tiến, Quận Cam, TP.HCM',
        check: icons.unCheckedIcon,
    },
]

const ChangeAddress = ({ navigation, route }) => {

    const { address } = route.params

    const {
        onGetUserInfor,
        user
    } = useContext(UserContext)

    useEffect(() => {
        onGetUserInfor();
        // console.log('address ===>', user.address)
        return () => { }
    }, [])

    const renderItem = ({ item }) => {
        const { _id, address } = item
        return (
            <TouchableOpacity style={styles.listContainer}>
                <View style={styles.listTitle}>
                    <Text style={({ fontSize: 13, fontWeight: '400', color: colorsPES.transText })}>Địa chỉ giao hàng</Text>
                    <Image source={icons.checkedIcon} />
                </View>
                <Text style={styles.addressText}>{address}</Text>
            </TouchableOpacity>
        )
    }
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => navigation.goBack()}>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thay đổi địa chỉ</Text>
            </View>
            <View style={styles.body}>
                <FlatList
                    data={user}
                    // renderItem={({ item }) => (
                    //     <TouchableOpacity style={styles.listContainer}>
                    //         <View style={styles.listTitle}>
                    //             <Text style={({ fontSize: 13, fontWeight: '400', color: colorsPES.transText })}>Địa chỉ giao hàng</Text>
                    //             <Image source={icons.checkedIcon} />
                    //         </View>
                    //         <Text style={styles.addressText}>{item.address}</Text>
                    //     </TouchableOpacity>
                    // )}
                    renderItem={renderItem}
                    keyExtractor={(item) => item._id}
                />
                <TouchableOpacity onPress={() => { navigation.push('AddAddress') }} style={styles.button}>
                    <Text style={({ fontSize: 16, fontWeight: '500', lineHeight: 22, color: colorsPES.white })}>Thêm địa chỉ</Text>
                </TouchableOpacity>
            </View>
            <TouchableOpacity style={styles.saveButton}>
                <Text style={({ fontSize: 16, fontWeight: '500', lineHeight: 22, color: colorsPES.white })}>Lưu</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default ChangeAddress

const styles = StyleSheet.create({

    saveButton: {
        marginTop: 150,
        backgroundColor: colorsPES.borderColorBlue,
        paddingVertical: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginHorizontal: 16,
    },

    button: {
        paddingVertical: 11,
        marginTop: 16,
        borderRadius: 60,
        backgroundColor: colorsPES.borderColorBlue,
        justifyContent: 'center',
        alignItems: 'center',
    },

    body: {
        backgroundColor: colorsPES.white,
        marginHorizontal: 12,
        paddingHorizontal: 12,
        paddingVertical: 16,
    },

    addressText: {
        fontWeight: '400',
        fontSize: 14,
        color: colorsPES.blackText,
        marginTop: 2,
        width: '90%'
    },

    listTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    listContainer: {
        backgroundColor: colorsPES.white,
        borderRadius: 10,
        marginTop: 16,
        marginVertical: 16,
    },

    headerText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: colorsPES.blackText,
        marginLeft: 120,
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingHorizontal: 16,
        paddingVertical: 10,
        width: '100%'
    },

    container: {
        height: '100%',
        backgroundColor: colorsPES.grey
    },
})