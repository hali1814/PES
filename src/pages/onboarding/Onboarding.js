import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
  Animated,
  Easing
} from 'react-native';
import React, { useEffect, useRef } from 'react';
import Bg from '../../assets/images/background.png';
import Logo from '../../assets/images/logo.png';
import PESButon from '../../components/PESButon';
import PESButtonOutline from '../../components/PESButtonOutline';
import {
  containerOnboarding,
  LogoandText,
  TextOnboarding,
  ViewButton,
} from './components/styles';
import { textsPES } from '../../constants/string';
const Onboarding = ({ navigation }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      easing: Easing.cubic,
      useNativeDriver: true,
    }).start();
  }, [fadeAnim]);
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ffff" />
      <Animated.View style={[containerOnboarding, {
        opacity: fadeAnim,
        transform: [{
          translateY: fadeAnim.interpolate({
            inputRange: [0, 1],
            outputRange: [1000, 0],
          }),
        }],
      }]}>
        <ImageBackground source={Bg} style={{ width: '100%', height: '100%' }} />
        <View style={LogoandText}>
          <Image
            source={Logo}
            style={{ width: 120, height: 120, resizeMode: 'contain' }}
          />
          <Text style={TextOnboarding}>{textsPES.txtOnboarding}</Text>
          <View style={ViewButton}>
            <PESButon on_press={() => { navigation.navigate('Register') }} btn_text={textsPES.register} />
            <PESButtonOutline on_press={() => { navigation.navigate('Login') }} btn_text={textsPES.login} />
          </View>
        </View>
      </Animated.View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
