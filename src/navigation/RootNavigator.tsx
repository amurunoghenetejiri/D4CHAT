import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
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
import UpdatesScreen from '../screens/UpdatesScreen';
import CallsScreen from '../screens/CallsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gradientEnd,
        tabBarInactiveTintColor: colors.primaryText,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '500' },
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 4,
          borderTopColor: colors.borderChat,
          borderTopWidth: 1,
        },
        tabBarIcon: ({ color, focused }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Chats: focused ? 'chatbubbles' : 'chatbubbles-outline',
            Updates: focused ? 'ellipse' : 'ellipse-outline',
            Calls: focused ? 'call' : 'call-outline',
            Settings: focused ? 'settings' : 'settings-outline',
          };
          return (
            <View style={focused ? { backgroundColor: '#e9d5ff', borderRadius: 100, width: 60, height: 29, alignItems: 'center', justifyContent: 'center' } : undefined}>
              <Ionicons name={map[route.name]} size={22} color={color} />
              {route.name === 'Chats' && (
                <View style={styles.tabBadge}><Text style={styles.tabBadgeText}>3</Text></View>
              )}
            </View>
          );
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Updates" component={UpdatesScreen} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function SettingsSubScreen({ title, subtitle }: { title: string; subtitle: string }) {
  return <PlaceholderScreen title={title} subtitle={subtitle} />;
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
        <Stack.Screen name="EditProfile">{() => <SettingsSubScreen title="Edit profile" subtitle="Name, photo, about" />}</Stack.Screen>
        <Stack.Screen name="PrivacySecurity">{() => <SettingsSubScreen title="Privacy and security" subtitle="Last seen, read receipts" />}</Stack.Screen>
        <Stack.Screen name="Notifications">{() => <SettingsSubScreen title="Notifications" subtitle="Message and call alerts" />}</Stack.Screen>
        <Stack.Screen name="StorageData">{() => <SettingsSubScreen title="Storage and data" subtitle="Network usage, auto-download" />}</Stack.Screen>
        <Stack.Screen name="LinkedDevices">{() => <SettingsSubScreen title="Linked devices" subtitle="Manage computers" />}</Stack.Screen>
        <Stack.Screen name="NewChat">{() => <SettingsSubScreen title="New chat" subtitle="Contact list" />}</Stack.Screen>
        <Stack.Screen name="CreateGroup">{() => <SettingsSubScreen title="Create group" subtitle="Select members" />}</Stack.Screen>
        <Stack.Screen name="ArchivedChats">{() => <SettingsSubScreen title="Archived chats" subtitle="Archived conversations" />}</Stack.Screen>
      </Stack.Navigator>
    </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  tabBadge: { position: 'absolute', top: -2, right: 8, backgroundColor: colors.accent, minWidth: 17, height: 17, borderRadius: 9, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 4 },
  tabBadgeText: { color: '#fff', fontSize: 10, fontWeight: '600' },
});
