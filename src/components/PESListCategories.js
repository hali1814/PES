import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useContext} from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import Fonts from '../assets/fonts/fonts';

const PESListCategories = ({item}) => {
  const {onGetAllGenre, genres} = useContext(ProductContext);
  // console.log('gennnnnnnnnnnnnnnnnnnnnnnnnnnre', genres);
  useEffect(() => {
    onGetAllGenre();
  }, []);

  const onPressCategory = () => {};

  return (
    <TouchableOpacity onPress={onPressCategory} style={styles.Container}>
      <View
        style={{
          backgroundColor: color.WHITE,
          flexDirection: 'row',
          paddingHorizontal: 12,
          paddingVertical: 4,
          borderRadius: 60,
          justifyContent: 'space-between',
        }}>
        <Image source={{uri: item.images}} style={styles.imgProduct} />
        <View style={{justifyContent: 'center', marginLeft: 4}}>
          <Text style={styles.textName}>{item.label}</Text>
        </View>
      </View>
    </TouchableOpacity>
  );
};

export default PESListCategories;

const styles = StyleSheet.create({
  Container: {
    justifyContent: 'center',
    paddingLeft: 8,
  },

  imgProduct: {
    width: 24,
    resizeMode: 'cover',
    height: 24,
  },
  headerTextContainer: {
    flexDirection: 'column',
    height: 64,
    marginTop: 8,
    marginBottom: 12,
  },
  textName: {
    fontSize: 14,
    color: color.TEXT_SECOND,
    textTransform: 'capitalize',
    fontFamily: Fonts.Work_SemiBold,
  },
  textAbout: {
    marginTop: 4,
    height: 40,
    fontSize: 14,
    fontWeight: '400',
    color: color.TEXT_SECOND,
  },
  textPrice: {
    fontSize: 15,
    fontWeight: '600',
    alignContent: 'center',
  },
  imgContainer: {
    width: '50%',
    alignItems: 'flex-end',
  },
});
