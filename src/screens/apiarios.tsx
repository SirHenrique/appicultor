import React from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'tamagui';
import Constants from 'expo-constants';
import { StatusBar } from 'react-native';

type ApiarioSreenRouteProp = RouteProp<RootStackParamList, 'Apiario'>;

export default function Apiario() {
   return (
      <View flex={1} backgroundColor='#fff'>
         <View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
         <StatusBar
            barStyle='dark-content'
            backgroundColor='#FBBA25'
            translucent
         />
      </View>
   )
}
