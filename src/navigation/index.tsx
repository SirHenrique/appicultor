import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Text } from 'tamagui'
import React from 'react'
import Login from '../screens/login'
import Menu from '../screens/menu'


export type RootStackParamList = {
  Overview: undefined
  Login: {name: string}
  Menu: { name: string }
}

const Stack = createStackNavigator<RootStackParamList>()


export default function RootStack() {
  return (
    <NavigationContainer>
      
      <Stack.Navigator initialRouteName='Login'>
        <Stack.Screen options={{headerShown: false}} name='Login' component={Login}/>
        <Stack.Screen options={{headerShown: false}} name='Menu' component={Menu} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}
