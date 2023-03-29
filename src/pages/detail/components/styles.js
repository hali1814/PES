import Fonts from '../../../assets/fonts/fonts';
import color from '../../../styles/colors';
const {width: screenWidth} = Dimensions.get('window');
import {Dimensions} from 'react-native';

export const voucherContainer = {
  height: 36,
  backgroundColor: 'rgba(255,101,129,0.20)',
  paddingHorizontal: 12,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
  borderRadius: 4,
};
export const voucherText = {
  fontSize: 13,
  fontFamily: Fonts.Work_SemiBold,
  color: color.TEXT_PRIMARY,
};
export const txtVoucher = {
  fontSize: 13,
  fontFamily: Fonts.Work_SemiBold,
  color: color.MAIN,
};
export const ContainerShop = {
  width: '100%',
  height: 107,
  backgroundColor: color.WHITE,
  borderRadius: 4,
};
export const headerContainerShop = {
  flexDirection: 'row',
  justifyContent: 'space-between',
  padding: 12,
};
export const userNameContainer = {
  flexDirection: 'column',
  marginLeft: 12,
};
export const shopNameText = {
  fontSize: 14,
  fontFamily: Fonts.Work_SemiBold,
  color: color.TEXT_PRIMARY,
  textTransform: 'capitalize',
};
export const phoneText = {
  fontSize: 13,
  fontFamily: Fonts.Work_Regular,
  color: color.TEXT_SECOND,
};
export const showReaching = {
  backgroundColor: 'rgba(88,101,242,0.10)',
  width: '100%',
  height: 28,
  flexDirection: 'row',
  justifyContent: 'space-between',
  paddingHorizontal: 6,
  paddingVertical: 4,
  borderRadius: 2,
};
export const SafeAreaContainer = {
  position: 'absolute',
  width: screenWidth,
  flexDirection: 'row',
  justifyContent: 'space-between',
};
export const counterContainer = {
  position: 'absolute',
  marginLeft: 16,
  paddingBottom: 45,
};
export const counterBG = {
  paddingHorizontal: 8,
  paddingVertical: 2,
  borderRadius: 60,
  backgroundColor: 'rgba(0,0,0,0.4)',
};
export const counterText = {
  fontSize: 12,
  fontFamily: Fonts.Work_Regular,
  color: color.WHITE,
};
export const productsContainer = {
  position: 'absolute',
  width: screenWidth,
  height: 115,
  paddingHorizontal: 12,
  top: 342,
};
export const productsBG = {
  backgroundColor: color.WHITE,
  height: '100%',
  borderRadius: 4,
  paddingHorizontal: 12,
  paddingVertical: 16,
  flexDirection: 'column',
};
export const labelContainer = {
  width: '100%',
  marginTop: 8,
  flexDirection: 'row',
  alignItems: 'center',
};
export const labelBG = {
  height: 20,
  backgroundColor: '#F0F2F5',
  borderRadius: 2,
  paddingHorizontal: 8,
  justifyContent: 'center',
};
export const labelText = {
  fontFamily: Fonts.Work_Regular,
  fontSize: 13,
  color: color.TEXT_SECOND,
};
export const descriptionContainer = {
  height: 162,
  paddingHorizontal: 12,
  marginTop: 8,
};
export const descriptionBG = {
  backgroundColor: color.WHITE,
  borderRadius: 4,
  flexDirection: 'column',
  padding: 12,
};
export const descriptionText = {
  fontFamily: Fonts.Work_SemiBold,
  fontSize: 16,
  color: color.BLACK,
};
export const detailText = {
  fontFamily: Fonts.Work_SemiBold,
  fontSize: 13,
  color: color.MAIN,
};
export const payContainer = {
  height: 67,
  paddingHorizontal: 16,
  paddingVertical: 8,
  flexDirection: 'row',
  justifyContent: 'space-between',
  alignItems: 'center',
};
export const payText = {
  fontFamily: Fonts.Man_SemiBold,
  fontSize: 14,
  color: color.BLACK,
};
export const payMoneyText = {
  fontFamily: Fonts.Man_Bold,
  fontSize: 18,
  color: color.MAIN,
};
export const addCartButton = {
  width: 44,
  height: 44,
  borderRadius: 60,
  justifyContent: 'center',
  alignItems: 'center',
  backgroundColor: color.BACKGROUDITEM,
};
export const buyButton = {
  width: 140,
  height: 44,
  backgroundColor: color.MAIN,
  borderRadius: 60,
};
export const buyContainer = {
  alignItems: 'center',
  width: 140,
  height: 44,
  justifyContent: 'center',
};
export const buyText = {
  fontSize: 16,
  color: color.WHITE,
  fontFamily: Fonts.Man_Medium,
};
