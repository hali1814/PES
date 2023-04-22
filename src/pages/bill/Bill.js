import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Fonts from '../../assets/fonts/fonts';
import color from '../../styles/colors';
import {Image} from 'react-native-elements';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import {formatPrice} from '../../utils/MoneyFormat';
const Bill = ({navigation, route}) => {
  const [bill, setBill] = useState('');
  const {getBillDetailsController} = useContext(ProductContext);
  const idBill = route.params._id;
  const getBill = async () => {
    const data = await getBillDetailsController(idBill);
    data?.information?.reverse();
    setBill(data);
  };
  const getStatusName = () => {
    switch (bill.status) {
      case 0:
        return 'Đang chờ xác nhận';
      case 1:
        return 'Đang chờ lấy hàng';
      case 2:
        return 'Đang hàng đang được giao';
      case 3:
        return 'Đang hàng đã được giao';
      case 4:
        return 'Đang hàng đã được hủy';
      default:
        return '';
    }
  };
  useEffect(() => {
    getBill();
  }, []);
  return (
    <ScrollView style={{marginTop: StatusBar.currentHeight}}>
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
          Thông tin đơn hàng
        </Text>
      </View>
      {/* header */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 5,
        }}>
        <Image
          resizeMode="center"
          style={{height: 24, width: 24}}
          source={require('../../assets/images/logoLoading.png')}
        />
        <View style={{width: '90%'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.Man_Bold,
              color: 'black',
            }}>
            Hãy nhớ kiểm tra đơn hàng của bạn!
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              fontFamily: Fonts.Man_Regular,
              color: color.TEXT_SECOND,
            }}>
            Nếu sản phẩm nhận được không đúng với miêu tả, thiếu hàng hoặc bị hư
            hỏng, vui lòng yêu cầu Trả hàng/Hoàn tiền trước 22-04-2023.
          </Text>
        </View>
      </View>
      {/* /// */}
      <View
        style={{
          backgroundColor: 'white',
          marginBottom: 5,
          padding: 5,
          width: '100%',
          marginTop: 5,
        }}>
        {/* header */}
        <View style={{width: '100%', alignItems: 'flex-end', padding: 5}}>
          <Text
            style={{
              color: color.MAIN,
              fontFamily: Fonts.Man_Bold,
              fontSize: 14,
            }}>
            {getStatusName()}
          </Text>
        </View>
        {/* header */}
        {/* Content */}
        <View style={{flexDirection: 'row', width: '100%'}}>
          <Image
            style={{height: 70, width: 70}}
            source={
              bill
                ? {uri: bill.productDetails.images[0]}
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
              {bill?.productDetails?.name.toUpperCase()}
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
                Phân loại: {bill?.size?.toUpperCase()},{' '}
                {bill?.color?.toUpperCase()}
              </Text>
              <Text
                numberOfLines={1}
                style={{
                  color: color.TEXT_SECOND,
                  fontFamily: Fonts.Man_Medium,
                  fontSize: 12,
                }}>
                x{bill?.quantity || 0}
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
              <View>
                <Text
                  numberOfLines={1}
                  style={{
                    color: color.TEXT_SECOND,
                    fontFamily: Fonts.Man_Regular,
                    fontSize: 12,
                    textDecorationLine: 'line-through',
                  }}>
                  {formatPrice(bill?.productDetails?.stock[0].price || 0)}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    color: color.MAIN,
                    fontFamily: Fonts.Man_Bold,
                    fontSize: 14,
                  }}>
                  {formatPrice(
                    bill?.productDetails?.stock[0].price *
                      ((100 - bill?.productDetails?.sale) / 100) || 0,
                  )}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* Content */}

        {/* price */}
        <View style={{paddingVertical: 10}}>
          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 10,
            }}>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              Tổng tiền hàng
            </Text>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              {formatPrice(
                bill?.productDetails?.stock[0].price *
                  ((100 - bill?.productDetails?.sale) / 100) *
                  bill?.quantity || 0,
              )}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 7,
            }}>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              Phí vận chuyển
            </Text>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              {formatPrice(30000)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 7,
            }}>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              Giảm giá phí vận chuyển
            </Text>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              - {formatPrice(bill?.discount_shipping || 0)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 7,
            }}>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              Voucher từ PES
            </Text>
            <Text
              style={{
                color: color.TEXT_SECOND,
                fontSize: 14,
                fontFamily: Fonts.Man_Regular,
              }}>
              - {formatPrice(bill?.discount || 0)}
            </Text>
          </View>

          <View
            style={{
              flexDirection: 'row',
              width: '100%',
              justifyContent: 'space-between',
              paddingHorizontal: 5,
              marginTop: 7,
            }}>
            <Text
              style={{
                color: color.TEXT_PRIMARY,
                fontSize: 14,
                fontFamily: Fonts.Man_SemiBold,
              }}>
              Tổng tiền hàng
            </Text>
            <Text
              style={{
                color: color.TEXT_PRIMARY,
                fontSize: 14,
                fontFamily: Fonts.Man_SemiBold,
              }}>
              {formatPrice(bill?.amount || 0)}
            </Text>
          </View>
        </View>
        {/* price */}
      </View>
      {/* COD */}
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 5,
        }}>
        <Image
          resizeMode="center"
          style={{height: 24, width: 24}}
          source={require('../../assets/images/logoLoading.png')}
        />
        <View style={{width: '90%'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.Man_Bold,
              color: 'black',
            }}>
            Phương thức thanh toán
          </Text>
          <Text
            style={{
              marginTop: 10,
              fontSize: 12,
              fontFamily: Fonts.Man_Regular,
              color: color.TEXT_SECOND,
            }}>
            {formatPrice(bill?.payment_method || 0)}
          </Text>
        </View>
      </View>
      {/* shipping information*/}
      <View
        style={{
          backgroundColor: 'white',
          padding: 10,
          flexDirection: 'row',
          width: '100%',
          justifyContent: 'space-between',
          alignItems: 'flex-start',
          marginTop: 5,
        }}>
        <Image
          resizeMode="center"
          style={{height: 24, width: 24}}
          source={require('../../assets/images/logoLoading.png')}
        />
        <View style={{width: '90%'}}>
          <Text
            style={{
              fontSize: 14,
              fontFamily: Fonts.Man_Bold,
              color: 'black',
              marginBottom: 15,
            }}>
            Thông tin chi tiết đơn hàng
          </Text>
          {bill?.information?.map((value, index) => {
            const dateObj = new Date(value.date);
            // Lấy riêng ngày
            const date = dateObj.getDate(); // Output: 18
            // Lấy riêng tháng (lưu ý tháng bắt đầu từ 0)
            const month = dateObj.getMonth() + 1; // Output: 4
            // Lấy riêng năm
            const year = dateObj.getFullYear(); // Output: 2023
            // Lấy riêng giờ
            const hours = dateObj.getHours(); // Output: 9
            // Lấy riêng phút
            const minutes = dateObj.getMinutes(); // Output: 3
            return (
              <View
                key={index}
                style={{
                  borderColor: index == 0 ? '#98D8AA' : color.TEXT_SECOND,
                  borderLeftWidth: 1,
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: index == 0 ? '#98D8AA' : color.TEXT_SECOND,
                    fontFamily: Fonts.Man_Bold,
                    fontSize: 14,
                  }}>
                  {value.msg}
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginTop: 5,
                    alignItems: 'center',
                  }}>
                  <Text
                    style={{
                      color: color.TEXT_SECOND,
                      fontSize: 12,
                      fontFamily: Fonts.Man_Medium,
                    }}>
                    {date.toString().padStart(2, 0)}-
                    {month.toString().padStart(2, '0')}-{year}
                  </Text>
                  <Text
                    style={{
                      color: color.TEXT_SECOND,
                      fontSize: 11,
                      fontFamily: Fonts.Man_Medium,
                      marginLeft: 5,
                    }}>
                    {hours.toString().padStart(2, 0)}:
                    {minutes.toString().padStart(2, 0)}
                  </Text>
                </View>
              </View>
            );
          })}
        </View>
      </View>
    </ScrollView>
  );
};

export default Bill;

const styles = StyleSheet.create({});
