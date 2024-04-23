import React from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'tamagui';
import Constants from 'expo-constants';
import { FlatList, StatusBar } from 'react-native';
import { AlignCenter } from '@tamagui/lucide-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';

type ApiarioSreenRouteProp = RouteProp<RootStackParamList, 'Apiario'>;

const data = [
   { id: '1', qtdColmeias: 2, localizacao: 'Rua Fulano, 264' },
 ];
 

export default function Apiario() {
   const renderItem = ({ item }) => (
      <TouchableOpacity style={{width:350, height:100, justifyContent:'center', borderRadius:10, paddingHorizontal:10, backgroundColor:'#F5E6C3'}}>
        <Text fontWeight={'bold'} fontSize={20} paddingBottom={20}>Apiário {item.id}</Text>
        <Text>Qtd. Colmeias: {item.qtdColmeias}</Text>
        <Text>Localização: {item.localizacao}</Text>
      </TouchableOpacity>
    );

   return (
      <View flex={1} backgroundColor='#fff'>
         <View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
         <StatusBar
            barStyle='dark-content'
            backgroundColor='#FBBA25'
            translucent
         />
         <View alignItems='center' paddingTop={20}>

          <FlatList
         data={data}
         renderItem={renderItem}
         keyExtractor={item => item.id}
    />
         </View>
            

      </View>
   )
}
