import {FlatList} from 'react-native';

import React, {Component, useEffect, useContext, useState} from 'react';
import {icons} from '../assets';
import PESListCategories from './PESListCategories';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';

const PESCategories = () => {
  const {onGetAllGenre, genres, onGetProductsByGenre, setGenres} =
    useContext(ProductContext);

  const [isFocused, setIsFocused] = useState('dfahsdkfhaksjhdfkjash');

  useEffect(() => {
    onGetAllGenre();
    onGetProductsByGenre();
  }, []);

  return (
    <FlatList
      data={genres}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item._id}
      renderItem={({item}) => (
        <PESListCategories
          item={item}
          isFocused={isFocused}
          setIsFocused={setIsFocused}
        />
      )}
    />
  );
};

export default PESCategories;
