import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import colorsPES from '../../constants/colors';
import {formatPrice} from '../../utils/MoneyFormat';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import React, {useEffect, useState, useContext} from 'react';
import EmptyList from '../empty/EmptyList';
import color from '../../styles/colors';
import Fonts from '../../assets/fonts/fonts';
import {useIsFocused} from '@react-navigation/native';
const Canceled = ({navigation}) => {
  const {onGetStatusBills} = useContext(ProductContext);
  const [dataBills, setDataBills] = useState();
  const isFocused = useIsFocused();
  const getDataBills = async () => {
    const data = await onGetStatusBills(4);
    setDataBills(data);
  };
  useEffect(() => {
    if (isFocused) getDataBills();
  }, [isFocused]);

  return (
    <SafeAreaView style={styles.container}>
      {dataBills?.length == 0 ? (
        <EmptyList />
      ) : (
        <View style={styles.contentContainer}>
          <FlatList
            showsVerticalScrollIndicator={false}
            data={dataBills}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => navigation.navigate('Bill', {_id: item._id})}
                style={{
                  backgroundColor: 'white',
                  marginBottom: 5,
                  padding: 5,
                  width: '100%',
                }}>
                {/* header */}
                <View
                  style={{width: '100%', alignItems: 'flex-end', padding: 5}}>
                  <Text
                    style={{
                      color: color.MAIN,
                      fontFamily: Fonts.Man_Bold,
                      fontSize: 14,
                    }}>
                    Đơn hàng đã được hủy
                  </Text>
                </View>
                {/* header */}
                {/* Content */}
                <View style={{flexDirection: 'row', width: '100%'}}>
                  <Image
                    style={{height: 70, width: 70}}
                    source={
                      item
                        ? {uri: item?.productDetails.images[0]}
                        : require('../../assets/images/avatar.png')
                    }
                  />
                  <View
                    style={{
                      width: '80%',
                      justifyContent: 'space-between',
                      paddingStart: 10,
                    }}>
                    <Text
                      numberOfLines={1}
                      style={{
                        color: 'black',
                        fontFamily: Fonts.Man_Medium,
                        fontSize: 14,
                      }}>
                      {item?.productDetails?.name?.toUpperCase()}
                    </Text>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 5,
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: color.TEXT_SECOND,
                          fontFamily: Fonts.Man_Medium,
                          fontSize: 12,
                        }}>
                        Phân loại: {item?.color?.toUpperCase()},{' '}
                        {item?.size?.toUpperCase()}
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: color.TEXT_SECOND,
                          fontFamily: Fonts.Man_Medium,
                          fontSize: 12,
                        }}>
                        x{item?.quantity}
                      </Text>
                    </View>
                    <View
                      style={{
                        flexDirection: 'row',
                        justifyContent: 'space-between',
                        width: '100%',
                        marginTop: 10,
                        alignItems: 'center',
                      }}>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: color.TEXT_ERROR,
                          fontFamily: Fonts.Man_Medium,
                          fontSize: 8,
                          borderWidth: 0.5,
                          borderColor: color.TEXT_ERROR,
                          padding: 3,
                        }}>
                        7 ngày trả hàng
                      </Text>
                      <Text
                        numberOfLines={1}
                        style={{
                          color: color.MAIN,
                          fontFamily: Fonts.Man_Bold,
                          fontSize: 14,
                        }}>
                        {formatPrice(item?.productDetails?.stock[0].price)}
                      </Text>
                    </View>
                  </View>
                </View>
                {/* Content */}
                {/* line */}
                <View
                  style={{
                    width: '100%',
                    height: 1,
                    marginTop: 10,
                    marginBottom: 10,
                    backgroundColor: color.BORDER_BOTTOM,
                  }}
                />
                <View
                  style={{
                    width: '100%',
                    alignItems: 'flex-end',
                    paddingHorizontal: 10,
                    paddingBottom: 5
                  }}>
                  <Text
                    numberOfLines={1}
                    style={{
                      color: color.TEXT_SECOND,
                      fontFamily: Fonts.Man_Medium,
                      fontSize: 14,
                    }}>
                    Thành tiền: {formatPrice(item?.amount)}
                  </Text>
                </View>
               
              </TouchableOpacity>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
};

export default Canceled;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  contentContainer: {
    width: '100%',
  },
  itemContainer: {
    backgroundColor: colorsPES.white,
    paddingHorizontal: 16,
    width: '100%',
    marginTop: 10,
    flexDirection: 'row',
    paddingVertical: 10,
  },
  imageContainer: {
    width: 60,
    height: 60,
  },
  productInfor: {
    marginLeft: 10,
    width: '80%',
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: colorsPES.black,
  },
  text: {
    fontSize: 14,
    color: colorsPES.black,
  },
  totalPriceContainer: {
    marginTop: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  priceText: {
    fontSize: 17,
    fontWeight: '600',
    color: colorsPES.borderColorBlue,
  },
  status: {
    paddingVertical: 5,
    paddingHorizontal: 5,
    backgroundColor: '#FFF0CE',
    width: '50%',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 12,
    marginTop: 10,
  },
  button: {
    paddingVertical: 7,
    width: '40%',
    borderRadius: 5,
    backgroundColor: colorsPES.borderColorBlue,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
