import React from 'react';
import { Text, StyleSheet, TextStyle } from 'react-native';

interface TypographyProps {
  children: React.ReactNode;
  variant?: 'h1' | 'h2' | 'h3' | 'h4' | 'body1' | 'body2' | 'caption' | 'overline';
  color?: string;
  style?: TextStyle;
  numberOfLines?: number;
}

export function Typography({ 
  children, 
  variant = 'body1', 
  color, 
  style, 
  numberOfLines 
}: TypographyProps) {
  return (
    <Text 
      style={[
        styles[variant], 
        color && { color }, 
        style
      ]}
      numberOfLines={numberOfLines}
    >
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  h1: {
    fontFamily: 'Poppins-Bold',
    fontSize: 32,
    lineHeight: 40,
    letterSpacing: -0.5,
    color: '#1a202c',
  },
  h2: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 28,
    lineHeight: 36,
    letterSpacing: -0.25,
    color: '#1a202c',
  },
  h3: {
    fontFamily: 'Poppins-SemiBold',
    fontSize: 24,
    lineHeight: 32,
    color: '#1a202c',
  },
  h4: {
    fontFamily: 'Poppins-Medium',
    fontSize: 20,
    lineHeight: 28,
    color: '#1a202c',
  },
  body1: {
    fontFamily: 'Inter-Regular',
    fontSize: 16,
    lineHeight: 24,
    color: '#4a5568',
  },
  body2: {
    fontFamily: 'Inter-Regular',
    fontSize: 14,
    lineHeight: 20,
    color: '#4a5568',
  },
  caption: {
    fontFamily: 'Inter-Medium',
    fontSize: 12,
    lineHeight: 16,
    color: '#718096',
  },
  overline: {
    fontFamily: 'Inter-SemiBold',
    fontSize: 10,
    lineHeight: 16,
    letterSpacing: 1.5,
    textTransform: 'uppercase',
    color: '#a0aec0',
  },
});