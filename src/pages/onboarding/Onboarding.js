import {
  Image,
  ImageBackground,
  StatusBar,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import React from 'react';
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
import {textsPES} from '../../constants/string';
const Onboarding = () => {
  return (
    <View>
      <StatusBar barStyle={'dark-content'} backgroundColor="#ffff" />
      <View style={containerOnboarding}>
        <ImageBackground source={Bg} style={{width: '100%', height: '100%'}} />
        <View style={LogoandText}>
          <Image
            source={Logo}
            style={{width: 120, height: 120, resizeMode: 'contain'}}
          />
          <Text style={TextOnboarding}>{textsPES.txtOnboarding}</Text>
          <View style={ViewButton}>
            <PESButon on_press={() => null} btn_text={textsPES.register} />
            <PESButtonOutline on_press={() => null} btn_text={textsPES.login} />
          </View>
        </View>
      </View>
    </View>
  );
};

export default Onboarding;

const styles = StyleSheet.create({});
