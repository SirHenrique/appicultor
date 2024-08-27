import { apiario } from "@/@types/apiario";
import { colmeia } from "@/@types/colmeia";
import { RootStackParamList } from "@/navigation";
import useColmeiaStore from "@/store/colmeias";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { Check } from "@tamagui/lucide-icons";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { Alert, FlatList, StatusBar, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input, Label, View, Text, Button, Checkbox, TextArea } from "tamagui";

interface CadastrarRelatorioProps {
  route: {
    params: {
      session: Session,
      apiario: apiario,
    }
  }
  navigation: any
}


export default function CadastroRelatorio({ route, navigation }: CadastrarRelatorioProps) {
  const [localizacao, setLocalizacao] = useState(route.params.apiario.localizacao);
  const [colmeias, setColmeias] = useState(route.params.apiario.colmeias);
  const [qtdColmeias, setQtdColmeias] = useState(route.params.apiario.colmeias?.length);
  const [rotina, setRotina] = useState(false)
  const [coletaMel, setColetaMel] = useState(false);
  const [outra, setOutra] = useState(false);
  const [dataVisita, setDataVisita] = useState();
  const [boa, setBoa] = useState(false);
  const [regular, setRegular] = useState(false);
  const [ruim, setRuim] = useState(false);
  const [tarefasRealizadas, setTarefasRealizadas] = useState("")
  const [ocorrenciaMortalidade, setOcorrenciaMortalidade] = useState(false)
  const [ocorrenciaSintomas, setOcorrenciaSintomas] = useState(false);
  const [sintomas, setSintomas] = useState("");
  const [situacao, setSituacao] = useState("");
  const [tratamento, setTratamento] = useState(false);
  const [especifique, setEspecifique] = useState("");
  const [limpeza, setLimpeza] = useState(false);
  const [veiculo, setVeiculo] = useState(false);
  const [situacaoColmeias, setSituacaoColmeias] = useState()


  useEffect(() => {
    console.log(route.params.apiario)
  }, [])


  function handleObjVisita(rotina?: boolean, coletaMel?: boolean, outra?: boolean) {
    if (rotina !== undefined) {
      if (!rotina) {
        setRotina(!rotina)
        setColetaMel(false)
        setOutra(false)
      }
      else {
        setRotina(!rotina)
      }
    }
    else if (coletaMel !== undefined) {
      if (!coletaMel) {
        setColetaMel(!coletaMel)
        setRotina(false)
        setOutra(false)
      }
      else {
        setColetaMel(!coletaMel)
      }
    }
    else {
      if (!outra) {
        setOutra(!outra)
        setColetaMel(false)
        setRotina(false)
      }
      else {
        setOutra(!outra)
      }
    }
  }

  function handleSitApiario(boa?: boolean, regular?: boolean, ruim?: boolean) {
    if (boa !== undefined) {
      if (!boa) {
        setBoa(!boa)
        setRegular(false)
        setRuim(false)
      }
      else {
        setBoa(!boa)
      }
    }
    else if (regular !== undefined) {
      if (!regular) {
        setRegular(!regular)
        setBoa(false)
        setRuim(false)
      }
      else {
        setRegular(!regular)
      }
    }
    else {
      if (!ruim) {
        setRuim(!ruim)
        setBoa(false)
        setRegular(false)
      }
      else {
        setRuim(!ruim)
      }
    }
  }

  const cardColmeia = ({ item, index }: any) => (
    <TouchableOpacity style={{ width: 350, height: 150, justifyContent: 'center', borderRadius: 10, paddingHorizontal: 10, margin: 10, backgroundColor: '#F5E6C3' }}>
      <View flexDirection='row' justifyContent='space-between'>
        <Text fontWeight={'bold'} fontSize={20} paddingBottom={20}>Colmeia {index + 1}</Text>
        <View flexDirection='row'>
          <TouchableOpacity onPress={() => navigation.navigate('EditarColmeia', { colmeia: item, index: index, tipo: "local" })} style={{ backgroundColor: '#FFBC00', marginRight: 15, borderRadius: 5, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='pencil' size={30} color={'#fff'} />
          </TouchableOpacity>
          <TouchableOpacity style={{ backgroundColor: '#F11010', borderRadius: 5, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='trash' size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>

      </View>
      <Text>Qtd. Abelhas: {item.qtdAbelhas}</Text>
      <Text>Qtd. Quadros: {item.qtdQuadros}</Text>
      <Text>Tipo Quadro: {item.tipoQuadros}</Text>
      <Text>Espécie: {item.especie}</Text>
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

      <TouchableOpacity onPress={() => navigation.navigate('Apiario')} style={{ backgroundColor: '#fff', width: 55, borderRadius: 60, marginLeft: 5 }}>
        <Ionicons
          name={'arrow-back'}
          color={'#FBBA25'}
          size={55}
        />
      </TouchableOpacity>
      <ScrollView style={{ marginHorizontal: 10, gap: 15 }}>
        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Qtd Colmeias</Label>
          <Input disabled={true} value={qtdColmeias?.toString()} backgroundColor={'#fff'} borderColor="$appPrimary50" width={'30%'} focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="qtdColmeias" />
        </View>
        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Localizacao</Label>
          <Input disabled={true} value={localizacao} backgroundColor={'#fff'} borderColor="$appPrimary50" onChangeText={setLocalizacao} width={'100%'} focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="localizacao" />
        </View>

        <View>
          <Label fontWeight={'bold'}>Objetivo da Visita</Label>
          <View flexDirection="row">

            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '35%',
                }}
                onPress={() => handleObjVisita(rotina)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={rotina}
                  backgroundColor={rotina ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"}>Rotina</Label>
              </TouchableOpacity>

            </View>
            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '40%',
                }}
                onPress={() => handleObjVisita(undefined, coletaMel, undefined)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={coletaMel}
                  backgroundColor={coletaMel ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Coleta de Mel</Label>
              </TouchableOpacity>

            </View>
            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '60%',
                }}
                onPress={() => handleObjVisita(undefined, undefined, outra)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={outra}
                  backgroundColor={outra ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"}>Outro</Label>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View>
          <Label fontWeight={'bold'}>Situação do Apiário</Label>
          <View flexDirection="row">

            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '35%',
                }}
                onPress={() => handleSitApiario(boa)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={boa}
                  backgroundColor={boa ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"}>Boa</Label>
              </TouchableOpacity>

            </View>
            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '40%',
                }}
                onPress={() => handleSitApiario(undefined, regular, undefined)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={regular}
                  backgroundColor={regular ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Regular</Label>
              </TouchableOpacity>

            </View>
            <View flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '60%',
                }}
                onPress={() => handleSitApiario(undefined, undefined, ruim)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={ruim}
                  backgroundColor={ruim ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"}>Ruim</Label>
              </TouchableOpacity>
            </View>
          </View>
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Tarefas Realizadas</Label>
          <TextArea onChangeText={setTarefasRealizadas} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Ocorrência Mortalidade</Label>
          <View flexDirection="row" alignItems="center" justifyContent="center">
            <View flexDirection="row" justifyContent="center">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                  
                }}
                onPress={() => setOcorrenciaMortalidade(true)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={ocorrenciaMortalidade}
                  backgroundColor={ocorrenciaMortalidade ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Sim</Label>
              </TouchableOpacity>
            </View>

            <View justifyContent="center" flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                }}
                onPress={() => setOcorrenciaMortalidade(false)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={!ocorrenciaMortalidade}
                  backgroundColor={!ocorrenciaMortalidade ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Não</Label>
              </TouchableOpacity>
            </View>

          </View>
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Ocorrência de Sintomas e Pragas</Label>
          <View flexDirection="row" alignItems="center" justifyContent="center">
            <View flexDirection="row" justifyContent="center">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                  
                }}
                onPress={() => setOcorrenciaSintomas(true)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={ocorrenciaSintomas}
                  backgroundColor={ocorrenciaSintomas ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Sim</Label>
              </TouchableOpacity>
            </View>

            <View justifyContent="center" flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                }}
                onPress={() => setOcorrenciaSintomas(false)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={!ocorrenciaSintomas}
                  backgroundColor={!ocorrenciaSintomas ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Não</Label>
              </TouchableOpacity>
            </View>
          </View> 
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Sintomas/Doenças ou Pragas</Label>
          <TextArea onChangeText={setSintomas} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Colmeias Afetadas</Label>
          
        </View>
        
        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Situação</Label>
          <TextArea onChangeText={setSituacao} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Realizou Tratamento ou Medida de manejo</Label>
          <View flexDirection="row" alignItems="center" justifyContent="center">
            <View flexDirection="row" justifyContent="center">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                  
                }}
                onPress={() => setTratamento(true)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={tratamento}
                  backgroundColor={tratamento ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Sim</Label>
              </TouchableOpacity>
            </View>

            <View justifyContent="center" flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                }}
                onPress={() => setTratamento(false)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={!tratamento}
                  backgroundColor={!tratamento ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Não</Label>
              </TouchableOpacity>
            </View>
          </View> 
        </View>
        
        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Especifique</Label>
          <TextArea onChangeText={setEspecifique} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Os procedimentos de limpeza foram seguidos</Label>
          <View flexDirection="row" alignItems="center" justifyContent="center">
            <View flexDirection="row" justifyContent="center">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                  
                }}
                onPress={() => setLimpeza(true)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={limpeza}
                  backgroundColor={limpeza ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Sim</Label>
              </TouchableOpacity>
            </View>

            <View justifyContent="center" flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                }}
                onPress={() => setLimpeza(false)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={!limpeza}
                  backgroundColor={!limpeza ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Não</Label>
              </TouchableOpacity>
            </View>
          </View> 
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Veículo estava em conformidade</Label>
          <View flexDirection="row" alignItems="center" justifyContent="center">
            <View flexDirection="row" justifyContent="center">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                  
                }}
                onPress={() => setVeiculo(true)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={veiculo}
                  backgroundColor={veiculo ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Sim</Label>
              </TouchableOpacity>
            </View>

            <View justifyContent="center" flexDirection="row">
              <TouchableOpacity
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                  gap: 5,
                  marginVertical: 10,
                  width: '50%',
                }}
                onPress={() => setVeiculo(false)}
              >
                <Checkbox
                  size='$9'
                  borderWidth={2}
                  checked={!veiculo}
                  backgroundColor={!veiculo ? '$appPrimary50' : '#fff'}
                  borderColor={"$appPrimary50"}
                  pointerEvents='none'
                >
                  <Checkbox.Indicator>
                    <Check color='#fff' />
                  </Checkbox.Indicator>
                </Checkbox>
                <Label size={"$5"} lineHeight={25}>Não</Label>
              </TouchableOpacity>
            </View>
          </View> 
        </View>

        <View>
                    <Label fontWeight={'bold'}>Situação das Colmeias ou da Coleta</Label>
                    
        </View>
        
        <TouchableOpacity >
                    <Button
                        disabled
                        borderRadius={100}
                        width='100%'
                        maxWidth={300}
                        backgroundColor='#FBBA25'
                        marginHorizontal='auto'
                        icon={<Ionicons name='add' color='#fff' size={35} />}
                    >
                        <Text color='#fff' fontWeight='bold' fontSize={20}>
                            Adicionar Colmeias
                        </Text>
                    </Button>
        </TouchableOpacity>

        <TouchableOpacity style={{ paddingTop: 50 , paddingBottom:70}}>
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
      </ScrollView>
    </View>
  )
}