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
import React, {useState, useCallback, useEffect, useContext} from 'react';
import Fonts from '../../assets/fonts/fonts';
import AsyncStorage from '@react-native-async-storage/async-storage';

import Ionicons from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';
import {icons} from '../../assets';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
const Search = ({navigation}) => {
  const {getSearchSuggestController, getSearchResultController} =
    useContext(ProductContext);
  const [searchHistory, setSearchHistory] = useState([]);

  const [suggest, setSuggest] = useState(['']);
  const [dataSearch, setDataSearch] = useState('');

  async function saveSearchHistory(searchQuery) {
    try {
      const searchHistory = await AsyncStorage.getItem('searchHistory');
      let history = searchHistory ? JSON.parse(searchHistory) : [];
      if (history.includes(searchQuery)) {
        const positionOfSearchQuery = history.indexOf(searchQuery);
        history.splice(positionOfSearchQuery, 1);
      }
      history.unshift(searchQuery);
      if (history.length > 15) history.pop();
      await AsyncStorage.setItem('searchHistory', JSON.stringify(history));
      getSearchHistory();
    } catch (error) {
      console.log(error.toString());
    }
  }

  async function getSearchHistory() {
    try {
      const searchHistory = await AsyncStorage.getItem('searchHistory');
      let history = searchHistory ? JSON.parse(searchHistory) : [];
      setSearchHistory(history);
    } catch (error) {
      console.log(error);
    }
  }

  async function onSearch(searchData) {
    if (!searchData) {
      navigation.navigate('SearchEmpty');
      return;
    }
    const data = await getSearchResultController(searchData);
    if (data.length == 0) {
      navigation.navigate('SearchEmpty');
      return;
    }
    saveSearchHistory(searchData);
    navigation.navigate('ProductSearched', {data: data, value: searchData});
  }

  async function suggestSearch(suggest) {
    if (!suggest) return;
    const data = await getSearchSuggestController(suggest);
    setSuggest(data);
  }

  useEffect(() => {
    getSearchHistory();
  }, []);

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
            style={{
              height: 40,
              borderColor: color.MAIN,
              borderWidth: 1,
              flex: 1,
              borderTopLeftRadius: 5,
              borderBottomLeftRadius: 5,
              paddingHorizontal: 10,
            }}
            placeholder={searchHistory[0] || 'Nhập sản phẩm muốn tìm'}
            onChangeText={e => {
              suggestSearch(e);
              setDataSearch(e);
            }}
            // onSubmitEditing={handleSearch}
            value={dataSearch}
            // keyboardType=""
          />
          <TouchableOpacity
            onPress={() => {
              onSearch(dataSearch);
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
      <View style={{}}>
        {dataSearch ? (
          <FlatList
            data={suggest}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => {
              const lengthSearch = dataSearch.length;
              const endText = item.slice(lengthSearch);
              const fistText = item.substring(0, lengthSearch);
              return (
                <TouchableOpacity
                  onPress={() => {
                    onSearch(item);
                  }}
                  style={{
                    backgroundColor: 'white',
                    width: '100%',
                    height: 40,
                    borderBottomColor: color.BORDER_BOTTOM,
                    borderBottomWidth: 1,
                    alignItems: 'center',
                    paddingHorizontal: 10,
                    flexDirection: 'row',
                  }}>
                  <Text
                    style={{
                      color: color.TEXT_PRIMARY,
                      fontSize: 15,
                      fontFamily: Fonts.Man_Bold,
                    }}>
                    {fistText}
                  </Text>
                  <Text
                    style={{
                      color: color.TEXT_PRIMARY,
                      fontSize: 15,
                      fontFamily: Fonts.Man_Regular,
                    }}>
                    {endText}
                  </Text>
                </TouchableOpacity>
              );
            }}
          />
        ) : (
          <FlatList
            data={searchHistory}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({item}) => (
              <TouchableOpacity
                onPress={() => {
                  onSearch(item);
                }}
                style={{
                  backgroundColor: 'white',
                  width: '100%',
                  height: 40,
                  borderBottomColor: color.BORDER_BOTTOM,
                  borderBottomWidth: 1,
                  justifyContent: 'center',
                  paddingHorizontal: 10,
                }}>
                <Text
                  style={{
                    color: color.TEXT_PRIMARY,
                    fontSize: 15,
                    fontFamily: Fonts.Man_Regular,
                  }}>
                  {item}
                </Text>
              </TouchableOpacity>
            )}
          />
        )}
      </View>
    </View>
  );
};

export default Search;

const styles = StyleSheet.create({});
