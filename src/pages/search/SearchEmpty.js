import {
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  TextInput,
  Image,
  FlatList,
} from 'react-native';
import React, {useState, useCallback, useEffect} from 'react';
import Fonts from '../../assets/fonts/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';
import {icons} from '../../assets';
import EmptyList from '../empty/EmptyList';
const SearchEmpty = ({navigation}) => {
  const [dataSearch, setDataSearch] = useState('');

  return (
    <View style={{marginTop: StatusBar.currentHeight, flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
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
            onPressIn={a => navigation.goBack()}
            style={{
              height: 40,
              borderColor: color.MAIN,
              borderWidth: 1,
              flex: 1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              paddingHorizontal: 10,
            }}
            placeholder={'Nhập sản phẩm Khác'}
            onChangeText={setDataSearch}
            // onSubmitEditing={handleSearch}
            value={dataSearch}
            // keyboardType=""
          />
          <TouchableOpacity
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
      <View style={{}}>
        <EmptyList />
      </View>
    </View>
  );
};

export default SearchEmpty;

const styles = StyleSheet.create({});
