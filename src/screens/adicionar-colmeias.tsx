import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import Constants from "expo-constants";
import React, { useState } from "react";
import { Alert, Keyboard, StatusBar, TouchableOpacity, TouchableWithoutFeedback } from "react-native";
import { Button, Checkbox, Input, Label, View, Text } from "tamagui";
import { TextInputMask } from 'react-native-masked-text';
import { Check } from "@tamagui/lucide-icons";
import { colmeia } from "@/@types/colmeia";
import useColmeiaStore from "@/store/colmeias";


export default function CadastroColmeia({ session }: { session: Session},) {
  const navigation: any = useNavigation();
  const [dataIns, setDataIns] = useState("")
  const [quadroNinho, setQuadroNinho] = useState(false);
  const [quadroMelgueira, setQuadroMelgueira] = useState(false);
  const [especie, setEspecie] = useState("");
  const [qtdAbelhas, setQtdAbelhas] = useState(0);
  const [qtdQuadros, setQtdQuadros] = useState(0);
  const { colmeias, setColmeias } = useColmeiaStore();
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

  function Validar() {
    if(dataIns.length < 10) {
      Alert.alert("Data Inválida!", "Favor inserir uma data válida!");
      return false;
    }
    else if(!qtdAbelhas) {
      Alert.alert("Informe o campo!", "Favor informar a quantidade de Abelhas!");
      return false;
    }
    else if(!qtdQuadros) {
      Alert.alert("Informe o campo!", "Favor informar a quantidade de Quadros!");
      return false;
    }
    else if(!especie){
      Alert.alert("Informe o campo!", "Favor informar a especie!");
      return false;
    }
    else if(!quadroMelgueira && !quadroNinho) {
      Alert.alert("Informe o campo!", "Favor informar o tipo de Quadro!");
      return false;
    }
    else {
      return true;
    }
  }

  function handleAdicionar() {
    let validado = Validar()
    if(validado) {
      const [day, month, year] = dataIns.split('/').map(Number);
      const data = new Date(year, month - 1, day)
      
      let colmeia: any = {
        qtdAbelhas,
        qtdQuadros,
        dataInstalacao: data.toISOString(),
        especie,
        tipoQuadros: quadroNinho ? `Quadro de Ninho` : `Quadro de Melgueira`
      }

        setColmeias([...colmeias, colmeia])

      navigation.navigate('CadastrarApiario')
    }
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

  
<TouchableOpacity onPress={() => navigation.navigate('CadastrarApiario')} style={{backgroundColor:'#fff', width:55, borderRadius:60, marginLeft:5}}>
            <Ionicons
            name={'arrow-back'}
            color={'#FBBA25'}
            size={55}
            />
</TouchableOpacity>
<View marginHorizontal={10} gap={10}>
  <View>
    <Label fontWeight={'bold'}>Data Instalação</Label>
    <TextInputMask
          type={'datetime'}
          options={{
            format: 'DD/MM/YYYY',
          }}
          placeholder="DD/MM/YYYY"
          value={dataIns}
          onChangeText={text => setDataIns(text)}
          keyboardType="numeric"
              style={{
                height: 50,
                borderColor: '#FBBA25',
                borderWidth: 1,
                width: '45%',
                paddingHorizontal: 10,
                borderRadius: 10,
              }}
            />
    </View>
    <View flexDirection="row">
      <View width={'45%'}>
      <Label fontWeight={'bold'}>Qtd. Abelhas</Label>
      <Input value={qtdAbelhas.toString()} keyboardType="numeric" onChangeText={text => setQtdAbelhas(Number(text))} backgroundColor={'#fff'} borderColor="$appPrimary50"  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="abelhas"/>
      </View>

      <View marginLeft={25} width={'45%'}>
      <Label fontWeight={'bold'}>Qtd. Quadros</Label>
      <Input value={qtdQuadros.toString()} onChangeText={text => setQtdQuadros(Number(text))} keyboardType="numeric" backgroundColor={'#fff'} borderColor="$appPrimary50"  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="quadros"/>
      </View>
    </View>

    <View>
    <Label fontWeight={'bold'}>Espécie</Label>   
    <Input value={especie} backgroundColor={'#fff'} onChangeText={setEspecie} borderColor="$appPrimary50"  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="especies"/>
    </View>

    <View>
    <Label fontWeight={'bold'}>Tipo de Quadros</Label>
    <View flexDirection="row">
      <TouchableOpacity
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

    <TouchableOpacity onPress={handleAdicionar} style={{paddingTop:50}}>
            <Button
            disabled
            width='100%'
            height={60}
            backgroundColor='#31DD42'
            marginHorizontal='auto'
            
            >
                <Text color='#fff' fontWeight='bold' fontSize={20}>
                    Adicionar
                </Text>
            </Button>
      </TouchableOpacity>
  </View>
</View>
</TouchableWithoutFeedback>
)
}