import { Colors } from '@/constants/Colors';
import React from 'react';
import { StyleSheet, useColorScheme, View } from 'react-native';

interface ProgressProps {
  value?: number; // 0-100
  style?: any;
}

export function Progress({ value = 0, style }: ProgressProps) {
  const colorScheme = useColorScheme();
  const colors = Colors[colorScheme ?? 'light'];

  return (
    <View style={[styles.container, style]}>
      <View 
        style={[
          styles.indicator, 
          { 
            width: `${Math.min(Math.max(value, 0), 100)}%`,
            backgroundColor: colors.tint
          }
        ]} 
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    height: 8,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    borderRadius: 4,
    overflow: 'hidden',
  },
  indicator: {
    height: '100%',
    borderRadius: 4,
  },
});