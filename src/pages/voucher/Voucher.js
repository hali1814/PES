import {
  StyleSheet,
  Text,
  View,
  ImageBackground,
  Image,
  SafeAreaView,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import {icons, images} from '../../assets';
import color from '../../styles/colors';
import PESHeader from '../../components/PESHeader';
import PESVoucher from '../../components/PESVoucher';

const Voucher = () => {
  return (
    <SafeAreaView
      style={{backgroundColor: color.BACKGROUDITEM, height: '100%'}}>
      <PESHeader />
      <PESVoucher
        img={images.momovoucher_image}
        saleup="Sale up-to"
        title="MoMo, Ưu đãi 50K đơn từ 300K"
        expiry="Hạn đến 20/05/2023"
      />
      <PESVoucher
        img={images.visavoucher_image}
        saleup="Sale up-to"
        title="Zolopay, Ưu đãi 30K đơn từ 150K"
        expiry="Hạn đến 20/05/2023"
      />
      <PESVoucher
        img={images.zalopayvoucher_image}
        saleup="Sale up-to"
        title="Zolopay, Ưu đãi 30K đơn từ 150K"
        expiry="Hạn đến 20/05/2023"
      />
    </SafeAreaView>
  );
};

export default Voucher;

const styles = StyleSheet.create({
  Container: {},
});
