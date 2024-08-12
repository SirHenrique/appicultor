import { Ionicons } from "@expo/vector-icons";
import { TouchableOpacity } from "react-native";
import { View,Text } from "tamagui";

export const cardColmeia = ({ item, index } : any ) => (
    <TouchableOpacity style={{width:350, height:150, justifyContent:'center', borderRadius:10, paddingHorizontal:10, margin:10, backgroundColor:'#F5E6C3'}}>
      <View flexDirection='row' justifyContent='space-between'>
      <Text fontWeight={'bold'} fontSize={20} paddingBottom={20}>Colmeia {index + 1}</Text>
      <View flexDirection='row'>
      <TouchableOpacity style={{backgroundColor:'#FFBC00', marginRight:15, borderRadius:5, height:40, width:40, alignItems:'center', justifyContent:'center'}}>
       <Ionicons name='pencil' size={30} color={'#fff'}/>
      </TouchableOpacity>
      <TouchableOpacity style={{backgroundColor:'#F11010',borderRadius:5, height:40, width:40,alignItems:'center', justifyContent:'center'}}>
       <Ionicons name='trash' size={30} color={'#fff'}/>
      </TouchableOpacity>
      </View>

      </View>
      <Text>Qtd. Abelhas: {item.qtdAbelhas}</Text>
      <Text>Qtd. Quadros: {item.qtdQuadros}</Text>
      <Text>Tipo Quadro: {item.tipoQuadros}</Text>
      <Text>Espécie: {item.especie}</Text>
    </TouchableOpacity>
  );