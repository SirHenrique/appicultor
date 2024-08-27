import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { Alert, Keyboard, Pressable, StatusBar, TextInput, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Button, Checkbox, Input, Label, View, Text } from "tamagui";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import { Check } from "@tamagui/lucide-icons";

import useColmeiaStore from "@/store/colmeias";
import moment from "moment";
import { apiario } from "@/@types/apiario";
import { supabase } from "@/utils/supabase";
import { colmeia } from "@/@types/colmeia";

interface ConsultarColmeiaProps {
  route: {
      params: {
          session: Session,
          apiario: apiario,
          tipo: string,
          colmeia: colmeia
      }
  }
  navigation: any
}

export default function ConsultaColmeia({route, navigation} : ConsultarColmeiaProps) {
  const [dataIns, setDataIns] = useState<Date | null>(new Date(route.params.colmeia.dataInstalacao));
  const [quadroNinho, setQuadroNinho] = useState(false);
  const [quadroMelgueira, setQuadroMelgueira] = useState(false);
  const [especie, setEspecie] = useState(route.params.colmeia.especie);
  const [qtdAbelhas, setQtdAbelhas] = useState(route.params.colmeia.qtdAbelhas);
  const [qtdQuadros, setQtdQuadros] = useState(route.params.colmeia.qtdQuadros);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);


  useEffect(() => {
    if(route.params.colmeia.tipoQuadros == "Quadro de Ninho")
        setQuadroNinho(true)
    else
        setQuadroMelgueira(true)
      
  }
  ,[])
  

   function handleColmeiaNinho() {
      if(quadroMelgueira)
        setQuadroMelgueira(!quadroMelgueira)
      
      setQuadroNinho(!quadroNinho)
      }

  function handleColmeiaMelgueira() {
      if(quadroNinho)
        setQuadroNinho(!quadroNinho)

      setQuadroMelgueira(!quadroMelgueira)
  }

  


  function handleVoltar() {
    if(route.params.tipo == 'local') 
      navigation.navigate('CadastrarApiario')
    else
    navigation.navigate('ConsultaApiario',{apiario: route.params.apiario})
  }





return (
<TouchableWithoutFeedback onPress={Keyboard.dismiss}>
<View flex={1} backgroundColor='#fff'>
<View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#FBBA25'
        translucent
      />

  
<TouchableOpacity onPress={handleVoltar} style={{backgroundColor:'#fff', width:55, borderRadius:60, marginLeft:5}}>
            <Ionicons
            name={'arrow-back'}
            color={'#FBBA25'}
            size={55}
            />
</TouchableOpacity>
<View marginHorizontal={10} gap={10}>
  <View>
    <Label fontWeight={'bold'}>Data Instalação</Label>
    <Pressable disabled={true} style={{zIndex:999, width:'45%'}} >
        <TextInput
        numberOfLines={1}
        editable={false}
        textAlign="center"
        onPress={() => setDatePickerVisibility(true)}
        placeholder="📅 Selecione a Data"
        value={dataIns ? moment(dataIns).format("DD/MM/YYYY") : ""}
        style={{height:50, backgroundColor: '#fff', borderWidth:1,width:'100%',borderRadius:15,borderColor:'#fbba25',fontFamily: 'Inter-Medium'}}
        />
        </Pressable>

    </View>
    <View flexDirection="row">
      <View width={'45%'}>
      <Label fontWeight={'bold'}>Qtd. Abelhas</Label>
      <Input editable={false} fontWeight='bold'  value={qtdAbelhas.toString()} keyboardType="numeric" onChangeText={text => setQtdAbelhas(Number(text))} backgroundColor={'#fff'} borderColor="$appPrimary50"  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="abelhas"/>
      </View>

      <View marginLeft={25} width={'45%'}>
      <Label fontWeight={'bold'}>Qtd. Quadros</Label>
      <Input editable={false} fontWeight='bold'  value={qtdQuadros.toString()} onChangeText={text => setQtdQuadros(Number(text))} keyboardType="numeric" backgroundColor={'#fff'} borderColor="$appPrimary50"  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="quadros"/>
      </View>
    </View>

    <View>
    <Label fontWeight={'bold'}>Espécie</Label>   
    <Input editable={false} fontWeight='bold'  value={especie} backgroundColor={'#fff'} onChangeText={setEspecie} borderColor="$appPrimary50"  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="especies"/>
    </View>

    <View>
    <Label fontWeight={'bold'}>Tipo de Quadros</Label>
    <View flexDirection="row">
      <TouchableOpacity
      disabled={true}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginVertical: 10,
                width: '50%',
              }}
              onPress={() => handleColmeiaNinho()}
            >
              <Checkbox
                size='$9'
                borderWidth={2}
                checked={quadroNinho}
                backgroundColor={quadroNinho ? '$appPrimary50' : '#fff'}
                borderColor={"$appPrimary50"}
                pointerEvents='none'
              >
                <Checkbox.Indicator>
                  <Check color='#fff' />
                </Checkbox.Indicator>
              </Checkbox>
              <Label size={"$5"}>Quadro de Ninho</Label>
            </TouchableOpacity>

            <TouchableOpacity
            disabled={true}
              style={{
                flexDirection: 'row',
                alignItems: 'center',
                gap: 5,
                marginVertical: 10,
                width: '50%',
              }}
              onPress={() => handleColmeiaMelgueira()}
            >
              <Checkbox
                size='$9'
                borderWidth={2}
                checked={quadroMelgueira}
                backgroundColor={quadroMelgueira ? '$appPrimary50' : '#fff'}
                borderColor={"$appPrimary50"}
                pointerEvents='none'
              >
                <Checkbox.Indicator>
                  <Check color='#fff' />
                </Checkbox.Indicator>
              </Checkbox>
              <Label size={"$5"}>Quadro de Melgueira</Label>
            </TouchableOpacity>
    </View>
    </View>

  </View>
</View>
</TouchableWithoutFeedback>
)
}