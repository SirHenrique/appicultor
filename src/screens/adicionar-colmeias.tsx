import { Session } from "@supabase/supabase-js";
import Constants from "expo-constants";
import { StatusBar } from "react-native";
import { View } from "tamagui";

export default function CadastroColmeia({ session }: { session: Session }) {

return (
<View flex={1} backgroundColor='#fff'>
<View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
      <StatusBar
        barStyle='dark-content'
        backgroundColor='#FBBA25'
        translucent
      />
</View>
)
}