import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, FlatList, Text, View} from 'react-native';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';

import PESListItem from './PESListItem';
const width = Dimensions.get('screen').width / 2 - 30;

export const PESFlatList = ({navigation, onPressFlatlist}) => {
  const {onGetAllProducts, products} = useContext(ProductContext);

  const [currentProducts, setCurrentProducts] = useState([]);

  useEffect(() => {
    onGetAllProducts();
  }, []);

  useEffect(() => {
    setCurrentProducts(products);
  }, [products]);

  // Hàm lọc danh sách sản phẩm hiện tại theo thể loại
  const filterProductsByGenre = genreId => {
    const filteredProducts = products.filter(product => {
      return product.genre._id === genreId;
    });
    setCurrentProducts(filteredProducts);
  };

  return (
    <FlatList
      pagingEnabled
      data={currentProducts}
      numColumns={2}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <PESListItem
          navigation={navigation}
          onPressListItem={onPressFlatlist}
          item={item}
        />
      )}
    />
  );
};
