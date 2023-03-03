import { StyleSheet, Text, View, TouchableOpacity, SafeAreaView, Image, TextInput } from 'react-native'
import React from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';



const AddAddress = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.headerContainer}>
                <TouchableOpacity onPress={()=>navigation.goBack()}>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Thay đổi địa chỉ</Text>
            </View>
            <View style={styles.inputContainer}>
                <Text style={styles.titleText}>Địa chỉ giao hàng</Text>
                <TextInput
                    style={styles.input}
                    placeholder='VD: 123 Hồ Tây, Đà Lạt'
                />
            </View>
            <TouchableOpacity style={styles.addButton}>
                <Text style={({ fontSize: 16, fontWeight: '500', lineHeight: 22, color: colorsPES.white })}>Thêm</Text>
            </TouchableOpacity>
        </SafeAreaView>
    )
}

export default AddAddress

const styles = StyleSheet.create({

    addButton: {
        marginTop: 490,
        backgroundColor: colorsPES.borderColorBlue,
        paddingVertical: 11,
        justifyContent: 'center',
        alignItems: 'center',
        borderRadius: 60,
        marginHorizontal: 16,
    },

    input: {
        marginTop: 8,
        paddingVertical: 4,
    },

    titleText: {
        fontSize: 14,
        fontWeight: '700',
        lineHeight: 18,
        color: colorsPES.blackText,
    },

    inputContainer: {
        marginTop: 20,
        marginHorizontal: 12,
        paddingHorizontal: 12,
        paddingVertical: 16,
        backgroundColor: colorsPES.white,
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