import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import Fonts from '../assets/fonts/fonts';

const PESListItem = ({item}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.Container}>
      <View style={styles.headerContainer}>
        <Image source={icons.user_icon} style={{width: 24, height: 24}} />
        <View style={styles.saleContainer}>
          <Image source={icons.tagSale_icon} style={styles.imgSale} />
          <View style={{alignSelf: 'center', marginLeft: 4}}>
            <Text style={{color: '#FFB208', fontFamily: Fonts.Work_Medium}}>
              {item.sale}
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 8}}>
        <Image source={{}} style={styles.imgProduct} />
      </View>
      <View style={styles.headerTextContainer}>
        <Text numberOfLines={2} style={styles.textName}>
          {item.name}
        </Text>
        <Text style={styles.textAbout}>{item.about}</Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text style={styles.textPrice}>{item.price} đ</Text>
          {/* <View style={styles.imgContainer}>
            <Image source={icons.heart_icon} style={{width: 20, height: 20}} />
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PESListItem;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    padding: 12,
    backgroundColor: color.WHITE,
    marginHorizontal: 10,
    marginBottom: 16,
    borderRadius: 4,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  saleContainer: {
    borderWidth: 0.5,
    borderColor: '#FFB208',
    flexDirection: 'row',
    width: 62,
    height: 24,
    borderRadius: 60,
  },
  imgSale: {width: 16, height: 16, alignSelf: 'center', marginLeft: 4},
  imgProduct: {
    width: 130,
    resizeMode: 'cover',
    alignSelf: 'center',
    height: 130,
  },
  headerTextContainer: {
    flexDirection: 'column',
    height: 64,
    marginTop: 8,
    marginBottom: 12,
  },
  textName: {
    fontSize: 15,
    fontFamily: Fonts.Work_SemiBold,
    color: color.BLACK,
  },
  textAbout: {
    marginTop: 4,
    height: 40,
    fontSize: 14,
    fontFamily: Fonts.Work_Regular,
    color: color.TEXT_SECOND,
  },
  textPrice: {
    fontSize: 15,
    fontFamily: Fonts.Work_SemiBold,
    alignContent: 'center',
  },
  imgContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
});
