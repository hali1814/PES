import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import {icons} from '../../assets';
import {images} from '../../assets';
import colorsPES from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';
import Fonts from '../../assets/fonts/fonts';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';

import {formatPrice} from '../../utils/MoneyFormat';
import {useIsFocused} from '@react-navigation/native';
import EmptyList from '../empty/EmptyList';
const MyFeedback = ({navigation}) => {
  const {getUnRateContext} = useContext(ProductContext);
  const [listRate, setListRate] = useState([]);
  const isFocused = useIsFocused();
  const onRate = async () => {
    const data = await getUnRateContext();
    setListRate(data);
  };

  useEffect(() => {
    if (isFocused) onRate();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor={'white'} />
      {/* header */}
      <View
        style={{
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 16,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color={color.MAIN} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 15,
            fontFamily: Fonts.Man_Bold,
            color: 'black',
          }}>
          Chưa đánh giá
        </Text>
      </View>
      {/* header */}
      {listRate?.length == 0 ? (
        <EmptyList/>
      ) : (
        <FlatList
          data={listRate}
          keyExtractor={item => item._id}
          renderItem={({item}) => (
            <TouchableOpacity style={styles.listContainer}>
              {/* header   */}
              <View
                style={{
                  alignItems: 'flex-end',
                  width: '100%',
                  backgroundColor: 'white',
                  paddingHorizontal: 5,
                  height: 30,
                  justifyContent: 'center',
                  borderColor: color.BORDER_BOTTOM,
                  borderBottomWidth: 1,
                }}>
                <Text
                  style={{fontFamily: Fonts.Man_ExtraBold, color: color.MAIN}}>
                  Đã hoàn thành
                </Text>
              </View>
              {/* //content */}
              <View
                style={{
                  padding: 5,
                  flexDirection: 'row',
                  width: '100%',
                  justifyContent: 'space-between',
                  borderBottomColor: color.BORDER_BOTTOM,
                  borderBottomWidth: 1,
                  paddingVertical: 15,
                }}>
                <Image
                  source={
                    item
                      ? {uri: item.product[0].images[0]}
                      : require('../../assets/images/haohoa_scanQR.png')
                  }
                  style={{width: 70, height: 70}}
                />
                <View style={{width: '60%'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: Fonts.Man_Medium,
                      fontSize: 15,
                    }}>
                    {item.product[0].name}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontFamily: Fonts.Man_Medium,
                      fontSize: 13,
                    }}>
                    Phân loại: {item?.bill[0].color?.toUpperCase()},{' '}
                    {item?.bill[0].size?.toUpperCase()}
                  </Text>
                </View>
                <View>
                  <Text
                    style={{
                      color: 'black',
                      fontFamily: Fonts.Man_Medium,
                      fontSize: 15,
                    }}>
                    {formatPrice(
                      item.product[0].stock.find(
                        e =>
                          e.size == item.bill[0].size &&
                          e.color == item.bill[0].color,
                      ).price,
                    )}
                  </Text>
                  <Text
                    style={{
                      color: 'grey',
                      fontFamily: Fonts.Man_Medium,
                      fontSize: 13,
                    }}>
                    x{item.bill[0].quantity}
                  </Text>
                </View>
              </View>
              {/* //footer */}
              <View
                style={{
                  flexDirection: 'row',
                  paddingVertical: 10,
                  width: '100%',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                  paddingHorizontal: 5,
                }}>
                <Text
                  style={{
                    color: 'grey',
                    fontFamily: Fonts.Man_Medium,
                    fontSize: 14,
                  }}>
                  1 sản phẩm Thành tiền: {formatPrice(item.bill[0].amount)}
                </Text>
                <TouchableOpacity
                  onPress={() => navigation.navigate('PostRate', item)}
                  style={{
                    width: 100,
                    height: 40,
                    backgroundColor: color.MAIN,
                    borderRadius: 5,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Text style={{color: 'white', fontFamily: Fonts.Man_Bold}}>
                    Đánh giá
                  </Text>
                </TouchableOpacity>
              </View>
            </TouchableOpacity>
          )}
        />
      )}
    </SafeAreaView>
  );
};

export default MyFeedback;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  priceDetail: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  productDetail: {
    width: '80%',
  },

  detail: {
    marginLeft: 12,
  },

  listContainer: {
    marginTop: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },

  headerText: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    color: colorsPES.blackText,
    marginLeft: 120,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
  },
});
