import { StyleSheet, Text, View, Image } from 'react-native';
import React from 'react';
import { icons } from '../assets';
import color from '../styles/colors';
import { textsPES } from '../constants/string';
import { TouchableOpacity } from 'react-native-gesture-handler';

const PESHeader = ({ title, onPress }) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity onPress={onPress} style={styles.imageContainer}>
        <Image
          source={icons.chevronBack_icon}
          style={{ width: 24, height: 24 }}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
    </View>
  );
};

export default PESHeader;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'center',
    paddingHorizontal: 16,
  },
  imageContainer: {
    width: 24,
    height: 24,
    paddingHorizontal: 16,
  },
  textContainer: {
    alignItems: 'center',
    width: '100%',
  },

  titleText: {
    color: color.TEXT_PRIMARY,
    fontWeight: '600',
    fontSize: 16,
  },
});
