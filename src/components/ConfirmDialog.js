import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet, View, Text } from 'react-native';
import colorsPES from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons'

export default function ConfirmDialog({ visible, onPress, message, onCancelPress, confirmMessage }) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <View style={styles.background}>
                    <Icon
                        name="alert-circle-outline"
                        size={50}
                        color="#FFFFFF"
                    />
                    <Text style={{ color: colorsPES.white, fontSize: 16, fontWeight: 'bold', marginTop: 10 }}>{message}</Text>
                    <View style={{ flexDirection: 'row', justifyContent: 'space-between', width: '80%', marginTop: 20 }}>
                        <TouchableOpacity
                            style={{ backgroundColor: colorsPES.grey, borderRadius: 20, width: 100, height: 50, justifyContent: 'center', alignItems: 'center' }}
                            onPress={onCancelPress}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: '#9E9E9E' }}>Hủy</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={{ backgroundColor: colorsPES.grey, borderRadius: 20, width: 100, height: 50, justifyContent: 'center', alignItems: 'center' }}
                            onPress={onPress}
                        >
                            <Text style={{ fontSize: 16, fontWeight: 'bold', color: colorsPES.red }}>{confirmMessage}</Text>
                        </TouchableOpacity>
                    </View>
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
        paddingHorizontal: 10
    },

    background: {
        backgroundColor: '#f44336',
        justifyContent: 'center',
        alignItems: 'center',
        paddingTop: 10,
        paddingBottom: 20,
        borderRadius: 10
    },
    image: {
        width: 100,
        height: 100,
    },
}
)

