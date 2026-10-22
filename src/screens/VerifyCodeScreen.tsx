import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';
import { GradientButton } from '../components/GradientButton';

type Props = NativeStackScreenProps<RootStackParamList, 'VerifyCode'>;

export default function VerifyCodeScreen({ navigation }: Props) {
  const [code] = useState(['2', '4', '8', '1', '0', '6']);
  const [hasError, setHasError] = useState(true);

  const onVerify = () => {
    setHasError(false);
    navigation.navigate('ProfileSetup');
  };

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Verify your number</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>Check your messages</Text>
        <Text style={styles.subtitle}>Enter the 6-digit code sent to{'\n'}+1 (415) 555-0138.</Text>
        <TouchableOpacity onPress={() => navigation.goBack()}>
          <Text style={styles.link}>Change phone number</Text>
        </TouchableOpacity>
        <View style={styles.codeRow}>
          {code.map((d, i) => (
            <View key={i} style={[styles.digit, hasError && styles.digitError]}>
              <Text style={styles.digitText}>{d}</Text>
            </View>
          ))}
        </View>
        {hasError && (
          <View style={styles.errorRow}>
            <Ionicons name="alert-circle" size={16} color={colors.error} />
            <Text style={styles.errorText}>That code isn't right. Please try again.</Text>
          </View>
        )}
        <Text style={styles.resend}>Resend SMS in 00:24</Text>
        <TouchableOpacity><Text style={styles.link}>Didn't receive a code? Get help</Text></TouchableOpacity>
        <View style={styles.spacer} />
        <GradientButton title="Verify code" onPress={onVerify} />
      </View>
      <View style={styles.homeIndicator}><View style={styles.homeBar} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 64, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '600', color: colors.primaryText },
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 24, gap: 20 },
  title: { fontSize: 28, fontWeight: '700', color: colors.primaryText },
  subtitle: { fontSize: 14, color: colors.secondaryText, lineHeight: 21 },
  link: { fontSize: 13, fontWeight: '600', color: colors.accent },
  codeRow: { flexDirection: 'row', gap: 8 },
  digit: { flex: 1, height: 58, borderRadius: radii.lg, backgroundColor: colors.inputBg, alignItems: 'center', justifyContent: 'center', borderWidth: 1, borderColor: 'transparent' },
  digitError: { backgroundColor: colors.errorBg, borderColor: colors.error },
  digitText: { fontSize: 24, fontWeight: '600', color: colors.primaryText },
  errorRow: { flexDirection: 'row', alignItems: 'center', gap: 7 },
  errorText: { fontSize: 12, color: colors.error },
  resend: { fontSize: 13, color: colors.secondaryText },
  spacer: { flex: 1 },
  homeIndicator: { height: 24, alignItems: 'center', justifyContent: 'center' },
  homeBar: { width: 134, height: 5, borderRadius: 100, backgroundColor: colors.homeIndicator },
});
