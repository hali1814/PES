import { StyleSheet, Text, View, SafeAreaView } from 'react-native'
import React from 'react'

const OTPScreen = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <Text onPress={() => { navigation.goBack() }}>OTPScreen</Text>
        </SafeAreaView>
    )
}

export default OTPScreen

const styles = StyleSheet.create({
    container: {
        justifyContentL: 'center',
        alignItems: 'center'
    },
})