import React, {useContext, useEffect, useState} from 'react';
import {Dimensions, FlatList} from 'react-native';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';

import PESListItem from './PESListItem';
const width = Dimensions.get('screen').width / 2 - 30;

export const PESFlatList = ({navigation, onPressFlatlist}) => {
  const {onGetAllProducts, products} = useContext(ProductContext);
  useEffect(() => {
    onGetAllProducts();
  }, []);
  return (
    <FlatList
      pagingEnabled
      data={products}
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
