import {ScrollView, StyleSheet, Text, View} from 'react-native';
import React from 'react';
import color from '../../styles/colors';

const Notification = () => {
  return (
    <ScrollView style={{height: '100%', backgroundColor: color.MAIN}}>
      <View
        style={{
          backgroundColor: color.TEXT_ERROR,
        }}>
        <View style={{width: 50, height: 100}}></View>
      </View>
    </ScrollView>
  );
};

export default Notification;

const styles = StyleSheet.create({});
