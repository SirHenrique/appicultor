import React, { useEffect, useState } from 'react'
import { RootStackParamList } from '../navigation';
import { RouteProp, useRoute } from '@react-navigation/native';
import { View, Text } from 'tamagui';
import Constants from 'expo-constants';
import { Linking, StatusBar } from 'react-native';
import { Camera, CameraType, BarCodeScanningResult } from 'expo-camera';
import { BarCodeScanner } from 'expo-barcode-scanner';

type QrCodeSreenRouteProp = RouteProp<RootStackParamList, 'QrCode'>;

export default function QrCode() {
  const [type, setType] = useState(CameraType.back);
  const [hasPermission, setHaspermission] = useState(false);
  const [scanned, setScanned] = useState(false);

  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestCameraPermissionsAsync();
      setHaspermission(status === 'granted');
    })();
  },[]);
    if(hasPermission === false){
      return <View/>
    }

    const handleBarCodeScanned = ({type, data}) => {
      setScanned(true)
      console.log(data)
      setScanned(false)
    }

   return(
    <View flex={1} backgroundColor='#fff'>
       <View backgroundColor='#FBBA25' height={Constants.statusBarHeight} />
         <StatusBar
            barStyle='dark-content'
            backgroundColor='#FBBA25'
            translucent
         />
         <Camera barCodeScannerSettings={{
          barCodeTypes: [BarCodeScanner.Constants.BarCodeType.qr],
  }} style={{flex:1}} type={type} onBarCodeScanned={scanned ? undefined : handleBarCodeScanned} >
        
         </Camera>
    </View>
   )
}