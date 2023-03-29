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
  Modal
} from 'react-native';
import React, { useState, useEffect, useContext } from 'react';
import color from '../../styles/colors';
import { icons, images } from '../../assets';
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
import { textsPES } from '../../constants/string';
import PESShop from '../../components/PESShop';
import PESProductDescription from '../../components/PESProductDescription';
import PESRelatedProducts from '../../components/PESRelatedProducts';
import Fonts from '../../assets/fonts/fonts';
import { ProductContext } from '../../api/authservice/ProductAPI/ProductContext';
import { formatPrice } from '../../utils/MoneyFormat';
import colorsPES from '../../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons'


const { width: screenWidth } = Dimensions.get('window');

const ShopDetail = props => {
  const { route, navigation } = props;
  const { ID, type } = route.params;

  const { onGetDetail, detail, productsByGenre, onGetProductsByGenre } = useContext(ProductContext);
  const [imageList, setImageList] = useState([]);
  const [currentImage, setCurrentImage] = useState(1);
  const [visible, setVisible] = useState(false)
  const [detaiData, setDetaiData] = useState([])

  const showDialog = () => {
    setVisible(true)
  }
  const closeDialog = () => {
    setVisible(false)
  }

  useEffect(() => {
    getDetailProduct()
  }, []);

  const [detailImage, setDetailImage] = useState('')
  const [detailPrice, setDetailPrice] = useState('')
  const [detailPrice1, setDetailPrice1] = useState('')
  const [detailColor, setDetailColor] = useState('')
  const [detailColor1, setDetailColor1] = useState('')
  const [detailSize, setDetailSize] = useState('')
  const [detailSize1, setDetailSize1] = useState('')

  const getDetailProduct = async () => {
    const productModal = await onGetDetail(ID);
    setDetaiData(productModal)
    setDetailImage(productModal.images[0])
    setDetailPrice(productModal.stock[0].price)
    setDetailPrice1(productModal.stock[1].price)
    setDetailColor(productModal.stock[0].color)
    setDetailColor1(productModal.stock[1].color)
    setDetailSize(productModal.stock[0].size)
    setDetailSize1(productModal.stock[1].size)
  }

  console.log('productModal', detaiData)

  useEffect(() => {
    onGetProductsByGenre(type)
    console.log('type san pham ===>', type)
    return () => { }
  }, [])


  useEffect(() => {
    if (detail.images) {
      const images = detail.images.map(image => ({ uri: image }));
      setImageList(images);
    }
  }, []);

  //Bộ đếm số ảnh
  //Thay vì sử dụng Math.floor, chúng tôi đã sử dụng Math.ceil để đảm bảo rằng index được bắt đầu từ 1.
  const handleScroll = e => {
    const { nativeEvent } = e || {};
    if (!nativeEvent || !nativeEvent.contentOffset) {
      return;
    }
    const currentOffset = nativeEvent.contentOffset.x;
    const imageIndex = Math.ceil(
      (currentOffset + screenWidth / 2) / screenWidth,
    );
    setCurrentImage(imageIndex);
  };

  const renderItem = ({ item, index }) => (
    <Image source={item} style={{ width: screenWidth, height: 375 }} />
  );

  const ShopID = detail.shop?.idShop || '';

  const BackShop = () => {
    navigation.goBack();
  };

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
            <TouchableOpacity
              onPress={BackShop}
              style={{ paddingHorizontal: 16 }}>
              <Image
                source={icons.chevronBackWhite_icon}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{ paddingHorizontal: 16 }}>
              <Image
                source={icons.heartWhite_icon}
                style={{ width: 24, height: 24 }}
              />
            </TouchableOpacity>
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
<<<<<<< HEAD
          <View style={{ width: '100%' }}>
=======
          <View style={{position: 'absolute', right: 0}}>
            <View style={styles.customSale}>
              <Image source={icons.tagSale_icon} style={styles.imgSale} />
              <Text style={styles.txtSale}>{sale ? `${sale}` : ''}%</Text>
            </View>
          </View>
          <View style={{width: '100%'}}>
>>>>>>> huyDuc
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
      <View style={{ paddingHorizontal: 12, marginTop: 90 }}>
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
<<<<<<< HEAD
          <TouchableOpacity onPress={() => { }} style={{ flexDirection: 'row' }}>
=======
          <TouchableOpacity
            onPress={() => {}}
            style={{flexDirection: 'row', alignItems: 'center'}}>
>>>>>>> huyDuc
            <Text style={txtVoucher}>{textsPES.txtDetail}</Text>
            <Image
              source={icons.chevronRight_icon}
              style={{ width: 16, height: 16, marginLeft: 2 }}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView pagingEnabled>
        {/* AdminShop */}
        <TouchableOpacity
          onPress={() => {
            navigation.navigate('Shop', { ShopID });
          }}
          style={{ paddingHorizontal: 12, marginTop: 8 }}>
          <View style={ContainerShop}>
            <View style={headerContainerShop}>
              <TouchableOpacity style={{ flexDirection: 'row' }}>
                <Image
                  source={{ uri: detail && detail.shop.avatar }}
                  style={{ width: 32, height: 32, borderRadius: 360 }}
                />
                <View style={userNameContainer}>
                  <Text style={shopNameText}>
                    {detail && detail.shop.nameShop}
                  </Text>
                  <Text style={phoneText}>{detail && detail.owner}</Text>
                </View>
              </TouchableOpacity>
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

            <View style={{ paddingHorizontal: 12 }}>
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
                  style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <Text style={detailText}>{'Chi tiết'}</Text>
                  <Image
                    source={icons.chevronRight_icon}
                    style={{ width: 16, height: 16 }}
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
                  <View style={{ paddingTop: 8 }}>
                    <PESProductDescription
                      icon={icons.size_icon}
                      text1={'Size'}
                      text2={detail && detail.stock[0].size}
                    />
                  </View>
                  <View style={{ paddingTop: 8 }}>
                    <PESProductDescription
                      icon={icons.location_icon}
                      text1={'Khu vực'}
                      text2={'Hồ Chí Minh, Hà Nội'}
                    />
                  </View>
                  <View style={{ paddingTop: 8 }}>
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
        {/* <View
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
            <View style={{ marginTop: 8 }}>
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
            <View style={{ marginTop: 8 }}>
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
            <TouchableOpacity style={{ marginTop: 8 }}>
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
            <View style={{ marginTop: 8 }}>
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
        </View> */}
        <FlatList
          data={productsByGenre}
          keyExtractor={(item) => item._id}
          renderItem={({ item }) => (
            <TouchableOpacity
              onPress={() => { navigation.navigate('ShopDetail', { ID: item._id, type: item.type }) }}
              style={{
                height: 104,
                width: '100%',
                backgroundColor: color.WHITE,
                borderRadius: 4,
                padding: 12,
                flexDirection: 'row',
              }}>
              <View>
                <Image source={{ uri: item.images[0] }} style={{ width: 80, height: 80 }} />
              </View>
              <View
                style={{
                  width: '73%',
                  marginLeft: 12,
                  flexDirection: 'column',
                  paddingRight: 20,
                  justifyContent: 'space-between',
                }}>
                <Text
                  style={{
                    fontFamily: Fonts.Work_SemiBold,
                    fontSize: 14,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  {item.name}
                </Text>
                <Text
                  numberOfLines={2}
                  style={{
                    fontFamily: Fonts.Work_Regular,
                    color: color.TEXT_SECOND,
                    fontSize: 14,
                    alignItems: 'center',
                  }}>
                  {item.description}
                </Text>
                <Text
                  style={{
                    fontFamily: Fonts.Work_SemiBold,
                    fontSize: 15,
                    alignItems: 'center',
                  }}>
                  {item.stock[0].price}đ
                </Text>
              </View>
            </TouchableOpacity>
          )}
        />
      </ScrollView>
      {/* PayView */}
      <View style={{ height: 75, backgroundColor: color.WHITE }}>
        <View style={payContainer}>
          <View style={{ flexDirection: 'column' }}>
            <View style={{ height: 20, justifyContent: 'center' }}>
              <Text style={payText}>{'Thanh Toán'}</Text>
            </View>
            <View style={{ height: 20, justifyContent: 'center' }}>
              <Text style={payMoneyText}>{formatPrice(price)}</Text>
            </View>
          </View>
          {/* AddCart */}
          <TouchableOpacity>
            <View style={addCartButton}>
              <Image
                source={icons.cartAdd_icon}
                style={{ width: 24, height: 24 }}
              />
            </View>
          </TouchableOpacity>
          {/* ButtonBuy */}
          <TouchableOpacity
            onPress={showDialog}
          >
            <View style={buyButton}>
              <View style={buyContainer}>
                <Text style={buyText}>{'Mua ngay'}</Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
      <Modal
        visible={visible}
        transparent
        animationType='slide'
      >
        <View style={styles.modalContainer}>
          <View style={styles.contentContainer}>
            <TouchableOpacity
              style={{ position: 'absolute', top: 10, right: 10 }}
              onPress={closeDialog}
            >
              <Icon
                name='close-outline'
                size={30}
                color={colorsPES.black}
              />
            </TouchableOpacity>
            <View style={styles.imageContainer}>
              <Image
                source={{ uri: detailImage }}
                style={{ height: 150, width: 150 }}
              />
              <View style={styles.stockContainer}>
                <Text style={{ fontSize: 22, color: colorsPES.red }} >{formatPrice(detailPrice)}</Text>
                <Text style={{ fontSize: 18, color: colorsPES.inActive }}>Kho : 4663</Text>
              </View>
            </View>
            <View style={{ width: '100%', borderWidth: 0.4, borderColor: colorsPES.inActive, marginTop: 20 }}></View>
            <View style={styles.colorContainer}>
              <Text style={styles.textTitle}>Màu sắc</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity>
                  <Text style={styles.contentText}>{detailColor}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={[styles.contentText, { marginLeft: 20 }]}>{detailColor1}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: '100%', borderWidth: 0.4, borderColor: colorsPES.inActive, marginTop: 20 }}></View>
            <View style={styles.sizeContainer}>
              <Text style={styles.textTitle}>Kích cỡ</Text>
              <View style={{ flexDirection: 'row', marginTop: 10 }}>
                <TouchableOpacity style={{ justifyContent: 'center', alignItems: 'center' }}>
                  <Text style={styles.contentText}>{detailSize}</Text>
                </TouchableOpacity>
                <TouchableOpacity>
                  <Text style={[styles.contentText, { marginLeft: 20 }]}>{detailSize1}</Text>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: '100%', borderWidth: 0.4, borderColor: colorsPES.inActive, marginTop: 20 }}></View>
            <View style={styles.quantityContainer}>
              <Text style={styles.textTitle}>Số lượng</Text>
              <View style={styles.quantity}>
                <TouchableOpacity>
                  <View style={styles.quantitybutton}>
                    <Text style={{ fontSize: 18 }}>-</Text>
                  </View>
                </TouchableOpacity>
                <View style={styles.quantityNumber}>
                  <Text style={{ fontSize: 18 }}>1</Text>
                </View>
                <TouchableOpacity>
                  <View style={styles.quantitybutton}>
                    <Text style={{ fontSize: 18 }}>+</Text>
                  </View>
                </TouchableOpacity>
              </View>
            </View>
            <View style={{ width: '100%', borderWidth: 0.4, borderColor: colorsPES.inActive, marginTop: 20 }}></View>
            <TouchableOpacity
              onPress={showDialog}
              style={styles.buyButton}
            >
              <Text style={{ fontSize: 20, fontWeight: '300', color: colorsPES.white }}>Mua ngay</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
    </ScrollView>
  );
};

export default ShopDetail;

const styles = StyleSheet.create({
  imageStyle: {
    width: screenWidth,
    height: 375,
  },
<<<<<<< HEAD

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end'
  },

  quantitybutton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorsPES.inActive
  },

  quantityNumber: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorsPES.inActive
  },

  sizeContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 20
  },

  quantity: {
    flexDirection: 'row',
    marginRight: 20
  },

  contentContainer: {
    backgroundColor: colorsPES.white,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
  },

  imageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 20,
  },

  stockContainer: {
    marginLeft: 20,
    justifyContent: 'flex-end'
  },

  colorContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 20
  },

  contentText: {
    color: colorsPES.black,
    fontSize: 16,
    backgroundColor: '#CFD8DC',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    padding: 10
  },

  quantityContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center'
  },

  textTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colorsPES.black
=======
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
>>>>>>> huyDuc
  },
});
