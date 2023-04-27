import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
  StyleSheet,
  TextInput,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import color from '../../styles/colors';
import {PESFlatList} from '../../components/PESFlatList';
import {
  flatlistContainer,
  headerContainer,
  imgVoucher,
  imgVoucher2,
} from './components/styles';

import {icons, images} from '../../assets';
import PESCategories from '../../components/PESCategories';
import Fonts from '../../assets/fonts/fonts';
const width = Dimensions.get('screen').width / 2 - 30;
import React, {useState, useEffect, useContext} from 'react';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import PESListItem from '../../components/PESListItem';
import PESListFlashSale from '../../components/PESListFlashSale';
import {SliderBox} from 'react-native-image-slider-box';
import {CountdownCircleTimer} from 'react-native-countdown-circle-timer';
import colorsPES from '../../constants/colors';

const Product = ({navigation, onPressProducts}) => {
  const {
    onGetAllProducts,
    onGetAllFlashSaleProducts,
    flashSaleProducts,
    flashSaleLoading,
    productLoading,
    onCountCart,
    cartQuantity,
  } = useContext(ProductContext);

  const listTextSearch = [
    'Áo sơ mi',
    'Quần tây',
    'Quần jean',
    'Áo thun ba lỗ',
    'Áo Thun',
    'Áo khác jumber',
  ];
  const [textSearch, setTextSearch] = useState(listTextSearch[0]);
  const notificantion = () => {};

  const effectTextSearch = () => {
    let i = 1;
    const intervalId = setInterval(() => {
      setTextSearch(listTextSearch[i]);
      i++;
      if (i == listTextSearch.length) i = 0;
    }, 3000);
    return intervalId;
  };

  useEffect(() => {
    onGetAllProducts();
    onGetAllFlashSaleProducts();
    const intervalId = effectTextSearch();
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  useEffect(() => {
    onCountCart();
    return () => {};
  }, [cartQuantity]);

  // console.log('cart quantity >>>> ', cartQuantity)

  const images = [
    'https://img.freepik.com/premium-vector/88-shopping-day-sale-banner-background-business-vector-illustration_500223-916.jpg?w=1380',
    'https://img.freepik.com/premium-vector/vector-1111-shopping-day-poster-banner-with-gift-box-shopping-bag_139523-695.jpg?w=1380',
    'https://img.freepik.com/premium-vector/discount-sale-promotion-event-horizontal-banner-template-design_554907-369.jpg?w=1060',
    'https://img.freepik.com/premium-vector/mega-sale-banner-design-template-vector-illustration_500223-985.jpg?w=1380',
    'https://img.freepik.com/premium-psd/big-mega-flash-super-fashion-sale-social-media-banner-post-special-offer-promotion_125322-1070.jpg?size=626&ext=jpg&ga=GA1.2.590258076.1680103108&semt=ais',
    'https://img.freepik.com/premium-vector/digital-sale-banner-sign-template_30227-62.jpg?w=1380',
    'https://img.freepik.com/premium-psd/fashion-flash-sale-online-shopping-promotion-social-media-facebook-cover-post-template-premium-psd_125322-146.jpg?w=1060',
    'https://img.freepik.com/premium-vector/discount-sale-promotion-event-horizontal-banner_554907-345.jpg?w=1380',
    'https://img.freepik.com/premium-photo/halloween-autumn-sale-background-with-smartphone-kiosk-pumpkin-balloon-gift-box-online-shop-concept_257995-745.jpg?w=1060',
    'https://img.freepik.com/premium-vector/special-offer-super-summer-sale-yellow-concept-mobile-phone_199252-12.jpg?w=1380',
  ];

  return (
    <SafeAreaView style={{width: '100%', backgroundColor: '#F0F2F5'}}>
      <StatusBar
        hidden={false}
        backgroundColor="transparent"
        translucent={true}
        barStyle={'light-content'}
      />
      <ScrollView showsVerticalScrollIndicator={false}>
        {/* Search and voucher */}

        {/* Search */}
        {/* Voucher */}
        <View>
          <SliderBox
            images={images}
            sliderBoxHeight={250}
            dotColor={color.MAIN}
            autoplay={true}
            autoplayInterval={3000}
            circleLoop={true}
            inactiveDotColor="#90A4AE"
            dotStyle={{
              marginBottom: 10,
            }}
          />
        </View>
        <View style={styles.SearchStyles}>
          <TouchableOpacity
            onPress={() => navigation.navigate('Search')}
            activeOpacity={1}
            style={styles.customSearch}>
            <Image source={icons.search_icon} style={{width: 20, height: 20}} />
            <Text
              style={{
                fontSize: 15,
                width: '70%',
                fontFamily: Fonts.Work_SemiBold,
                color: color.MAIN,
              }}>
              {textSearch}
            </Text>
            <View style={{width: '19%'}}></View>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('Cart');
            }}>
            <View>
              <Image source={icons.cardIcon} style={{width: 35, height: 35}} />
              {cartQuantity == 0 ? (
                <View></View>
              ) : (
                <View
                  style={{
                    position: 'absolute',
                    width: 20,
                    height: 20,
                    backgroundColor: colorsPES.red,
                    padding: 5,
                    top: 0,
                    right: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                    borderRadius: 5,
                  }}>
                  <Text style={{color: colorsPES.white, fontSize: 7}}>
                    {cartQuantity}
                  </Text>
                </View>
              )}
            </View>
          </TouchableOpacity>
          {/* <TouchableOpacity onPress={notificantion}>
            <Image source={icons.chatIcon} style={{ width: 24, height: 24 }} />

          </TouchableOpacity> */}
        </View>
        {/* FlashSale */}
        <View
          style={{
            backgroundColor: color.WHITE,
          }}>
          {/* TitleFlashSale */}
          <View
            elevation={1}
            style={{
              backgroundColor: 'white',
              borderRadius: 5,
              height: 60,
              width: '96%',
              alignSelf: 'center',
              top: -10,
              paddingHorizontal: 10,
              paddingVertical: 5,
              alignItems: 'center',
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <Image
              style={{height: 28, width: 28, tintColor: color.TEXT_SECOND}}
              source={require('../../assets/images/haohoa_scanQR.png')}
            />
            <View
              style={{
                height: '50%',
                width: 1,
                marginHorizontal: 10,
                backgroundColor: color.BORDER_BOTTOM,
              }}
            />
            <View style={{height: '100%', width: '42%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: color.MAIN,
                    marginRight: 6,
                  }}
                  source={require('../../assets/images/haohoa_wallet.png')}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.Work_SemiBold,
                    color: color.BLACK,
                  }}>
                  PesPay Wallet
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: Fonts.Work_SemiBold,
                  color: color.TEXT_SECOND,
                }}>
                Discount 80.000VND - Active PesPay now
              </Text>
            </View>
            <View
              style={{
                height: '50%',
                width: 1,
                marginHorizontal: 10,
                backgroundColor: color.BORDER_BOTTOM,
              }}
            />
            <View style={{height: '100%', width: '40%'}}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <Image
                  style={{
                    height: 15,
                    width: 15,
                    tintColor: '#fe9923',
                    marginRight: 6,
                  }}
                  source={require('../../assets/images/haohoa_coin.png')}
                />
                <Text
                  style={{
                    fontSize: 14,
                    fontFamily: Fonts.Work_SemiBold,
                    color: color.BLACK,
                  }}>
                  18.500 Coins
                </Text>
              </View>
              <Text
                style={{
                  fontSize: 10,
                  fontFamily: Fonts.Work_SemiBold,
                  color: color.TEXT_SECOND,
                }}>
                My Coin
              </Text>
            </View>
          </View>
          <View
            style={{
              height: 48,

              justifyContent: 'center',
            }}>
            <View
              style={{
                width: '96%',
                height: '100%',
                alignItems: 'center',
                paddingHorizontal: 10,
                flexDirection: 'row',
              }}>
              <Text
                style={{
                  fontSize: 20,
                  fontFamily: Fonts.Work_SemiBold,
                  color: '#FC2947',
                  fontWeight: 'bold',
                }}>
                F☇LASH{' '}
                <Text
                  style={{
                    fontSize: 19,
                    fontFamily: Fonts.Work_SemiBold,
                    color: '#FC2947',
                    fontWeight: '100',
                  }}>
                  SALE
                </Text>
              </Text>
              <View
                style={{
                  marginLeft: 10,
                  height: '100%',
                  alignItems: 'center',
                  flexDirection: 'row',
                }}>
                <CountdownCircleTimer
                  isPlaying={false}
                  duration={18}
                  size={24}
                  strokeWidth={2}
                  colors="#A30000">
                  {({remainingTime}) => (
                    <Text style={{color: 'black', alignSelf: 'center'}}>
                      {remainingTime}
                    </Text>
                  )}
                </CountdownCircleTimer>

                <Text> : </Text>

                <CountdownCircleTimer
                  isPlaying={false}
                  duration={50}
                  size={24}
                  strokeWidth={2}
                  colors="#A30000">
                  {({remainingTime}) => (
                    <Text style={{color: 'black', alignSelf: 'center'}}>
                      {remainingTime}
                    </Text>
                  )}
                </CountdownCircleTimer>

                <Text> : </Text>

                <CountdownCircleTimer
                  isPlaying={true}
                  duration={60}
                  size={24}
                  strokeWidth={2}
                  colors="#A30000"
                  onComplete={() => {
                    // do your stuff here
                    return {shouldRepeat: true, delay: 1}; // repeat animation in 1.5 seconds
                  }}>
                  {({remainingTime}) => (
                    <Text style={{color: 'black', alignSelf: 'center'}}>
                      {remainingTime}
                    </Text>
                  )}
                </CountdownCircleTimer>
              </View>
            </View>
          </View>
          {/* FlatListFlashSale */}
          {flashSaleLoading ? (
            <ActivityIndicator size="large" color={colorsPES.borderColorBlue} />
          ) : (
            <View>
              <FlatList
                pagingEnabled
                data={flashSaleProducts}
                showsHorizontalScrollIndicator={false}
                horizontal
                keyExtractor={item => item._id}
                renderItem={({item}) => (
                  <PESListFlashSale navigation={navigation} item={item} />
                )}
              />
            </View>
          )}
        </View>

        <View
          style={{
            height: 40,
            width: '100%',
            backgroundColor: 'white',
            marginTop: 10,
            justifyContent: 'center',
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              fontSize: 15,
              fontFamily: Fonts.Work_SemiBold,
              color: '#FC2947',
              fontWeight: '100',
            }}>
            GỢI Ý HÔM NAY
          </Text>
        </View>

        {/* Category */}
        <View
          style={{
            width: '100%',
            marginTop: 5,
            height: 85,
            paddingLeft: 5,
          }}>
          <PESCategories />
        </View>

        
        {productLoading ? (
          <ActivityIndicator size="large" color={colorsPES.borderColorBlue} />
        ) : (
          <View style={flatlistContainer}>
            <PESFlatList navigation={navigation} />
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  ContainerSearch: {
    backgroundColor: color.MAINOP,
  },

  SearchStyles: {
    height: 54,
    position: 'absolute',
    width: '100%',
    top: 0,
    marginTop: StatusBar.currentHeight,
    flexDirection: 'row',
    paddingHorizontal: 10,
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customSearch: {
    width: '88%',
    height: 35,
    paddingHorizontal: 10,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderRadius: 2,
    backgroundColor: color.WHITE,
  },

  TextInputSearch: {
    marginLeft: 4,
    fontSize: 15,
    color: color.BLACK,
    width: '90%',
    textAlign: 'justify',
    textAlignVertical: 'center',
  },
});
