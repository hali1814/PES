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
  Modal,
  ActivityIndicator,
} from 'react-native';
import React, {useState, useEffect, useContext} from 'react';
import color from '../../styles/colors';
import {icons, images} from '../../assets';
import Icon from 'react-native-vector-icons/Ionicons';
import {SuccessDialog, FailDialog} from '../../components';
import StarRating from 'react-native-star-rating';
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
import colorsPES from '../../constants/colors';
import {Picker} from '@react-native-picker/picker';
import Toast from 'react-native-toast-message';
import { useIsFocused } from '@react-navigation/native';
const {width: screenWidth} = Dimensions.get('window');

const Detail = props => {
  const {route, navigation} = props;
  const {id, type} = route.params;
  const [visible, setVisible] = useState(false);
  const isFocused = useIsFocused()
  const showDialog = () => {
    const tmp = [];

    stock.reduce((initValue, currentValue) => {
      if (!initValue[currentValue.color]) {
        initValue[currentValue.color] = 1;
        tmp.push(currentValue.color);
      }
      return initValue;
    }, {});
    changeSizeFollowColor(tmp[0]);
    setColorsModal(tmp);
    setDetailColor(tmp[0]);
    setVisible(true);
  };

  const dialogSuccess = async () => {
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Bạn đã thêm sản phẩm vào giỏ hàng',
    });
  };

  const changeSizeFollowColor = color => {
    const checkSameSizeAndColor = {};
    stock.map(item => {
      if (checkSameSizeAndColor[item.size]) {
        checkSameSizeAndColor[item.size] = [
          ...checkSameSizeAndColor[item.size],
          item.color,
        ];
      } else {
        checkSameSizeAndColor[item.size] = [item.color];
      }
      return item;
    });
    const tmpSize = [];
    for (let key in checkSameSizeAndColor) {
      if (checkSameSizeAndColor[key].includes(color)) {
        tmpSize.push({size: key, available: true});
      } else {
        tmpSize.push({size: key, available: false});
      }
    }
    setDetailSize(false);
    setSizesModal(tmpSize);
  };

  const getPriceCurrent = (color, size) => {
    stock.forEach(e => {
      if (e.color == color && e.size == size) setDetailPrice(e.price);
    });
  };

  const closeDialog = () => {
    setVisible(false);
  };

  const {
    onGetDetail,
    detail,
    productsByGenre,
    onGetProductsByGenre,
    onAddCart,
    relatedProductLoading,
    detailLoading,
    onCountCart,
    cartQuantity,
  } = useContext(ProductContext);

  const [imageList, setImageList] = useState([]);

  const [currentImage, setCurrentImage] = useState(1);

  const [detaiData, setDetaiData] = useState([]);
  const [colorsModal, setColorsModal] = useState([]);
  const [sizesModal, setSizesModal] = useState([]);
  const [detailColor, setDetailColor] = useState();
  const [detailSize, setDetailSize] = useState(false);
  useEffect(() => {
    
    if (isFocused) getDetailProduct();
  }, [isFocused]);

  const [detailImage, setDetailImage] = useState('');
  const [detailPrice, setDetailPrice] = useState(0);

  const [stock, setStock] = useState([]);
  const [quantity, setQuantity] = useState(1);

  const getDetailProduct = async () => {
    const productModal = await onGetDetail(id);
    setDetaiData(productModal);
    setStock(productModal.stock);
    setDetailImage(productModal.images[0]);
    // setDetailColor(productModal.stock[0].color);
    // setDetailColor1(productModal.stock[1].color);
    // setDetailSize(productModal.stock[0].size);

    // setDetailSize1(productModal.stock[1].size);
  };

  //////////////////////////////////////////

  useEffect(() => {
    onGetProductsByGenre(type);

    return () => {};
  }, []);

  const addCart = async () => {
    try {
      const res = await onAddCart(id, detailSize, detailColor, quantity);

      if (res === false) {
        handleFailed();
      } else {
        dialogSuccess();
        onCountCart();
        closeDialog();

        // setTimeout(() => {
        //   navigation.navigate('MyTab'), 2000;
        // });
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [failedDialogVisible, setFailedDialogVisible] = useState(false);

  const handleSuccess = () => {
    setSuccessDialogVisible(true);
  };
  const handleSuccessDialogClose = () => {
    setSuccessDialogVisible(false);
  };

  const handleFailed = () => {
    setFailedDialogVisible(true);
  };
  const handleFailedDialogClose = () => {
    setFailedDialogVisible(false);
  };

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
    <Image
      source={item || require('../../assets/images/haohoa_scanQR.png')}
      style={{width: screenWidth, height: 375}}
    />
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
    <View style={{}}>
      <ScrollView
        showsVerticalScrollIndicator={false}
        style={{
          height: '90%',
          backgroundColor: color.BACKGROUDITEM,
        }}>
        <StatusBar hidden={true} />
        <View
          style={{
            position: 'relative',
            justifyContent: 'flex-end',
          }}>
          <View>
            {detailLoading ? (
              <ActivityIndicator
                size="large"
                color={colorsPES.borderColorBlue}
              />
            ) : (
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
              </View>
            )}
            <SafeAreaView style={SafeAreaContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',

                  width: '100%',
                  justifyContent: 'space-between',
                  paddingHorizontal: 10,
                  marginTop: 10,
                }}>
                <TouchableOpacity
                  style={{
                    borderRadius: 360,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: 5,
                  }}
                  onPress={() => {
                    navigation.goBack();
                  }}>
                  <Image
                    source={icons.chevronBackWhite_icon}
                    style={{width: 24, height: 24}}
                  />
                </TouchableOpacity>
                <TouchableOpacity
                  style={{
                    borderRadius: 360,
                    backgroundColor: 'rgba(0,0,0,0.4)',
                    padding: 5,
                  }}
                  onPress={() => {
                    navigation.navigate('Cart');
                  }}>
                  <View>
                    <Image
                      source={icons.cardIcon}
                      style={{width: 24, height: 24}}
                    />
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
                          top: -7,
                          right: -10,
                          justifyContent: 'center',
                          alignItems: 'center',
                          borderRadius: 360,
                        }}>
                        <Text
                          style={{
                            color: colorsPES.white,
                            fontSize: 8,
                            fontFamily: Fonts.Man_Bold,
                          }}>
                          {cartQuantity}
                        </Text>
                      </View>
                    )}
                  </View>
                </TouchableOpacity>
              </View>

              {/* <TouchableOpacity style={{paddingHorizontal: 16}}>
              <Image
                source={icons.heartWhite_icon}
                style={{ width: 24, height: 24 }}
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
          {detailLoading ? (
            <ActivityIndicator size="large" color={colorsPES.borderColorBlue} />
          ) : (
            <TouchableOpacity
              onPress={() => {
                navigation.navigate('Shop', {ShopID});
              }}
              style={{paddingHorizontal: 12, marginTop: 8}}>
              <View style={ContainerShop}>
                <View style={headerContainerShop}>
                  <View style={{flexDirection: 'row'}}>
                    <Image
                      source={
                        detail
                          ? {uri: detail && detail.shop.avatar}
                          : require('../../assets/images/logo.png')
                      }
                      style={{width: 32, height: 32, borderRadius: 360}}
                    />
                    <View style={userNameContainer}>
                      <Text style={shopNameText}>
                        {detail && detail.shop.nameShop}
                      </Text>
                      <Text style={phoneText}>
                        {detail && detail.shop.email}
                      </Text>
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
                      txt2Shop={detail && detail.sold}
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
          )}
          {/* AdminShop */}

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
                    style={{
                      flexDirection: 'row',
                      alignItems: 'center',
                    }}></TouchableOpacity>
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

          {/* Mô tả sản phẩm */}
          <View style={{paddingHorizontal: 12, marginTop: 8}}>
            <View style={descriptionBG}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={descriptionText}>{'Mô tả sản phẩm'}</Text>
                </View>
                <Text style={{}}>{detail.description}</Text>
              </View>
            </View>
          </View>

          {/* Mô tả đánh giá */}
          <View style={{paddingHorizontal: 12, marginTop: 8}}>
            <View style={descriptionBG}>
              <View>
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                    alignItems: 'center',
                  }}>
                  <Text style={descriptionText}>{'Đánh giá sản phẩm'}</Text>
                </View>
                {/* //saooo */}
                <View
                  style={{
                    marginTop: 5,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <StarRating
                    disabled={false}
                    fullStarColor={'#FFDF00'}
                    starSize={15}
                    maxStars={5}
                    rating={
                      detail?.rates?.length == 0
                        ? 0
                        : detail?.rates?.reduce(
                            (initValue, currentValue) =>
                              (initValue += currentValue.start),
                            0,
                          ) / detail?.rates?.length
                    }
                    emptyStarColor={'#FFDF00'}
                    containerStyle={{
                      width: 90,
                    }}
                  />
                  <Text
                    style={{
                      marginLeft: 5,
                      marginRight: 5,
                      fontSize: 14,
                      color: '#990000',
                      fontFamily: Fonts.Man_Medium,
                    }}>
                    {detail?.rates?.length == 0
                      ? 0
                      : detail?.rates?.reduce(
                          (initValue, currentValue) =>
                            (initValue += currentValue.start),
                          0,
                        ) / detail?.rates?.length}
                    /5
                  </Text>
                  <Text style={{fontFamily: Fonts.Man_Medium, fontSize: 14}}>
                    ({detail?.rates?.length} đánh giá)
                  </Text>
                </View>
                {/* //sao */}
                <View
                  style={{
                    height: 1,
                    width: '100%',
                    backgroundColor: color.BORDER_BOTTOM,
                    marginVertical: 10,
                  }}
                />

                {/* //list reviews */}
                {detail?.rates?.map((e, index) => (
                  <View
                    key={index}
                    style={{
                      paddingVertical: 5,
                      borderBottomColor: color.BORDER_BOTTOM,
                      borderBottomWidth: 1,
                    }}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                      <Image
                        resizeMode="center"
                        style={{
                          height: 30,
                          width: 30,
                          borderRadius: 360,
                          borderColor: color.BORDER_BOTTOM,
                          borderWidth: 1,
                        }}
                        source={{uri: e?.owner[0].avatar}}
                      />
                      <View style={{paddingHorizontal: 10}}>
                        <Text
                          style={{
                            color: 'black',
                            fontFamily: Fonts.Man_Medium,
                            fontSize: 12,
                          }}>
                          {e._id}
                        </Text>
                      </View>
                    </View>
                    <View style={{paddingHorizontal: 40}}>
                      <StarRating
                        disabled={false}
                        fullStarColor={'#FFDF00'}
                        starSize={12}
                        maxStars={5}
                        rating={e.start}
                        emptyStarColor={'#FFDF00'}
                        containerStyle={{
                          width: 70,
                          marginVertical: 3,
                        }}
                      />
                      <Text
                        style={{
                          fontSize: 12,
                          fontFamily: Fonts.Man_Medium,
                          color: color.TEXT_SECOND,
                        }}>
                        Phân loại: Đen, M
                      </Text>
                      <Text
                        style={{
                          fontSize: 14,
                          fontFamily: Fonts.Man_Medium,
                          color: color.BLACK,
                          marginTop: 20,
                        }}>
                        {e.msg}
                      </Text>
                    </View>
                  </View>
                ))}
              </View>
            </View>
          </View>
        </ScrollView>

        <Modal visible={visible} transparent animationType="slide">
          <View style={styles.modalContainer}>
            <View style={styles.contentContainer}>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-evenly',
                  paddingHorizontal: 20,
                }}>
                <View style={styles.imageContainer}>
                  <Image
                    source={{uri: detailImage}}
                    style={{height: 120, width: 120}}
                  />
                  <View style={{justifyContent: 'flex-end', marginLeft: 10}}>
                    <Text
                      style={{
                        fontSize: 18,
                        fontFamily: Fonts.Work_SemiBold,
                        color: color.MAIN,
                      }}>
                      {formatPrice(detailPrice * (1 - sale / 100))}
                    </Text>
                    <Text
                      style={{
                        fontSize: 15,
                        fontFamily: Fonts.Work_SemiBold,
                        color: color.TEXT_SECOND,
                      }}>
                      Kho : {detaiData.sold}
                    </Text>
                  </View>
                </View>
                <TouchableOpacity style={{}} onPress={closeDialog}>
                  <Icon
                    name="close-outline"
                    size={30}
                    color={color.TEXT_SECOND}
                  />
                </TouchableOpacity>
              </View>

              <View
                style={{
                  width: '100%',
                  borderWidth: 0.4,
                  borderColor: color.BORDER_BOTTOM,
                  marginTop: 20,
                }}></View>
              {/* select color */}
              <View style={styles.colorContainer}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Fonts.Man_Medium,
                    color: color.TEXT_PRIMARY,
                    marginLeft: 5,
                  }}>
                  Màu
                </Text>
                {/* select color */}
                <View style={{flexDirection: 'row'}}>
                  {colorsModal.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        setDetailColor(item);
                        changeSizeFollowColor(item);
                      }}
                      key={index}
                      style={{
                        margin: 5,
                        backgroundColor:
                          detailColor == item ? 'white' : '#F5F5F5',
                        borderColor: color.MAIN,
                        borderWidth: detailColor == item ? 2 : 0,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: Fonts.Man_Medium,
                          color: color.TEXT_PRIMARY,
                        }}>
                        {item.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.4,
                  borderColor: color.BORDER_BOTTOM,
                  marginTop: 20,
                }}></View>
              <View style={styles.colorContainer}>
                <Text
                  style={{
                    fontSize: 18,
                    fontFamily: Fonts.Man_Medium,
                    color: color.TEXT_PRIMARY,
                    marginLeft: 5,
                  }}>
                  SIZE
                </Text>
                {/* select size */}
                <View style={{flexDirection: 'row'}}>
                  {sizesModal.map((item, index) => (
                    <TouchableOpacity
                      onPress={() => {
                        getPriceCurrent(detailColor, item.size);
                        setDetailSize(item.size);
                      }}
                      disabled={!item.available}
                      key={index}
                      style={{
                        margin: 5,
                        backgroundColor:
                          detailSize == item.size
                            ? 'white'
                            : item.available
                            ? '#F5F5F5'
                            : '#FAFAFA',
                        borderColor: color.MAIN,
                        borderWidth: detailSize == item.size ? 2 : 0,
                        paddingHorizontal: 10,
                        paddingVertical: 5,
                        borderRadius: 2,
                      }}>
                      <Text
                        style={{
                          fontSize: 16,
                          fontFamily: Fonts.Man_Medium,
                          color: item.available
                            ? color.TEXT_PRIMARY
                            : '#E0DDDD',
                        }}>
                        {item.size.toUpperCase()}
                      </Text>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.4,
                  borderColor: color.BORDER_BOTTOM,
                  marginTop: 20,
                }}></View>
              <View style={styles.quantityContainer}>
                <Text style={styles.textTitle}>Số lượng</Text>
                <View style={styles.quantity}>
                  <TouchableOpacity
                    onPress={() => {
                      quantity == 1 ? quantity : setQuantity(quantity - 1);
                    }}>
                    <View style={styles.quantitybutton}>
                      <Text style={{fontSize: 18}}>-</Text>
                    </View>
                  </TouchableOpacity>
                  <View style={styles.quantityNumber}>
                    <Text style={{fontSize: 18}}>{quantity}</Text>
                  </View>
                  <TouchableOpacity
                    onPress={() => {
                      setQuantity(quantity + 1);
                    }}>
                    <View style={styles.quantitybutton}>
                      <Text style={{fontSize: 18}}>+</Text>
                    </View>
                  </TouchableOpacity>
                </View>
              </View>
              <View
                style={{
                  width: '100%',
                  borderWidth: 0.4,
                  borderColor: color.BORDER_BOTTOM,
                  marginTop: 20,
                }}></View>
              <TouchableOpacity
                disabled={!detailSize}
                onPress={addCart}
                style={[
                  styles.buyButton,
                  {
                    backgroundColor: !detailSize
                      ? color.BORDER_BOTTOM
                      : color.MAIN,
                  },
                ]}>
                <Text
                  style={{
                    fontSize: 20,
                    fontWeight: '300',
                    color: colorsPES.white,
                  }}>
                  Mua ngay
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </Modal>
        <SuccessDialog
          visible={successDialogVisible}
          onPress={handleSuccessDialogClose}
          message="Đã thêm vào giỏ hàng !"
        />
        <FailDialog
          visible={failedDialogVisible}
          onPress={handleFailedDialogClose}
          message="Thêm giỏ hàng thất bại !"
        />
      </ScrollView>
      {/* PayView */}
      <View
        style={{
          height: 75,
          backgroundColor: color.WHITE,
          position: 'relative',
          paddingVertical: 2,
          bottom: 0,
          borderColor: color.BORDER_BOTTOM,
          borderTopWidth: 1,
        }}>
        <View style={{paddingHorizontal: 5}}>
          <Text>Giao Nhanh Miễn Phí tại TP.HCM Và Hà Nội</Text>

          {/* ButtonBuy */}
          <TouchableOpacity
            disabled={!detail}
            style={{
              backgroundColor: detail ? color.MAIN : color.BORDER_BOTTOM,
              height: 45,
              width: '100%',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={showDialog}>
            <Text style={[styles.textTitle, {color: 'white'}]}>MUA ONLINE</Text>
          </TouchableOpacity>
        </View>
      </View>
      <Toast />
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  buyButton: {
    width: '90%',
    paddingVertical: 10,
    backgroundColor: colorsPES.borderColorBlue,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 20,
  },

  quantityNumber: {
    width: 50,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorsPES.inActive,
  },

  quantitybutton: {
    width: 30,
    height: 30,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colorsPES.inActive,
  },

  quantity: {
    flexDirection: 'row',
    marginRight: 20,
  },

  quantityContainer: {
    marginTop: 20,
    justifyContent: 'space-between',
    width: '100%',
    marginLeft: 20,
    flexDirection: 'row',
    alignItems: 'center',
  },

  sizeContainer: {
    marginTop: 20,
    justifyContent: 'flex-start',
    width: '100%',
    marginLeft: 20,
  },

  contentText: {
    color: colorsPES.black,
    fontSize: 16,
    backgroundColor: '#CFD8DC',
    justifyContent: 'center',
    alignItems: 'center',
    width: 80,
    padding: 10,
  },

  textTitle: {
    fontSize: 18,
    fontWeight: '400',
    color: colorsPES.black,
  },

  colorContainer: {
    marginTop: 20,
    width: '100%',
    paddingHorizontal: 10,
  },

  stockContainer: {
    marginLeft: 20,
    justifyContent: 'flex-end',
  },

  imageContainer: {
    marginTop: 10,
    flexDirection: 'row',
    justifyContent: 'flex-start',
    width: '100%',
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

  imageStyle: {
    width: screenWidth,
    height: 375,
  },

  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-end',
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
