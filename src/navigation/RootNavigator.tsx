import React, { RefObject } from 'react';
import {
  NavigationContainer,
  NavigationContainerRef,
} from '@react-navigation/native';
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
import MomentsScreen from '../screens/MomentsScreen';
import CallsScreen from '../screens/CallsScreen';
import SettingsScreen from '../screens/SettingsScreen';
import PlaceholderScreen from '../screens/PlaceholderScreen';
import MyProfileScreen from '../screens/MyProfileScreen';

const Stack = createNativeStackNavigator<RootStackParamList>();
const Tab = createBottomTabNavigator<MainTabParamList>();

function MainTabs() {
  return (
    <Tab.Navigator
      screenOptions={({ route }) => ({
        headerShown: false,
        tabBarActiveTintColor: colors.gradientEnd,
        tabBarInactiveTintColor: colors.tabInactive,
        tabBarLabelStyle: { fontSize: 11, fontWeight: '600' },
        tabBarStyle: {
          height: 60,
          paddingBottom: 6,
          paddingTop: 4,
          borderTopColor: colors.border,
          borderTopWidth: 1,
          backgroundColor: colors.white,
        },
        tabBarIcon: ({ color, focused }) => {
          const map: Record<string, keyof typeof Ionicons.glyphMap> = {
            Chats: focused ? 'chatbubbles' : 'chatbubbles-outline',
            Moments: focused ? 'sparkles' : 'sparkles-outline',
            Calls: focused ? 'call' : 'call-outline',
            Settings: focused ? 'settings' : 'settings-outline',
          };
          return <Ionicons name={map[route.name]} size={22} color={color} />;
        },
      })}
    >
      <Tab.Screen name="Chats" component={ChatsScreen} />
      <Tab.Screen name="Moments" component={MomentsScreen} options={{ title: 'Moments' }} />
      <Tab.Screen name="Calls" component={CallsScreen} />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
}

function Shell({ title, subtitle }: { title: string; subtitle?: string }) {
  return <PlaceholderScreen title={title} subtitle={subtitle} />;
}

type Props = {
  navigationRef?: RefObject<NavigationContainerRef<RootStackParamList> | null>;
};

export default function RootNavigator({ navigationRef }: Props) {
  return (
    <NavigationContainer ref={navigationRef}>
      <Stack.Navigator screenOptions={{ headerShown: false, animation: 'fade' }}>
        <Stack.Screen name="Splash" component={SplashScreen} />
        <Stack.Screen name="Welcome" component={WelcomeScreen} />
        <Stack.Screen name="PhoneNumber" component={PhoneNumberScreen} />
        <Stack.Screen name="VerifyCode" component={VerifyCodeScreen} />
        <Stack.Screen name="ProfileSetup" component={ProfileSetupScreen} />
        <Stack.Screen name="MainTabs" component={MainTabs} />
        <Stack.Screen name="Conversation" component={ConversationScreen} />
        <Stack.Screen name="MyProfile" component={MyProfileScreen} />
        <Stack.Screen name="PostStatus" component={() => <Shell title="New moment" subtitle="Share a moment (mock)" />} />
        <Stack.Screen name="Account" component={() => <Shell title="Account" />} />
        <Stack.Screen name="EditProfile" component={() => <Shell title="Edit profile" />} />
        <Stack.Screen name="Privacy" component={() => <Shell title="Privacy" />} />
        <Stack.Screen name="PrivacySecurity" component={() => <Shell title="Privacy and security" />} />
        <Stack.Screen name="Notifications" component={() => <Shell title="Notifications" />} />
        <Stack.Screen name="StorageData" component={() => <Shell title="Storage and data" />} />
        <Stack.Screen name="LinkedDevices" component={() => <Shell title="Linked devices" />} />
        <Stack.Screen name="NewChat" component={() => <Shell title="New chat" subtitle="Pick someone to message" />} />
        <Stack.Screen name="NewGroup" component={() => <Shell title="New group" />} />
        <Stack.Screen name="CreateGroup" component={() => <Shell title="Create group" />} />
        <Stack.Screen name="Archived" component={() => <Shell title="Archived" />} />
        <Stack.Screen name="ArchivedChats" component={() => <Shell title="Archived chats" />} />
        <Stack.Screen name="InviteFriend" component={() => <Shell title="Invite a friend" />} />
        <Stack.Screen name="ContactInfo" component={() => <Shell title="Contact info" />} />
        <Stack.Screen name="Search" component={() => <Shell title="Search" />} />
        <Stack.Screen name="VoiceCall" component={() => <Shell title="Voice call" subtitle="Mock call UI" />} />
        <Stack.Screen name="VideoCall" component={() => <Shell title="Video call" subtitle="Mock call UI" />} />
        <Stack.Screen name="Placeholder" component={PlaceholderScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
