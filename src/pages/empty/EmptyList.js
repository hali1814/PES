import {StyleSheet, Text, View, Image} from 'react-native';
import React from 'react';
import Fonts from '../../assets/fonts/fonts';
const EmptyList = () => {
  return (
    <View
      style={{
        width: '100%',
        height: '100%',
        marginTop: 50,
        alignContent: 'center',
      }}>
      <Image
        resizeMode="center"
        style={{width: 150, height: 150, alignSelf: 'center'}}
        source={require('../../assets/images/logoLoading.png')}
      />
      <Text
        style={{
          textAlign: 'center',
          fontSize: 15,
          marginTop: 20,
          fontFamily: Fonts.Man_ExtraBold,
        }}>
        Không có gì hết trơn luôn !!
      </Text>
    </View>
  );
};

export default EmptyList;

const styles = StyleSheet.create({});
