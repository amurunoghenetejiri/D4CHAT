import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RootStackParamList, MainTabParamList } from './types';

import SplashScreen from '../screens/SplashScreen';
import WelcomeScreen from '../screens/WelcomeScreen';
import PhoneNumberScreen from '../screens/PhoneNumberScreen';
import VerifyCodeScreen from '../screens/VerifyCodeScreen';
import ProfileSetupScreen from '../screens/ProfileSetupScreen';
import ChatsScreen from '../screens/ChatsScreen';
import ConversationScreen from '../screens/ConversationScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.accentIndigo,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarStyle: {
          height: 56,
          paddingBottom: 6,
          borderTopColor: colors.border,
        },
        tabBarIcon: ({ color, size }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Chats: 'chatbubbles',
            Updates: 'ellipse-outline',
            Calls: 'call-outline',
            Settings: 'settings-outline',
          };
          return <Ionicons name={map[route.name]} size={size} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Updates">
        {() => <PlaceholderScreen title="Updates" subtitle="Status / Updates screen from Figma" />}
      </Tab.Screen>
      <Tab.Screen name="Calls">
        {() => <PlaceholderScreen title="Calls" subtitle="Calls list from Figma" />}
      </Tab.Screen>
      <Tab.Screen name="Settings">
        {() => <PlaceholderScreen title="Settings" subtitle="Settings & sub-screens from Figma" />}
      </Tab.Screen>
    </Tab.Navigator>
  );
}

export default function RootNavigator() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Conversation" component={ConversationScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
