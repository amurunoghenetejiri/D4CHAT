import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { colors } from '../theme/colors';
import { StatusBarPlaceholder } from '../components/StatusBarPlaceholder';

type Props = { title: string; subtitle?: string };

export default function PlaceholderScreen({ title, subtitle }: Props) {
  return (
    <View style={styles.container}>
      <StatusBarPlaceholder />
      <View style={styles.center}>
        <Text style={styles.title}>{title}</Text>
        <Text style={styles.sub}>
          {subtitle ?? 'UI shell matching Figma. Full layout coming next.'}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: colors.white },
  center: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: colors.primaryText,
    marginBottom: 8,
  },
  sub: {
    fontSize: 14,
    color: colors.secondaryText,
    textAlign: 'center',
  },
});
