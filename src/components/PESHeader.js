import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {icons} from '../assets';
import color from '../styles/colors';
import {textsPES} from '../constants/string';
import {TouchableOpacity} from 'react-native-gesture-handler';
import Fonts from '../assets/fonts/fonts';

const PESHeader = ({title, onPress, navigation}) => {
  return (
    <View style={styles.Container}>
      <TouchableOpacity
        onPress={() => {
          navigation.goBack();
        }}
        style={styles.imageContainer}>
        <Image
          source={icons.chevronBack_icon}
          style={{width: 24, height: 24, tintColor: color.MAIN}}
        />
      </TouchableOpacity>
      <View style={styles.textContainer}>
        <Text style={styles.titleText}>{title}</Text>
      </View>
      <View style={styles.imageContainer}></View>
    </View>
  );
};

export default PESHeader;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
    height: 54,
    alignItems: 'center',
    justifyContent: 'space-between',
    alignSelf: 'center',
    paddingHorizontal: 7,
    width: '100%',
    backgroundColor: 'white'
  },
  imageContainer: {
    width: 24,
    height: 24,
  },
  textContainer: {
    alignItems: 'center',
  },

  titleText: {
    color: color.TEXT_PRIMARY,
    fontWeight: '300',
    fontFamily: Fonts.Man_ExtraBold,
    fontSize: 16,
  },
});
