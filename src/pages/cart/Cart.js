import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  TouchableOpacity,
  FlatList,
  Image,
  ScrollView,
  ActivityIndicator,
  Alert,
  Modal,
  StatusBar,
} from 'react-native';
import React, { useEffect, useState, useContext } from 'react';
import Icon from 'react-native-vector-icons/Ionicons';
import Fonts from '../../assets/fonts/fonts';
import colorsPES from '../../constants/colors';
import { icons, images } from '../../assets';
import color from '../../styles/colors';
import { formatPrice } from '../../utils/MoneyFormat';
import {
  txtVoucher,
  voucherContainer,
  voucherText,
} from '../shop/components/styles';
import {
  addCartButton,
  buyButton,
  buyContainer,
  buyText,
  payContainer,
  payMoneyText,
  payText,
} from '../detail/components/styles';
import { ProductContext } from '../../api/authservice/ProductAPI/ProductContext';
import { ConfirmDialog, SuccessDialog, FailDialog } from '../../components';
import { addCart } from '../../api/authservice/ProductAPI/ProductService';

const Cart = ({ navigation }) => {
  const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
  const [successDialogVisible, setSuccessDialogVisible] = useState(false);
  const [failedDialogVisible, setFailedDialogVisible] = useState(false);
  const [isSelected, setIsSelected] = useState(false);

  const handlePress = () => {
    setIsSelected(!isSelected);
  };

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
  const handleConfirm = (idProduct, size, color) => {
    setId(idProduct);
    setSize(size);
    setColorProduct(color);
    setConfirmDialogVisible(true);
  };




  const handleConfirmDialogClose = (idProduct, size, color) => {
    setId(idProduct)
    setSize(size)
    setColorProduct(color)
    setConfirmDialogVisible(true);
  };
  const { cart, onGetCart, onDeleteCart, onDeclineCart, onAddCart, cartLoading, onCountCart } = useContext(ProductContext);
  const [cartData, setCartData] = useState([]);
  const [id, setId] = useState('');
  const [size, setSize] = useState('');
  const [colorProduct, setColorProduct] = useState('');
  const [quantity, setQuantity] = useState(0);
  const [stock, setStock] = useState('');

  useEffect(() => {
    onGetCart();
  }, []);



  // const GetAllCart = async () => {
  //     const cartItem = await onGetCart()
  //     setStock(cartItem.stock)
  //     setCartData(cartItem)
  // }

  const deleteCart = async () => {
    try {
      const res = await onDeleteCart(id, size, colorProduct);
      if (res == false) {
        handleFailed();
      } else {
        handleSuccess();
        onGetCart()
        onCountCart()
        setConfirmDialogVisible(false)
        setTimeout(() => handleSuccessDialogClose(), 3000)
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const declineCart = async (id, size, colorProduct, quantity) => {
    try {
      if (quantity == 1) {
        handleConfirmDialogClose(id, size, colorProduct)
        return
      }
      const res = await onDeclineCart(id, size, colorProduct);
      if (!res) {
        handleFailed();
      } else {
        onGetCart()
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  const plusCart = async (id, size, colorProduct) => {
    try {
      const res = await onAddCart(id, size, colorProduct, 1);
      if (!res) {
        handleFailed();
      } else {
        onGetCart()
      }
    } catch (error) {
      console.log('error', error);
      throw error;
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <View
        style={{
          height: StatusBar.currentHeight,
          width: '100%',
          backgroundColor: color.MAIN,
        }}
      />
      <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
        <StatusBar
          hidden={false}
          backgroundColor="transparent"
          translucent={true}
          barStyle={'light-content'}
        />
        <View
          style={{
            height: 50,
            width: '100%',
            backgroundColor: color.MAIN,
            flexDirection: 'row',
            paddingHorizontal: 5,
            alignItems: 'center',
          }}>
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              source={icons.chevronBackWhite_icon}
              style={{ width: 24, height: 24 }}
            />
          </TouchableOpacity>
          <Text
            style={{
              fontSize: 15,
              fontWeight: '600',
              fontFamily: Fonts.Man_SemiBold,
              color: 'white',
              marginLeft: 10,
            }}>
            Giỏ hàng
          </Text>
        </View>
        {
          cartLoading
            ? (<ActivityIndicator size='large' color={colorsPES.borderColorBlue} />)
            : (
              <View style={{ width: '100%', height: '100%' }}>
                <FlatList
                  scrollEnabled={false}
                  data={cart}
                  showsVerticalScrollIndicator={false}
                  keyExtractor={(item, index) => index.toString()}
                  renderItem={({ item }) => (
                    <View
                      style={{
                        backgroundColor: 'white',
                        marginVertical: 10,
                        width: '100%',
                        height: 140,
                      }}>
                      <View
                        style={{
                          flexDirection: 'row',
                          justifyContent: 'space-between',
                          paddingTop: 10,
                          paddingHorizontal: 10,
                        }}>
                        <Image
                          style={{ height: 70, width: 80 }}
                          source={
                            !item
                              ? require('../../assets/images/haohoa_scanQR.png')
                              : { uri: item.images[0] }
                          }
                        />
                        <View style={{ width: '70%' }}>
                          <Text
                            style={{
                              fontSize: 17,
                              fontFamily: Fonts.Work_Bold,
                              color: color.MAIN,
                              width: '70%',
                            }}>
                            {item?.name.toString().toUpperCase() || ''}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: Fonts.Work_Bold,
                              color: color.TEXT_SECOND,
                              width: '70%',
                            }}>
                            SIZE: {item?.size.toString().toUpperCase()}
                          </Text>
                          <Text
                            style={{
                              fontSize: 12,
                              fontFamily: Fonts.Work_Bold,
                              color: color.TEXT_SECOND,
                              width: '70%',
                            }}>
                            COLOR: {item?.color.toString().toUpperCase()}
                          </Text>
                        </View>

                        <TouchableOpacity onPress={() => handleConfirmDialogClose(item.idProduct, item.size, item.color)}>
                          <Image
                            style={{
                              height: 15,
                              width: 15,
                              tintColor: color.TEXT_SECOND,
                            }}
                            source={require('../../assets/images/haohoa_cancel.png')}
                          />
                        </TouchableOpacity>
                      </View>
                      <View
                        style={{
                          flexDirection: 'row',
                          marginTop: 20,
                          paddingHorizontal: 10,
                          marginLeft: 10,
                        }}>
                        <View style={{ width: 80 }}></View>
                        <View style={styles.quantity}>
                          <TouchableOpacity
                            onPress={() => {
                              declineCart(item?.idProduct, item?.size, item?.color, item?.quantity)
                            }}>
                            <View style={styles.quantitybutton}>
                              <Text style={{ fontSize: 18 }}>-</Text>
                            </View>
                          </TouchableOpacity>
                          <View style={styles.quantityNumber}>
                            <Text style={{ fontSize: 18 }}>{item?.quantity}</Text>
                          </View>
                          <TouchableOpacity
                            onPress={() => {
                              plusCart(item?.idProduct, item?.size, item?.color)
                            }}>
                            <View style={styles.quantitybutton}>
                              <Text style={{ fontSize: 18 }}>+</Text>
                            </View>
                          </TouchableOpacity>
                        </View>
                        <View
                          style={{
                            flexDirection: 'row',
                            width: 150,
                            justifyContent: 'flex-end',
                            alignItems: 'flex-end',
                          }}>
                          <Text>X </Text>
                          <Text>
                            {formatPrice(
                              item?.stock.price *
                              (1 - item?.sale / 100) *
                              item?.quantity,
                            )}
                          </Text>
                        </View>
                      </View>
                    </View>
                  )}
                />
              </View>
            )
        }
      </ScrollView>
      <View
        style={{
          justifyContent: 'flex-start',
          paddingVertical: 10,
          marginTop: 20,
        }}>
        {/* ButtonBuy */}
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
                {formatPrice(
                  cart.reduce((init, item) => {
                    init +=
                      item?.stock.price *
                      (1 - item?.sale / 100) *
                      item?.quantity;
                    return init;
                  }, 0),
                )}
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
                {formatPrice(30000)}
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
                {formatPrice(
                  cart.reduce((init, item) => {
                    init +=
                      item?.stock.price *
                      (1 - item?.sale / 100) *
                      item?.quantity;
                    return init;
                  }, 0) + 30000,
                )}
              </Text>
            </View>
          </View>
        </View>
        <View style={{ paddingHorizontal: 5 }}>
          {/* ButtonBuy */}
          <TouchableOpacity
            style={{
              backgroundColor: color.MAIN,
              height: 45,
              width: '100%',
              borderRadius: 5,
              justifyContent: 'center',
              alignItems: 'center',
            }}
            onPress={() => {
              if (cart.length == 0) Alert.alert('list cart rongggg')
              else {
                navigation.navigate('OrderConfirmation')
              }
            }}>
            <Text style={[styles.textTitle, { color: 'white' }]}>
              TIẾN THÀNH ĐẶT HÀNG
            </Text>
          </TouchableOpacity>
        </View>

      </View>
      <SuccessDialog
        visible={successDialogVisible}
        onPress={handleSuccessDialogClose}
        message="Xoá sản phẩm thành công !"
      />
      <FailDialog
        visible={failedDialogVisible}
        onPress={handleFailedDialogClose}
        message="Xoá sản phẩm thất bại !"
      />
      <ConfirmDialog
        visible={confirmDialogVisible}
        onCancelPress={() => setConfirmDialogVisible(false)}
        onPress={deleteCart}
        message="Bạn chắc chắn muốn xóa khỏi giỏ hàng ?"
        confirmMessage="Xóa"
      />
    </SafeAreaView>
  );
};

export default Cart;

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.5)',
    paddingHorizontal: 10,
  },

  billContainer: {
    paddingHorizontal: 12,
    paddingVertical: 16,
    backgroundColor: color.WHITE,
    marginTop: 8,
    borderRadius: 4,
  },

  txtVoucher: {
    fontSize: 13,
    color: color.MAIN,
    fontFamily: Fonts.Work_SemiBold,
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
    height: 70,
  },

  quantityContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-end',
    width: 250,
  },

  productContent: {
    marginStart: 10,
  },

  productContainer: {
    marginTop: 16,
    flexDirection: 'row',
    padding: 8,
  },

  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  cartContainer: {
    width: '100%',
    height: '60%',
    backgroundColor: colorsPES.white,
    marginTop: 10,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },

  container: {
    flex: 1,
    paddingHorizontal: 12,
    paddingTop: 10,
  },
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
    borderColor: color.TEXT_SECOND,
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
