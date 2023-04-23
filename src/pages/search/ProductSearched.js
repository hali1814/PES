import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  StatusBar,
  FlatList
} from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';
import {icons} from '../../assets';
import PESListItem from '../../components/PESListItem';
const ProductSearched = ({navigation, route}) => {
  const {data, value} = route.params;
  return (
    <View style={{marginTop: StatusBar.currentHeight}}>
      {/* header */}
      <View
        style={{
          height: 50,
          backgroundColor: 'white',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 10,
          width: '100%',
        }}>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Ionicons name="arrow-back-outline" size={30} color={color.MAIN} />
        </TouchableOpacity>
        <View style={{marginLeft: 10, flex: 1, flexDirection: 'row'}}>
          <TextInput
            onPressIn={() => {
              navigation.goBack();
            }}
            style={{
              height: 40,
              borderColor: color.MAIN,
              borderWidth: 1,
              flex: 1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              paddingHorizontal: 10,
            }}
            placeholder={'Nhập sản phẩm muốn tìm'}
            onChangeText={e => {
              navigation.goBack();
            }}
            // onSubmitEditing={handleSearch}
            value={value}
            // keyboardType=""
          />
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}
            style={{
              height: 40,
              width: 40,
              backgroundColor: color.MAIN,
              justifyContent: 'center',
              alignItems: 'center',
              borderTopRightRadius: 5,
              borderBottomRightRadius: 5,
            }}>
            <Image
              source={icons.search_icon}
              style={{width: 25, height: 25, tintColor: 'white'}}
            />
          </TouchableOpacity>
        </View>
      </View>
      {/* header */}
      <FlatList
      data={data}
      numColumns={2}
      keyExtractor={(item, index) => index.toString()}
      style={{height: '100%'}}
      refreshing={false}
      showsVerticalScrollIndicator={false}
      columnWrapperStyle={{
        flex: 0.5,
        justifyContent: 'space-between',
        paddingRight: 5
      }}
      renderItem={({item}) => (
        <PESListItem
          navigation={navigation}
          // onPressListItem={onPressFlatlist}
          item={item}
        />
      )}
    />
    </View>
  );
};

export default ProductSearched;

const styles = StyleSheet.create({});
