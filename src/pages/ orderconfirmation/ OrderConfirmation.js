import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  StatusBar,
  TouchableOpacity,
  View,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import PESHeader from '../../components/PESHeader';
import color from '../../styles/colors';
import Orderstyles from './components/styles';
import Fonts from '../../assets/fonts/fonts';
import {textsPES} from '../../constants/string';
import {icons, images} from '../../assets';
import {
  txtVoucher,
  voucherContainer,
  voucherText,
} from '../shop/components/styles';
import LinearGradient from 'react-native-linear-gradient';
import {
  addCartButton,
  buyButton,
  buyContainer,
  buyText,
  payContainer,
  payMoneyText,
  payText,
} from '../detail/components/styles';

import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import {UserContext} from '../../api/authservice/UserContext';
import {formatPrice} from '../../utils/MoneyFormat';
import colorsPES from '../../constants/colors';

const OrderConfirmation = ({navigation}) => {
  const {
    onCalculator,
    createBills,
    dataBill,
    setDataBill,
    onCountCart,
    billLoading,
  } = useContext(ProductContext);
  const {
    onGetUserInfor,
    user,
    voucher_shipping,
    voucher_pes,
    setVoucher_pes,
    setVoucher_shipping,
  } = useContext(UserContext);

  const onCreateBills = async (voucher_shipping, voucher_pes) => {
    try {
      const tmp = await createBills(voucher_shipping, voucher_pes);
      if (tmp) navigation.navigate('OrderTab');
      else console.log('fails create bills'); // add thêm thông báo thất bại

      onCountCart();
      setVoucher_pes('');
      setVoucher_shipping('');
    } catch (err) {
      console.log(OrderConfirmation.toString(), err.toString());
    }
  };
  useEffect(() => {
    onCalculator(voucher_shipping, voucher_pes);
    onGetUserInfor();
  }, []);

  return (
    <View style={{flex: 1, marginTop: StatusBar.currentHeight}}>
      <StatusBar barStyle={'dark-content'} />
      {/* <PESHeader title={'Xác nhận đơn hàng'} /> */}
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={Orderstyles.scrollContainer}>
        <View style={Orderstyles.userContainer}>
          <View style={Orderstyles.userBG}>
            <View style={Orderstyles.Address}>
              <View
                style={{
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text style={Orderstyles.AddressText}>
                  {'Địa chỉ nhận hàng'}
                </Text>
              </View>
              <View
                style={{
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Man_SemiBold,
                    fontSize: 14,
                  }}>
                  {user?.nickName}
                </Text>
              </View>
              <View
                style={{
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Man_SemiBold,
                    fontSize: 14,
                  }}>
                  {user?.userName}
                </Text>
              </View>
              <View
                style={{
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Man_SemiBold,
                    fontSize: 14,
                  }}>
                  {user?.address}
                </Text>
              </View>
            </View>
          </View>
        </View>
        {/* ProductsConfirmation */}
        <View style={styles.productContainer}>
          <View>
            <Text
              style={{
                fontFamily: Fonts.Work_SemiBold,
                fontSize: 16,
                color: color.TEXT_PRIMARY,
              }}>
              {'Sản phẩm'}
            </Text>
          </View>
          {billLoading ? (
            <ActivityIndicator size="large" color={colorsPES.borderColorBlue} />
          ) : (
            <FlatList
              scrollEnabled={false}
              data={dataBill.listBills}
              keyExtractor={(item, index) => index.toString()}
              renderItem={({item}) => (
                <View style={styles.products}>
                  <View
                    style={{
                      flexDirection: 'row',
                    }}>
                    <Image
                      source={images.voucher_image}
                      style={{width: 44, height: 44, borderRadius: 4}}
                    />
                    <View style={styles.productTitle}>
                      <Text
                        style={{
                          fontFamily: Fonts.Work_SemiBold,
                          fontSize: 14,
                          color: color.TEXT_PRIMARY,
                        }}>
                        {item?.name.toString().toUpperCase()}
                      </Text>
                      <View style={styles.productMoney}>
                        <Text
                          style={{
                            fontFamily: Fonts.Work_Regular,
                            fontSize: 13,
                          }}>
                          {formatPrice(item.billProduct.original_price)}
                        </Text>
                        <Text
                          style={{
                            fontFamily: Fonts.Work_Regular,
                            fontSize: 13,
                          }}>
                          {`x ${item?.quantity}`}
                        </Text>
                      </View>
                    </View>
                  </View>
                </View>
              )}
            />
          )}
        </View>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('SelectVoucher', {
              amountBill: dataBill?.totalBill?.origin_total,
            })
          }
          style={{
            backgroundColor: 'white',
            marginTop: 4,
            borderRadius: 5,
            paddingVertical: 10,
            paddingHorizontal: 12,
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Work_SemiBold,
                fontSize: 16,
                color: color.TEXT_PRIMARY,
              }}>
              {'PES Vouchers'}
            </Text>
          </View>
          <View
            style={{
              flexDirection: 'row',
              width: '60%',
              justifyContent: 'flex-end',
            }}>
            {!voucher_shipping || (
              <View
                style={{
                  borderColor: '#B5F1CC',
                  borderWidth: 1,
                  padding: 2,
                  marginRight: 5,
                }}>
                <Text
                  style={{
                    fontSize: 7,
                    color: '#B5F1CC',
                    fontFamily: Fonts.Man_Bold,
                  }}>
                  Free Shipping Voucher
                </Text>
              </View>
            )}

            {!voucher_pes || (
              <View
                style={{
                  borderColor: '#FA7070',
                  borderWidth: 1,
                  padding: 2,
                  fontFamily: Fonts.Man_Bold,
                }}>
                <Text style={{fontSize: 7, color: '#FA7070'}}>PES Voucher</Text>
              </View>
            )}
          </View>

          <Text style={[txtVoucher, {width: '60%', textAlign: 'right'}]}>
            {'Chọn Vouchers'}
          </Text>
          <Image
            source={icons.chevronRight_icon}
            style={{width: 16, height: 16, marginLeft: 2}}
          />
        </TouchableOpacity>

        {/* Pay */}
        <View style={styles.payContainer}>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <Text
              style={{
                fontFamily: Fonts.Work_SemiBold,
                fontSize: 16,
                color: color.TEXT_PRIMARY,
              }}>
              {'Phương thức thanh toán'}
            </Text>
            <TouchableOpacity onPress={() => {}} style={{flexDirection: 'row'}}>
              <Text style={txtVoucher}>{'Xem tất cả'}</Text>
              <Image
                source={icons.chevronRight_icon}
                style={{width: 16, height: 16, marginLeft: 2}}
              />
            </TouchableOpacity>
          </View>
          <ScrollView
            showsHorizontalScrollIndicator={false}
            horizontal
            style={{marginTop: 16}}>
            <TouchableOpacity style={styles.payView}>
              <Image source={icons.payIcon} style={{width: 16, height: 16}} />
              <View
                style={{
                  marginLeft: 8,
                  width: '83%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  style={{fontFamily: Fonts.Work_Medium, fontSize: 14}}>
                  {'Thanh toán khi nhận hàng'}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: Fonts.Work_Regular,
                    fontSize: 11,
                    color: color.TEXT_SECOND,
                    marginTop: 8,
                  }}>
                  {'Thanh toán khi nhận hàng'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payView}>
              <Image
                source={icons.payMomoIcon}
                style={{width: 16, height: 16}}
              />
              <View
                style={{
                  marginLeft: 8,
                  width: '83%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  style={{fontFamily: Fonts.Work_Medium, fontSize: 14}}>
                  {'Momo'}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: Fonts.Work_Regular,
                    fontSize: 11,
                    color: color.TEXT_SECOND,
                    marginTop: 8,
                  }}>
                  {'Liên kết ví Momo để thanh toán'}
                </Text>
              </View>
            </TouchableOpacity>
            <TouchableOpacity style={styles.payView}>
              <Image
                source={icons.payZaloIcon}
                style={{width: 16, height: 16}}
              />
              <View
                style={{
                  marginLeft: 8,
                  width: '83%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  style={{fontFamily: Fonts.Work_Medium, fontSize: 14}}>
                  {'Zalopay'}
                </Text>
                <Text
                  numberOfLines={1}
                  style={{
                    fontFamily: Fonts.Work_Regular,
                    fontSize: 11,
                    color: color.TEXT_SECOND,
                    marginTop: 8,
                  }}>
                  {'Liên kết ví Zalopay để thanh toán'}
                </Text>
              </View>
            </TouchableOpacity>
          </ScrollView>
        </View>
        <View style={styles.billContainer}>
          <Text
            style={{
              fontFamily: Fonts.Work_SemiBold,
              fontSize: 16,
              color: color.TEXT_PRIMARY,
            }}>
            {'Thông tin thanh toán'}
          </Text>
          <View
            style={{
              marginTop: 16,
              flexDirection: 'column',
              justifyContent: 'space-between',
            }}>
            <View
              style={{flexDirection: 'row', justifyContent: 'space-between'}}>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                {'Tạm tính'}
              </Text>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                {formatPrice(dataBill?.totalBill?.origin_total || 0)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 1,
              }}>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                {'Giảm giá'}
              </Text>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                - {formatPrice(dataBill?.totalBill?.total_discount_price || 0)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 1,
              }}>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                {'Phí vận chuyển'}
              </Text>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                {formatPrice(dataBill?.totalBill?.total_shipping_price || 0)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 1,
              }}>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                {'Giảm phí vận chuyển'}
              </Text>
              <Text style={{fontFamily: Fonts.Work_Regular, fontSize: 14}}>
                -{' '}
                {formatPrice(dataBill?.totalBill?.total_discount_shipping || 0)}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{fontFamily: Fonts.Work_SemiBold, fontSize: 14}}>
                {'Tổng tiền'}
              </Text>
              <Text style={{fontFamily: Fonts.Work_SemiBold, fontSize: 14}}>
                {formatPrice(dataBill?.totalBill?.totalBill || 0)}
              </Text>
            </View>

            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <TouchableOpacity
                onPress={() => onCreateBills(voucher_shipping, voucher_pes)}
                style={{
                  width: '100%',
                  height: 40,
                  backgroundColor: color.MAIN,
                  borderRadius: 5,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <Text style={buyText}>{'ĐẶT HÀNG'}</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </ScrollView>
    </View>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  billContainer: {
    paddingHorizontal: 12,
    paddingVertical: 10,
    backgroundColor: color.WHITE,
    marginTop: 8,
    borderRadius: 4,
  },
  productContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: color.WHITE,
    marginTop: 8,
    borderRadius: 4,
  },
  products: {
    marginTop: 16,
    backgroundColor: 'rgba(226,234,248,0.35)',
    borderRadius: 4,
    padding: 8,
  },
  local: {
    height: 20,
    backgroundColor: color.WHITE,
    paddingHorizontal: 8,
    paddingVertical: 1,
    width: 110,
    borderRadius: 4,
  },
  productTitle: {
    height: '100%',
    flexDirection: 'column',
    marginHorizontal: 8,
    width: '83%',
  },
  productMoney: {
    height: 20,
    backgroundColor: color.WHITE,
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    paddingHorizontal: 8,
    paddingVertical: 1,
  },
  payContainer: {
    marginTop: 8,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: color.WHITE,
  },
  payView: {
    paddingHorizontal: 8,
    paddingVertical: 12,
    borderWidth: 0.5,
    borderColor: color.MAIN,
    borderRadius: 4,
    flexDirection: 'row',
    width: 200,
    marginLeft: 8,
  },
});
