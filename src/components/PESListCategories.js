import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React, {useEffect, useContext, useState, useRef} from 'react';
import color from '../styles/colors';
import {icons} from '../assets';
import {ProductContext} from '../api/authservice/ProductAPI/ProductContext';
import Fonts from '../assets/fonts/fonts';

const PESListCategories = ({
  item,
  onGetProductsByGenre,
  isFocused,
  setIsFocused,
  onGetAllProducts,
}) => {
  const {onGetAllGenre} = useContext(ProductContext);

  const containerStyle = [styles.container];

  useEffect(() => {
    onGetAllGenre();
  }, []);

  const onPressCategory = () => {
    if (item._id == 'dfahsdkfhaksjhdfkjash') {
      onGetAllProducts();
    } else onGetProductsByGenre(item._id);

    setIsFocused(item._id);
  };

  return (
    <View>
      <TouchableOpacity style={containerStyle} onPress={onPressCategory}>
        <View
          style={{
            backgroundColor: color.WHITE,
            borderColor: color.MAIN,
            borderWidth: isFocused == item._id ? 2 : 0,
            paddingHorizontal: 5,
            paddingVertical: 10,
            borderRadius: 3,
            alignItems: 'center',
            width: 80,
            height: '100%',
            justifyContent: 'space-between',
          }}>
          <Image
            source={{uri: item.images}}
            style={[
              styles.imgProduct,
              {
                tintColor:
                  item._id == 'dfahsdkfhaksjhdfkjash' ? color.MAIN : null,
              },
            ]}
          />
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
    marginRight: 5,
    height: '100%',
  },
  containerFocused: {
    borderWidth: 1,
    borderColor: color.MAIN,
    borderRadius: 1,
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
    fontSize: 10,
    color: color.TEXT_SECOND,
    textTransform: 'capitalize',
    fontFamily: Fonts.Work_SemiBold,
  },
});
