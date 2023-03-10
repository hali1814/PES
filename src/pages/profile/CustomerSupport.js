import { StyleSheet, Text, View, TouchableOpacity, FlatList, SafeAreaView, Image } from 'react-native'
import React from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';


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


const CustomerSupport = () => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <TouchableOpacity>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headertext}>Hỗ trợ khách hàng</Text>
            </View>
            <FlatList
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listContainer}>
                        <View style={styles.listTitle}>
                            <Text style={({ fontSize: 13, fontWeight: '400', color: colorsPES.transText })}>Địa chỉ giao hàng</Text>
                            <Image source={item.check} />
                        </View>
                        <Text style={styles.addressText}>{item.address}</Text>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default CustomerSupport

const styles = StyleSheet.create({

    addressText: {
        fontWeight: '400',
        fontSize: 14,
        color: colorsPES.blackText,
        marginTop : 2,
        width : '90%'
    },

    listTitle: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },

    listContainer: {
        paddingVertical: 18,
        paddingHorizontal: 12,
        marginHorizontal: 12,
        backgroundColor: colorsPES.white,
        borderRadius: 10,
        marginTop: 16,
    },

    headertext: {
        fontWeight: '700',
        fontSize: 18,
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