import React from 'react';
import { View, Text, StyleSheet, Image, Pressable, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { SafeAreaView } from 'react-native-safe-area-context';
import { LinearGradient } from 'expo-linear-gradient';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Welcome'> };

export default function WelcomeScreen({ navigation }: Props) {
  return (
    <SafeAreaView style={styles.root} edges={['top', 'bottom']}>
      <StatusBar style="dark" />
      <ScrollView contentContainerStyle={styles.scroll} bounces={false}>
        <Text style={styles.brand}>d4chat</Text>
        <LinearGradient
          colors={[colors.softStart, colors.softMid, colors.softEnd]}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
          style={styles.logoStage}
        >
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </LinearGradient>
        <Text style={styles.headline}>Your people.{'\n'}Just a little closer.</Text>
        <Text style={styles.body}>
          Everyday chats, big plans and little moments. A private space for all of it.
        </Text>
        <View style={styles.bottom}>
          <View style={styles.privacyRow}>
            <Ionicons name="shield-checkmark" size={18} color={colors.accent} />
            <Text style={styles.privacyText}>End-to-end encrypted. Always.</Text>
          </View>
          <Pressable onPress={() => navigation.navigate('PhoneNumber')} style={styles.btnPress}>
            <LinearGradient
              colors={[colors.gradientStart, colors.gradientMid, colors.gradientEnd]}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.btn}
            >
              <Text style={styles.btnLabel}>Get started</Text>
            </LinearGradient>
          </Pressable>
          <Text style={styles.legal}>
            By continuing, you agree to our <Text style={styles.link}>Terms of Service</Text> and
            acknowledge our <Text style={styles.link}>Privacy Policy</Text>.
          </Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  scroll: { flexGrow: 1, paddingHorizontal: 28, paddingTop: 30, paddingBottom: 20 },
  brand: {
    fontSize: 30,
    fontWeight: '700',
    color: colors.gradientMid,
    textAlign: 'center',
    marginBottom: 14,
  },
  logoStage: {
    height: 280,
    borderRadius: 32,
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
  },
  logo: { width: 270, height: 180 },
  headline: {
    marginTop: 14,
    fontSize: 28,
    fontWeight: '700',
    color: colors.primary,
    textAlign: 'center',
    lineHeight: 34,
  },
  body: {
    marginTop: 10,
    fontSize: 15,
    color: colors.muted,
    textAlign: 'center',
    lineHeight: 22,
  },
  bottom: { marginTop: 'auto', paddingTop: 28, gap: 20 },
  privacyRow: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', gap: 7 },
  privacyText: { fontSize: 12, color: colors.accent },
  btnPress: { borderRadius: 100, overflow: 'hidden' },
  btn: { height: 52, alignItems: 'center', justifyContent: 'center', borderRadius: 100 },
  btnLabel: { color: colors.white, fontSize: 15, fontWeight: '600' },
  legal: { fontSize: 12, color: colors.muted, textAlign: 'center', lineHeight: 19 },
  link: { color: colors.accent },
});
