import React from 'react';
import { View, Text, StyleSheet, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { LinearGradient } from 'expo-linear-gradient';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';
import { CURRENT_USER } from '../data/mock';

export default function MyProfileScreen() {
  const navigation = useNavigation();
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>Profile</Text>
        <Pressable hitSlop={12} onPress={() => navigation.navigate('EditProfile' as never)}>
          <Text style={styles.edit}>Edit</Text>
        </Pressable>
      </View>
      <ScrollView contentContainerStyle={{ paddingBottom: 40 }}>
        <View style={styles.hero}>
          <LinearGradient
            colors={[colors.gradientStart, colors.gradientEnd]}
            style={styles.avatar}
          >
            <Text style={styles.initial}>{CURRENT_USER.initial}</Text>
          </LinearGradient>
          <Text style={styles.name}>{CURRENT_USER.fullName}</Text>
          <Text style={styles.phone}>{CURRENT_USER.phone}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>About</Text>
          <Text style={styles.value}>{CURRENT_USER.about}</Text>
        </View>
        <View style={styles.card}>
          <Text style={styles.label}>Phone</Text>
          <Text style={styles.value}>{CURRENT_USER.phone}</Text>
        </View>
        <View style={styles.hint}>
          <Ionicons name="information-circle-outline" size={18} color={colors.muted} />
          <Text style={styles.hintText}>
            This is your profile. Open the "You" chat on the Chats tab to message yourself and test
            notifications.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: {
    height: 56,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    gap: 14,
  },
  headerTitle: { flex: 1, fontSize: 18, fontWeight: '600', color: colors.primary },
  edit: { fontSize: 15, fontWeight: '600', color: colors.accent },
  hero: { alignItems: 'center', paddingVertical: 28, gap: 10 },
  avatar: {
    width: 120,
    height: 120,
    borderRadius: 60,
    alignItems: 'center',
    justifyContent: 'center',
  },
  initial: { fontSize: 48, fontWeight: '700', color: '#fff' },
  name: { fontSize: 22, fontWeight: '700', color: colors.primary },
  phone: { fontSize: 15, color: colors.muted },
  card: {
    marginHorizontal: 16,
    marginBottom: 12,
    backgroundColor: colors.softBg,
    borderRadius: 14,
    padding: 16,
    gap: 6,
  },
  label: { fontSize: 12, color: colors.muted, fontWeight: '600' },
  value: { fontSize: 16, color: colors.primary },
  hint: {
    flexDirection: 'row',
    gap: 10,
    marginHorizontal: 20,
    marginTop: 12,
    alignItems: 'flex-start',
  },
  hintText: { flex: 1, fontSize: 13, color: colors.muted, lineHeight: 18 },
});
