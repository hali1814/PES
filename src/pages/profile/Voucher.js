import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';

const Voucher = () => {
    return (
        <View style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Voucher</Text>
            </View>
            <TouchableOpacity style={styles.imageContainer}>
                <Image resizeMode='cover' source={images.superVoucherImage} />
            </TouchableOpacity>
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

    },
})