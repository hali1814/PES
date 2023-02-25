import {
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';
import React from 'react';
import PESHeader from '../../components/PESHeader';
import color from '../../styles/colors';
import Orderstyles from './components/styles';
import Fonts from '../../assets/fonts/fonts';
import {textsPES} from '../../constants/string';

const OrderConfirmation = () => {
  return (
    <SafeAreaView
      style={{backgroundColor: color.BACKGROUDITEM, height: '100%'}}>
      <PESHeader title={'Xác nhận đơn hàng'} />
      <ScrollView pagingEnabled style={Orderstyles.scrollContainer}>
        <View style={Orderstyles.userContainer}>
          <View style={Orderstyles.userBG}>
            <View style={Orderstyles.Address}>
              <View
                style={{
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text style={Orderstyles.AddressText}>
                  {'Địa chỉ nhận hàng'}
                </Text>
              </View>
              <View
                style={{
                  height: 20,
                  justifyContent: 'center',
                }}>
                <Text style={Orderstyles.AddError}>{'Chưa có địa chỉ'}</Text>
              </View>
            </View>

            <View style={{marginTop: 8}}>
              <View style={Orderstyles.identificationContainer}>
                <View style={{width: '70%'}}>
                  <Text
                    numberOfLines={2}
                    style={{fontFamily: Fonts.Work_Medium, fontSize: 13}}>
                    {textsPES.identificationText}
                  </Text>
                </View>
                <TouchableOpacity style={Orderstyles.identificationButton}>
                  <Text style={Orderstyles.identificationButtonText}>
                    {'Định danh'}
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
        <View></View>
      </ScrollView>
    </SafeAreaView>
  );
};

export default OrderConfirmation;

const styles = StyleSheet.create({});
