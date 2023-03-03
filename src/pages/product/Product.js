import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import color from '../../styles/colors';
import {PESFlatList} from '../../components/PESFlatList';
import {
  flatlistContainer,
  headerContainer,
  helloText,
  imgVoucher,
  imgVoucher2,
  userName,
  userNameContainer,
} from './components/styles';
import {textsPES} from '../../constants/string';
import {icons, images} from '../../assets';
import PESCategories from '../../components/PESCategories';
const width = Dimensions.get('screen').width / 2 - 30;

const Product = () => {
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
          <Image
            source={icons.search_icon}
            style={{
              width: 24,
              height: 24,
            }}
          />
        </View>
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

        <View
          style={{
            width: '100%',
            height: 32,
            marginTop: 16,
          }}>
          <PESCategories />
        </View>
        <View style={flatlistContainer}>
          <PESFlatList />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;
