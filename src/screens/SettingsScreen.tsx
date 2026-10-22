import React from 'react';
import { View, Text, StyleSheet, ScrollView, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ROWS: { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string; route?: keyof RootStackParamList }[] = [
  { icon: 'key-outline', title: 'Account', subtitle: 'Number, security, account settings', route: 'EditProfile' },
  { icon: 'shield-checkmark-outline', title: 'Privacy and security', subtitle: 'Control who can see your information', route: 'PrivacySecurity' },
  { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Message, group and call alerts', route: 'Notifications' },
  { icon: 'server-outline', title: 'Storage and data', subtitle: 'Network usage, auto-download', route: 'StorageData' },
  { icon: 'laptop-outline', title: 'Linked devices', subtitle: 'Manage connected computers', route: 'LinkedDevices' },
  { icon: 'person-add-outline', title: 'Invite a friend', subtitle: 'Share d4chat', route: 'InviteFriend' },
];

export default function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
        <Pressable style={styles.profile} onPress={() => navigation.navigate('EditProfile')}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.avatar}>
            <Text style={styles.initials}>Y</Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>You</Text>
            <Text style={styles.profileBio}>Hey there! I am using d4chat</Text>
          </View>
        </Pressable>
        <View style={styles.divider} />
        {ROWS.map((row) => (
          <Pressable
            key={row.title}
            style={styles.row}
            onPress={() => {
              if (row.route) navigation.navigate(row.route as any);
            }}
          >
            <Ionicons name={row.icon} size={22} color={colors.primary} />
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.rowSub}>{row.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.muted2} />
          </Pressable>
        ))}
        <View style={styles.signature}>
          <Text style={styles.sigBrand}>d4chat</Text>
          <Text style={styles.sigVersion}>Version 1.2.0 · offline mock</Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: { height: 56, justifyContent: 'center', paddingHorizontal: 20 },
  headerTitle: { fontSize: 26, fontWeight: '700', color: colors.primary },
  profile: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 16, gap: 14 },
  avatar: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '700', fontSize: 22 },
  profileInfo: { flex: 1, gap: 4 },
  profileName: { fontSize: 20, fontWeight: '600', color: colors.primary },
  profileBio: { fontSize: 13, color: colors.muted },
  divider: { height: 8, backgroundColor: colors.searchBg },
  row: { minHeight: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, gap: 14 },
  rowInfo: { flex: 1, gap: 3 },
  rowTitle: { fontSize: 15, color: colors.primary },
  rowSub: { fontSize: 12, color: colors.muted, lineHeight: 17 },
  signature: { alignItems: 'center', padding: 16, gap: 4 },
  sigBrand: { fontSize: 20, fontWeight: '700', color: colors.gradientMid },
  sigVersion: { fontSize: 11, color: colors.muted },
});
