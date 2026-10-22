import React from 'react';
import { View, Text, StyleSheet, FlatList, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { statuses } from '../data/mock';
import { RootStackParamList } from '../navigation/types';

export default function MomentsScreen() {
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList>>();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Text style={styles.title}>Moments</Text>
        <Pressable onPress={() => navigation.navigate('PostStatus')} style={styles.addBtn}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientEnd]} style={styles.addGrad}>
            <Ionicons name="add" size={22} color="#fff" />
          </LinearGradient>
        </Pressable>
      </View>
      <Text style={styles.hint}>Share a moment with people close to you</Text>
      <FlatList
        data={statuses}
        keyExtractor={(i) => i.id}
        contentContainerStyle={{ paddingBottom: 24 }}
        renderItem={({ item }) => (
          <Pressable
            style={styles.row}
            onPress={() => (item.isMe ? navigation.navigate('PostStatus') : undefined)}
          >
            <LinearGradient
              colors={item.isMe ? [colors.muted2, colors.muted] : [colors.gradientStart, colors.gradientEnd]}
              style={styles.ring}
            >
              <View style={styles.avatarInner}>
                <Text style={styles.avatarText}>{item.isMe ? '+' : item.name[0]}</Text>
              </View>
            </LinearGradient>
            <View style={{ flex: 1 }}>
              <Text style={styles.name}>{item.isMe ? 'Your moment' : item.name}</Text>
              <Text style={styles.time}>{item.time}</Text>
            </View>
            {item.isMe ? (
              <Ionicons name="camera-outline" size={22} color={colors.accent} />
            ) : null}
          </Pressable>
        )}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  title: { fontSize: 26, fontWeight: '700', color: colors.primary },
  addBtn: { borderRadius: 14, overflow: 'hidden' },
  addGrad: { width: 40, height: 40, borderRadius: 14, alignItems: 'center', justifyContent: 'center' },
  hint: { paddingHorizontal: 20, marginBottom: 8, fontSize: 13, color: colors.muted },
  row: { flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 20, paddingVertical: 12 },
  ring: { width: 56, height: 56, borderRadius: 28, alignItems: 'center', justifyContent: 'center' },
  avatarInner: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: colors.white,
    alignItems: 'center',
    justifyContent: 'center',
  },
  avatarText: { fontWeight: '700', fontSize: 18, color: colors.primary },
  name: { fontSize: 16, fontWeight: '600', color: colors.primary },
  time: { fontSize: 13, color: colors.muted, marginTop: 2 },
});
