import React, { useEffect } from 'react';
import { Text, View } from 'react-native';
import AppLoading from 'expo-app-loading';
import * as Notifications from 'expo-notifications';

import Routes from './src/routes';
import { PlantProps } from './src/libs/storage';

import {
  useFonts,
  Jost_400Regular,
  Jost_600SemiBold
} from '@expo-google-fonts/jost';


export default function App(){
  const [fontsLoaded] = useFonts({
    Jost_400Regular,
    Jost_600SemiBold
  })

  useEffect(()=>{
    const subscription = Notifications.addNotificationReceivedListener(
      async notificarion => {
        const data = notificarion.request.content.data.plant as PlantProps;
        console.log(data);
      }
    )
    return () => subscription.remove();

  // async function notifications() {
    // const data = await Notifications.getAllScheduledNotificationsAsync();//retorna todos os agendamentos
    // console.log('NOTIFICAÇÕES AGENDADAS');
    // console.log(data);

    // await Notifications.cancelAllScheduledNotificationsAsync();// cancela todos os agendamentos

  // }
  // notifications();
  },[])
  // AppLoading responsavel por segurar a tela de splash, ate que a font seja carregada(melhor forma)
  if(!fontsLoaded)
    return <AppLoading/>

  return (
    <Routes/>
  )
}