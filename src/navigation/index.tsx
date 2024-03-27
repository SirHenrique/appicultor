import { Feather } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Text, View } from 'tamagui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Login from '../screens/login'
import Menu from '../screens/menu'
import Apiario from '~/screens/apiarios';
import TabRoutes from './tabNavigation';


export type RootStackParamList = {
  Overview: undefined
  Login: {name: string}
  Menu: { name: string }
  Apiario: {name: string}
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator();


export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{headerShown: false}}>
        <Stack.Screen  name='Login' component={Login}/>
        <Stack.Screen  name='Menu'> 
          {() => (
              <Tab.Navigator>
              <Tab.Screen name='Menu' options={{headerShown: false}} component={Menu}></Tab.Screen>
              <Tab.Screen name='Meus Apiários' component={Apiario}></Tab.Screen>
              </Tab.Navigator>
            )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
