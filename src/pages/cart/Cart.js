import {
    StyleSheet, Text, View, SafeAreaView,
    TouchableOpacity, FlatList, Image, ScrollView,
    ActivityIndicator, Alert, Modal
} from 'react-native'
import React, { useEffect, useState, useContext } from 'react'
import Icon from 'react-native-vector-icons/Ionicons'
import Fonts from '../../assets/fonts/fonts'
import colorsPES from '../../constants/colors'
import { icons, images } from '../../assets'
import color from '../../styles/colors'
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
import { ProductContext } from '../../api/authservice/ProductAPI/ProductContext'
import { formatPrice } from '../../utils/MoneyFormat';
import { ConfirmDialog, SuccessDialog, FailDialog } from '../../components'

const Cart = ({ navigation }) => {

    const DATA = [
        {
            id: 1,
            name: 'Giày MLB Bigball Chunky Mesh LikeNew Màu Trắng x1',
            description: 'Giày Authentic',
            price: 1999000,
            image: images.detail_image,
            quantity: 1

        },
        {
            id: 2,
            name: 'Giày MLB Bigball Chunky Mesh LikeNew Màu Trắng x1',
            description: 'Giày Authentic',
            price: 2000000,
            image: images.detail_image,
            quantity: 1

        },
        {
            id: 3,
            name: 'Giày MLB Bigball Chunky Mesh LikeNew Màu Trắng x1',
            description: 'Giày Authentic',
            price: 1999000,
            image: images.detail_image,
            quantity: 1

        },
        {
            id: 4,
            name: 'Giày MLB Bigball Chunky Mesh LikeNew Màu Trắng x1',
            description: 'Giày Authentic',
            price: 1999000,
            image: images.detail_image,
            quantity: 1

        },
    ]
    const [confirmDialogVisible, setConfirmDialogVisible] = useState(false);
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
    const handleConfirm = (idProduct, size, color) => {
        setId(idProduct)
        setSize(size)
        setColorProduct(color)
        setConfirmDialogVisible(true);
    };
    const handleConfirmDialogClose = () => {
        setConfirmDialogVisible(false);
    };
    const { cart, onGetCart, onDeleteCart } = useContext(ProductContext)
    const [cartData, setCartData] = useState([])
    const [id, setId] = useState('')
    const [size, setSize] = useState('')
    const [colorProduct, setColorProduct] = useState('')


    useEffect(() => {
        GetAllCart()
    }, [])

    const GetAllCart = async () => {
        const cartItem = await onGetCart()
        setCartData(cartItem)
    }

    const deleteCart = async () => {
        try {
            const res = await onDeleteCart(id, size, colorProduct)
            if (res == false) {
                handleFailed()
            } else {
                handleSuccess()
                setTimeout(() => { navigation.navigate('Cart') }, 2000)
            }
        } catch (error) {
            console.log('error', error)
            throw error
        }
    }




    return (
        <SafeAreaView style={styles.container}>
            <ScrollView
                nestedScrollEnabled
                showsVerticalScrollIndicator={false}
            >
                {/* <View style={{ justifyContent: 'center', alignItems: 'center' }}>
                    <Text style={{ fontSize: 18, fontWeight: '700', color: colorsPES.black }}>Giỏ hàng</Text>
                </View> */}
                <View style={styles.cartContainer}>
                    <View style={styles.titleContainer}>
                        <Text
                            style={{
                                fontSize: 18, fontWeight: '600',
                                fontFamily: Fonts.Man_SemiBold, color: colorsPES.borderColorBlue
                            }}>
                            Giỏ hàng
                        </Text>
                        <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                            <Text
                                style={{
                                    marginEnd: 12, fontSize: 12, fontWeight: '400',
                                    color: colorsPES.black, fontFamily: Fonts.Work_Light
                                }}>
                                Tất cả
                            </Text>
                            <TouchableOpacity>
                                <Icon
                                    name='ellipse-outline'
                                    size={25}
                                    color={colorsPES.primary}
                                />
                            </TouchableOpacity>
                        </View>
                    </View>
                    <FlatList
                        data={cartData}
                        showsVerticalScrollIndicator={false}
                        keyExtractor={(item) => item.idProduct}
                        renderItem={({ item }) => (
                            <View style={styles.productContainer}>
                                <TouchableOpacity>
                                    <Icon
                                        name='ellipse-outline'
                                        size={25}
                                        color={colorsPES.primary}
                                    />
                                </TouchableOpacity>
                                <Image style={{ width: 44, height: 44, marginStart: 8 }} source={{ uri: item.images[0] }} resizeMode='cover' />
                                <View style={styles.productContent}>
                                    <View style={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                                        <Text style={{
                                            color: colorsPES.black,
                                            fontSize: 16, fontWeight: '600',
                                            marginRight: 30, width: '60%',
                                            textTransform: 'capitalize'
                                        }}>
                                            {item.name}
                                        </Text>
                                        <TouchableOpacity
                                            onPress={() => { handleConfirm(item.idProduct, item.size, item.color) }}
                                        >
                                            <Icon
                                                name='trash-outline'
                                                size={25}
                                                color={colorsPES.red}
                                            />
                                        </TouchableOpacity>
                                    </View>

                                    <TouchableOpacity
                                        onPress={() => { navigation.navigate('Detail', { id: item.idProduct }) }}
                                        style={{
                                            flexDirection: 'row', alignItems: 'center',
                                            width: '50%',
                                            marginTop: 4,
                                            justifyContent: 'space-between'
                                        }}>
                                        <Text
                                            numberOfLines={2}
                                            style={{
                                                fontWeight: '400',
                                                fontSize: 13, color: colorsPES.inActive,
                                                width: '90%'
                                            }}>{item.description}</Text>
                                        <Text style={{
                                            fontWeight: '600',
                                            fontSize: 16, color: colorsPES.black,
                                            marginLeft: 5
                                        }}>
                                            {formatPrice(item.stock.price * item.quantity)}
                                        </Text>
                                    </TouchableOpacity>
                                    <View style={styles.quantityContainer}>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: colorsPES.grey,
                                                borderRadius: 3, width: 20, height: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{
                                                fontWeight: '400',
                                                fontSize: 13, color: colorsPES.inActive,
                                                backgroundColor: colorsPES.grey,
                                            }}>
                                                -
                                            </Text>
                                        </TouchableOpacity>
                                        <Text style={{ marginHorizontal: 5 }}>{item.quantity}</Text>
                                        <TouchableOpacity
                                            style={{
                                                backgroundColor: colorsPES.grey,
                                                borderRadius: 3, width: 20, height: 20,
                                                justifyContent: 'center',
                                                alignItems: 'center'
                                            }}
                                        >
                                            <Text style={{
                                                fontWeight: '400',
                                                fontSize: 13, color: colorsPES.inActive,
                                                backgroundColor: colorsPES.grey,
                                            }}>
                                                +
                                            </Text>
                                        </TouchableOpacity>
                                    </View>
                                </View>
                            </View>
                        )}
                    />
                </View>
                <TouchableOpacity style={{ marginTop: 10 }}>
                    <Image source={images.aplyVoucher} resizeMode='cover' style={{ width: '100%' }} />
                </TouchableOpacity>
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
                            <Text style={styles.txtVoucher}>{'Xem tất cả'}</Text>
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
            </ScrollView >
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
                        <View style={{ height: 30, justifyContent: 'center' }}>
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
                onCancelPress={handleConfirmDialogClose}
                onPress={deleteCart}
                message="Bạn chắc chắn muốn xóa khỏi giỏ hàng ?"
                confirmMessage='Xóa'
            />
        </SafeAreaView>
    )
}

export default Cart

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
        height: 70
    },

    quantityContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'flex-end',
        width: 250
    },

    productContent: {
        marginStart: 10
    },

    productContainer: {
        marginTop: 16,
        flexDirection: 'row',
        padding: 8,
    },

    titleContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },

    cartContainer: {
        width: '100%',
        height: '60%',
        backgroundColor: colorsPES.white,
        marginTop: 10,
        paddingHorizontal: 12,
        paddingVertical: 16
    },

    container: {
        flex: 1,
        paddingHorizontal: 12,
        paddingTop: 10

    },
})