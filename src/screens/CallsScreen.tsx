import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';

const CALLS = [
  { id: '1', name: 'Maya Patel', type: 'video' as const, direction: 'outgoing' as const, time: 'Today, 9:15 AM' },
  { id: '2', name: 'Alex Morgan', type: 'voice' as const, direction: 'incoming' as const, time: 'Today, 8:02 AM' },
  { id: '3', name: 'Weekend crew', type: 'voice' as const, direction: 'missed' as const, time: 'Yesterday' },
  { id: '4', name: 'Mom', type: 'voice' as const, direction: 'outgoing' as const, time: 'Yesterday' },
  { id: '5', name: 'Daniel Kim', type: 'video' as const, direction: 'incoming' as const, time: 'Monday' },
];

export default function CallsScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Calls</Text>
        <View style={styles.headerActions}>
          <TouchableOpacity hitSlop={8}><Ionicons name="search" size={22} color={colors.primaryText} /></TouchableOpacity>
          <TouchableOpacity hitSlop={8}><Ionicons name="ellipsis-vertical" size={22} color={colors.primaryText} /></TouchableOpacity>
        </View>
      </View>
      <TouchableOpacity style={styles.createLink} activeOpacity={0.7}>
        <View style={styles.linkIcon}><Ionicons name="link" size={22} color="#fff" /></View>
        <View style={styles.linkInfo}>
          <Text style={styles.linkTitle}>Create call link</Text>
          <Text style={styles.linkSub}>Share a link for your d4chat call</Text>
        </View>
      </TouchableOpacity>
      <Text style={styles.sectionLabel}>Recent</Text>
      <FlatList
        data={CALLS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <TouchableOpacity style={styles.row} activeOpacity={0.7}>
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.avatar}>
              <Text style={styles.initials}>{item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</Text>
            </LinearGradient>
            <View style={styles.info}>
              <Text style={[styles.name, item.direction === 'missed' && { color: colors.error }]}>{item.name}</Text>
              <View style={styles.meta}>
                <Ionicons name={item.direction === 'outgoing' ? 'arrow-up' : 'arrow-down'} size={14} color={item.direction === 'missed' ? colors.error : colors.mutedText} />
                <Text style={styles.time}>{item.time}</Text>
              </View>
            </View>
            <TouchableOpacity hitSlop={12}>
              <Ionicons name={item.type === 'video' ? 'videocam' : 'call'} size={22} color={colors.accent} />
            </TouchableOpacity>
          </TouchableOpacity>
        )}
      />
      <TouchableOpacity style={styles.fab} activeOpacity={0.85}>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.fabGradient}>
          <Ionicons name="call" size={24} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { fontSize: 27, fontWeight: '700', color: colors.primaryText },
  headerActions: { flexDirection: 'row', gap: 24 },
  createLink: { flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, paddingVertical: 14, gap: 14 },
  linkIcon: { width: 48, height: 48, borderRadius: 24, backgroundColor: colors.accent, alignItems: 'center', justifyContent: 'center' },
  linkInfo: { flex: 1, gap: 4 },
  linkTitle: { fontSize: 16, fontWeight: '600', color: colors.primaryText },
  linkSub: { fontSize: 13, color: colors.mutedText },
  sectionLabel: { fontSize: 12, fontWeight: '600', color: colors.mutedText, paddingHorizontal: 20, paddingVertical: 8 },
  row: { height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 12 },
  avatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600', fontSize: 16 },
  info: { flex: 1, gap: 4 },
  name: { fontSize: 16, fontWeight: '600', color: colors.primaryText },
  meta: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  time: { fontSize: 13, color: colors.mutedText },
  fab: { position: 'absolute', right: 20, bottom: 24 },
  fabGradient: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
