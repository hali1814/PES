import React, { useState } from 'react';
import { View, Text, Modal, TouchableOpacity, StyleSheet, TextInput } from 'react-native';
import colorsPES from '../constants/colors';

export default function Dialog(props) {
    const { visible, onClose, title, nameHint, dateHint, emailHint, addressHint, closeText, onUpdate, updateText } = props;
    


    return (
        <Modal
            visible={visible}
            animationType="slide"
            transparent
        >
            <View style={style.container}>
                <View style={style.content}>
                    <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                        <Text style={style.title}>{title}</Text>
                    </View>
                    <TextInput style={style.text} placeholder={nameHint} />
                    <TextInput style={style.text} placeholder={dateHint} />
                    <TextInput style={style.text} placeholder={emailHint} />
                    <TextInput style={style.text} placeholder={addressHint} />
                    <View style={{ flexDirection: 'row', justifyContent: 'space-around' }}>
                        <TouchableOpacity onPress={onClose} style={style.button}>
                            <Text style={style.closeText}>{closeText}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={onUpdate} style={[style.button, {}]}>
                            <Text style={style.updateText}>{updateText}</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
}

export const style = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        backgroundColor: 'rgba(0,0,0,0.5)',
        paddingHorizontal: 10,
    },
    content: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 15
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
        color: colorsPES.borderColorBlue,
        textTransform: 'uppercase',
    },
    text: {
        fontSize: 16
    },
    button: {
        marginTop: 20,
        justifyContent: 'center',
        alignItems: 'center',
    },
    closeText: {
        color: colorsPES.red,
        fontSize: 16
    },
    updateText: {
        color: colorsPES.borderColorBlue,
        fontSize: 16
    }
})


