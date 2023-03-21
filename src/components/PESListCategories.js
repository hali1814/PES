import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useContext, useState, useRef} from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import Fonts from '../assets/fonts/fonts';

const PESListCategories = ({item, index}) => {
  const {onGetAllGenre, genres, productsByGenre, onGetProductsByGenre} =
    useContext(ProductContext);
  // console.log('gennnnnnnnnnnnnnnnnnnnnnnnnnnre', productsByGenre);

  const [isFocused, setIsFocused] = useState(false);

  const containerStyle = [styles.container];

  useEffect(() => {
    onGetAllGenre();
  }, []);

  const onPressCategory = id => {
    id = item._id;
    console.log('loggggggggggg', id);
  };

  return (
    <View>
      <TouchableOpacity style={containerStyle} onPress={onPressCategory}>
        <View
          style={{
            backgroundColor: color.WHITE,
            paddingHorizontal: 16,
            paddingVertical: 8,
            borderRadius: 6,
            alignItems: 'center',
            width: 80,
          }}>
          <Image source={{uri: item.images}} style={styles.imgProduct} />
          <View style={{justifyContent: 'center', marginTop: 4}}>
            <Text style={styles.textName}>{item.label}</Text>
          </View>
        </View>
      </TouchableOpacity>
    </View>
  );
};

export default PESListCategories;

const styles = StyleSheet.create({
  container: {
    marginLeft: 10,
  },
  containerFocused: {
    borderWidth: 1,
    borderColor: color.MAIN,
    borderRadius: 4,
  },
  imgProduct: {
    width: 32,
    resizeMode: 'cover',
    height: 32,
  },
  headerTextContainer: {
    flexDirection: 'column',
    height: 64,
    marginTop: 8,
    marginBottom: 12,
  },
  textName: {
    fontSize: 14,
    color: color.BLACK,
    textTransform: 'capitalize',
    fontFamily: Fonts.Work_SemiBold,
  },
});
