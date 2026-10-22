import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Ionicons } from '@expo/vector-icons';
import { NativeStackScreenProps } from '@react-navigation/native-stack';
import { LinearGradient } from 'expo-linear-gradient';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';

type Props = NativeStackScreenProps<RootStackParamList, 'Splash'>;

export default function SplashScreen({ navigation }: Props) {
  useEffect(() => {
    const t = setTimeout(() => navigation.replace('Welcome'), 2200);
    return () => clearTimeout(t);
  }, [navigation]);

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      <StatusBarPlaceholder />
      <View style={styles.center}>
        <LinearGradient colors={['#00e5ff', '#3b82f6', '#4c1d95']} style={styles.logoCircle}>
          <Ionicons name="chatbubbles" size={64} color="#fff" />
        </LinearGradient>
        <Text style={styles.brand}>
          <Text style={{ color: colors.gradientStart }}>d4</Text>
          <Text style={{ color: colors.gradientEnd }}>chat</Text>
        </Text>
        <Text style={styles.tagline}>Closer, wherever you are.</Text>
      </View>
      <View style={styles.privacy}>
        <Ionicons name="lock-closed" size={11} color={colors.secondaryText} />
        <Text style={styles.privacyText}>Private by design. Connected by d4chat.</Text>
      </View>
      <View style={styles.homeIndicator}><View style={styles.homeBar} /></View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', gap: 18 },
  logoCircle: { width: 120, height: 120, borderRadius: 36, alignItems: 'center', justifyContent: 'center' },
  brand: { fontSize: 48, fontWeight: '700' },
  tagline: { fontSize: 14, color: colors.secondaryText },
  privacy: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 5, padding: 16 },
  privacyText: { fontSize: 10, color: colors.secondaryText },
  homeIndicator: { height: 24, alignItems: 'center', justifyContent: 'center' },
  homeBar: { width: 134, height: 5, borderRadius: 100, backgroundColor: colors.homeIndicator },
});
