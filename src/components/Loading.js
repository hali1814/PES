import React from 'react';
import {
  Modal,
  Image,
  TouchableOpacity,
  StyleSheet,
  View,
  Text,
  ActivityIndicator
} from 'react-native';
import colorsPES from '../constants/colors';
import Icon from 'react-native-vector-icons/Ionicons';
import color from '../styles/colors';
import Fonts from '../assets/fonts/fonts';

export default function ConfirmDialog({
  visible,
  onPress,
  message,
  onCancelPress,
  confirmMessage,
}) {
  return (
    <Modal visible={visible} animationType="slide" transparent>
      <View style={styles.container}>
        <View style={styles.background}>
          <ActivityIndicator size="large" color="#0000ff" animating={true}/>
        </View>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    paddingHorizontal: 10,
    alignItems: 'center'
  },

  background: {
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: 10,
    paddingBottom: 20,
    borderRadius: 4,
    width: 120,
    height: 80
  },
});
