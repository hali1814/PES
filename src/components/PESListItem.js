import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, {useContext, useEffect} from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import Fonts from '../assets/fonts/fonts';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import Detail from '../pages/detail/Detail';
import {formatPrice} from '../utils/MoneyFormat';

const PESListItem = props => {
  const {item, navigation, onPress} = props;

  const navigationPush = () => {

    navigation.navigate('Detail', {id: item._id, type: item.type});
  };

  const price = item.stock[0].price;

  return (
    <TouchableOpacity onPress={navigationPush} style={styles.Container}>
      <ImageBackground
        source={{uri: item.images[0]}}
        style={styles.imgProduct}
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
      {/* Title với About */}
      <View style={{paddingVertical:4, paddingHorizontal: 8}}>
      <View
        style={{
          marginTop: 8,
        }}>
        <Text numberOfLines={1} style={styles.textName}>
          {item.name}
        </Text>
      </View>
       {/* Price */}
       <View style={{ marginTop:8 }}>
          <Text style={styles.textPrice}>{formatPrice(price)}</Text>
          <Text
            style={{
              fontSize: 12,
              fontFamily: Fonts.Roboto_Medium,
              color:color.BLACK,
              fontWeight: '100',
              textAlignVertical: 'bottom'
            }}>
            {item.sold} đã bán
          </Text>
        </View>
      </View>

    </TouchableOpacity>
  );
};

export default PESListItem;

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
    flex: 0.5,
    backgroundColor: color.WHITE,
    flexDirection: 'column',
    margin:4
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
  imgSale: {
    width: 16,
    height: 16,
    tintColor: color.WHITE,
  },

  imgProduct: {
    width: '100%',
    resizeMode: 'cover',
    height: 161,
  },
  headerTextContainer: {
    flexDirection: 'column',
    height: 64,
    marginTop: 8,
    marginBottom: 12,
  },
  textName: {
    textTransform: 'capitalize',
    fontSize: 14,
    fontFamily: Fonts.Roboto_Medium,
    color:color.BLACK
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
    textAlignVertical: 'bottom',
    color: color.MAIN,
  },
  imgContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
});
