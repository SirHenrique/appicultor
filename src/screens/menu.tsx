import React from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text, Button, Image } from 'tamagui';
import Constants from 'expo-constants';
import { StatusBar } from 'react-native';

type MenuSreenRouteProp = RouteProp<RootStackParamList, 'Menu'>;



export default function Menu() {
  const router = useRoute<MenuSreenRouteProp>();

  return (
    <View flex={1}>
  <View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
  <StatusBar
    barStyle='dark-content'
    backgroundColor='#FBBA25'
    translucent
  />
  <View paddingTop={150} paddingBottom={100} alignItems='center'>
    <View>
      <Image source={require('../../assets/logo-coofamel.png')} />
    </View>
  </View>

  <View paddingHorizontal={24} justifyContent='center'>
    <View flexDirection='row' justifyContent='center' gap={25}>
      <Button
        size="$5"
        width={150}
        pressStyle={{ backgroundColor: "$appSecondary100" }}
        height={150}
        backgroundColor="$appPrimary50"
      >
        <Text fontWeight={'bold'} fontSize={18}>Ler QR Code</Text>
      </Button>
      <Button
        size="$5"
        width={150}
        pressStyle={{ backgroundColor: "$appSecondary100" }}
        height={150}
        backgroundColor="$appPrimary50"
      >
        <Text fontWeight={'bold'} fontSize={18}>Meus Apíarios</Text>
      </Button>
    </View>
  </View>
</View>

  )
}