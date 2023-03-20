import { StyleSheet, Text, View, TouchableOpacity, Image, FlatList, SafeAreaView } from 'react-native'
import React from 'react'
import { icons } from '.././../assets';
import { images } from '.././../assets';
import colorsPES from '../../constants/colors';
import PESHeader from '../../components/PESHeader';


const DATA = [
    {
        id: 1,
        img: images.hoodieImage,
        name: 'Áo Hoodie',
        desciption: 'Áo hoodie local brand (2nd vintage)',
        price: 260.000,
        rating: images.ratingStarImage,
        avatar: icons.vietnamIcon,
    },
    {
        id: 2,
        img: images.hoodieImage,
        name: 'Áo Hoodie',
        desciption: 'Áo hoodie local brand (2nd vintage)',
        price: 260.000,
        rating: images.ratingStarImage,
        avatar: icons.vietnamIcon,
    },
    {
        id: 3,
        img: images.hoodieImage,
        name: 'Áo Hoodie',
        desciption: 'Áo hoodie local brand (2nd vintage)',
        price: 260.000,
        rating: images.ratingStarImage,
        avatar: icons.vietnamIcon,
    },
]



const MyFeedback = ({ navigation }) => {
    return (
        <SafeAreaView style={styles.container}>
            <PESHeader title={'Đánh giá của tôi'} onPress={() => { navigation.navigate('MyTab') }} />
            {/* <View style={styles.headerContainer}>
                <TouchableOpacity onPress={() => { navigation.pop() }}>
                    <Image source={icons.backIcon} />
                </TouchableOpacity>
                <Text style={styles.headerText}>Đánh giá của tôi</Text>
            </View> */}
            <FlatList
                data={DATA}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.listContainer}>
                        <Image resizeMode='cover' source={item.img} />
                        <View style={styles.detail}>
                            <View style={styles.productDetail}>
                                <Text style={({ fontWeight: '600', fontSize: 14, color: colorsPES.black })}>{item.name}</Text>
                                <Text style={({ fontWeight: '400', fontSize: 14, color: colorsPES.transText })}>{item.desciption}</Text>
                            </View>
                            <View style={styles.priceDetail}>
                                <Text style={({ fontWeight: '600', fontSize: 15, color: colorsPES.black })}>{item.price}.000đ</Text>
                                <View style={styles.ratingContainer}>
                                    <Image source={item.rating} />
                                    <View style={({ width: 28, height: 28, borderRadius: 30 })}>
                                        <Image source={item.avatar} resizeMode='cover' />
                                    </View>
                                </View>
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
            />
        </SafeAreaView>
    )
}

export default MyFeedback

const styles = StyleSheet.create({

    ratingContainer: {
        flexDirection: 'row',
        justifyContent: 'center',
    },

    priceDetail: {
        marginTop: 6,
        flexDirection: 'row',
        justifyContent: 'space-around',
        alignItems: 'center',
    },

    productDetail: {
        width: '80%',
    },

    detail: {
        marginLeft: 12,
    },

    listContainer: {
        marginTop: 16,
        padding: 12,
        flexDirection: 'row',
    },

    headerText: {
        fontWeight: '700',
        fontSize: 18,
        lineHeight: 24,
        color: colorsPES.blackText,
        marginLeft: 120
    },

    headerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        paddingVertical: 10,
        paddingHorizontal: 16,
    },

    container: {
        marginHorizontal: 16,
    },
})