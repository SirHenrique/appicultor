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

SplashScreen.preventAutoHideAsync();

export default function App() {
  const [loaded] = useFonts({
    Inter: require('@tamagui/font-inter/otf/Inter-Medium.otf'),
    InterBold: require('@tamagui/font-inter/otf/Inter-Bold.otf'),
  });

  const [session, setSession] = useState<Session | null>(null)



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
