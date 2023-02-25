import {Image, StyleSheet, Text, View, TouchableOpacity} from 'react-native';
import React from 'react';
import color from '../styles/colors';
import {images} from '../assets';
import Fonts from '../assets/fonts/fonts';

const PESRelatedProducts = ({
  imageProducts,
  title,
  description,
  money,
  imageUser,
}) => {
  return (
    <TouchableOpacity
      onPress={() => {
        console.log('You tapped the button!');
      }}
      style={styles.Container}>
      <View>
        <Image source={imageProducts} style={styles.imageStyle} />
      </View>
      <View style={styles.DetailStyle}>
        <Text style={styles.TextStyle1}>{title}</Text>
        <Text numberOfLines={2} style={styles.TextStyle2}>
          {description}
        </Text>
        <Text style={styles.TextStyle3}>{money}đ</Text>
      </View>
      <View style={styles.ContainerImgUser}>
        <Image source={imageUser} style={styles.UserStyle} />
      </View>
    </TouchableOpacity>
  );
};

export default PESRelatedProducts;

const styles = StyleSheet.create({
  Container: {
    height: 104,
    width: '100%',
    backgroundColor: color.WHITE,
    borderRadius: 4,
    padding: 12,
    flexDirection: 'row',
  },
  imageStyle: {
    width: 80,
    height: 80,
  },
  DetailStyle: {
    width: '73%',
    marginLeft: 12,
    flexDirection: 'column',
    paddingRight: 20,
    justifyContent: 'space-between',
  },
  UserStyle: {
    width: 24,
    height: 24,
    position: 'absolute',
  },
  ContainerImgUser: {
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  TextStyle1: {
    fontFamily: Fonts.Work_SemiBold,
    fontSize: 14,
    justifyContent: 'center',
    alignItems: 'center',
  },
  TextStyle2: {
    fontFamily: Fonts.Work_Regular,
    color: color.TEXT_SECOND,
    fontSize: 14,
    alignItems: 'center',
  },
  TextStyle3: {
    fontFamily: Fonts.Work_SemiBold,
    fontSize: 15,

    alignItems: 'center',
  },
});
