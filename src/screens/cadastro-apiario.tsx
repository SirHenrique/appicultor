import { RootStackParamList } from "@/navigation";
import { Ionicons } from "@expo/vector-icons";
import { RouteProp, useNavigation } from "@react-navigation/native";
import { Session } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { useState } from "react";
import { StatusBar, TouchableOpacity } from "react-native";
import { Input, Label, View,Text, Button } from "tamagui";



export default function CadastroApiario({ session }: { session: Session }) {
    const navigation: any = useNavigation();
    const [localizacao,setLocalizacao] = useState("");
    const [colmeias,setColmeias] = useState([])


return(
<View flex={1} backgroundColor='#fff'>
<View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#FBBA25'
        translucent
      />

    <TouchableOpacity onPress={() => navigation.navigate('Apiario')} style={{backgroundColor:'#fff', width:55, borderRadius:60, marginLeft:5}}>
            <Ionicons
            name={'arrow-back'}
            color={'#FBBA25'}
            size={55}
            />
    </TouchableOpacity>
    <View marginHorizontal={10} gap={15}>
        <View>
            <Label fontWeight={'bold'}>Localizacao</Label>
            <Input backgroundColor={'#fff'} borderColor="$appPrimary50" onChangeText={setLocalizacao} width={'100%'}  focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="localizacao" />
        </View>

        <View>
            <Label fontWeight={'bold'}>Colmeias</Label>
            {colmeias.length > 0 ? (<Text>Listando Colmeias</Text>)  : (<View></View>)}
            
        </View>

        <TouchableOpacity>
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


      <TouchableOpacity style={{paddingTop:50}}>
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