import React from 'react';
import {Dimensions, FlatList} from 'react-native';

import PESListItem from './PESListItem';
const width = Dimensions.get('screen').width / 2 - 30;

export const PESFlatList = () => {
  const DATA = [
    {
      id: 1,
      name: 'Air Max 97',
      price: '680.000',
      sale: '20%',
      img: require('../assets/images/shoes3.png'),
      about: 'Air Max 97 2hand (Mẫu giày limited collap)',
    },
    {
      id: 2,
      name: 'Áo Dirty Coin',
      price: '220.000',
      sale: '40%',
      img: require('../assets/images/shoes3.png'),
      about: 'Air Max 97 2hand (Mẫu giày limited collap)',
    },
    {
      id: 3,
      name: 'Giày Nike',
      price: '480.000',
      sale: '15%',
      img: require('../assets/images/shoes3.png'),
      about: 'Air Max 97 2hand (Mẫu giày limited collap)',
    },
    {
      id: 4,
      name: 'Quần ONTOP',
      price: '555.000',
      sale: '50%',
      img: require('../assets/images/shoes3.png'),
      about: 'Air Max 97 2hand (Mẫu giày limited collap)',
    },
    {
      id: 5,
      name: 'Air Max 97',
      price: '680.000',
      sale: '35%',
      img: require('../assets/images/shoes3.png'),
      about: 'Air Max 97 2hand (Mẫu giày limited collap)',
    },
    {
      id: 6,
      name: 'Air Max 97',
      price: '680.000',
      sale: '30%',
      img: require('../assets/images/shoes3.png'),
      about: 'Air Max 97 2hand (Mẫu giày limited collap)',
    },
  ];
  return (
    <FlatList
      data={DATA}
      numColumns={2}
      keyExtractor={item => item.id}
      renderItem={({item}) => <PESListItem item={item} />}
    />
  );
};
