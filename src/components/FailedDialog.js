import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import colorsPES from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default function FailDialog({ visible, onPress, message }) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.background}>

                    <Icon
                        name="skull-outline"
                        size={50}
                        color="#FFFFFF"
                    />
                    <Text style={{ color: colorsPES.white, fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{message}</Text>
                    <TouchableOpacity
                        style={{ padding: 10, backgroundColor: colorsPES.grey, borderRadius: 10, marginTop: 10 }}
                        onPress={onPress}
                    >
                        <Text style={{ fontSize: 16, fontWeight: 'bold' }}>Đóng</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </Modal>
    );
};

const styles = StyleSheet.create({

    container: {
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        justifyContent: 'flex-start'
    },

    background: {
        backgroundColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        borderBottomEndRadius: 20,
        borderBottomStartRadius: 20
    },
    image: {
        width: 100,
        height: 100,
    },
}
)

