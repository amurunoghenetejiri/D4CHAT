import React, { useState } from 'react';
import { View, Text, StyleSheet, TextInput, TouchableOpacity, KeyboardAvoidingView, Platform } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { colors, radii } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';
import { GradientButton } from '../components/GradientButton';

type Props = NativeStackScreenProps<RootStackParamList, 'PhoneNumber'>;

export default function PhoneNumberScreen({ navigation }: Props) {
  const [phone, setPhone] = useState('415 555 0138');

  return (
    <KeyboardAvoidingView style={styles.container} behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => navigation.goBack()} hitSlop={12}>
          <Ionicons name="arrow-back" size={22} color={colors.primaryText} />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Get connected</Text>
      </View>
      <View style={styles.form}>
        <Text style={styles.title}>What's your number?</Text>
        <Text style={styles.subtitle}>We'll send you a verification code. Your number helps friends find you on d4chat.</Text>
        <Text style={styles.label}>Country / region</Text>
        <TouchableOpacity style={styles.inputRow}>
          <Text style={styles.inputText}>United States</Text>
          <Ionicons name="chevron-down" size={18} color={colors.secondaryText} />
        </TouchableOpacity>
        <View style={styles.phoneRow}>
          <View style={styles.codeCol}>
            <Text style={styles.label}>Code</Text>
            <View style={styles.inputBox}><Text style={styles.inputText}>+1</Text></View>
          </View>
          <View style={styles.phoneCol}>
            <Text style={styles.label}>Phone number</Text>
            <TextInput style={styles.inputBox} value={phone} onChangeText={setPhone} keyboardType="phone-pad" />
          </View>
        </View>
        <Text style={styles.hint}>Standard SMS rates may apply. We never share your number with advertisers.</Text>
        <View style={styles.spacer} />
        <GradientButton title="Continue" onPress={() => navigation.navigate('VerifyCode')} />
      </View>
      <View style={styles.homeIndicator}><View style={styles.homeBar} /></View>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  header: { height: 64, flexDirection: 'row', alignItems: 'center', gap: 14, paddingHorizontal: 16, borderBottomWidth: 1, borderBottomColor: colors.border },
  headerTitle: { flex: 1, fontSize: 20, fontWeight: '600', color: colors.primaryText },
  form: { flex: 1, paddingHorizontal: 24, paddingTop: 28, paddingBottom: 24, gap: 22 },
  title: { fontSize: 28, fontWeight: '700', color: colors.primaryText, lineHeight: 34 },
  subtitle: { fontSize: 14, color: colors.secondaryText, lineHeight: 21 },
  label: { fontSize: 12, fontWeight: '600', color: colors.secondaryText, marginBottom: 8 },
  inputRow: { height: 54, backgroundColor: colors.inputBg, borderRadius: radii.xl, paddingHorizontal: 16, flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between' },
  inputBox: { height: 54, backgroundColor: colors.inputBg, borderRadius: radii.xl, paddingHorizontal: 16, justifyContent: 'center', fontSize: 16, color: colors.primaryText },
  inputText: { fontSize: 16, color: colors.primaryText },
  phoneRow: { flexDirection: 'row', gap: 10 },
  codeCol: { width: 78 },
  phoneCol: { flex: 1 },
  hint: { fontSize: 12, color: colors.secondaryText, lineHeight: 18 },
  spacer: { flex: 1 },
  homeIndicator: { height: 24, alignItems: 'center', justifyContent: 'center' },
  homeBar: { width: 134, height: 5, borderRadius: 100, backgroundColor: colors.homeIndicator },
});
