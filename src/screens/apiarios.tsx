import React from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import { View, Text } from 'tamagui';
import Constants from 'expo-constants';
import { FlatList, StatusBar } from 'react-native';
import { AlignCenter } from '@tamagui/lucide-icons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { Ionicons } from '@expo/vector-icons';
import { Session } from '@supabase/supabase-js';
import { SafeAreaView } from 'react-native-safe-area-context';


const data = [
   { id: '1', qtdColmeias: 2, localizacao: 'Rua Fulano, 264' },
 ];
 


export default function Apiario({ session }: { session: Session }) {
   const navigation: any = useNavigation();

   const renderItem = ({ item } : {item: any} ) => (
      <TouchableOpacity style={{width:350, height:100, justifyContent:'center', borderRadius:10, paddingHorizontal:10, backgroundColor:'#F5E6C3'}}>
        <View flexDirection='row' justifyContent='space-between'>
        <Text fontWeight={'bold'} fontSize={20} paddingBottom={20}>Apiário {item.id}</Text>
        <View flexDirection='row'>
        <TouchableOpacity style={{backgroundColor:'#FFBC00', marginRight:15, borderRadius:5, height:40, width:40, alignItems:'center', justifyContent:'center'}}>
         <Ionicons name='pencil' size={30} color={'#fff'}/>
        </TouchableOpacity>
        <TouchableOpacity style={{backgroundColor:'#F11010',borderRadius:5, height:40, width:40,alignItems:'center', justifyContent:'center'}}>
         <Ionicons name='trash' size={30} color={'#fff'}/>
        </TouchableOpacity>
        </View>

        </View>
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
<View flexDirection='row' alignItems='center' justifyContent='space-between'>
         <TouchableOpacity onPress={() => navigation.navigate('Home')} style={{backgroundColor:'#fff', width:55, borderRadius:60, marginLeft:5}}>
                <Ionicons
                    name={'arrow-back'}
                    color={'#FBBA25'}
                    size={55}
      
                  />
         </TouchableOpacity>

         <TouchableOpacity onPress={() => navigation.navigate('CadastrarApiario')} style={{backgroundColor:'#fff', width:55, borderRadius:60, marginRight:5}}>
                <Ionicons
                    name={'add'}
                    color={'#FBBA25'}
                    size={55}
      
                  />
         </TouchableOpacity>
</View>
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
