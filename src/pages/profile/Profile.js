import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  ImageBackground,
  Image,
  SafeAreaView,
  StatusBar,
  ActivityIndicator,
} from 'react-native';
import React, { useContext, useEffect, useState } from 'react';
import { icons } from '../../assets';
import { images } from '../../assets';
import colorsPES from '../../constants/colors';
import { UserContext } from '../../api/authservice/UserContext';
import Fonts from '../../assets/fonts/fonts';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../../styles/colors';

const Profile = ({ navigation }) => {
  const { onGetUserInfor, user, profileLoading } = useContext(UserContext);

  useEffect(() => {
    onGetUserInfor();
    checkAvatar()
    return () => { };
  }, [user.avatar]);

  const [userAvatar, setUserAvatar] = useState(require('../../assets/images/avatar.png'))

  const checkAvatar = () => {
    user.avatar ? setUserAvatar(user.avatar) : setUserAvatar(userAvatar);
  }
  console.log('userAvatar', userAvatar)

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar barStyle="dark-content" backgroundColor={colorsPES.white} />
      <View style={styles.headerContainer}>
        <Image source={images.vectorBG} style={styles.vectorBG} />
        <View style={styles.notificationContainer}>
          <TouchableOpacity
            onPress={() => { navigation.navigate('OrderTab') }}
          >
            <Image
              source={icons.notificationIcon}
              style={{ width: 32, height: 32 }}
            />
          </TouchableOpacity>
        </View>
        <TouchableOpacity
          onPress={() => {
            navigation.push('MyProfileDetail');
          }}
          style={styles.userInforContainer}>
          <View style={styles.userInfor}>
            {
              profileLoading
                ? (<ActivityIndicator size='large' color={colorsPES.white} />)
                : (
                  <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                    <View style={styles.avatar}>
                      <Image
                        style={{ width: '100%', height: '100%', borderRadius: 100 }}
                        source={{ uri: userAvatar.toString() }}
                        resizeMode="cover"
                      />
                    </View>
                    <View style={styles.userNameContainer}>
                      <Text style={styles.usernameText}>{user.nickName}</Text>
                      <Text
                        style={StyleSheet.create({
                          fontFamily: Fonts.Work_Regular,
                          fontSize: 11,
                          color: colorsPES.white,
                        })}>
                        Xem/chỉnh sửa thông tin cá nhân
                      </Text>
                    </View>
                  </View>
                )
            }
          </View>
          <View>
            <Icon name="chevron-forward-outline" size={30} color="#ffffff" />
          </View>
        </TouchableOpacity>
        <View style={styles.navBarContainer}>
          <TouchableOpacity style={styles.navBar}>
            <Image
              source={icons.awaitingConfirmIcon}
              style={{ width: 32, height: 32 }}
            />
            <Text style={styles.navBarText}>Chờ xác nhận</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBar}>
            <Image
              source={icons.awaitingBillIcon}
              style={{ width: 32, height: 32 }}
            />
            <Text style={styles.navBarText}>Chờ lấy đơn</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBar}>
            <Image
              source={icons.onDeliveryIcon}
              style={{ width: 32, height: 32 }}
            />
            <Text style={styles.navBarText}>Đang giao hàng</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.navBar}>
            <Image source={icons.ratingIcon} style={{ width: 32, height: 32 }} />
            <Text style={styles.navBarText}>Đánh giá sản phẩm</Text>
          </TouchableOpacity>
        </View>
        <View style={styles.memberRatingContainer}>
          <Image
            source={icons.crowIcon}
            resizeMode="contain"
            style={{ position: 'absolute', opacity: 0.1 }}
          />
          <View>
            <Text
              style={{
                fontSize: 14,
                fontFamily: Fonts.Work_SemiBold,
                lineHeight: 18,
                color: colorsPES.white,
              }}>
              {'Xếp hạng thành viên'}
            </Text>
            <Text
              style={{
                fontSize: 12,
                fontFamily: Fonts.Work_Regular,
                lineHeight: 16,
                color: colorsPES.white,
              }}>
              {'Mua thêm để được thăng hạng'}
            </Text>
          </View>
          <Image source={images.memberImage} style={{ width: 102, height: 24 }} />
        </View>
      </View>
      {/* Tiện ích */}
      <View style={styles.utilityContainer}>
        <Text
          style={{
            fontFamily: Fonts.Work_SemiBold,
            fontSize: 15,
            color: colorsPES.blackText,
          }}>
          {'Tiện Ích'}
        </Text>
        <View style={styles.ulityListContainer}>
          <View style={styles.topList}>
            <TouchableOpacity
              onPress={() => navigation.push('Voucher')}
              style={styles.ulityItem}>
              <Image
                source={icons.superVoucherIcon}
                style={styles.iconUtilities}
              />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Gói siêu voucher'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ulityItem}>
              <Image source={icons.gameIcon} style={styles.iconUtilities} />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Game\nPES'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ulityItem}>
              <Image source={icons.coinEarnIcon} style={styles.iconUtilities} />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Play to\nEarn Xu'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ulityItem}>
              <Image source={icons.heartIcon} style={styles.iconUtilities} />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Sản Phẩm Yêu Thích'}</Text>
              </View>
            </TouchableOpacity>
          </View>
          <View style={styles.botList}>
            <TouchableOpacity
              onPress={() => {
                navigation.push('MyFeedback');
              }}
              style={styles.ulityItem}>
              <Image source={icons.likeIcon} style={styles.iconUtilities} />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Đánh Giá Của Tôi'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ulityItem}>
              <Image source={icons.clockIcon} style={styles.iconUtilities} />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Lịch Sử\nMua Hàng'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity style={styles.ulityItem}>
              <Image
                source={icons.customerSupportIcon}
                style={styles.iconUtilities}
              />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Hỗ Trợ Khách Hàng'}</Text>
              </View>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => {
                navigation.push('MyProfileDetail');
              }}
              style={styles.ulityItem}>
              <Image source={icons.userIcon} style={styles.iconUtilities} />
              <View style={styles.tilte}>
                <Text style={styles.txtTitle}>{'Thông Tin\nCá Nhân'}</Text>
              </View>
            </TouchableOpacity>
          </View>
        </View>
      </View>
      <View style={styles.coinVoucherContainer}>
        <TouchableOpacity>
          <Image
            source={images.coinVoucherImage}
            resizeMode="cover"
            style={{ width: 343, height: 71 }}
          />
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  txtTitle: {
    textAlign: 'center',
    fontFamily: Fonts.Work_Medium,
    fontSize: 12,
    color: color.BLACK,
  },
  tilte: {
    height: 34,
    flexDirection: 'column',
    justifyContent: 'flex-end',
    textAlign: 'center',
  },
  coinVoucherContainer: {
    marginTop: 16,
    alignItems: 'center',
  },

  iconUtilities: {
    width: 32,
    height: 32,
  },

  botList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 24,
  },

  ulityItem: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 74,
  },

  topList: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },

  ulityListContainer: {
    marginTop: 30,
  },

  utilityContainer: {
    backgroundColor: color.WHITE,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },

  memberRatingContainer: {
    marginHorizontal: 16,
    marginTop: 16,
    height: 63,
    backgroundColor: '#0F294D',
    borderTopLeftRadius: 8,
    borderTopRightRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  navBarText: {
    fontFamily: Fonts.Work_Medium,
    fontSize: 13,
    color: colorsPES.white,
    lineHeight: 18,
    marginTop: 8,
    textAlign: 'center',
  },

  navBar: {
    justifyContent: 'center',
    alignItems: 'center',
    width: 70,
    height: 76,
  },

  navBarContainer: {
    width: '100%',
    height: 108,
    marginTop: 25,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
  },

  usernameText: {
    color: colorsPES.white,
    fontFamily: Fonts.Work_SemiBold,
    fontSize: 15,
    lineHeight: 20,
  },

  userNameContainer: {
    marginLeft: 12,
  },

  avatar: {
    width: 54,
    height: 54,
    borderRadius: 100,
  },

  userInfor: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  userInforContainer: {
    flexDirection: 'row',
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'space-between',
  },

  notificationContainer: {
    flexDirection: 'row',
    paddingVertical: 12,
    paddingHorizontal: 16,
    justifyContent: 'flex-end',
  },

  vectorBG: {
    width: '100%',
    position: 'absolute',
  },

  headerContainer: {
    width: '100%',
    height: 318,
    backgroundColor: colorsPES.borderColorBlue,
  },

  container: {
    flex: 1,
    paddingVertical: 25,
  },
});
