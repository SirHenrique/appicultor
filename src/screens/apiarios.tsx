import React from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'tamagui';

type ApiarioSreenRouteProp = RouteProp<RootStackParamList, 'Apiario'>;

export default function Apiario() {
   return(
    <View><Text>Meus Apiários!</Text></View>
   )
}
