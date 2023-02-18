import {StyleSheet, Text, View, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import color from '../styles/colors';
import {icons} from '../assets';

const PESListCategories = ({item}) => {
  return (
    <TouchableOpacity onPress={() => {}} style={styles.Container}>
      <View
        style={{
          width: '100%',
          flexDirection: 'row',
          alignItems: 'center',
          paddingHorizontal: 8,
          paddingVertical: 8,
          height: '100%',
        }}>
        <Image source={item.imagee} style={styles.imgProduct} />
        <Text style={styles.textName}>{item.nameCategories}</Text>
      </View>
    </TouchableOpacity>
  );
};

export default PESListCategories;

const styles = StyleSheet.create({
  Container: {
    backgroundColor: color.WHITE,
    marginHorizontal: 12,
    borderRadius: 60,
  },

  imgProduct: {
    width: 24,
    resizeMode: 'cover',
    height: 24,
    paddingLeft: 4,
  },
  headerTextContainer: {
    flexDirection: 'column',
    height: 64,
    marginTop: 8,
    marginBottom: 12,
  },
  textName: {
    fontSize: 14,
    fontWeight: '600',
    color: color.TEXT_SECOND,
    paddingLeft: 8,
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
