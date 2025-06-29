import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface CardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  gradientColors?: string[];
  elevated?: boolean;
}

export function Card({ children, style, gradient = false, gradientColors = ['#FFFFFF', '#F8FAFC'], elevated = true }: CardProps) {
  const cardStyle = [
    styles.card,
    elevated && styles.elevated,
    style
  ];

  if (gradient) {
    return (
      <LinearGradient colors={gradientColors} style={cardStyle}>
        {children}
      </LinearGradient>
    );
  }

  return (
    <View style={cardStyle}>
      {children}
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.08,
    shadowRadius: 16,
    elevation: 4,
  },
});