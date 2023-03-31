import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import React from 'react'
import colorsPES from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'

const AwaitingPickUp = () => {

    const DATA = [
        {
            id: 1,
            shopName: 'HungLong SHOP',
            image: require('../../assets/images/shoes.png'),
            productName: 'Quạt mini USB kẹp hoặc để bàn',
            size: 'L',
            quantity: 2,
            price: 100000,
            totalPrice: 200000,
        },
        {
            id: 2,
            shopName: 'HungLong SHOP',
            image: require('../../assets/images/shoes.png'),
            productName: 'Quạt mini USB kẹp hoặc để bàn',
            size: 'L',
            quantity: 2,
            price: 100000,
            totalPrice: 200000,
        },
        {
            id: 3,
            shopName: 'HungLong SHOP',
            image: require('../../assets/images/shoes.png'),
            productName: 'Quạt mini USB kẹp hoặc để bàn',
            size: 'L',
            quantity: 2,
            price: 100000,
            totalPrice: 200000,
        }
    ]

    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <FlatList
                    data={DATA}
                    keyExtractor={(item) => item.id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={item.image} style={{ width: 60, height: 60 }} />
                            </View>
                            <View style={styles.productInfor}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.title}>{item.productName}</Text>
                                    <Text style={styles.text}>x{item.quantity}</Text>
                                </View>
                                <Text style={styles.text}>7 ngày trả hàng</Text>
                                <View style={styles.totalPriceContainer}>
                                    <Text style={styles.text}>Tổng thanh toán : </Text>
                                    <Text style={styles.priceText}>{formatPrice(item.totalPrice)}</Text>
                                </View>
                                <View style={{ alignItems: 'flex-end' }}>
                                    <View style={styles.status}>
                                        <Text style={{ color: colorsPES.borderColorBlue }}>Đang đối soát</Text>
                                    </View>
                                </View>
                            </View>
                        </View>
                    )}
                />
            </View>
        </SafeAreaView>
    )
}

export default AwaitingPickUp

const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    contentContainer: {
        width: '100%',
    },
    itemContainer: {
        backgroundColor: colorsPES.white,
        paddingHorizontal: 16,
        width: '100%',
        marginTop: 10,
        flexDirection: 'row',
        paddingVertical: 10,
    },
    imageContainer: {
        width: 60,
        height: 60,
    },
    productInfor: {
        marginLeft: 10,
        width: '80%'
    },
    title: {
        fontSize: 16,
        fontWeight: '600',
        color: colorsPES.black
    },
    text: {
        fontSize: 14,
        color: colorsPES.black
    },
    totalPriceContainer: {
        marginTop: 10,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    priceText: {
        fontSize: 17,
        fontWeight: '600',
        color: colorsPES.borderColorBlue,
    },
    status: {
        paddingVertical: 5,
        paddingHorizontal: 5,
        backgroundColor: colorsPES.borderColorPrimary,
        width: '50%',
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 12,
        marginTop: 10
    },
})