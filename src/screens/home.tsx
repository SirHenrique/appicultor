import React from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text, Button, Image } from 'tamagui';
import Constants from 'expo-constants';
import { StatusBar, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type MenuSreenRouteProp = RouteProp<RootStackParamList, 'Home'>;



export default function Home() {
  const router = useRoute<MenuSreenRouteProp>();
  const navigation: any = useNavigation();
  return (
    <View flex={1} backgroundColor='#fff'>
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
          <TouchableOpacity
            style={{ width: 150, height: 150, backgroundColor: '#FBBA25', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
            onPress={() => navigation.navigate('QrCode')}
            
          >
            <Ionicons name='qr-code' size={65} style={{ paddingBottom: 10 }} />
            <Text fontWeight={'bold'} fontSize={18}>Ler QR Code</Text>
          </TouchableOpacity>

          <TouchableOpacity
            style={{ width: 150, height: 150, backgroundColor: '#FBBA25', alignItems: 'center', justifyContent: 'center', borderRadius: 15 }}
            onPress={() => navigation.navigate('Meus Apiarios')}
          >
            <Image width={80} height={80} source={require('../../assets/Apiario.png')} />
            <Text fontWeight={'bold'} fontSize={18}>Meus Apiários</Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>

  )
}