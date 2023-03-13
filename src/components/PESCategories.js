import {FlatList} from 'react-native';

import React, {Component, useEffect, useContext} from 'react';
import {icons} from '../assets';
import PESListCategories from './PESListCategories';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';

const PESCategories = () => {
  const DATA = [
    {
      id: 1,
      nameCategories: 'Tất cả',
      imagee: require('../assets/images/shoes3.png'),
    },
    {
      id: 2,
      nameCategories: 'Giày',
      imagee: require('../assets/images/shoes3.png'),
    },
    {
      id: 3,
      nameCategories: 'Quần',
      imagee: require('../assets/images/shoes3.png'),
    },
    {
      id: 4,
      nameCategories: 'Áo',
      imagee: require('../assets/images/shoes3.png'),
    },
  ];
  const {onGetAllGenre, genres} = useContext(ProductContext);
  // console.log('sssss=======', genres);
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
