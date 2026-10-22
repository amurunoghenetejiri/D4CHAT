import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { colors } from '../theme/colors';

export function StatusBarPlaceholder() {
  return (
    <View style={styles.row}>
      <Text style={styles.time}>9:41</Text>
      <View style={styles.icons}>
        <Ionicons name="cellular" size={14} color={colors.primaryText} />
        <Ionicons name="wifi" size={14} color={colors.primaryText} style={{ marginLeft: 6 }} />
        <Ionicons name="battery-full" size={16} color={colors.primaryText} style={{ marginLeft: 6 }} />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  row: {
    height: 44,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 24,
  },
  time: {
    fontSize: 14,
    fontWeight: '600',
    color: colors.primaryText,
  },
  icons: {
    flexDirection: 'row',
    alignItems: 'center',
  },
});
