import React from 'react';
import { View, Text, StyleSheet, Pressable } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Ionicons } from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native';
import { colors } from '../theme/colors';

type Props = { title?: string; subtitle?: string; route?: { params?: { title?: string } } };

export default function PlaceholderScreen({ title, subtitle, route }: Props) {
  const navigation = useNavigation();
  const t = title || route?.params?.title || 'Page';
  return (
    <SafeAreaView style={styles.root} edges={['top']}>
      <StatusBar style="dark" />
      <View style={styles.header}>
        <Pressable onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={24} color={colors.primary} />
        </Pressable>
        <Text style={styles.headerTitle}>{t}</Text>
      </View>
      <View style={styles.center}>
        <Text style={styles.title}>{t}</Text>
        <Text style={styles.sub}>{subtitle ?? 'Mock UI — offline only.'}</Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  header: { flexDirection: 'row', alignItems: 'center', gap: 14, padding: 16 },
  headerTitle: { fontSize: 18, fontWeight: '600', color: colors.primary },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', padding: 24 },
  title: { fontSize: 22, fontWeight: '700', color: colors.primary, marginBottom: 8 },
  sub: { fontSize: 14, color: colors.muted, textAlign: 'center' },
});
