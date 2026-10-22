import React from 'react';
import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors, radii } from '../theme/colors';
import { MOCK_CHATS, ChatPreview } from '../data/mock';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';
import { RootStackParamList } from '../navigation/types';

type Nav = NativeStackNavigationProp<RootStackParamList>;

function ChatRow({ item, onPress }: { item: ChatPreview; onPress: () => void }) {
  return (
    <TouchableOpacity style={styles.row} onPress={onPress} activeOpacity={0.7}>
      <View style={styles.avatar}>
        {item.isGroup ? (
          <View style={[styles.groupAvatar, { backgroundColor: item.groupIcon === 'coffee' ? colors.groupAvatarCoffee : colors.groupAvatarGreen }]}>
            <Ionicons name={item.groupIcon === 'coffee' ? 'cafe' : 'people'} size={26} color={colors.primaryText} />
          </View>
        ) : (
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.photoPlaceholder}>
            <Text style={styles.initials}>{item.name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</Text>
          </LinearGradient>
        )}
      </View>
      <View style={styles.details}>
        <View style={styles.nameRow}>
          <Text style={styles.name} numberOfLines={1}>{item.name}</Text>
          <Text style={[styles.time, item.unread > 0 && { color: colors.accent }]}>{item.time}</Text>
        </View>
        <View style={styles.msgRow}>
          {item.isSent && <Ionicons name="checkmark-done" size={16} color={colors.mutedText} style={{ marginRight: 4 }} />}
          {item.isPhoto && <Ionicons name="camera" size={14} color={colors.mutedText} style={{ marginRight: 4 }} />}
          <Text style={[styles.preview, item.isTyping && { color: colors.accent }]} numberOfLines={1}>{item.lastMessage}</Text>
          {item.pinned && <Ionicons name="pin" size={13} color={colors.mutedText} style={{ marginLeft: 4 }} />}
          {item.unread > 0 && (
            <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.badge}>
              <Text style={styles.badgeText}>{item.unread}</Text>
            </LinearGradient>
          )}
        </View>
      </View>
    </TouchableOpacity>
  );
}

export default function ChatsScreen() {
  const navigation = useNavigation<Nav>();
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.appHeader}>
        <Text style={styles.brand}><Text style={{ color: colors.gradientStart }}>d4</Text><Text style={{ color: colors.gradientEnd }}>chat</Text></Text>
        <View style={styles.headerActions}>
          <TouchableOpacity hitSlop={8}><Ionicons name="camera-outline" size={24} color={colors.primaryText} /></TouchableOpacity>
          <TouchableOpacity hitSlop={8}><Ionicons name="ellipsis-vertical" size={22} color={colors.primaryText} /></TouchableOpacity>
        </View>
      </View>
      <View style={styles.searchArea}>
        <View style={styles.searchField}>
          <Ionicons name="search" size={20} color={colors.mutedText} />
          <Text style={styles.searchPlaceholder}>Search messages or people</Text>
        </View>
      </View>
      <View style={styles.filters}>
        {['All', 'Unread', 'Favorites', 'Groups'].map((f, i) => (
          <View key={f} style={[styles.filter, i === 0 && styles.filterActive]}>
            <Text style={[styles.filterText, i === 0 && styles.filterTextActive]}>{f}</Text>
          </View>
        ))}
      </View>
      <TouchableOpacity style={styles.archived} onPress={() => navigation.navigate('ArchivedChats')} activeOpacity={0.7}>
        <Ionicons name="archive-outline" size={20} color={colors.primaryText} />
        <Text style={styles.archivedText}>Archived</Text>
        <Text style={styles.archivedCount}>2</Text>
      </TouchableOpacity>
      <FlatList
        data={MOCK_CHATS}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => (
          <ChatRow item={item} onPress={() => navigation.navigate('Conversation', { chatId: item.id, name: item.name })} />
        )}
        contentContainerStyle={{ paddingBottom: 80 }}
      />
      <TouchableOpacity style={styles.fab} activeOpacity={0.85} onPress={() => navigation.navigate('NewChat')}>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.fabGradient}>
          <Ionicons name="add" size={28} color="#fff" />
        </LinearGradient>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  appHeader: { height: 60, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', paddingHorizontal: 20 },
  brand: { fontSize: 29, fontWeight: '700' },
  headerActions: { flexDirection: 'row', gap: 24 },
  searchArea: { height: 60, paddingHorizontal: 16, paddingVertical: 8 },
  searchField: { flex: 1, height: 44, backgroundColor: colors.softBg, borderRadius: radii.pill, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 15, gap: 10 },
  searchPlaceholder: { fontSize: 15, color: colors.mutedText },
  filters: { flexDirection: 'row', gap: 8, paddingHorizontal: 16, paddingVertical: 8, height: 48 },
  filter: { height: 32, paddingHorizontal: 14, borderRadius: radii.pill, backgroundColor: colors.softBg, justifyContent: 'center' },
  filterActive: { backgroundColor: '#e9d5ff' },
  filterText: { fontSize: 13, fontWeight: '500', color: colors.mutedText },
  filterTextActive: { color: colors.gradientEnd },
  archived: { height: 40, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 30, gap: 29 },
  archivedText: { flex: 1, fontSize: 14, fontWeight: '500', color: colors.primaryText },
  archivedCount: { fontSize: 12, color: colors.accent },
  row: { height: 70, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 16, gap: 12 },
  avatar: { width: 52, height: 52 },
  photoPlaceholder: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600', fontSize: 16 },
  groupAvatar: { width: 52, height: 52, borderRadius: 26, alignItems: 'center', justifyContent: 'center' },
  details: { flex: 1, gap: 5 },
  nameRow: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' },
  name: { fontSize: 16, fontWeight: '600', color: colors.primaryText, flex: 1 },
  time: { fontSize: 11, color: colors.mutedText },
  msgRow: { flexDirection: 'row', alignItems: 'center' },
  preview: { flex: 1, fontSize: 13, color: colors.mutedText },
  badge: { width: 20, height: 20, borderRadius: 10, alignItems: 'center', justifyContent: 'center', marginLeft: 6 },
  badgeText: { fontSize: 11, fontWeight: '600', color: '#fff' },
  fab: { position: 'absolute', right: 20, bottom: 24 },
  fabGradient: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
});
