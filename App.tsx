import React, { useEffect, useRef } from 'react';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainerRef } from '@react-navigation/native';
import RootNavigator from './src/navigation/RootNavigator';
import {
  initNotifications,
  addNotificationResponseListener,
} from './src/services/notifications';
import { RootStackParamList } from './src/navigation/types';

export default function App() {
  const navRef = useRef<NavigationContainerRef<RootStackParamList>>(null);

  useEffect(() => {
    initNotifications();
    const sub = addNotificationResponseListener((chatId, name, actionId) => {
      if (actionId === 'MARK_READ') {
        return;
      }
      navRef.current?.navigate('Conversation', {
        chatId,
        name: chatId === 'you' ? 'You' : name,
        isYou: chatId === 'you',
      });
    });
    return () => sub.remove();
  }, []);

  return (
    <SafeAreaProvider>
      <StatusBar style="dark" />
      <RootNavigator navigationRef={navRef} />
    </SafeAreaProvider>
  );
}
