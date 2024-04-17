import { Feather, Ionicons } from '@expo/vector-icons'
import { NavigationContainer } from '@react-navigation/native'
import { createStackNavigator } from '@react-navigation/stack'
import { Button, Text, View, Image } from 'tamagui'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import React from 'react'
import Login from '../screens/login'
import Home from '@/screens/home';
import Apiario from '@/screens/apiarios';
import QrCode from '@/screens/qr-code';

export type RootStackParamList = {
  Overview: undefined
  Login: { name: string }
  Home: { name: string }
  Apiario: { name: string }
  Menu: { name: string }
  QrCode: { name: string }
}

const Stack = createStackNavigator<RootStackParamList>()
const Tab = createBottomTabNavigator();


export default function RootStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Login' screenOptions={{ headerShown: false }}>
        <Stack.Screen name='Login' component={Login} />
        <Stack.Screen name='Menu'>
          {() => (
            <Tab.Navigator screenOptions={{
              tabBarStyle: {
                borderTopWidth: 0
              },
              tabBarActiveTintColor: '#FBBA25'
            }}>
              <Tab.Screen name='Home' options={{
                headerShown: false, tabBarIcon: ({ color, focused }) => (
                  <Ionicons
                    name={focused ? 'home' : 'home-outline'}

                    size={32}
                    color={color}

                  />
                ),
              }} component={Home} ></Tab.Screen>

              <Tab.Screen name='QrCode' options={{
                headerShown: false, tabBarLabel: '',
                tabBarIcon: () => (
                  <View
                    style={{
                      width: 60,
                      height: 60,
                      backgroundColor: '#FBBA25',
                      borderRadius: 100,

                      marginBottom: 100,
                    }}
                    width={60}
                    height={60}
                    marginBottom={24}
                    borderRadius={100}
                    backgroundColor={'#FBBA25'}
                    alignItems='center'
                    justifyContent='center'
                  >
                    <Ionicons name='qr-code' size={30} />
                  </View>

                ),
                
              }} component={QrCode} ></Tab.Screen>



              <Tab.Screen name='Meus Apiarios' options={{
                tabBarLabel: 'Meus Apiários',
                headerShown: false, tabBarIcon: ({ color, focused }) => {
                  if (focused) {
                    return (<Image width={40} height={32} source={require('../../assets/apiarioAtivo.png')} />)
                  }
                  else {
                    return (<Image width={40} height={32} source={require('../../assets/Apiario.png')} />)
                  }
                },
              }} component={Apiario} ></Tab.Screen>
            </Tab.Navigator>
          )}
        </Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  )
}
