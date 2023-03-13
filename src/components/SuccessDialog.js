import React from 'react';
import { Modal, Image, TouchableOpacity, StyleSheet, View } from 'react-native';
import { images, icons } from '../assets'
import colorsPES from '../constants/colors';

export default function SuccessDialog({ visible, onPress }) {
    return (
        <Modal visible={visible} animationType="slide" transparent>
            <View style={styles.container}>
                <TouchableOpacity style={styles.background} onPress={onPress}>
                    <Image style={styles.image} source={icons.checkedIcon} />
                </TouchableOpacity>
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
        backgroundColor: 'white',
        justifyContent: 'center',
        alignItems: 'center',
        marginHorizontal: 110,
        paddingVertical: 20
    },
    image: {
        width: 100,
        height: 100,
    },
}
)

