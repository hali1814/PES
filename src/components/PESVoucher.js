import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {images} from '../assets';
import color from '../styles/colors';
import {textsPES} from '../constants/string';

const PESVoucher = ({saleup, title, expiry, img}) => {
  return (
    <ImageBackground
      source={images.bgvoucher_image}
      resizeMode="cover"
      style={styles.imageBGContainer}>
      <View style={styles.Container}>
        <Image source={img} style={styles.brandImage} />
        <View style={styles.viewTextContainer}>
          <Text style={styles.txt1}>{saleup}</Text>
          <Text style={styles.txt2}>{title}</Text>
          <Text style={styles.txt3}>{expiry}</Text>
        </View>
      </View>
      <View style={styles.viewButtonContainer}>
        <TouchableOpacity style={styles.buttonStyle}>
          <Text style={styles.txtButton}>{textsPES.txtUse}</Text>
        </TouchableOpacity>
      </View>
    </ImageBackground>
  );
};

export default PESVoucher;

const styles = StyleSheet.create({
  imageBGContainer: {
    width: 343,
    height: 82,
    alignSelf: 'center',
    justifyContent: 'center',
    marginTop: 8,
    paddingLeft: 12,
    position: 'relative',
  },
  Container: {
    flexDirection: 'row',
    width: '100%',
    height: '100%',
  },
  brandImage: {
    width: 44,
    height: 44,
    alignSelf: 'center',
    borderRadius: 360,
  },
  viewTextContainer: {marginLeft: 22, justifyContent: 'center'},
  txt1: {
    fontWeight: '400',
    fontSize: 12,
    color: color.TEXT_SECOND,
  },
  txt2: {
    fontWeight: '600',
    fontSize: 14,
    color: color.TEXT_PRIMARY,
    marginTop: 4,
  },
  txt3: {
    fontWeight: '400',
    fontSize: 12,
    color: color.TEXT_SECOND,
    marginTop: 4,
  },
  viewButtonContainer: {
    width: '100%',
    height: '100%',
    paddingTop: 8,
    alignItems: 'flex-end',
    position: 'absolute',
  },
  buttonStyle: {
    width: 68,
    height: 19,
    borderRadius: 60,
    backgroundColor: 'rgba(47,128,237,0.08)',
    alignItems: 'center',
    justifyContent: 'center',
  },
  txtButton: {fontWeight: '600', fontSize: 12, color: '#2F80ED'},
});
