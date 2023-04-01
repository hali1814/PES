import { StyleSheet, Text, View, SafeAreaView, Image, FlatList, TouchableOpacity } from 'react-native'
import React, {useEffect, useState, useContext} from 'react'
import colorsPES from '../../constants/colors'
import { formatPrice } from '../../utils/MoneyFormat'
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
const Awaiting = () => {
    const {onGetStatusBills} = useContext(ProductContext);
    const [dataBills, setDataBills] = useState()
    
    const getDataBills = async () => {
        const data = await onGetStatusBills(0)
        data.reverse()
        setDataBills(data)
    }
    useEffect(()=>{
        getDataBills()
    },[])
    console.log(dataBills)

    
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.contentContainer}>
                <FlatList
                    showsVerticalScrollIndicator={false}
                    data={dataBills}
                    keyExtractor={(item) => item._id}
                    renderItem={({ item }) => (
                        <View style={styles.itemContainer}>
                            <View style={styles.imageContainer}>
                                <Image source={item ? {uri: item.productDetails.images[0]} : require('../../assets/images/haohoa_scanQR.png')} style={{ width: 60, height: 60 }} />
                            </View>
                            <View style={styles.productInfor}>
                                <View style={{ flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' }}>
                                    <Text style={styles.title}>{item.productDetails.name}</Text>
                                    <Text style={styles.text}>x{item.quantity}</Text>
                                </View>
                                <View style={styles.totalPriceContainer}>
                                    <Text style={styles.text}>Tổng thanh toán : </Text>
                                    <Text style={styles.priceText}>{formatPrice(item?.amount || 0)}</Text>
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

export default Awaiting

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
        marginVertical: 10,
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