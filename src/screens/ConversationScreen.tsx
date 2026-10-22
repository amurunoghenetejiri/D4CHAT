import React, { useState } from 'react';
import { View, Text, StyleSheet, FlatList, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii } from '../theme/colors';
import { MOCK_MESSAGES, Message } from '../data/mock';
import { RootStackParamList } from '../navigation/types';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';

type Props = NativeStackScreenProps<RootStackParamList, 'Conversation'>;

function Bubble({ item }: { item: Message }) {
  const isMe = item.fromMe;
  return (
    <View style={[styles.msgRow, isMe && styles.msgRowMe]}>
      <View style={[styles.bubble, isMe ? styles.bubbleMe : styles.bubbleThem]}>
        {item.isPhoto && (
          <View style={styles.photoPlaceholder}>
            <Ionicons name="image" size={40} color={colors.mutedText} />
            <Text style={styles.photoLabel}>Photo</Text>
          </View>
        )}
        <Text style={styles.msgText}>{item.text}</Text>
        <View style={styles.meta}>
          <Text style={styles.msgTime}>{item.time}</Text>
          {isMe && <Ionicons name="checkmark-done" size={14} color={colors.mutedText} style={{ marginLeft: 4 }} />}
        </View>
      </View>
    </View>
  );
}

export default function ConversationScreen({ navigation, route }: Props) {
  const { name } = route.params;
  const [text, setText] = useState('');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.primaryText} />
        </TouchableOpacity>
        <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.avatar}>
          <Text style={styles.initials}>{name.split(' ').map((n) => n[0]).join('').slice(0, 2)}</Text>
        </LinearGradient>
        <View style={styles.contactInfo}>
          <Text style={styles.contactName}>{name}</Text>
          <Text style={styles.online}>online</Text>
        </View>
        <View style={styles.callActions}>
          <TouchableOpacity hitSlop={8}><Ionicons name="videocam-outline" size={24} color={colors.primaryText} /></TouchableOpacity>
          <TouchableOpacity hitSlop={8}><Ionicons name="call-outline" size={22} color={colors.primaryText} /></TouchableOpacity>
          <TouchableOpacity hitSlop={8}><Ionicons name="ellipsis-vertical" size={22} color={colors.primaryText} /></TouchableOpacity>
        </View>
      </View>
      <View style={styles.history}>
        <View style={styles.dateSep}><View style={styles.dateLabel}><Text style={styles.dateText}>Today</Text></View></View>
        <View style={styles.encryption}>
          <Ionicons name="lock-closed" size={12} color={colors.encryptionText} />
          <Text style={styles.encryptionText}>Messages and calls are end-to-end encrypted. Only people in this chat can read or listen to them.</Text>
        </View>
        <FlatList data={MOCK_MESSAGES} keyExtractor={(m) => m.id} renderItem={({ item }) => <Bubble item={item} />} contentContainerStyle={{ gap: 12, paddingBottom: 8 }} />
      </View>
      <View style={styles.composer}>
        <View style={styles.inputWrap}>
          <Ionicons name="happy-outline" size={24} color={colors.mutedText} />
          <TextInput style={styles.input} placeholder="Message" placeholderTextColor={colors.mutedText} value={text} onChangeText={setText} />
          <Ionicons name="attach" size={22} color={colors.mutedText} />
          <Ionicons name="camera-outline" size={22} color={colors.mutedText} />
        </View>
        <TouchableOpacity activeOpacity={0.85}>
          <LinearGradient colors={['#22d3ee', '#3b82f6', '#4f46e5']} style={styles.micBtn}>
            <Ionicons name="mic" size={24} color="#fff" />
          </LinearGradient>
        </TouchableOpacity>
      </View>
      <View style={styles.homeIndicator}><View style={styles.homeBar} /></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 64, flexDirection: 'row', alignItems: 'center', gap: 10, paddingHorizontal: 12, borderBottomWidth: 1, borderBottomColor: colors.borderChat },
  avatar: { width: 40, height: 40, borderRadius: 20, alignItems: 'center', justifyContent: 'center' },
  initials: { color: '#fff', fontWeight: '600', fontSize: 14 },
  contactInfo: { flex: 1 },
  contactName: { fontSize: 16, fontWeight: '600', color: colors.primaryText },
  online: { fontSize: 12, color: colors.accentIndigo },
  callActions: { flexDirection: 'row', gap: 20, paddingRight: 4 },
  history: { flex: 1, backgroundColor: colors.chatBg, paddingHorizontal: 16, paddingTop: 14 },
  dateSep: { alignItems: 'center', marginBottom: 12 },
  dateLabel: { backgroundColor: 'rgba(255,255,255,0.85)', paddingHorizontal: 12, paddingVertical: 5, borderRadius: 8 },
  dateText: { fontSize: 11, fontWeight: '500', color: '#68736b' },
  encryption: { backgroundColor: colors.encryptionBg, borderRadius: 8, paddingHorizontal: 13, paddingVertical: 9, flexDirection: 'row', alignItems: 'center', gap: 6, marginBottom: 12 },
  encryptionText: { flex: 1, fontSize: 10, color: colors.encryptionText, textAlign: 'center', lineHeight: 14 },
  msgRow: { flexDirection: 'row' },
  msgRowMe: { justifyContent: 'flex-end' },
  bubble: { maxWidth: '78%', borderRadius: 12, paddingTop: 9, paddingBottom: 6, paddingLeft: 12, paddingRight: 10 },
  bubbleThem: { backgroundColor: colors.receivedBubble, borderTopLeftRadius: 3 },
  bubbleMe: { backgroundColor: colors.sentBubble, borderTopRightRadius: 3 },
  photoPlaceholder: { height: 120, backgroundColor: colors.softBg, borderRadius: 8, alignItems: 'center', justifyContent: 'center', marginBottom: 6 },
  photoLabel: { fontSize: 12, color: colors.mutedText, marginTop: 4 },
  msgText: { fontSize: 14, color: colors.primaryText, lineHeight: 20 },
  meta: { flexDirection: 'row', alignItems: 'center', justifyContent: 'flex-end', marginTop: 3 },
  msgTime: { fontSize: 10, color: colors.mutedText },
  composer: { backgroundColor: colors.chatBg, flexDirection: 'row', alignItems: 'center', padding: 10, gap: 8, height: 70 },
  inputWrap: { flex: 1, height: 48, backgroundColor: colors.white, borderRadius: radii.pill, flexDirection: 'row', alignItems: 'center', paddingHorizontal: 12, gap: 12 },
  input: { flex: 1, fontSize: 15, color: colors.primaryText },
  micBtn: { width: 48, height: 48, borderRadius: 24, alignItems: 'center', justifyContent: 'center' },
  homeIndicator: { height: 24, alignItems: 'center', justifyContent: 'center', backgroundColor: colors.chatBg },
  homeBar: { width: 134, height: 5, borderRadius: 100, backgroundColor: colors.homeIndicator },
});
