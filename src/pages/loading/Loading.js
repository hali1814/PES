import { StyleSheet, Text, View, Image } from 'react-native';
import React, { useEffect } from 'react';
import { containerLoading } from './components/styles';
import { images } from '../../assets';
import { useNavigation } from '@react-navigation/native';
const Loading = () => {
  const navigation = useNavigation();

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('Login');
    }, 2000); // Thời gian delay 2 giây
  }, [navigation]);
  return (
    <View style={containerLoading}>
      <Image
        source={images.loading_image}
        style={{ width: 220, height: 220, resizeMode: 'contain' }}
      />
    </View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
