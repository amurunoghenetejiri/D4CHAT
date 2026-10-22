import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii } from '../theme/colors';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';

const RECENT = [
  { id: '1', name: 'Maya Patel', time: '12 minutes ago' },
  { id: '2', name: 'Alex Morgan', time: '28 minutes ago' },
];
const VIEWED = [{ id: '3', name: 'Sophie Chen', time: 'Today, 8:12 AM' }];

export default function UpdatesScreen() {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <Text style={styles.headerTitle}><Text style={{ color: colors.gradientStart }}>Up</Text><Text style={{ color: colors.gradientEnd }}>dates</Text></Text>
        <View style={styles.headerActions}>
          <TouchableOpacity hitSlop={8}><Ionicons name="camera-outline" size={24} color={colors.primaryText} /></TouchableOpacity>
          <TouchableOpacity hitSlop={8}><Ionicons name="ellipsis-vertical" size={22} color={colors.primaryText} /></TouchableOpacity>
        </View>
      </View>
      <ScrollView style={styles.scroll} contentContainerStyle={{ paddingBottom: 24 }}>
        <View style={styles.sectionHead}>
          <Text style={styles.sectionTitle}>Status</Text>
          <TouchableOpacity hitSlop={8}><Ionicons name="ellipsis-horizontal" size={22} color={colors.primaryText} /></TouchableOpacity>
        </View>
        <TouchableOpacity style={styles.myStatus} activeOpacity={0.7}>
          <View style={styles.myAvatarWrap}>
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.myAvatar}>
              <Text style={styles.initials}>JW</Text>
            </LinearGradient>
            <View style={styles.addBadge}><Ionicons name="add" size={14} color="#fff" /></View>
          </View>
          <View>
            <Text style={styles.myStatusTitle}>My status</Text>
            <Text style={styles.myStatusSub}>Share a moment with your people</Text>
          </View>
        </TouchableOpacity>
        <Text style={styles.groupLabel}>Recent updates</Text>
        {RECENT.map((s) => (
          <TouchableOpacity key={s.id} style={styles.statusRow} activeOpacity={0.7}>
            <View style={styles.ring}>
              <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.statusAvatar}>
                <Text style={styles.initialsSm}>{s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</Text>
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.statusName}>{s.name}</Text>
              <Text style={styles.statusTime}>{s.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.viewedHead}>
          <Text style={styles.groupLabelInline}>Viewed updates</Text>
          <Ionicons name="chevron-down" size={16} color={colors.mutedText} />
        </View>
        <View style={styles.divider} />
        {VIEWED.map((s) => (
          <TouchableOpacity key={s.id} style={styles.statusRow} activeOpacity={0.7}>
            <View style={[styles.ring, styles.ringViewed]}>
              <LinearGradient colors={['#c5ccc7', '#a8b0ab']} style={styles.statusAvatar}>
                <Text style={styles.initialsSm}>{s.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</Text>
              </LinearGradient>
            </View>
            <View>
              <Text style={styles.statusName}>{s.name}</Text>
              <Text style={styles.statusTime}>{s.time}</Text>
            </View>
          </TouchableOpacity>
        ))}
        <View style={styles.channels}>
          <View style={styles.channelsHead}>
            <Text style={styles.sectionTitle}>Channels</Text>
            <TouchableOpacity style={styles.explore} activeOpacity={0.7}>
              <Text style={styles.exploreText}>Explore</Text>
              <Ionicons name="chevron-forward" size={16} color={colors.accent} />
            </TouchableOpacity>
          </View>
          <Text style={styles.channelsSub}>A little more of what you love. Follow channels to stay inspired.</Text>
          <View style={styles.channelCard}>
            <LinearGradient colors={['#22c55e', '#16a34a']} style={styles.channelImg}>
              <Ionicons name="leaf" size={24} color="#fff" />
            </LinearGradient>
            <View style={styles.channelInfo}>
              <View style={styles.channelNameRow}>
                <Text style={styles.channelName}>The great outdoors</Text>
                <Ionicons name="checkmark-circle" size={14} color={colors.accent} />
              </View>
              <Text style={styles.channelFollowers}>128K followers</Text>
            </View>
            <TouchableOpacity style={styles.followBtn} activeOpacity={0.7}>
              <Text style={styles.followText}>Follow</Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  headerTitle: { fontSize: 27, fontWeight: '700' },
  headerActions: { flexDirection: 'row', gap: 24 },
  scroll: { flex: 1 },
  sectionHead: { height: 46, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  sectionTitle: { fontSize: 20, fontWeight: '600', color: colors.primaryText },
  myStatus: { height: 80, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 14 },
  myAvatarWrap: { position: 'relative' },
  myAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  addBadge: { position: 'absolute', right: -2, bottom: -2, width: 22, height: 22, borderRadius: 11, backgroundColor: colors.accent, borderWidth: 2, borderColor: '#fff', alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600', fontSize: 16 },
  initialsSm: { color: '#fff', fontWeight: '600', fontSize: 14 },
  myStatusTitle: { fontSize: 16, fontWeight: '600', color: colors.primaryText },
  myStatusSub: { fontSize: 13, color: colors.mutedText, marginTop: 5 },
  groupLabel: { fontSize: 12, fontWeight: '600', color: colors.mutedText, paddingHorizontal: 20, height: 34, lineHeight: 34 },
  groupLabelInline: { fontSize: 12, fontWeight: '600', color: colors.mutedText },
  statusRow: { height: 72, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 20, gap: 12 },
  ring: { borderWidth: 2, borderColor: colors.accent, borderRadius: 100, padding: 3 },
  ringViewed: { borderColor: '#c5ccc7' },
  statusAvatar: { width: 46, height: 46, borderRadius: 23, alignItems: 'center', justifyContent: 'center' },
  statusName: { fontSize: 15, fontWeight: '600', color: colors.primaryText },
  statusTime: { fontSize: 12, color: colors.mutedText, marginTop: 5 },
  viewedHead: { height: 34, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  divider: { height: 8, backgroundColor: colors.softBg },
  channels: { paddingHorizontal: 20, paddingVertical: 18, gap: 12 },
  channelsHead: { flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  explore: { flexDirection: 'row', alignItems: 'center', gap: 3 },
  exploreText: { fontSize: 12, fontWeight: '600', color: colors.accent },
  channelsSub: { fontSize: 12, color: colors.mutedText, lineHeight: 17 },
  channelCard: { flexDirection: 'row', alignItems: 'center', borderWidth: 1, borderColor: colors.borderChat, borderRadius: 18, padding: 12, gap: 12 },
  channelImg: { width: 50, height: 50, borderRadius: 25, alignItems: 'center', justifyContent: 'center' },
  channelInfo: { flex: 1, gap: 4 },
  channelNameRow: { flexDirection: 'row', alignItems: 'center', gap: 4 },
  channelName: { fontSize: 13, fontWeight: '600', color: colors.primaryText },
  channelFollowers: { fontSize: 11, color: colors.mutedText },
  followBtn: { backgroundColor: colors.sentBubble, paddingHorizontal: 12, paddingVertical: 7, borderRadius: radii.pill },
  followText: { fontSize: 12, fontWeight: '600', color: colors.accent },
});
