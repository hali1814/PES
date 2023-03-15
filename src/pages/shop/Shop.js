import {
  Dimensions,
  FlatList,
  Image,
  SafeAreaView,
  ScrollView,
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
  headerContainer,
  headerContainerShop,
  helloText,
  phoneText,
  shopNameText,
  showReaching,
  txtVoucher,
  userName,
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

const Shop = props => {
  const {route, navigation} = props;
  const {ShopID} = route.params;

  useEffect(() => {
    onGetStore(ShopID);
  }, []);
  const {onGetStore, store} = useContext(ProductContext);

  const DetailShopID = store.products?._id || '';
  console.log('uuuuuuuu', DetailShopID);

  return (
    <SafeAreaView style={{width: '100%', backgroundColor: '#F0F2F5'}}>
      <View style={{flexDirection: 'column'}}>
        <View style={headerContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image source={icons.user_icon} style={{width: 32, height: 32}} />
            <View style={userNameContainer}>
              <Text style={helloText}>{textsPES.txtHello}</Text>
              <Text style={userName}>{textsPES.txtUsername}</Text>
            </View>
          </View>
          <TouchableOpacity>
            <Image
              source={icons.search_icon}
              style={{
                width: 24,
                height: 24,
              }}
            />
          </TouchableOpacity>
        </View>
        <View style={{padding: 12}}>
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
            height: 32,
          }}>
          <PESCategories />
        </View>
        {/* Voucher */}
        <View style={{padding: 12}}>
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
            <TouchableOpacity onPress={() => {}} style={{flexDirection: 'row'}}>
              <Text style={txtVoucher}>{textsPES.txtDetail}</Text>
              <Image
                source={icons.chevronRight_icon}
                style={{width: 16, height: 16, marginLeft: 2}}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* List Products */}
        <View style={flatlistContainer}>
          <FlatList
            pagingEnabled
            data={store.products}
            numColumns={2}
            keyExtractor={item => item._id}
            renderItem={({item}) => (
              <PESListItemShop
                onPress={() => navigation.navigate('Detail', {DetailShopID})}
                item={item}
              />
            )}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Shop;
