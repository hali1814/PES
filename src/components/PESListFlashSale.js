import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  StatusBar,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import Fonts from '../assets/fonts/fonts';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import Detail from '../pages/detail/Detail';
import {formatPrice} from '../utils/MoneyFormat';

const PESListFlashSale = props => {
  const {item, navigation, onPress} = props;

  const navigationPush = () => {
    navigation.push('Detail', {id: item._id, type: item.type});
  };

  const price = item.stock[0].price;

  return (
    <TouchableOpacity onPress={navigationPush} style={styles.Container}>
      {/* image */}
      <ImageBackground
        style={{height: 160, width: 150}}
        source={{uri: item.images[0]}}
      />
      {/* Sale */}
      <View
        style={{
          position: 'absolute',
        }}>
        <View style={styles.customSale}>
          <Image source={icons.tagSale_icon} style={styles.imgSale} />
          <Text style={styles.txtSale}>{item.sale}%</Text>
        </View>
      </View>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.textPrice}>{formatPrice(price)}</Text>
      </View>
      <View
        style={{
          backgroundColor: 'pink',
          height: 15,
          width: 130,
          alignSelf: 'center',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'space-evenly',
          borderRadius: 50,
        }}>
        <View
          style={{
            backgroundColor: '#FC2947',
            height: '100%',
            width: 30,
            borderBottomLeftRadius: 50,
            borderTopLeftRadius: 50,
          }}
        />
        <Text
          style={{
            fontSize: 10,
            fontFamily: Fonts.Work_SemiBold,
            color: 'white',
            fontWeight: 'bold',
            position: 'relative',
            width: 100,
            paddingRight: 30,
            textAlign: 'center',
          }}>
          {item.sold} SOLD
        </Text>
      </View>
    </TouchableOpacity>
  );
};

export default PESListFlashSale;

const styles = StyleSheet.create({
  txtSale: {
    color: color.WHITE,
    fontFamily: Fonts.Work_Medium,
    fontSize: 14,
    marginLeft: 4,
  },
  customSale: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopLeftRadius: 4,
    borderBottomRightRadius: 8,
    backgroundColor: color.MAIN,
    alignItems: 'center',
  },
  Container: {
    flex: 1,
    borderRadius: 1,

    width: 150,
    height: 210,
    margin: 2.5,
    flexDirection: 'column',
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },

  imgSale: {width: 16, height: 16, alignSelf: 'center', tintColor: color.WHITE},

  imgProduct: {
    width: '100%',
    resizeMode: 'cover',
    alignSelf: 'center',
    height: '100%',
    borderTopLeftRadius: 4,
    borderTopRightRadius: 4,
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
    fontSize: 16,
    fontFamily: Fonts.Work_SemiBold,
    alignContent: 'center',
    color: color.MAIN,
  },
  imgContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
});
