import {View, Text, Image, StyleSheet} from 'react-native';
import React from 'react';
import color from '../styles/colors';
import Fonts from '../assets/fonts/fonts';

const PESShop = ({imgUri, txtShop, txt2Shop}) => {
  return (
    <View style={styles.Container}>
      <View style={styles.headerContainer}>
        <Image source={imgUri} style={styles.imgPESShop} />
      </View>

      <Text style={styles.txtPESShop}>{txtShop}</Text>
      <Text style={styles.txtPESShop2}>{txt2Shop}</Text>
    </View>
  );
};

export default PESShop;

const styles = StyleSheet.create({
  Container: {
    flexDirection: 'row',
  },
  headerContainer: {
    alignSelf: 'center',
  },
  imgPESShop: {
    width: 12,
    height: 12,
    alignItems: 'center',
  },
  txtPESShop: {
    marginLeft: 4,
    alignSelf: 'center',
    textAlign: 'justify',
    fontSize: 12,
    fontFamily: Fonts.Work_Regular,
  },
  txtPESShop2: {
    marginLeft: 4,
    alignSelf: 'center',
    textAlign: 'justify',
    fontSize: 12,
    fontFamily: Fonts.Work_Medium,
  },
});
