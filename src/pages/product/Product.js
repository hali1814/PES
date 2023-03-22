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

const Product = ({navigation, onPressProducts}) => {
  const {onGetAllProducts, onGetAllFlashSaleProducts, flashSaleProducts} =
    useContext(ProductContext);
  const shop = () => {};
  const notificantion = () => {};

  useEffect(() => {
    onGetAllProducts();
    onGetAllFlashSaleProducts();
  }, []);

  return (
    <SafeAreaView style={{width: '100%', backgroundColor: '#F0F2F5'}}>
      <View style={{flexDirection: 'column'}}>
        <ScrollView nestedScrollEnabled showsVerticalScrollIndicator={false}>
          {/* Search and voucher */}
          <View style={styles.ContainerSearch}>
            {/* Search */}
            <View style={styles.SearchStyles}>
              <View style={styles.customSearch}>
                <Image
                  source={icons.search_icon}
                  style={{width: 24, height: 24}}
                />
                <TextInput
                  style={styles.TextInputSearch}
                  placeholder="Bạn muốn tìm kiếm sản phẩm?"
                />
              </View>
              <TouchableOpacity onPress={shop}>
                <Image
                  source={icons.cardIcon}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
              <TouchableOpacity onPress={notificantion}>
                <Image
                  source={icons.chatIcon}
                  style={{width: 24, height: 24}}
                />
              </TouchableOpacity>
            </View>
            {/* Voucher */}
            <View>
              <ScrollView
                horizontal={true}
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={{
                  marginTop: 16,
                  paddingHorizontal: 16,
                }}>
                <TouchableOpacity>
                  <Image source={images.voucher_image} style={imgVoucher} />
                </TouchableOpacity>
                <TouchableOpacity>
                  <Image source={images.voucher_image} style={imgVoucher2} />
                </TouchableOpacity>
              </ScrollView>
            </View>
          </View>
          {/* FlashSale */}
          <View
            style={{
              backgroundColor: color.WHITE,
              marginTop: 12,
              paddingHorizontal: 16,
              paddingVertical: 12,
            }}>
            {/* TitleFlashSale */}
            <View
              style={{
                height: 48,
                paddingVertical: 12,
              }}>
              <Text
                style={{
                  fontSize: 16,
                  fontFamily: Fonts.Work_SemiBold,
                  color: color.MAIN,
                }}>
                {'Flash Sale'}
              </Text>
            </View>
            {/* FlatListFlashSale */}
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
          </View>

          {/* Category */}
          <View
            style={{
              width: '100%',
              marginTop: 16,
              paddingHorizontal: 12,
            }}>
            <PESCategories />
          </View>
          <View style={flatlistContainer}>
            <PESFlatList navigation={navigation} />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Product;

const styles = StyleSheet.create({
  ContainerSearch: {
    height: 274,
    backgroundColor: color.MAINOP,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },

  SearchStyles: {
    height: 54,
    paddingVertical: 12,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },

  customSearch: {
    width: '80%',
    height: 44,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
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
