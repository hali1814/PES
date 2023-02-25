import {
  Image,
  SafeAreaView,
  ScrollView,
  StyleSheet,
  Text,
  View,
  Dimensions,
  TouchableOpacity,
} from 'react-native';
import React, {Component, useState, useEffect} from 'react';
import color from '../../styles/colors';
import {icons, images} from '../../assets';
import {
  ContainerShop,
  headerContainerShop,
  phoneText,
  shopNameText,
  showReaching,
  txtVoucher,
  userNameContainer,
  voucherContainer,
  voucherText,
} from './components/styles';
import {textsPES} from '../../constants/string';
import PESShop from '../../components/PESShop';
import PESProductDescription from '../../components/PESProductDescription';
import PESRelatedProducts from '../../components/PESRelatedProducts';
const {width: screenWidth} = Dimensions.get('window');

const Detail = () => {
  const [imageList, setImageList] = useState([]);
  const [currentImage, setCurrentImage] = useState(1);
  useEffect(() => {
    const data = [
      {
        image: (
          <Image
            source={{
              uri: 'https://www.highsnobiety.com/static-assets/thumbor/odr-GZF4oeFP4GLy0xacOrF8LV4=/1600x1067/www.highsnobiety.com/static-assets/wp-content/uploads/2019/02/18160640/best-jordan-sneakers-2019-11.jpg',
            }}
            resizeMode="stretch"
            style={styles.imageStyle}
          />
        ),
      },
      {
        image: (
          <Image
            source={images.detail_image}
            resizeMode="stretch"
            style={styles.imageStyle}
          />
        ),
      },
      {
        image: (
          <Image
            source={images.detail_image}
            resizeMode="stretch"
            style={styles.imageStyle}
          />
        ),
      },
      {
        image: (
          <Image
            source={images.detail_image}
            resizeMode="stretch"
            style={styles.imageStyle}
          />
        ),
      },
    ];
    setImageList(data);
  }, []);

  //Bộ đếm số ảnh
  const handleScroll = e => {
    if (!e) {
      return;
    }
    const {nativeEvent} = e;
    if (nativeEvent && nativeEvent.contentOffset) {
      const currentOffset = nativeEvent.contentOffset.x;
      let imageIndex = 0;
      if (nativeEvent.contentOffset.x > 0) {
        imageIndex = Math.floor(
          (nativeEvent.contentOffset.x + screenWidth / 2) / screenWidth,
        );
      }
      setCurrentImage(imageIndex);
    }
  };

  return (
    <View
      style={{
        height: '100%',
        backgroundColor: color.BACKGROUDITEM,
      }}>
      <View
        style={{
          position: 'relative',
          justifyContent: 'flex-end',
        }}>
        <View>
          <ScrollView
            horizontal
            pagingEnabled
            onScroll={handleScroll}
            contentContainerStyle={{
              width: screenWidth * imageList.length,
              height: 375,
            }}>
            {imageList.map((e, index) => (
              <View key={index.toString()}>{e.image}</View>
            ))}
          </ScrollView>
          <SafeAreaView
            style={{
              position: 'absolute',
              width: screenWidth,
              flexDirection: 'row',
              justifyContent: 'space-between',
            }}>
            <TouchableOpacity style={{paddingHorizontal: 16}}>
              <Image
                source={icons.chevronBackWhite_icon}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>

            <TouchableOpacity style={{paddingHorizontal: 16}}>
              <Image
                source={icons.heartWhite_icon}
                style={{width: 24, height: 24}}
              />
            </TouchableOpacity>
          </SafeAreaView>
        </View>
        <View
          style={{
            position: 'absolute',
            marginLeft: 16,
            paddingBottom: 45,
          }}>
          <View
            style={{
              width: 30,
              height: 20,
              borderRadius: 60,
              backgroundColor: 'rgba(0,0,0,0.4)',
              alignItems: 'center',
              justifyContent: 'center',
            }}>
            <Text
              style={{
                fontSize: 12,
                fontWeight: '400',
                color: color.WHITE,
                width: 18,
                height: 16,
              }}>
              {currentImage}/8
            </Text>
          </View>
        </View>
      </View>
      <View
        style={{
          position: 'absolute',
          width: screenWidth,
          height: 115,
          paddingHorizontal: 12,
          top: 342,
        }}>
        <View
          style={{
            backgroundColor: color.WHITE,
            height: '100%',
            borderRadius: 4,
            paddingHorizontal: 12,
            paddingVertical: 16,
            flexDirection: 'column',
          }}>
          <View style={{width: '100%'}}>
            <Text style={{fontWeight: '600', fontSize: 18}}>
              Giày MLB Bigball Chunky Mesh LikeNew Màu Trắng{' '}
            </Text>
          </View>
          <View
            style={{
              width: '100%',
              marginTop: 8,
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
            }}>
            <View
              style={{
                height: 20,
                backgroundColor: '#F0F2F5',
                borderRadius: 2,
                paddingHorizontal: 8,
                justifyContent: 'center',
              }}>
              <Text
                style={{
                  fontWeight: '400',
                  fontSize: 13,
                  color: color.TEXT_SECOND,
                }}>
                {'Giày Authentic'}
              </Text>
            </View>
            <Text style={{fontWeight: '600', fontSize: 20}}>
              1.399.999{'đ'}
            </Text>
          </View>
        </View>
      </View>
      {/* Voucher */}
      <View style={{paddingHorizontal: 12, marginTop: 90}}>
        <View style={voucherContainer}>
          <View style={{flexDirection: 'row'}}>
            <Image
              source={icons.voucher_icon}
              style={{width: 35, height: 35}}
            />
            <View style={{alignSelf: 'center', marginLeft: 12}}>
              <Text style={voucherText}>{textsPES.txtVoucher}</Text>
            </View>
          </View>
          <TouchableOpacity onPress={() => {}} style={{flexDirection: 'row'}}>
            <Text style={txtVoucher}>{textsPES.txtDetail}</Text>
            <Image
              source={icons.chevronRight_icon}
              style={{width: 16, height: 16, marginLeft: 2}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <ScrollView pagingEnabled>
        {/* AdminShop */}
        <View key={[]} style={{paddingHorizontal: 12, marginTop: 8}}>
          <View style={ContainerShop}>
            <View style={headerContainerShop}>
              <View style={{flexDirection: 'row'}}>
                <Image
                  source={images.user2_image}
                  style={{width: 32, height: 32}}
                />
                <View style={userNameContainer}>
                  <Text style={shopNameText}>{textsPES.txtShopname}</Text>
                  <Text style={phoneText}>{textsPES.txtPhone}</Text>
                </View>
              </View>
              <TouchableOpacity>
                <Image
                  source={icons.crown_icon}
                  style={{
                    width: 24,
                    height: 24,
                  }}
                />
              </TouchableOpacity>
            </View>

            <View style={{padding: 12}}>
              <View style={showReaching}>
                <PESShop
                  imgUri={icons.shopBag_icon}
                  txtShop={'Đã bán:'}
                  txt2Shop={'200'}
                />
                <PESShop
                  imgUri={icons.storeHeart_icon}
                  txtShop={'Thích:'}
                  txt2Shop={'200'}
                />
                <PESShop
                  imgUri={icons.star_icon}
                  txtShop={'Đánh giá:'}
                  txt2Shop={'4.5'}
                />
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            height: 162,
            paddingHorizontal: 12,
            marginTop: 8,
          }}>
          <View
            style={{
              backgroundColor: color.WHITE,
              height: 162,
              borderRadius: 4,
              flexDirection: 'column',
              padding: 12,
            }}>
            <View>
              <View
                style={{
                  flexDirection: 'row',
                  justifyContent: 'space-between',
                  alignItems: 'center',
                }}>
                <Text
                  style={{fontWeight: '600', fontSize: 16, color: color.BLACK}}>
                  {'Mô tả chi tiết'}
                </Text>
                <TouchableOpacity
                  style={{flexDirection: 'row', alignItems: 'center'}}>
                  <Text
                    style={{
                      fontWeight: '600',
                      fontSize: 13,
                      color: color.MAIN,
                    }}>
                    {'Chi tiết'}
                  </Text>
                  <Image
                    source={icons.chevronRight_icon}
                    style={{width: 16, height: 16}}
                  />
                </TouchableOpacity>
              </View>
              <View
                style={{
                  marginTop: 16,
                  height: 100,
                }}>
                <View>
                  <PESProductDescription
                    icon={icons.color_icon}
                    text1={'Màu'}
                    text2={'Trắng, xanh, vàng'}
                  />
                  <View style={{paddingTop: 8}}>
                    <PESProductDescription
                      icon={icons.size_icon}
                      text1={'Size'}
                      text2={'37 - 45'}
                    />
                  </View>
                  <View style={{paddingTop: 8}}>
                    <PESProductDescription
                      icon={icons.location_icon}
                      text1={'Khu vực'}
                      text2={'Hồ Chí Minh, Hà Nội'}
                    />
                  </View>
                  <View style={{paddingTop: 8}}>
                    <PESProductDescription
                      icon={icons.local_icon}
                      text1={'Thương hiệu'}
                      text2={'Sneaker MLB'}
                    />
                  </View>
                </View>
              </View>
            </View>
          </View>
        </View>
        <View
          style={{
            marginTop: 8,
            height: '100%',
            marginHorizontal: 12,
          }}>
          <View>
            <View>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
            <View style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
            <View style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
            <TouchableOpacity style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </TouchableOpacity>
            <View style={{marginTop: 8}}>
              <PESRelatedProducts
                imageProducts={images.detail_image}
                imageUser={images.user2_image}
                title={'Giày Bán rồi'}
                description={
                  'Hình hài bé nhỏ, thân hình cường tráng, xem phim kiếm hiệp'
                }
                money={'2.000.000'}
              />
            </View>
          </View>
        </View>
      </ScrollView>
      <View style={{height: 75, backgroundColor: color.WHITE}}>
        <View
          style={{
            height: 61,
            paddingHorizontal: 16,
            paddingVertical: 8,
            flexDirection: 'row',
            justifyContent: 'space-between',
            alignItems: 'center',
          }}>
          <View style={{flexDirection: 'column'}}>
            <View style={{height: 20, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: '600',
                  fontSize: 14,
                }}>
                {'Thanh Toán'}
              </Text>
            </View>
            <View style={{height: 20, justifyContent: 'center'}}>
              <Text
                style={{
                  fontWeight: '700',
                  fontSize: 18,
                  color: color.MAIN,
                }}>
                {'2.000.000'}đ
              </Text>
            </View>
          </View>
          <TouchableOpacity>
            <View
              style={{
                width: 44,
                height: 44,
                borderRadius: 60,
                justifyContent: 'center',
                alignItems: 'center',
                borderColor: color.MAIN,
                borderWidth: 0.5,
              }}>
              <Image
                source={icons.cartAdd_icon}
                style={{width: 32, height: 32}}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity>
            <View
              style={{
                width: 140,
                height: 44,
                backgroundColor: color.MAIN,
                borderRadius: 60,
              }}>
              <View
                style={{
                  alignItems: 'center',
                  width: 140,
                  height: 44,
                  justifyContent: 'center',
                }}>
                <Text
                  style={{
                    fontWeight: '500',
                    fontSize: 16,
                    color: color.WHITE,
                  }}>
                  {'Mua ngay'}
                </Text>
              </View>
            </View>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default Detail;

const styles = StyleSheet.create({
  imageStyle: {
    width: screenWidth,
    height: 375,
  },
});
