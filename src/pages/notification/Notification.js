import {
  ScrollView,
  StyleSheet,
  Text,
  View,
  Image,
  FlatList,
  TouchableOpacity,
} from 'react-native';
import React from 'react';
import color from '../../styles/colors';
import {icons, images} from '../../assets';
import Fonts from '../../assets/fonts/fonts';

const Notification = () => {
  const notifications = [
    {
      id: 1,
      title: 'Bạn đã đặt hàng thành công!',
      content: 'Mã sản phẩm "75488484848" Giày MLB Royal Collection ',
      image: images.detail_image,
    },
    {
      id: 2,
      title: 'Bạn đã đặt hàng thành công!',
      content: 'Mã sản phẩm "75488484848" Giày MLB Royal Collection ',
      image: images.detail_image,
    },
    {
      id: 3,
      title: 'Bạn đã đặt hàng thành công!',
      content: 'Mã sản phẩm "75488484848" Giày MLB Royal Collection ',
      image: images.detail_image,
    },
  ];
  const renderItem = ({item}) => (
    <View
      style={{
        marginTop: 12,
        paddingVertical: 12,
        height: 104,
        paddingHorizontal: 12,
        backgroundColor: '#EAEFFF',
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        borderRadius: 4,
      }}>
      <View
        style={{
          height: '100%',
          width: '75%',
          flexDirection: 'column',
          justifyContent: 'space-between',
        }}>
        <Text
          style={{
            color: '#66BD50',
            fontFamily: Fonts.Work_Regular,
            fontSize: 13,
          }}>
          {item.title}
        </Text>
        <Text
          style={{
            fontFamily: Fonts.Work_Regular,
            fontSize: 13,
            color: color.BLACK,
          }}>
          {item.content}
        </Text>
        <View style={{width: '36%'}}>
          <TouchableOpacity
            style={{
              flexDirection: 'row',
              backgroundColor: color.MAIN,
              justifyContent: 'space-between',
              alignItems: 'center',
              paddingHorizontal: 8,
              paddingVertical: 4,
              borderRadius: 4,
            }}>
            <Image source={icons.BoxSearchIcon} style={{width: 8, height: 8}} />
            <Text
              style={{
                fontFamily: Fonts.Man_Regular,
                color: color.BLACK,
                fontSize: 8,
                color: color.WHITE,
              }}>
              {'Kiểm Tra Đơn Hàng'}
            </Text>
          </TouchableOpacity>
        </View>
      </View>
      <Image
        source={item.image}
        style={{height: 80, width: 80, borderRadius: 4}}
      />
    </View>
  );

  return (
    <ScrollView style={styles.Container}>
      {/* TitleNotification */}
      <View>
        <View style={styles.ContainerHeader}>
          <Text style={styles.TitleText}>{'Notifications'}</Text>
          <View style={styles.CustomImage}>
            <Image source={icons.FilterIcon} style={{height: 16, width: 16}} />
          </View>
        </View>
        <Text style={{fontFamily: Fonts.Man_Regular, color: color.BLACK}}>
          {'Bạn có 3 thông báo mới trong hôm nay'}
        </Text>
      </View>
      {/* FlatListItem */}
      <FlatList
        data={notifications}
        renderItem={renderItem}
        keyExtractor={item => item.id.toString()}
      />
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({
  Container: {
    height: '100%',
    backgroundColor: color.WHITE,
    flex: 1,
    paddingHorizontal: 16,
  },
  ContainerHeader: {
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    width: '100%',
    justifyContent: 'space-between',
  },
  TitleText: {
    fontFamily: Fonts.Man_SemiBold,
    fontSize: 24,
    color: color.BLACK,
  },
  CustomImage: {
    width: 32,
    height: 32,
    backgroundColor: 'rgba(88, 101, 242, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 360,
  },
});
