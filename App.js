import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import login from './src/pages'
import Login from './src/pages/login/Login'
import Profile from './src/pages/profile/Profile'
import Voucher from './src/pages/profile/Voucher'

const App = () => {
  return (
    <View>
      {/* <Login/> */}
      {/* <Profile/> */}
      <Voucher/>
    </View>
  )
}

export default App

const styles = StyleSheet.create({

})