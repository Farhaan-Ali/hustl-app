import React from 'react';
import { View, Text, StyleSheet, ViewStyle, TextStyle } from 'react-native';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'primary' | 'secondary' | 'success' | 'warning';
  size?: 'sm' | 'md';
  style?: ViewStyle;
  textStyle?: TextStyle;
}

export function Badge({ children, variant = 'default', size = 'md', style, textStyle }: BadgeProps) {
  return (
    <View style={[styles.badge, styles[variant], styles[size], style]}>
      <Text style={[styles.text, styles[`${variant}Text`], styles[`${size}Text`], textStyle]}>
        {children}
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  badge: {
    borderRadius: 12,
    alignItems: 'center',
    justifyContent: 'center',
    alignSelf: 'flex-start',
  },
  sm: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  md: {
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  default: {
    backgroundColor: '#D8DDE6',
  },
  primary: {
    backgroundColor: '#0021A5',
  },
  secondary: {
    backgroundColor: '#E6501E',
  },
  success: {
    backgroundColor: '#E6501E',
  },
  warning: {
    backgroundColor: '#FF7849',
  },
  text: {
    fontWeight: '600',
  },
  smText: {
    fontSize: 12,
  },
  mdText: {
    fontSize: 14,
  },
  defaultText: {
    color: '#001E3C',
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  successText: {
    color: '#FFFFFF',
  },
  warningText: {
    color: '#FFFFFF',
  },
});