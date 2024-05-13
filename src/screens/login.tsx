import { RouteProp, useNavigation, useRoute } from '@react-navigation/native';
import Constants from 'expo-constants';
import { signInWithEmailAndPassword } from 'firebase/auth';
import React, { useState } from 'react';
import { Keyboard, StatusBar, TouchableWithoutFeedback } from 'react-native';
import { Button, Image, Input, Label, View } from 'tamagui';
import { RootStackParamList } from '../navigation';
import { auth } from "../utils/firebase";
import { UserCollection } from '@/collections/userCollection';






type LoginSreenRouteProp = RouteProp<RootStackParamList, 'Login'>;



export default function Login() {
  const router = useRoute<LoginSreenRouteProp>();
  const [keepLogin, setKeepLogin] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [email, setEmail] = useState('');
  const [senha, setSenha] = useState('');
  const [error, setError] = useState(null);
  const navigation: any = useNavigation();
  let uc = new UserCollection();

  const handleLogin = async () => {
    console.log("entrou")
    try{
      const userCredential = await signInWithEmailAndPassword(auth, email, senha);
      console.log('Usuário logado com sucesso', userCredential.user);
      uc.getUser(userCredential.user.uid)
      navigation.navigate('Menu');
    } catch (err: any) {
      console.log(err);
      setError(err.message);
      alert(err.message);
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <View flex={1} >
        <View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
        <StatusBar
          barStyle='dark-content'
          backgroundColor='#FBBA25'
          translucent
        />

        <View flex={1} paddingHorizontal={24} alignItems='center'   >
          <View marginBottom={80} marginTop={124} width='400'>
            <Image source={require('../../assets/logo-coofamel.png')} />
          </View>
          <View gap={15} width='100%'>
            <View>
              <Label>Login</Label>
              <Input borderColor="$appPrimary50" onChangeText={setEmail} focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="email" />
            </View>
            <View>

              <Label>Senha</Label>
              <Input onChangeText={setSenha} borderColor="$appPrimary50" secureTextEntry={true}
                focusStyle={{ borderColor: "$appPrimary50" }} size="$5" id="password" />
            </View>

            <View>
              <Button onPress={handleLogin} color="#fff" size="$5" backgroundColor="$appPrimary50" pressStyle={{ backgroundColor: "$appSecondary100" }} >Logar</Button>
            </View>
          </View>
        </View>




      </View>
    </TouchableWithoutFeedback>
  );
}
