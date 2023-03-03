import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import {containerLoading} from './components/styles';
import {images} from '../../assets';

const Loading = () => {
  return (
    <View style={containerLoading}>
      <Image
        source={images.loading_image}
        style={{width: 220, height: 220, resizeMode: 'contain'}}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
