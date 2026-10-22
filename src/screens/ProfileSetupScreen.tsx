import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { colors, radii } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';
import { GradientButton } from '../components/GradientButton';

type Props = NativeStackScreenProps<RootStackParamList, 'ProfileSetup'>;

export default function ProfileSetupScreen({ navigation }: Props) {
  const [name, setName] = useState('');

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Profile</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Set up your profile</Text>
        <Text style={styles.subtitle}>Add a name and photo so friends know it's you.</Text>
        <TouchableOpacity style={styles.avatarWrap}>
          <LinearGradient colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]} style={styles.avatar}>
            <Ionicons name="camera" size={32} color="#fff" />
          </LinearGradient>
          <Text style={styles.addPhoto}>Add photo</Text>
        </TouchableOpacity>
        <Text style={styles.label}>Display name</Text>
        <TextInput style={styles.input} placeholder="Your name" placeholderTextColor={colors.mutedText} value={name} onChangeText={setName} />
        <View style={styles.spacer} />
        <GradientButton title="Continue" onPress={() => navigation.replace('MainTabs')} />
      </View>
      <View style={styles.homeIndicator}><View style={styles.homeBar} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 64, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '600', color: colors.primaryText },
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 24, gap: 16 },
  title: { fontSize: 28, fontWeight: '700', color: colors.primaryText },
  subtitle: { fontSize: 14, color: colors.secondaryText, lineHeight: 21, marginBottom: 12 },
  avatarWrap: { alignItems: 'center', gap: 10, marginVertical: 12 },
  avatar: { width: 100, height: 100, borderRadius: 50, alignItems: 'center', justifyContent: 'center' },
  addPhoto: { fontSize: 14, fontWeight: '600', color: colors.accent },
  label: { fontSize: 12, fontWeight: '600', color: colors.secondaryText },
  input: { height: 54, backgroundColor: colors.inputBg, borderRadius: radii.xl, paddingHorizontal: 16, fontSize: 16, color: colors.primaryText },
  spacer: { flex: 1 },
  homeIndicator: { height: 24, alignItems: 'center', justifyContent: 'center' },
  homeBar: { width: 134, height: 5, borderRadius: 100, backgroundColor: colors.homeIndicator },
});
