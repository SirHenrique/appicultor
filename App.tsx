import 'react-native-gesture-handler';

import { useFonts } from 'expo-font';
import * as SplashScreen from 'expo-splash-screen';
import React, { useEffect, useState } from 'react';
import { TamaguiProvider } from 'tamagui';

import RootStack from './src/navigation';
import config from './tamagui.config';
import { supabase } from '@/utils/supabase';
import { Session } from '@supabase/supabase-js';
import Login from '@/screens/login';
import NetInfo from '@react-native-community/netinfo';
import useRelatorioOfflineStore from '@/store/relatorioColmeiasOffline';
import { Alert } from 'react-native';
import relatorioColmeiasOffline from '@/store/relatorioColmeiasOffline';
SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const [session, setSession] = useState<Session | null>(null)
  const { addRelatorioColmeia, loadRelatorioColmeias, relatorioColmeiasOffline, integraRelatorios } = useRelatorioOfflineStore();

  const [networkChecked, setNetworkChecked] = useState(false); // Estado para verificar a conexão
  const [isConnected, setIsConnected] = useState<any>();

  useEffect(() => {
    // Monitorar mudanças na conexão
    const unsubscribe = NetInfo.addEventListener(state => {
      setIsConnected(state.isConnected); // Atualiza o estado de conexão
    });

    return () => {
      unsubscribe(); // Limpa o listener quando o componente é desmontado
    };
  }, []);

  useEffect(() => {
    
    if (isConnected === false) {
      Alert.alert("Conexão perdida");
      console.log("OFFLINE");
    } else if (isConnected === true) {
      loadRelatorioColmeias();
      integraRelatorios();
      console.log("ONLINE");
    }
  }, [isConnected]);

  useEffect(() => {
    if (loaded) {
      SplashScreen.hideAsync();
      supabase.auth.getSession().then(({ data: { session } }) => {
        setSession(session)
      })
  
      supabase.auth.onAuthStateChange((_event, session) => {
        setSession(session)
      })
      

    }
  }, [loaded]);

  if (!loaded) {
    return null;
  }

  return (
    <TamaguiProvider defaultTheme='light' config={config}>
      { session && session!.user ? ( <RootStack key={session.user.id} session={session} /> ): (<Login/>)}
    </TamaguiProvider>
  );
}
