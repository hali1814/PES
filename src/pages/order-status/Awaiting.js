import { StyleSheet, Text, View, SafeAreaView, Image } from 'react-native'
import React from 'react'

const Awaiting = () => {
    return (
        <SafeAreaView style={styles.container}>
            <Image source={require('../../assets/images/logo.png')} resizeMode='cover' />
            <Text>No order yet</Text>
        </SafeAreaView>
    )
}

export default Awaiting

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
})