import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useContext, useEffect, useState} from 'react';
import color from '../../styles/colors';
import {PESFlatList} from '../../components/PESFlatList';
import {
  ContainerShop,
  flatlistContainer,
  headerContainerShop,
  phoneText,
  shopNameText,
  showReaching,
  txtVoucher,
  userNameContainer,
  voucherContainer,
  voucherText,
} from './components/styles';
import {textsPES} from '../../constants/string';
import {icons, images} from '../../assets';
import PESCategories from '../../components/PESCategories';
import PESShop from '../../components/PESShop';
const width = Dimensions.get('screen').width / 2 - 30;
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import PESListItem from '../../components/PESListItem';
import PESListItemShop from '../../components/PESListItemShop';
import {TextInput} from 'react-native-gesture-handler';

const Shop = props => {
  const {route, navigation} = props;
  const {ShopID} = route.params;

  useEffect(() => {
    onGetStore(ShopID);
  }, []);

  const {onGetStore, store} = useContext(ProductContext);

  const shop = () => {};

  const notificantion = () => {};

  // const DetailShopID = store.products?._id;

  return (
    <SafeAreaView style={{width: '100%', backgroundColor: '#F0F2F5'}}>
      <View
        style={{flexDirection: 'column', paddingHorizontal: 12, marginTop: 8}}>
        {/* Search */}
        <View style={styles.SearchStyles}>
          <View style={styles.customSearch}>
            <Image source={icons.search_icon} style={{width: 24, height: 24}} />
            <TextInput
              style={styles.TextInputSearch}
              placeholder="Bạn muốn tìm kiếm sản phẩm?"
            />
          </View>
          <TouchableOpacity onPress={shop}>
            <Image source={icons.cardIcon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
          <TouchableOpacity onPress={notificantion}>
            <Image source={icons.chatIcon} style={{width: 24, height: 24}} />
          </TouchableOpacity>
        </View>
        <ScrollView showsVerticalScrollIndicator={false}>
          {/* Shop */}
          <View style={{marginTop: 12}}>
            <View style={ContainerShop}>
              <View style={headerContainerShop}>
                <View style={{flexDirection: 'row'}}>
                  <Image
                    source={{uri: store.avatar}}
                    style={{width: 32, height: 32, borderRadius: 360}}
                  />
                  <View style={userNameContainer}>
                    <Text style={shopNameText}>{store.nameShop}</Text>
                    <Text style={phoneText}>{store.owner}</Text>
                  </View>
                </View>
                <TouchableOpacity>
                  <Image
                    source={icons.crown_icon}
                    style={{
                      width: 24,
                      height: 24,
                    }}
                  />
                </TouchableOpacity>
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
          </View>

          {/* Categories */}
          <View
            style={{
              width: '100%',
              marginTop: 12,
            }}>
            <PESCategories />
          </View>

          {/* Voucher */}
          <View style={{marginTop: 12}}>
            <View style={voucherContainer}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={icons.voucher_icon}
                  style={{width: 35, height: 35}}
                />
                <View style={{alignSelf: 'center', marginLeft: 12}}>
                  <Text style={voucherText}>{textsPES.txtVoucher}</Text>
                </View>
              </View>
              <TouchableOpacity
                onPress={() => {}}
                style={{flexDirection: 'row'}}>
                <Text style={txtVoucher}>{textsPES.txtDetail}</Text>
                <Image
                  source={icons.chevronRight_icon}
                  style={{width: 16, height: 16, marginLeft: 2}}
                />
              </TouchableOpacity>
            </View>
          </View>

          {/* List Products */}
          <View style={{marginTop: 12}}>
            <FlatList
              pagingEnabled
              showsVerticalScrollIndicator={false}
              data={store.products}
              numColumns={2}
              keyExtractor={item => item._id}
              renderItem={({item}) => (
                <PESListItemShop navigation={navigation} item={item} />
              )}
            />
          </View>
        </ScrollView>
      </View>
    </SafeAreaView>
  );
};

export default Shop;

const styles = StyleSheet.create({
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
