import { StyleSheet, Text, TouchableOpacity } from 'react-native'
import React from 'react'

const PESButon = ({on_press, btn_text}) => {
  return (
    <TouchableOpacity
    onPress={on_press}
    style={{
      justifyContent: 'center',
      width: '100%',
      height: 44,
      borderRadius: 60,
      backgroundColor: '#5865F2',
    }}
  >
    <Text
      style={{
        color: '#ffff',
        textAlign: 'center',
        fontSize: 16,
        fontWeight: '600',
      }}
    >
      {btn_text}
    </Text>
  </TouchableOpacity>
  )
}

export default PESButon

const styles = StyleSheet.create({})