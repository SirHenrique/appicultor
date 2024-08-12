import { colmeia } from "@/@types/colmeia";
import { cardColmeia } from "@/components/cardColmeia";
import { RootStackParamList } from "@/navigation";
import useColmeiaStore from "@/store/colmeias";
import { supabase } from "@/utils/supabase";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { useEffect, useState } from "react";
import { FlatList, StatusBar, TouchableOpacity } from "react-native";
import { Input, Label, View, Text, Button } from "tamagui";




export default function CadastroApiario({ session, colmeiaAdicionar }: { session: Session, colmeiaAdicionar?: colmeia[] }) {
    const navigation: any = useNavigation();
    const [localizacao, setLocalizacao] = useState("");
    const { colmeias, setColmeias } = useColmeiaStore();


    async function handleAdicionar() {
        const { data, error } = await supabase.from('apiario').insert([
            {
             produtor_id: session.user.id,
             localizacao: localizacao
            }
          ]).select();

        if(error) {
            console.log(error)
        }
        else {

            if(colmeias.length > 0) {
                colmeias.forEach(col => {
                    col.apiario_id = data[0].id
                });
                
                const {  data: retColmeia, error } = await supabase.from('colmeia').insert(
                    colmeias
                  ).select();

                if(error)
                    console.log(error)
                else {
                    navigation.navigate('Apiario')
                    setColmeias([])
                }
            }
        }
    }
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
            <View marginHorizontal={10} gap={15}>
                <View>
                    <Label fontWeight={'bold'}>Localizacao</Label>
                    <Input backgroundColor={'#fff'} borderColor="$appPrimary50" onChangeText={setLocalizacao} width={'100%'} focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="localizacao" />
                </View>

                <View>
                    <Label fontWeight={'bold'}>Colmeias</Label>
                    {colmeias!.length > 0 ? (<View alignItems='center' paddingTop={20}>
                        <FlatList
                            data={colmeias}
                            renderItem={cardColmeia}
                            keyExtractor={(item, index) => index.toString()}
                            style={{height: 300}}
                        />
                    </View>) : (<View></View>)}

                </View>

                <TouchableOpacity onPress={() => navigation.navigate('CadastrarColmeia', { colmeias: colmeiaAdicionar })}>
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


                <TouchableOpacity onPress={handleAdicionar} style={{ paddingTop: 50 }}>
                    <Button
                        disabled
                        width='100%'
                        height={60}
                        backgroundColor='#31DD42'
                        marginHorizontal='auto'

                    >
                        <Text color='#fff' fontWeight='bold' fontSize={20}>
                            Adicionar Apiário
                        </Text>
                    </Button>
                </TouchableOpacity>





            </View>
        </View>
    )
}