import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
  FlatList,
  StatusBar,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import color from '../../styles/colors';
import {icons, images} from '../../assets';
import {
  addCartButton,
  buyButton,
  buyContainer,
  buyText,
  ContainerShop,
  counterBG,
  counterContainer,
  counterText,
  descriptionBG,
  descriptionContainer,
  descriptionText,
  detailText,
  headerContainerShop,
  labelBG,
  labelContainer,
  labelText,
  payContainer,
  payMoneyText,
  payText,
  phoneText,
  productsBG,
  productsContainer,
  SafeAreaContainer,
  shopNameText,
  showReaching,
  txtVoucher,
  userNameContainer,
  voucherContainer,
  voucherText,
} from './components/styles';
import {textsPES} from '../../constants/string';
import PESShop from '../../components/PESShop';
import PESProductDescription from '../../components/PESProductDescription';
import PESRelatedProducts from '../../components/PESRelatedProducts';
import Fonts from '../../assets/fonts/fonts';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import {formatPrice} from '../../utils/MoneyFormat';

const {width: screenWidth} = Dimensions.get('window');

const Detail = props => {
  const {route, navigation} = props;

  const {id} = route.params;

  const {onGetDetail, detail} = useContext(ProductContext);

  const [imageList, setImageList] = useState([]);

  const [currentImage, setCurrentImage] = useState(1);

  useEffect(() => {
    onGetDetail(id);
  }, [id]);

  useEffect(() => {
    if (detail.images) {
      const images = detail.images.map(image => ({uri: image}));
      setImageList(images);
    }
  }, [detail]);

  //Bộ đếm số ảnh
  //Thay vì sử dụng Math.floor, chúng tôi đã sử dụng Math.ceil để đảm bảo rằng index được bắt đầu từ 1.
  const handleScroll = e => {
    const {nativeEvent} = e || {};
    if (!nativeEvent || !nativeEvent.contentOffset) {
      return;
    }
    const currentOffset = nativeEvent.contentOffset.x;
    const imageIndex = Math.ceil(
      (currentOffset + screenWidth / 2) / screenWidth,
    );
    setCurrentImage(imageIndex);
  };

  const renderItem = ({item, index}) => (
    <Image source={item} style={{width: screenWidth, height: 375}} />
  );

  const ShopID = detail.shop?.idShop || '';

  const sale = detail && detail.sale;
  let price = 0;
  let price1 = 0;

  if (detail) {
    detail.stock.sort((a, b) => a.price - b.price);
    // formatPrice
    if (detail.stock.length == 1) {
      price = detail && detail.stock[0].price;
    } else {
      price = detail && detail.stock[0].price;
      price1 = detail && detail.stock[detail.stock.length - 1].price;
    }
  }

  return (
    <ScrollView
      showsVerticalScrollIndicator={false}
      style={{
        height: '100%',
        backgroundColor: color.BACKGROUDITEM,
      }}>
      <StatusBar hidden={true} />
      <View
        style={{
          position: 'relative',
          justifyContent: 'flex-end',
        }}>
        <View>
          {imageList.length > 0 && (
            <FlatList
              horizontal
              showsHorizontalScrollIndicator={false}
              pagingEnabled
              onScroll={handleScroll}
              data={imageList}
              keyExtractor={(item, index) => index.toString()}
              renderItem={renderItem}
              contentContainerStyle={{
                width: screenWidth * imageList.length,
                height: 375,
              }}
            />
          )}
          <SafeAreaView style={SafeAreaContainer}>
            <View
              style={{
                marginTop: 8,
                marginLeft: 16,
                paddingHorizontal: 2,
                paddingVertical: 2,
                borderRadius: 360,
                backgroundColor: 'rgba(0,0,0,0.4)',
              }}>
              <TouchableOpacity
                onPress={() => {
                  navigation.goBack();
                }}>
                <Image
                  source={icons.chevronBackWhite_icon}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </View>

            {/* <TouchableOpacity style={{paddingHorizontal: 16}}>
              <Image
                source={icons.heartWhite_icon}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity> */}
          </SafeAreaView>
        </View>
        <View style={counterContainer}>
          <View style={counterBG}>
            <Text style={counterText}>
              {currentImage}/{imageList.length}
            </Text>
          </View>
        </View>
      </View>
      {/* Title và Price */}
      <View style={productsContainer}>
        <View style={productsBG}>
          <View style={{position: 'absolute', right: 0}}>
            <View style={styles.customSale}>
              <Image source={icons.tagSale_icon} style={styles.imgSale} />
              <Text style={styles.txtSale}>{sale ? `${sale}` : ''}%</Text>
            </View>
          </View>
          <View style={{width: '100%'}}>
            <Text
              style={{
                fontFamily: Fonts.Work_SemiBold,
                fontSize: 18,
                textTransform: 'capitalize',
                color: color.TEXT_PRIMARY,
              }}>
              {detail.name}
            </Text>
          </View>
          <View style={labelContainer}>
            <Text
              style={{
                fontFamily: Fonts.Work_SemiBold,
                fontSize: 20,
                color: color.MAIN,
              }}>
              {price && formatPrice(price * (1 - sale / 100))}
              {price1
                ? ` - ${price1 && formatPrice(price1 * (1 - sale / 100))}`
                : ''}
            </Text>
          </View>
          <View style={{flexDirection: 'row'}}>
            <Text
              style={{
                fontFamily: Fonts.Work_SemiBold,
                fontSize: 14,
                color: color.TEXT_SECOND,
                textDecorationLine: 'line-through',
              }}>
              {price && formatPrice(price)}
              {price1 ? ` - ${price1 && formatPrice(price1)}` : ''}
            </Text>
          </View>
        </View>
      </View>
      {/* Voucher */}
      <View style={{paddingHorizontal: 12, marginTop: 90}}>
        <View style={voucherContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.voucher_icon}
              style={{width: 32, height: 32}}
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
          <TouchableOpacity
            onPress={() => {}}
            style={{flexDirection: 'row', alignItems: 'center'}}>
            <Text style={txtVoucher}>{textsPES.txtDetail}</Text>
            <Image
              source={icons.chevronRight_icon}
              style={{width: 16, height: 16, marginLeft: 2}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView pagingEnabled>
        {/* AdminShop */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Shop', {ShopID});
          }}
          style={{paddingHorizontal: 12, marginTop: 8}}>
          <View style={ContainerShop}>
            <View style={headerContainerShop}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={{uri: detail && detail.shop.avatar}}
                  style={{width: 32, height: 32, borderRadius: 360}}
                />
                <View style={userNameContainer}>
                  <Text style={shopNameText}>
                    {detail && detail.shop.nameShop}
                  </Text>
                  <Text style={phoneText}>{detail && detail.email}</Text>
                </View>
              </View>
              <View>
                <Image
                  source={icons.crown_icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </View>
            </View>

            <View style={{paddingHorizontal: 12}}>
              <View style={showReaching}>
                <PESShop
                  imgUri={icons.shopBag_icon}
                  txtShop={'Đã bán:'}
                  txt2Shop={'200'}
                />
                <PESShop
                  imgUri={icons.storeHeart_icon}
                  txtShop={'Thích:'}
                  txt2Shop={'200'}
                />
                <PESShop
                  imgUri={icons.star_icon}
                  txtShop={'Đánh giá:'}
                  txt2Shop={'4.5'}
                />
              </View>
            </View>
          </View>
        </TouchableOpacity>
        {/* Mô tả chi tiết */}
        <View style={descriptionContainer}>
          <View style={descriptionBG}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text style={descriptionText}>{'Mô tả chi tiết'}</Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text style={detailText}>{'Chi tiết'}</Text>
                  <Image
                    source={icons.chevronRight_icon}
                    style={{width: 16, height: 16}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 16,
                  height: 100,
                }}>
                <View>
                  <PESProductDescription
                    icon={icons.color_icon}
                    text1={'Màu'}
                    text2={detail && detail.stock[0].color}
                  />
                  <View style={{paddingTop: 8}}>
                    <PESProductDescription
                      icon={icons.size_icon}
                      text1={'Size'}
                      text2={detail && detail.stock[0].size}
                    />
                  </View>
                  <View style={{paddingTop: 8}}>
                    <PESProductDescription
                      icon={icons.location_icon}
                      text1={'Khu vực'}
                      text2={'Hồ Chí Minh, Hà Nội'}
                    />
                  </View>
                  <View style={{paddingTop: 8}}>
                    <PESProductDescription
                      icon={icons.local_icon}
                      text1={'Thương hiệu'}
                      text2={'Sneaker MLB'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        {/* Sản phẩm liên quan */}
        <View
          style={{
            marginTop: 8,
            height: '100%',
            marginHorizontal: 12,
          }}>
          <View>
            <View>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
            <View style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
            <View style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
            <TouchableOpacity style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </TouchableOpacity>
            <View style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      {/* PayView */}
      <View style={{height: 75, backgroundColor: color.WHITE}}>
        <View style={payContainer}>
          {/* <View style={{flexDirection: 'column'}}>
            <View style={{height: 20, justifyContent: 'center'}}>
              <Text style={payText}>{'Thanh Toán'}</Text>
            </View>
            <View style={{height: 20, justifyContent: 'center'}}>
              <Text style={payMoneyText}>{formatPrice(price)}</Text>
            </View>
          </View> */}
          {/* AddCart */}
          <TouchableOpacity>
            <View style={addCartButton}>
              <Image
                source={icons.cartAdd_icon}
                style={{width: 24, height: 24}}
              />
            </View>
          </TouchableOpacity>
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
    </ScrollView>
  );
};

export default Detail;

const styles = StyleSheet.create({
  imageStyle: {
    width: screenWidth,
    height: 375,
  },
  customSale: {
    flexDirection: 'row',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderTopRightRadius: 4,
    borderBottomLeftRadius: 4,
    backgroundColor: color.MAIN,
    alignItems: 'center',
  },
  imgSale: {
    width: 16,
    height: 16,
    tintColor: color.WHITE,
  },
  txtSale: {
    color: color.WHITE,
    fontFamily: Fonts.Work_Medium,
    fontSize: 14,
    marginLeft: 4,
  },
});
