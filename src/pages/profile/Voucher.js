import { StyleSheet, Text, View, Image, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useContext } from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';
import PESHeader from '../../components/PESHeader';

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
            <PESHeader navigation={navigation} title={'Voucher'} />
            <FlatList
                data={voucher}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.VoucherContainer}>
                        <View style={{ padding: 10, width: 100, height: 100, backgroundColor: colorsPES.red, justifyContent: 'center', borderRadius: 10, }}>
                            <View style={styles.imageContainer}>
                                <Image style={{ width: '100%', height: "100%" }} source={{ uri: item.images }} />
                            </View>
                        </View>
                        <View style={{ paddingVertical: 10, paddingHorizontal: 10 }}>
                            <Text style={{ fontSize: 14, color: colorsPES.borderColorBlue, marginBottom: 20, fontWeight: 'bold' }}>Số lượng còn lại : {item.quantity}</Text>
                            <Text style={{ fontSize: 14, color: colorsPES.blackText, marginEnd: 20 }}>Mô tả : {item.description}</Text>
                        </View>
                    </TouchableOpacity>
                )}
            />

        </View>
    )
}

export default Voucher

const styles = StyleSheet.create({

    VoucherContainer: {
        marginTop: 10,
        backgroundColor: colorsPES.white,
        borderRadius: 10,
        flexDirection: 'row'
    },

    imageContainer: {
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
        paddingVertical: 10,
        marginTop: 10,
        alignItems: 'center',
    },

    container: {
        paddingHorizontal: 10
    },
})