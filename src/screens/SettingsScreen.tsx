import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';
import { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

const ROWS: { icon: keyof typeof Ionicons.glyphMap; title: string; subtitle: string; route?: keyof RootStackParamList }[] = [
  { icon: 'key-outline', title: 'Account', subtitle: 'Number, security, account settings', route: 'EditProfile' },
  { icon: 'shield-checkmark-outline', title: 'Privacy and security', subtitle: 'Control who can see your information', route: 'PrivacySecurity' },
  { icon: 'chatbubble-outline', title: 'Chats', subtitle: 'Theme, wallpapers, chat backup' },
  { icon: 'notifications-outline', title: 'Notifications', subtitle: 'Message, group and call alerts', route: 'Notifications' },
  { icon: 'server-outline', title: 'Storage and data', subtitle: 'Network usage, auto-download', route: 'StorageData' },
  { icon: 'laptop-outline', title: 'Linked devices', subtitle: 'Manage connected computers', route: 'LinkedDevices' },
  { icon: 'help-circle-outline', title: 'Help', subtitle: 'Help center, contact us, app info' },
];

export default function SettingsScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Settings</Text>
        <TouchableOpacity hitSlop={8}><Ionicons name="search" size={22} color={colors.primaryText} /></TouchableOpacity>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        <TouchableOpacity style={styles.profile} activeOpacity={0.7} onPress={() => navigation.navigate('EditProfile')}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.avatar}>
            <Text style={styles.initials}>JW</Text>
          </LinearGradient>
          <View style={styles.profileInfo}>
            <Text style={styles.profileName}>Jamie Wilson</Text>
            <Text style={styles.profileBio}>Making time for the little things</Text>
          </View>
          <Ionicons name="qr-code-outline" size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <View style={styles.divider} />
        {ROWS.map((row) => (
          <TouchableOpacity key={row.title} style={styles.row} activeOpacity={0.7} onPress={() => { if (row.route) navigation.navigate(row.route as any); }}>
            <Ionicons name={row.icon} size={22} color={colors.primaryText} />
            <View style={styles.rowInfo}>
              <Text style={styles.rowTitle}>{row.title}</Text>
              <Text style={styles.rowSub}>{row.subtitle}</Text>
            </View>
            <Ionicons name="chevron-forward" size={16} color={colors.mutedText} />
          </TouchableOpacity>
        ))}
        <View style={styles.signature}>
          <Text style={styles.sigBrand}><Text style={{ color: colors.gradientStart }}>d4</Text><Text style={{ color: colors.gradientEnd }}>chat</Text></Text>
          <Text style={styles.sigVersion}>Version 1.0.0</Text>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { fontSize: 27, fontWeight: '700', color: colors.primaryText },
  scroll: { flex: 1 },
  profile: { height: 114, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 14 },
  avatar: { width: 70, height: 70, borderRadius: 35, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600', fontSize: 22 },
  profileInfo: { flex: 1, gap: 5 },
  profileName: { fontSize: 20, fontWeight: '600', color: colors.primaryText },
  profileBio: { fontSize: 12, color: colors.secondaryText },
  divider: { height: 8, backgroundColor: colors.inputBg },
  row: { minHeight: 60, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 8, gap: 14 },
  rowInfo: { flex: 1, gap: 3 },
  rowTitle: { fontSize: 15, color: colors.primaryText },
  rowSub: { fontSize: 12, color: colors.secondaryText, lineHeight: 17 },
  signature: { alignItems: 'center', padding: 16, gap: 4 },
  sigBrand: { fontSize: 22, fontWeight: '700' },
  sigVersion: { fontSize: 10, color: colors.secondaryText },
});
