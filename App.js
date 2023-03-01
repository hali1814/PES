import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import Login from './src/pages/login/Login'
import Profile from './src/pages/profile/Profile'
import Voucher from './src/pages/profile/Voucher'
import MyFeedback from './src/pages/profile/MyFeedback'
import CustomerSupport from './src/pages/profile/CustomerSupport'
import MyProfileDetail from './src/pages/profile/MyProfileDetail'
import ChangePassword from './src/pages/profile/ChangePassword'
import ChangeAddress from './src/pages/profile/ChangeAddress'
import AddAddress from './src/pages/profile/AddAddress'
import { NavigationContainer } from "@react-navigation/native";
import MyTab from './src/navigation/Index'
import { login } from './src/api/authservice/UserService'


const App = () => {

  const checkLogin = async () => {
    const data = await login('0918865377', '123')
    console.log('===>', data)
  }




  useEffect(() => {
    checkLogin()
  }, [])


  return (
    // <NavigationContainer>
    //   <MyTab />
    // </NavigationContainer>
    <Login />
  )
}

export default App

const styles = StyleSheet.create({

})