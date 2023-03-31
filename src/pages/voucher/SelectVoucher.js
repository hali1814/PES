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
import { formatPrice } from '../../utils/MoneyFormat';
const Voucher = () => {
  const {ongetVoucher, voucher} = useContext(UserContext);

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
      <PESHeader title={'PES VOUCHERS'} />
      <ScrollView>
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
            renderItem={({item}) => (
              <View
                elevation={3}
                style={{
                  width: '96%',
                  height: 100,
                  borderRadius: 5,
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

                <View style={{
                  paddingHorizontal: 10,
                  justifyContent: 'center',
                  backgroundColor: 'white',
                }}>
                  <Text style={{
                    fontSize: 16,
                    color: color.TEXT_PRIMARY,
                    fontFamily: Fonts.Man_Bold
                  }}>Free Shipping</Text>
                  <Text style ={{
                    marginTop: 5,
                    fontSize: 12,
                    color: color.TEXT_SECOND,
                    fontFamily: Fonts.Man_Bold
                  }}>Min. {formatPrice(item?.min)}</Text>
                  <Text style ={{
                    marginTop: 5,
                    fontSize: 12,
                    padding: 2,
                    borderColor: color.MAIN,
                    borderWidth: 1,
                    color: color.MAIN,
                    fontFamily: Fonts.Man_Bold
                  }}
                  >{item.sale}% - Max {formatPrice(item?.value)}</Text>
                </View>
              </View>
            )}
          />
        </View>
      </ScrollView>
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
