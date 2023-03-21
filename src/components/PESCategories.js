import {FlatList} from 'react-native';

import React, {Component, useEffect, useContext} from 'react';
import {icons} from '../assets';
import PESListCategories from './PESListCategories';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';

const PESCategories = () => {
  const {onGetAllGenre, genres, productsByGenre, onGetProductsByGenre} =
    useContext(ProductContext);
  useEffect(() => {
    onGetAllGenre();
    onGetProductsByGenre('63e4c2289a2f0ff07c36ce68');
  }, []);

  return (
    <FlatList
      data={genres}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item._id}
      renderItem={({item}) => <PESListCategories item={item} />}
    />
  );
};

export default PESCategories;
