import {
  Dimensions,
  Image,
  SafeAreaView,
  ScrollView,
  Text,
  TouchableOpacity,
  View,
  FlatList,
} from 'react-native';
import color from '../../styles/colors';
import { PESFlatList } from '../../components/PESFlatList';
import {
  flatlistContainer,
  headerContainer,
  helloText,
  imgVoucher,
  imgVoucher2,
  userName,
  userNameContainer,
} from './components/styles';
import { textsPES } from '../../constants/string';
import { icons, images } from '../../assets';
import PESCategories from '../../components/PESCategories';
import {TextInput} from 'react-native-gesture-handler';
import Fonts from '../../assets/fonts/fonts';
const width = Dimensions.get('screen').width / 2 - 30;
import React, {useState, useEffect} from 'react';
import PESListItem from '../../components/PESListItem';
import customAxios from '../../api/helper/Axios';

const Product = () => {
  const [products, setProducts] = useState([]);

  useEffect(() => {
    const axiosInstance = customAxios();
    axiosInstance
      .get('/api/products/all')
      .then(response => {
        // Modify the response to include image URLs
        const productsWithImages = response.data.map(product => ({
          ...product,
          imageUrls: product.images.map(image => `http://pes.store/${image}`),
        }));
        setProducts(productsWithImages);
      })
      .catch(error => console.log(error));
  }, []);

  return (
    <SafeAreaView style={{ width: '100%', backgroundColor: '#F0F2F5' }}>
      <View style={{ flexDirection: 'column' }}>
        <View style={headerContainer}>
<<<<<<< HEAD
          <View
            style={{
              backgroundColor: color.WHITE,
              borderRadius: 16,
              width: '90%',
              height: 36,
            }}>
            <TextInput
              style={{
                paddingHorizontal: 16,
                borderWidth: 0.2,
                borderColor: color.MAIN,
                borderRadius: 16,
                height: '100%',
                fontFamily: Fonts.Man_Regular,
              }}
              placeholder="Bạn muốn tìm kiếm sản phẩm?"
            />
=======
          <View style={{ flexDirection: 'row' }}>
            <Image source={icons.user_icon} style={{ width: 32, height: 32 }} />
            <View style={userNameContainer}>
              <Text style={helloText}>{textsPES.txtHello}</Text>
              <Text style={userName}>{textsPES.txtUsername}</Text>
            </View>
>>>>>>> quocHung
          </View>

          <Image
            source={icons.search_icon}
            style={{
              width: 24,
              height: 24,
              tintColor: color.MAIN,
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
          <FlatList
            data={products}
            numColumns={2}
            keyExtractor={item => item._id.toString()}
            renderItem={({item}) => <PESListItem item={item} />}
          />
        </View>
      </View>
    </SafeAreaView>
  );
};

export default Product;
