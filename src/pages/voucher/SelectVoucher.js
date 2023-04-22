import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  ScrollView,
  FlatList,
  SafeAreaView,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import {icons, images} from '../../assets';
import color from '../../styles/colors';
import PESHeader from '../../components/PESHeader';
import PESVoucher from '../../components/PESVoucher';
import Fonts from '../../assets/fonts/fonts';
import {UserContext} from '../../api/authservice/UserContext';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import {formatPrice} from '../../utils/MoneyFormat';
const Voucher = ({navigation, route}) => {
  const {
    ongetVoucher,
    voucher,
    voucher_pes,
    setVoucher_pes,
    voucher_shipping,
    setVoucher_shipping,
  } = useContext(UserContext);
  const {onCalculator} = useContext(ProductContext);
  useEffect(() => {
    ongetVoucher();
  }, []);
  return (
    <SafeAreaView
      style={{backgroundColor: color.BACKGROUDITEM, height: '100%'}}>
      <View
        style={{
          width: '100%',
          height: StatusBar.currentHeight,
          backgroundColor: 'white',
        }}></View>
      <PESHeader navigation={navigation} title={'PES VOUCHERS'} />
      <ScrollView style={{backgroundColor: 'white'}}>
        <View
          style={{
            paddingHorizontal: 7,
            backgroundColor: 'white',
            paddingVertical: 10,
            borderTopColor: color.BORDER_BOTTOM,
            borderTopWidth: 1,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Man_Bold,
              color: color.TEXT_PRIMARY,
              fontSize: 14,
            }}>
            Shipping voucher
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Man_Medium,
              color: color.TEXT_SECOND,
              fontSize: 12,
            }}>
            Chỉ có thể áp dụng 1 Voucher
          </Text>
        </View>
        <View style={{width: '100%', backgroundColor: 'white'}}>
          <FlatList
            data={voucher}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({item}) => {
              if (item.type == 1) {
                return (
                  <TouchableOpacity
                    disabled={item?.min >= route.params.amountBill}
                    onPress={() => {
                      if (voucher_shipping == item.voucherId)
                        setVoucher_shipping('');
                      else setVoucher_shipping(item.voucherId);
                    }}
                    style={{
                      width: '96%',
                      height: 100,
                      borderRadius: 5,
                      borderColor:
                        voucher_shipping == item.voucherId
                          ? color.MAIN
                          : color.BORDER_BOTTOM,
                      borderWidth: 2,
                      backgroundColor: 'white',
                      marginBottom: 5,
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{height: '100%', width: 100}}
                      resizeMode={'stretch'}
                      source={
                        voucher
                          ? {uri: item.images}
                          : require('../../assets/images/haohoa_scanQR.png')
                      }
                    />

                    <View
                      style={{
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: color.TEXT_PRIMARY,
                          fontFamily: Fonts.Man_Bold,
                        }}>
                        Free Shipping
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          color: color.TEXT_SECOND,
                          fontFamily: Fonts.Man_Bold,
                        }}>
                        Min. {formatPrice(item?.min)}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          padding: 2,
                          borderColor: color.MAIN,
                          borderWidth: 1,
                          color: color.MAIN,
                          fontFamily: Fonts.Man_Bold,
                        }}>
                        {item.sale}% - Max {formatPrice(item?.value)}
                      </Text>
                    </View>
                    <Text style={{width: 120, textAlign: 'right'}}>
                      X {item.quantity}
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        position: 'absolute',
                        opacity: 0.2,
                        display:
                          item?.min > route.params.amountBill ? 'flex' : 'none',
                      }}
                    />
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
        <View
          style={{
            paddingHorizontal: 7,
            backgroundColor: 'white',
            paddingVertical: 10,
            borderTopColor: color.BORDER_BOTTOM,
            borderTopWidth: 1,
          }}>
          <Text
            style={{
              fontFamily: Fonts.Man_Bold,
              color: color.TEXT_PRIMARY,
              fontSize: 14,
            }}>
            Discount / Cashback
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Man_Medium,
              color: color.TEXT_SECOND,
              fontSize: 12,
            }}>
            Chỉ có thể áp dụng 1 Voucher
          </Text>
        </View>
        <View style={{width: '100%', backgroundColor: 'white'}}>
          <FlatList
            data={voucher}
            keyExtractor={(item, index) => index.toString()}
            scrollEnabled={false}
            renderItem={({item}) => {
              if (item.type == 0) {
                return (
                  <TouchableOpacity
                    disabled={item?.min > route.params.amountBill}
                    onPress={() => {
                      if (voucher_pes == item.voucherId) setVoucher_pes('');
                      else setVoucher_pes(item.voucherId);
                    }}
                    style={{
                      width: '96%',
                      height: 100,
                      borderRadius: 5,
                      borderColor:
                        voucher_pes == item.voucherId
                          ? color.MAIN
                          : color.BORDER_BOTTOM,
                      borderWidth: 2,
                      backgroundColor: 'white',
                      marginBottom: 5,
                      alignSelf: 'center',
                      flexDirection: 'row',
                    }}>
                    <Image
                      style={{height: '100%', width: 100}}
                      resizeMode={'stretch'}
                      source={
                        voucher
                          ? {uri: item.images}
                          : require('../../assets/images/haohoa_scanQR.png')
                      }
                    />

                    <View
                      style={{
                        paddingHorizontal: 10,
                        justifyContent: 'center',
                        backgroundColor: 'white',
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          color: color.TEXT_PRIMARY,
                          fontFamily: Fonts.Man_Bold,
                        }}>
                        PES Voucher
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          color: color.TEXT_SECOND,
                          fontFamily: Fonts.Man_Bold,
                        }}>
                        Min. {formatPrice(item?.min)}
                      </Text>
                      <Text
                        style={{
                          marginTop: 5,
                          fontSize: 12,
                          padding: 2,
                          borderColor: color.MAIN,
                          borderWidth: 1,
                          color: color.MAIN,
                          fontFamily: Fonts.Man_Bold,
                        }}>
                        {item.sale}% - Max {formatPrice(item?.value)}
                      </Text>
                    </View>
                    <Text style={{width: 120, textAlign: 'right'}}>
                      X {item.quantity}
                    </Text>
                    <View
                      style={{
                        width: '100%',
                        height: '100%',
                        backgroundColor: 'grey',
                        position: 'absolute',
                        opacity: 0.2,
                        display:
                          item?.min > route.params.amountBill ? 'flex' : 'none',
                      }}
                    />
                  </TouchableOpacity>
                );
              }
            }}
          />
        </View>
      </ScrollView>
      <TouchableOpacity
        onPress={() => {
          onCalculator(voucher_shipping, voucher_pes);
          navigation.goBack();
        }}
        style={{
          backgroundColor: color.MAIN,
          width: '97%',
          height: 40,
          marginBottom: 5,
          alignSelf: 'center',
          alignItems: 'center',
          justifyContent: 'center',
        }}>
        <Text style={{fontFamily: Fonts.Man_Bold, color: 'white'}}>OK</Text>
      </TouchableOpacity>
      {/* <PESVoucher
          img={images.momovoucher_image}
          saleup="Sale up-to"
          title="MoMo, Ưu đãi 50K đơn từ 300K"
          expiry="Hạn đến 20/05/2023"
        />
        <PESVoucher
          img={images.visavoucher_image}
          saleup="Sale up-to"
          title="Zolopay, Ưu đãi 30K đơn từ 150K"
          expiry="Hạn đến 20/05/2023"
        />
        <PESVoucher
          img={images.zalopayvoucher_image}
          saleup="Sale up-to"
          title="Zolopay, Ưu đãi 30K đơn từ 150K"
          expiry="Hạn đến 20/05/2023"
        /> */}
    </SafeAreaView>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  Container: {},
});
