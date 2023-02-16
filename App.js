import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import login from './src/pages'
import Login from './src/pages/login/Login'
import Profile from './src/pages/profile/Profile'
import Voucher from './src/pages/profile/Voucher'
import MyFeedback from './src/pages/profile/MyFeedback'
import CustomerSupport from './src/pages/profile/CustomerSupport'
import MyProfileDetail from './src/pages/profile/MyProfileDetail'
import ChangePassword from './src/pages/profile/ChangePassword'
import ChangeAddress from './src/pages/profile/ChangeAddress'
import AddAddress from './src/pages/profile/AddAddress'

const App = () => {
  return (
    <View>
      {/* <Login/> */}
      {/* <Profile/> */}
      {/* <Voucher/> */}
      {/* <MyFeedback /> */}
      {/* <CustomerSupport /> */}
      {/* <MyProfileDetail /> */}
      {/* <ChangePassword /> */}
      {/* <ChangeAddress /> */}
      <AddAddress />
    </View>
  )
}

export default App

const styles = StyleSheet.create({

})