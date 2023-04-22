import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  FlatList,
  SafeAreaView,
  StatusBar,
  TextInput,
} from 'react-native';
import React, {useState, useContext, useEffect} from 'react';
import colorsPES from '../../constants/colors';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';
import Fonts from '../../assets/fonts/fonts';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import StarRating from 'react-native-star-rating';
import Toast from 'react-native-toast-message';

const PostRate = ({navigation, route}) => {
  const {pushRateController} = useContext(ProductContext);
  const [star, setStar] = useState(5)
  const [msg, setMsg] = useState('')
  const [descriptionStar, setDescriptionStar] = useState('Tuyệt vời')
  const item = route.params;

  const onStar = (star) => {
    setStar(star)
    switch(star) {
      case 1: setDescriptionStar('Tệ'); break;
      case 2: setDescriptionStar('Không hài lòng'); break;
      case 3: setDescriptionStar('Bình thường'); break;
      case 4: setDescriptionStar('Hài lòng'); break;
      case 5: setDescriptionStar('Tuyệt vời'); break;
    }

  }

  const handleRate = async () => {
    await pushRateController(item._id, star, msg)
    Toast.show({
      type: 'success',
      text1: 'Thành công',
      text2: 'Bạn đánh giá sản phẩm thành công'
    });
    setTimeout(navigation.goBack, 1000)
  }

  return (
    <SafeAreaView style={styles.container}>
      {/* header */}
      <View
        style={{
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color={color.MAIN} />
        </TouchableOpacity>
        <Text
          style={{
            marginLeft: 15,
            fontSize: 15,
            fontFamily: Fonts.Man_Bold,
            color: 'black',
          }}>
          Đánh giá sản phẩm
        </Text>
      </View>
      {/* header */}
      {/* content */}
      <View
        style={{
          backgroundColor: 'white',
          borderWidth: 1,
          borderColor: color.BORDER_BOTTOM,
          paddingVertical: 10,
          paddingHorizontal: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Image
          source={
            item
              ? {uri: item.product[0].images[0]}
              : require('../../assets/images/haohoa_scanQR.png')
          }
          style={{width: 30, height: 30}}
        />
        <View style={{marginLeft: 10}}>
          <Text
            style={{
              color: 'black',
              fontFamily: Fonts.Man_Medium,
              fontSize: 13,
            }}>
            {item.product[0].name}
          </Text>
          <Text
            style={{
              color: 'grey',
              fontFamily: Fonts.Man_Medium,
              fontSize: 11,
            }}>
            Phân loại: Đen, M
          </Text>
        </View>
      </View>
      {/* content2 */}
      <View
        style={{
          backgroundColor: 'white',

          paddingHorizontal: 10,
          paddingVertical: 10,
          flexDirection: 'row',
          alignItems: 'center',
        }}>
        <Text
          style={{
            width: 100,
            color: 'black',
            fontFamily: Fonts.Man_Medium,
            fontSize: 13,
          }}>
          Chất lượng sản phẩm
        </Text>
        <View
          style={{
            flexDirection: 'row',
            width: 280,
            paddingHorizontal: 20,

            justifyContent: 'space-between',
          }}>
          <StarRating
            disabled={false}
            fullStarColor={'#FFDF00'}
            starSize={25}
            maxStars={5}
            rating={star}
            emptyStarColor={'#FFDF00'}
            containerStyle={{
                width: 160
            }}
            selectedStar={rating => onStar(rating)}
          />
          <Text style={{width: 60, height: 40, textAlign: 'center'}}>{descriptionStar}</Text>
        </View>
      </View>
      <View style={{padding: 10}}>
        <TextInput
          multiline={true}
          numberOfLines={4}
          textAlignVertical="top"
          maxLength={200}
          onChangeText={setMsg}
          value={msg}
          style={{
            backgroundColor: color.BORDER_BOTTOM,
            borderRadius: 5,
            borderColor: color.BORDER_BOTTOM,
            borderWidth: 1,
            paddingHorizontal: 10,
          }}
          placeholder="Hãy chia sẻ nhận xét cho sản phẩm này bạn nhé"
        />

        <TouchableOpacity
          onPress={() => {handleRate()}}
          style={{
            width: '100%',
            height: 40,
            marginTop: 50,
            backgroundColor: color.MAIN,
            borderRadius: 5,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{color: 'white', fontFamily: Fonts.Man_Bold}}>
            Đánh giá
          </Text>
        </TouchableOpacity>
      </View>
      <Toast/>
    </SafeAreaView>
  );
};

export default PostRate;

const styles = StyleSheet.create({
  ratingContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
  },

  priceDetail: {
    marginTop: 6,
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },

  productDetail: {
    width: '80%',
  },

  detail: {
    marginLeft: 12,
  },

  listContainer: {
    marginTop: 5,
    paddingHorizontal: 5,
    backgroundColor: 'white',
  },

  headerText: {
    fontWeight: '700',
    fontSize: 18,
    lineHeight: 24,
    color: colorsPES.blackText,
    marginLeft: 120,
  },

  headerContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 10,
    paddingHorizontal: 16,
  },

  container: {
    marginTop: StatusBar.currentHeight,
    flex: 1,
    backgroundColor: 'white',
  },
});
