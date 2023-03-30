import {StyleSheet, Text, TouchableOpacity} from 'react-native';
import React from 'react';
import Fonts from '../assets/fonts/fonts';

const PESButtonOutline = ({on_press, btn_text}) => {
  return (
    <TouchableOpacity
      onPress={on_press}
      style={{
        marginTop: 16,
        justifyContent: 'center',
        width: '100%',
        height: 44,
        borderRadius: 10,
        borderWidth: 0.5,
        borderColor: '#5865F2',
      }}>
      <Text
        style={{
          color: '#5865F2',
          textAlign: 'center',
          fontSize: 16,
          fontFamily: Fonts.Man_SemiBold,
        }}>
        {btn_text}
      </Text>
    </TouchableOpacity>
  );
};

export default PESButtonOutline;
