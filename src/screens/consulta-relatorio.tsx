import { apiario } from "@/@types/apiario";
import { colmeia } from "@/@types/colmeia";
import { RootStackParamList } from "@/navigation";
import useColmeiaStore from "@/store/colmeias";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useFocusEffect, useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import { Check } from "@tamagui/lucide-icons";
import Constants from "expo-constants";
import React, { useCallback, useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StatusBar, TextInput, TouchableOpacity } from "react-native";
import { ScrollView } from "react-native-gesture-handler";
import { Input, Label, View, Text, Button, Checkbox, TextArea } from "tamagui";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import moment from "moment";
import useRelatorioColmeiaStore from "@/store/relatorioColmeias";
import { relatorio } from "@/@types/relatorio";
import { relatorioColmeia } from "@/@types/relatorioColmeia";
import { saveToLibraryAsync } from "expo-media-library";

interface ConsultarRelatorioProps {
  route: {
    params: {
      session: Session,
      apiario: apiario,
      relatorio: relatorio,
      colmeias: colmeia[]
    }
  }
  navigation: any
}


export default function ConsultaRelatorio({ route, navigation }: ConsultarRelatorioProps) {
  const [localizacao, setLocalizacao] = useState(route.params.apiario.localizacao);
  const [colmeias, setColmeias] = useState(route.params.apiario.colmeias);
  const [qtdColmeias, setQtdColmeias] = useState(route.params.colmeias.length);
  const [rotina, setRotina] = useState(false)
  const [coletaMel, setColetaMel] = useState(false);
  const [outra, setOutra] = useState(false);
  const [objVisita, setObjVisita] = useState(route.params.relatorio.objVisita)
  const [dataVisita, setDataVisita] = useState<Date | null>(new Date(route.params.relatorio.dataVisita));
  const [boa, setBoa] = useState(false);
  const [regular, setRegular] = useState(false);
  const [ruim, setRuim] = useState(false);
  const [sitApiario, setSitApiario] = useState(route.params.relatorio.sitApiario);
  const [tarefasRealizadas, setTarefasRealizadas] = useState(route.params.relatorio.tarRealizadas)
  const [ocorrenciaMortalidade, setOcorrenciaMortalidade] = useState(route.params.relatorio.mortalidade)
  const [ocorrenciaSintomas, setOcorrenciaSintomas] = useState(route.params.relatorio.ocorrenciaSintomas);
  const [sintomas, setSintomas] = useState(route.params.relatorio.descSintomas);
  const [situacao, setSituacao] = useState(route.params.relatorio.descSituacao);
  const [tratamento, setTratamento] = useState(route.params.relatorio.tratamento);
  const [especifique, setEspecifique] = useState(route.params.relatorio.descTratamento);
  const [limpeza, setLimpeza] = useState(route.params.relatorio.limpeza);
  const [veiculo, setVeiculo] = useState(route.params.relatorio.conformidade);
  const [situacaoColmeias, setSituacaoColmeias] = useState()
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const [relatorioColmeias, setRelatorioColmeias] = useState<relatorioColmeia[]>([]);
  const [selectedColmeias, setSelectedColmeias] = useState<string[]>(JSON.parse(route.params.relatorio.colmeiasAfetadas));

  useFocusEffect(useCallback(() => {
   consultarRelatorioColmeia()
   prepararDados()
  }, []))
  
  useEffect(() => {
    consultarRelatorioColmeia()
    prepararDados()
  }, [])


  const confirmarData = (date: Date) => {
    setDatePickerVisibility(false);
    setDataVisita(date);
  }

  function prepararDados() {
    switch(sitApiario) {
      case "Boa":
        setBoa(true);
        break;
      case "Regular":
        setRegular(true);
        break;
      case "Ruim":
        setRuim(true);
        break;
    }

    switch(objVisita) {
      case "Rotina":
        setRotina(true)
        break;
      case "Coleta de Mel":
        setColetaMel(true);
        break;
      case "Outro":
        setOutra(true)
      break;

    }

    console.log(dataVisita)
    setDataVisita(dataVisita)
  }

  async function consultarRelatorioColmeia() {
    const { data, error: postError } = await supabase
    .from('relatorioColmeia')
    .select('*')
    .eq('relatorio_id', route.params.relatorio.id )
    .order('created_at', { ascending: false });

    console.log(data);
   console.log(moment(dataVisita).utc().format("DD/MM/YYYY"))

    if(postError)
        console.log(postError)
     else {
        setRelatorioColmeias(data)
     }
}


  const renderColmeia = ({ item, index } : any) => (
    <TouchableOpacity
    disabled={true}
    style={
      {
        padding: 15,
        marginVertical: 8,
        backgroundColor: '#FBBA25',
        borderWidth: 1,
        borderColor: '#FBBA25',
        borderRadius: 5,
      }
    }
  >
    <Text>{`Colmeia ${item}`}</Text>
  </TouchableOpacity>
  );



  

  const cardRelatorioColmeia = ({ item, index }: any) => (
    <TouchableOpacity onPress={() => navigation.navigate('ConsultaRelatorioColmeia',{apiario: route.params.apiario, relatorioColmeia: item, tipo: "relatorio" ,relatorio: route.params.relatorio, colmeias: route.params.colmeias, relatorioColmeias: relatorioColmeias })} style={{ width: 350, height: 150, paddingVertical:10, borderRadius: 10, paddingHorizontal: 10, margin: 10, backgroundColor: '#F5E6C3' }}>
      <View flexDirection='row' justifyContent='space-between'>
        <Text fontWeight={'bold'} fontSize={20} paddingBottom={20}>Colmeia {item.index}</Text>
        <View flexDirection='row'>
          <TouchableOpacity onPress={() => navigation.navigate('EditarColmeia', { colmeia: item, index: index, tipo: "local" })} style={{ backgroundColor: '#FFBC00', marginRight: 15, borderRadius: 5, height: 40, width: 40, alignItems: 'center', justifyContent: 'center' }}>
            <Ionicons name='pencil' size={30} color={'#fff'} />
          </TouchableOpacity>
        </View>

      </View>
      <Text paddingTop={20}>Situação: {item.situacao}</Text>
      <Text>Quadros Coletados: {item.quaColetados}</Text>
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

      <TouchableOpacity onPress={() => navigation.navigate('ConsultaApiario',{apiario: route.params.apiario})} style={{ backgroundColor: '#fff', width: 55, borderRadius: 60, marginLeft: 5 }}>
        <Ionicons
          name={'arrow-back'}
          color={'#FBBA25'}
          size={55}
        />
      </TouchableOpacity>
      <ScrollView style={{ marginHorizontal: 10, gap: 15 }}>

        <View flexDirection="row" gap={20}>
          <View width={'45%'}>
            <Label fontWeight={'bold'}>Data Visita</Label>
            <Pressable style={{ zIndex: 999, width: '100%' }} disabled={true}>
              <TextInput
                numberOfLines={1}
                editable={false}
                textAlign="center"
                placeholder="📅 Selecione a Data"
                value={dataVisita ? moment(dataVisita).utc().format("DD/MM/YYYY") : ""}
                style={{ height: 50, backgroundColor: '#fff', borderWidth: 1, width: '100%', borderRadius: 15, borderColor: '#fbba25', fontFamily: 'Inter-Medium' }}
              />
            </Pressable>

          </View>

          <View paddingBottom={15} width={'30%'}>
            <Label fontWeight={'bold'}>Qtd Colmeias</Label>
            <Input disabled={true} value={qtdColmeias?.toString()} backgroundColor={'#ccc'} borderColor="$appPrimary50" width={'100%'} focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="qtdColmeias" />
          </View>
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Localizacao</Label>
          <Input disabled={true} value={localizacao} backgroundColor={'#ccc'} borderColor="$appPrimary50" onChangeText={setLocalizacao} width={'100%'} focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="loc" />
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
                disabled={true}
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
                disabled={true}
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
               disabled={true}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
          <TextArea value={tarefasRealizadas} onChangeText={setTarefasRealizadas} disabled={true} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
          <TextArea  value={sintomas} disabled={true} onChangeText={setSintomas} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Colmeias Afetadas</Label>
          <FlatList
                            data={selectedColmeias}
                            renderItem={renderColmeia}
                            keyExtractor={(item, index) => index.toString()}
                            scrollEnabled={false}
            />
        </View>

        <View paddingBottom={15}>
          <Label fontWeight={'bold'}>Situação</Label>
          <TextArea value={situacao} disabled onChangeText={setSituacao} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
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
                disabled={true}
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
          <TextArea value={especifique} disabled={true} onChangeText={setEspecifique} borderColor={"$appPrimary50"} backgroundColor={"#fff"} size={"$7"} fontSize={15} paddingHorizontal={5} paddingVertical={2} borderRadius={15} />
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
                disabled={true}
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
          {relatorioColmeias!.length > 0 ? (<View alignItems='center' paddingTop={20}>
                        <FlatList
                            data={relatorioColmeias}
                            renderItem={cardRelatorioColmeia}
                            keyExtractor={(item, index) => index.toString()}
                            
                            scrollEnabled={false}
                        />
                    </View>) : (<View></View>)}
        </View>

        
      </ScrollView>
    </View>
  )
}