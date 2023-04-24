import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
  StatusBar,
} from 'react-native';
import React, {useEffect, useContext, useState} from 'react';
import color from '../../styles/colors';
import {icons, images} from '../../assets';
import Fonts from '../../assets/fonts/fonts';
import {ProductContext} from '../../api/authservice/ProductAPI/ProductContext';
import {useIsFocused} from '@react-navigation/native';

const Notification = ({navigation}) => {
  const {getListNotification, sawNotificationContext} = useContext(ProductContext);
  const [data, setData] = useState([]);
  const isFocused = useIsFocused();
  useEffect(() => {
    if (isFocused) getAll();
  }, [isFocused]);
  const renderItem = ({item}) => (
    <View
      elevation={2}
      style={{
        paddingVertical: 12,
        height: 120,
        paddingHorizontal: 12,
        backgroundColor: item.status == 0 ? '#EAEBF6' : 'white',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
      }}>
      <TouchableOpacity
      onPress={ async ()=>{
        await sawNotificationContext(item._id)
        navigation.navigate('Bill', {_id: item.idBill})

      }}
        style={{height: '100%', width: '100%', flexDirection: 'row'}}>
        <View
          style={{
            height: '100%',
            width: '75%',
            flexDirection: 'column',
   
            paddingHorizontal: 5,
          }}>
          <Text
            style={{
              color: color.TEXT_PRIMARY,
              fontFamily: Fonts.Man_SemiBold,
              fontSize: 15,
            }}>
            {item.title}
          </Text>
          <Text
            style={{
              fontFamily: Fonts.Work_Regular,
              fontSize: 14,
              color: color.TEXT_PRIMARY,
            }}>
            {item.message}
          </Text>
          <View style={{width: '36%'}}></View>
        </View>
        <Image
          source={
            item
              ? {uri: item.imagesProduct[0]}
              : require('../../assets/images/haohoa_scanQR.png')
          }
          style={{height: 80, width: 80, borderRadius: 4}}
        />
      </TouchableOpacity>
    </View>
  );

  const getAll = async () => {
    const data = await getListNotification();
    setData(data);
  };

  return (
    <ScrollView style={styles.Container}>
      <StatusBar
        backgroundColor="#fff"
        barStyle="dark-content" // Here is where you change the font-color
      />
      {/* TitleNotification */}

      <View style={styles.ContainerHeader}>
        <Text style={styles.TitleText}>{'Notifications'}</Text>
      </View>
      {/* <View style={styles.CustomImage}>
            <Image source={icons.FilterIcon} style={{height: 16, width: 16}} />
          </View> */}
      {/* FlatListItem */}
      <FlatList
        data={data}
        scrollEnabled={false}
        renderItem={renderItem}
        keyExtractor={item => item._id.toString()}
      />
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    flex: 1,
    marginTop: StatusBar.currentHeight,
  },
  ContainerHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
    backgroundColor: 'white',
    height: StatusBar.currentHeight * 2,
    paddingHorizontal: 10,
  },
  TitleText: {
    fontFamily: Fonts.Man_SemiBold,
    fontSize: 20,
    color: color.TEXT_PRIMARY,
  },
  CustomImage: {
    width: 32,
    height: 32,
    marginTop: 20,
    backgroundColor: 'rgba(88, 101, 242, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
  },
});
