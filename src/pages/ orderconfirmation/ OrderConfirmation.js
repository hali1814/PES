import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PESHeader from '../../components/PESHeader';
import color from '../../styles/colors';
import Orderstyles from './components/styles';
import Fonts from '../../assets/fonts/fonts';
import { textsPES } from '../../constants/string';
import { icons, images } from '../../assets';
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

const OrderConfirmation = () => {
  return (
    <SafeAreaView
      style={{ backgroundColor: color.BACKGROUDITEM, height: '100%' }}>
      {/* <PESHeader title={'Xác nhận đơn hàng'} /> */}
      <ScrollView showsVerticalScrollIndicator={false}
        pagingEnabled style={Orderstyles.scrollContainer}>
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
                <Text style={Orderstyles.AddError}>{'Chưa có địa chỉ'}</Text>
              </View>
            </View>
            <View style={{ marginTop: 8 }}>
              <View style={Orderstyles.identificationContainer}>
                <View style={{ width: '70%' }}>
                  <Text
                    numberOfLines={2}
                    style={{ fontFamily: Fonts.Work_Medium, fontSize: 13 }}>
                    {textsPES.identificationText}
                  </Text>
                </View>
                <TouchableOpacity style={Orderstyles.identificationButton}>
                  <Text style={Orderstyles.identificationButtonText}>
                    {'Định danh'}
                  </Text>
                </TouchableOpacity>
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
          <View style={styles.products}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  height: '100%',
                  alignItems: 'center',
                }}>
                <Image
                  source={images.voucher_image}
                  style={{ width: 44, height: 44, borderRadius: 4 }}
                />
                <View style={styles.productTitle}>
                  <Text
                    style={{
                      fontFamily: Fonts.Work_SemiBold,
                      fontSize: 14,
                      color: color.TEXT_PRIMARY,
                    }}>
                    {'Giày MLB Bigball Chunky Mesh New Màu Trắng'}
                  </Text>
                  <View style={styles.local}>
                    <Text
                      style={{
                        fontFamily: Fonts.Work_Regular,
                        fontSize: 13,
                        color: color.TEXT_SECOND,
                      }}>
                      {'Giày Authentic'}
                    </Text>
                  </View>
                  <View style={styles.productMoney}>
                    <Text
                      style={{ fontFamily: Fonts.Work_Regular, fontSize: 13 }}>
                      {'1,999,999'}đ
                    </Text>
                    <Text
                      style={{ fontFamily: Fonts.Work_Regular, fontSize: 13 }}>
                      {'x1'}
                    </Text>
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Voucher */}
        <View style={{ marginTop: 8 }}>
          <View style={voucherContainer}>
            <View style={{ flexDirection: 'row' }}>
              <Image
                source={icons.voucher_icon}
                style={{ width: 32, height: 32 }}
              />
              <View
                style={{
                  alignSelf: 'center',
                  marginLeft: 12,
                  width: '70%',
                }}>
                <Text numberOfLines={1} style={voucherText}>
                  {textsPES.txtVoucherDetail}
                </Text>
              </View>
            </View>
            <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row' }}>
              <Text style={txtVoucher}>{textsPES.txtDetail}</Text>
              <Image
                source={icons.chevronRight_icon}
                style={{ width: 16, height: 16, marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
        </View>
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
            <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row' }}>
              <Text style={txtVoucher}>{'Xem tất cả'}</Text>
              <Image
                source={icons.chevronRight_icon}
                style={{ width: 16, height: 16, marginLeft: 2 }}
              />
            </TouchableOpacity>
          </View>
          <ScrollView showsHorizontalScrollIndicator={false}
            horizontal style={{ marginTop: 16 }}>
            <TouchableOpacity style={styles.payView}>
              <Image source={icons.payIcon} style={{ width: 16, height: 16 }} />
              <View
                style={{
                  marginLeft: 8,
                  width: '83%',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}>
                <Text
                  numberOfLines={1}
                  style={{ fontFamily: Fonts.Work_Medium, fontSize: 14 }}>
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
                style={{ width: 16, height: 16 }}
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
                  style={{ fontFamily: Fonts.Work_Medium, fontSize: 14 }}>
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
                style={{ width: 16, height: 16 }}
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
                  style={{ fontFamily: Fonts.Work_Medium, fontSize: 14 }}>
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
              style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
              <Text style={{ fontFamily: Fonts.Work_Regular, fontSize: 14 }}>
                {'Tiền hàng'}
              </Text>
              <Text style={{ fontFamily: Fonts.Work_Regular, fontSize: 14 }}>
                {'1,999,999'}đ
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{ fontFamily: Fonts.Work_Regular, fontSize: 14 }}>
                {'Phí vận chuyển'}
              </Text>
              <Text style={{ fontFamily: Fonts.Work_Regular, fontSize: 14 }}>
                {'Miễn phí'}
              </Text>
            </View>
            <View
              style={{
                flexDirection: 'row',
                justifyContent: 'space-between',
                marginTop: 8,
              }}>
              <Text style={{ fontFamily: Fonts.Work_SemiBold, fontSize: 14 }}>
                {'Tổng tiền'}
              </Text>
              <Text style={{ fontFamily: Fonts.Work_SemiBold, fontSize: 14 }}>
                {'1,999,999'}đ
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
      <View
        style={{
          height: 75,
          backgroundColor: color.WHITE,
          justifyContent: 'flex-start',
        }}>
        <View style={payContainer}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ height: 20, justifyContent: 'center' }}>
              <Text style={payText}>{'Thanh Toán'}</Text>
            </View>
            <View style={{ height: 20, justifyContent: 'center' }}>
              <Text style={payMoneyText}>{'2.000.000'}đ</Text>
            </View>
          </View>

          {/* ButtonBuy */}
          <TouchableOpacity>
            <View style={buyButton}>
              <View style={buyContainer}>
                <Text style={buyText}>{'Mua ngay'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({
  billContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
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
    height: 108,
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
    justifyContent: 'space-between',
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
