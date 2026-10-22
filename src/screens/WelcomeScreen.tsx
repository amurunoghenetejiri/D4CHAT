import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';
import { GradientButton } from '../components/GradientButton';

type Props = NativeStackScreenProps<RootStackParamList, 'Welcome'>;

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.content}>
        <View style={styles.brandBlock}>
          <Text style={styles.brand}>
            <Text style={{ color: colors.gradientStart }}>d4</Text>
            <Text style={{ color: colors.gradientEnd }}>chat</Text>
          </Text>
          <LinearGradient colors={['#e6f7ff', '#dbeafe', '#e9d5ff']} style={styles.logoStage}>
            <LinearGradient colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]} style={styles.logoCircle}>
              <Ionicons name="chatbubbles" size={72} color="#fff" />
            </LinearGradient>
          </LinearGradient>
          <Text style={styles.headline}>Your people.{'\n'}Just a little closer.</Text>
          <Text style={styles.sub}>Everyday chats, big plans and little moments. A private space for all of it.</Text>
        </View>
        <View style={styles.actions}>
          <View style={styles.privacyRow}>
            <Ionicons name="shield-checkmark" size={18} color={colors.accent} />
            <Text style={styles.privacyText}>End-to-end encrypted. Always.</Text>
          </View>
          <GradientButton title="Get started" onPress={() => navigation.navigate('PhoneNumber')} />
          <Text style={styles.legal}>
            By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and acknowledge our <Text style={styles.link}>Privacy Policy.</Text>
          </Text>
        </View>
      </View>
      <View style={styles.homeIndicator}><View style={styles.homeBar} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  content: { flex: 1, paddingHorizontal: 28, paddingTop: 30, paddingBottom: 20, justifyContent: 'space-between' },
  brandBlock: { alignItems: 'center', gap: 14 },
  brand: { fontSize: 30, fontWeight: '700' },
  logoStage: { width: '100%', height: 280, borderRadius: 32, alignItems: 'center', justifyContent: 'center' },
  logoCircle: { width: 140, height: 140, borderRadius: 40, alignItems: 'center', justifyContent: 'center' },
  headline: { fontSize: 28, fontWeight: '700', color: colors.primaryText, textAlign: 'center', lineHeight: 34 },
  sub: { fontSize: 15, color: colors.secondaryText, textAlign: 'center', lineHeight: 22 },
  actions: { gap: 20 },
  privacyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  privacyText: { fontSize: 12, color: colors.accent },
  legal: { fontSize: 12, color: colors.secondaryText, textAlign: 'center', lineHeight: 19 },
  link: { color: colors.accent },
  homeIndicator: { height: 24, alignItems: 'center', justifyContent: 'center' },
  homeBar: { width: 134, height: 5, borderRadius: 100, backgroundColor: colors.homeIndicator },
});
