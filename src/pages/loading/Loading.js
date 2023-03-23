import {
  StyleSheet,
  Text,
  View,
  Image,
  Animated,
  Easing,
  StatusBar,
} from 'react-native';
import React, {useEffect, useRef} from 'react';
import {containerLoading} from './components/styles';
import {images} from '../../assets';
import {useNavigation} from '@react-navigation/native';

const Loading = () => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const navigation = useNavigation();
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1500,
      useNativeDriver: true,
      easing: Easing.bounce,
    }).start();
  }, [fadeAnim]);

  useEffect(() => {
    setTimeout(() => {
      navigation.navigate('MyTab');
    }, 2000);
  }, [navigation]);
  return (
    <Animated.View
      style={[
        containerLoading,
        {
          opacity: fadeAnim,
          transform: [
            {
              translateY: fadeAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [1000, 0],
              }),
            },
          ],
        },
      ]}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="#ffff"
        hidden={true}
      />
      <Image
        source={images.loading_image}
        style={{width: 220, height: 220, resizeMode: 'contain'}}
      />
    </Animated.View>
  );
};

export default Loading;

const styles = StyleSheet.create({});
