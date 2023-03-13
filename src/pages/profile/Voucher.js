import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';

const Voucher = ({ navigation }) => {

    const {
        ongetVoucher,
        voucher,
        setVoucher
    } = useContext(UserContext)

    useEffect(() => {
        ongetVoucher()

        return () => { }
    }, [])

    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Voucher</Text>
            </View>
            <TouchableOpacity style={styles.imageContainer}>
                <Image resizeMode='cover' source={images.superVoucherImage} />
            </TouchableOpacity>
            <FlatList
                data={voucher}
                renderItem={({ item }) => (
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <TouchableOpacity style={styles.imageContainer}>
                            <Image style={{ width: 200, height: 100 }} resizeMode='cover' source={{ uri: item.images }} />
                        </TouchableOpacity>
                        <Text style={{ fontSize: 14, color: colorsPES.borderColorBlue }}>Số lượng : {item.quantity}</Text>
                        <Text style={{ fontSize: 14, color: colorsPES.borderColorBlue }}>Mô tả : {item.description}</Text>
                    </View>
                )}
            />

        </View>
    )
}

export default Voucher

const styles = StyleSheet.create({

    imageContainer: {
        marginTop: 22,
        justifyContent: 'center',
        alignItems: 'center',
    },

    headerText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 21,
        color: colorsPES.blackText,
        marginLeft: 150
    },

    headerContainer: {
        flexDirection: 'row',
        paddingHorizontal: 16,
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
    },

    container: {
        backgroundColor: colorsPES.white
    },
})