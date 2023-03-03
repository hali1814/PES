import { StyleSheet, Text, View } from 'react-native'
import React, { useEffect } from 'react'
import {
  Login,
  Register
} from "./src/pages/login";

import { NavigationContainer } from "@react-navigation/native";

import MyTab from './src/navigation/Index'
import { login } from './src/api/authservice/UserService'
import UserNavigation from './src/api/authservice/UserNavigation';
import AppNavigation from './src/navigation/AppNavigation';
import { UserContextProvider } from './src/api/authservice/UserContext';


const App = () => {

  // const checkLogin = async () => {
  //   const data = await login('', '123')
  //   console.log('===>', data)
  // }




  // useEffect(() => {
  //   checkLogin()
  // }, [])


  return (
    // <NavigationContainer>
    //   <MyTab />
    // </NavigationContainer>

    // <Register/>
    // <NavigationContainer>
    //   <UserNavigation />
    // </NavigationContainer>
    <UserContextProvider>
      <AppNavigation />
    </UserContextProvider>
  )
}

export default App

