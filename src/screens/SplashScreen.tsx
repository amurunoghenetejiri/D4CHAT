import React, { useEffect, useRef } from 'react';
import { View, Text, StyleSheet, Image, Animated, Easing } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { colors } from '../theme/colors';
import { RootStackParamList } from '../navigation/types';

type Props = { navigation: NativeStackNavigationProp<RootStackParamList, 'Splash'> };

export default function SplashScreen({ navigation }: Props) {
  const logoOp = useRef(new Animated.Value(0)).current;
  const logoSc = useRef(new Animated.Value(0.55)).current;
  const logoRot = useRef(new Animated.Value(-12)).current;
  const titleOp = useRef(new Animated.Value(0)).current;
  const titleY = useRef(new Animated.Value(20)).current;
  const tagOp = useRef(new Animated.Value(0)).current;
  const footOp = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.sequence([
      Animated.parallel([
        Animated.timing(logoOp, { toValue: 1, duration: 550, useNativeDriver: true }),
        Animated.spring(logoSc, { toValue: 1, friction: 5, tension: 70, useNativeDriver: true }),
        Animated.timing(logoRot, {
          toValue: 0,
          duration: 650,
          easing: Easing.out(Easing.cubic),
          useNativeDriver: true,
        }),
      ]),
      Animated.parallel([
        Animated.timing(titleOp, { toValue: 1, duration: 400, useNativeDriver: true }),
        Animated.timing(titleY, { toValue: 0, duration: 400, useNativeDriver: true }),
      ]),
      Animated.timing(tagOp, { toValue: 1, duration: 320, useNativeDriver: true }),
      Animated.timing(footOp, { toValue: 1, duration: 320, useNativeDriver: true }),
    ]).start();

    const t = setTimeout(() => navigation.replace('Welcome'), 3000);
    return () => clearTimeout(t);
  }, [navigation]);

  const rotate = logoRot.interpolate({ inputRange: [-12, 0], outputRange: ['-12deg', '0deg'] });

  return (
    <View style={styles.root}>
      <StatusBar style="dark" />
      <View style={styles.center}>
        <Animated.View
          style={{
            opacity: logoOp,
            transform: [{ scale: logoSc }, { rotate }],
          }}
        >
          <Image source={require('../../assets/logo.png')} style={styles.logo} resizeMode="contain" />
        </Animated.View>
        <Animated.Text
          style={[styles.title, { opacity: titleOp, transform: [{ translateY: titleY }] }]}
        >
          d4chat
        </Animated.Text>
        <Animated.Text style={[styles.tag, { opacity: tagOp }]}>
          Closer, wherever you are.
        </Animated.Text>
      </View>
      <Animated.Text style={[styles.foot, { opacity: footOp }]}>
        Private by design. Connected by d4chat.
      </Animated.Text>
    </View>
  );
}

const styles = StyleSheet.create({
  root: { flex: 1, backgroundColor: colors.white },
  center: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingHorizontal: 24 },
  logo: { width: 280, height: 210 },
  title: {
    marginTop: 18,
    fontSize: 48,
    fontWeight: '700',
    color: colors.gradientMid,
    textAlign: 'center',
  },
  tag: { marginTop: 10, fontSize: 14, color: colors.muted, textAlign: 'center' },
  foot: { textAlign: 'center', fontSize: 10, color: colors.muted, marginBottom: 36 },
});
