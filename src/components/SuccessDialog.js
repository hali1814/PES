import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import { images, icons } from '../assets'
import colorsPES from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default function SuccessDialog({ visible, onPress, message }) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.background}>
                    <Icon
                        name="information-circle-outline"
                        size={50}
                        color="#FFFFFF"
                    />
                    <Text style={{ color: colorsPES.white, fontSize: 16, fontWeight: 'bold' }}>{message}</Text>
                    <TouchableOpacity
                        style={{ backgroundColor: colorsPES.white, padding: 10, borderRadius: 20, marginTop: 10 }}
                        onPress={onPress}
                    >
                        <Text style={{ color: '#4CAF50', fontSize: 16, fontWeight: 'bold' }}>Đóng</Text>
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
        justifyContent: 'center',
    },

    background: {
        backgroundColor: '#4CAF50',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 80,
        paddingVertical: 20,
        borderRadius: 20,
    },
    image: {
        width: 100,
        height: 100,
    },
}
)

