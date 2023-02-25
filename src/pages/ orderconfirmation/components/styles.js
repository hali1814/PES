import {StyleSheet} from 'react-native';
import Fonts from '../../../assets/fonts/fonts';
import color from '../../../styles/colors';
const Orderstyles = StyleSheet.create({
  userContainer: {
    width: '100%',
  },
  userBG: {
    height: '100%',
    backgroundColor: color.WHITE,
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 16,
  },
  scrollContainer: {
    height: '100%',
    backgroundColor: color.TEXT_SECOND,
    paddingHorizontal: 12,
    paddingVertical: 12,
  },
  Address: {},
  AddressText: {
    fontFamily: Fonts.Work_SemiBold,
    fontSize: 14,
    color: color.TEXT_PRIMARY,
  },
  AddError: {
    fontFamily: Fonts.Work_Regular,
    fontSize: 13,
    color: color.TEXT_ERROR,
  },
  identificationContainer: {
    height: 52,
    backgroundColor: 'rgba(255, 159, 65, 0.1)',
    flexDirection: 'row',
    justifyContent: 'space-between',
    borderRadius: 4,
    alignItems: 'center',
    padding: 8,
  },
  identificationButton: {
    height: 24,
    width: 82,
    backgroundColor: '#FF9F41',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 60,
  },
  identificationButtonText: {
    fontFamily: Fonts.Man_SemiBold,
    fontSize: 13,
    color: color.WHITE,
  },
});

export default Orderstyles;
