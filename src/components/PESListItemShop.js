import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useContext, useEffect} from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import Fonts from '../assets/fonts/fonts';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import Detail from '../pages/detail/Detail';

const PESListItemShop = props => {
  const {item, navigation, onPress} = props;

  const ProductShopID = item._id;

  const onPressShopDetail = () => {
    navigation.navigate('ShopDetail', {ID: ProductShopID});
  };

  return (
    <TouchableOpacity onPress={onPressShopDetail} style={styles.Container}>
      <View style={styles.headerContainer}>
        <View style={styles.saleContainer}>
          <Image source={icons.tagSale_icon} style={styles.imgSale} />
          <View
            style={{
              alignSelf: 'center',
              marginLeft: 4,
              width: '100%',
              alignContent: 'flex-end',
            }}>
            <Text style={{color: '#FFB208', fontFamily: Fonts.Work_Medium}}>
              {item.sale}%
            </Text>
          </View>
        </View>
      </View>
      <View style={{marginTop: 8}}>
        <Image source={{uri: item.images[0]}} style={styles.imgProduct} />
      </View>
      <View style={styles.headerTextContainer}>
        <Text numberOfLines={1} style={styles.textName}>
          {item.name}
        </Text>
        <Text numberOfLines={2} style={styles.textAbout}>
          {item.description}
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: '100%',
          }}>
          <Text style={styles.textPrice}>{item.stock[0].price} đ</Text>
          {/* <View style={styles.imgContainer}>
            <Image source={icons.heart_icon} style={{width: 20, height: 20}} />
          </View> */}
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PESListItemShop;

const styles = StyleSheet.create({
  Container: {
    flex: 1,
    backgroundColor: color.WHITE,
    marginHorizontal: 10,
    marginBottom: 16,
    borderRadius: 4,
    flexDirection: 'column',
    paddingVertical: 12,
    paddingHorizontal: 12,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
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
    textTransform: 'capitalize',
    fontSize: 15,
    fontFamily: Fonts.Work_SemiBold,
    color: color.BLACK,
  },
  textAbout: {
    marginTop: 4,
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
