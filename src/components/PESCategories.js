import {FlatList} from 'react-native';

import React, {Component, useEffect, useContext} from 'react';
import {icons} from '../assets';
import PESListCategories from './PESListCategories';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';

const PESCategories = () => {
  const {onGetAllGenre, genres} = useContext(ProductContext);
  useEffect(() => {
    onGetAllGenre();
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
