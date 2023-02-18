import {FlatList} from 'react-native';

import React, {Component, useEffect, useState} from 'react';
import {icons} from '../assets';
import PESListCategories from './PESListCategories';

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

  return (
    <FlatList
      data={DATA}
      horizontal={true}
      showsHorizontalScrollIndicator={false}
      keyExtractor={item => item.id}
      renderItem={({item}) => <PESListCategories item={item} />}
    />
  );
};

export default PESCategories;
