import {Image, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import {icons} from '../assets';

const PESProductDescription = ({icon, text1, text2}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.Header}>
        <Image source={icon} style={{width: 16, height: 16}} />
        <Text style={styles.text}>{text1}</Text>
      </View>
      <View>
        <Text style={styles.text}>{text2}</Text>
      </View>
    </View>
  );
};

export default PESProductDescription;

const styles = StyleSheet.create({
  Container: {
    height: 19,
    justifyContent: 'space-between',
    flexDirection: 'row',
    alignItems: 'center',
  },
  Header: {
    flexDirection: 'row',
  },
  text: {
    marginLeft: 8,
    fontSize: 14,
    fontWeight: '400',
  },
});
