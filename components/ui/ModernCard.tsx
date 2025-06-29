import React from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface ModernCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  gradientColors?: string[];
  elevated?: boolean;
  onPress?: () => void;
  variant?: 'default' | 'glass' | 'elevated' | 'flat';
}

export function ModernCard({ 
  children, 
  style, 
  gradient = false, 
  gradientColors = ['#ffffff', '#f8fafc'], 
  elevated = true,
  onPress,
  variant = 'default'
}: ModernCardProps) {
  const cardStyle = [
    styles.card,
    styles[variant],
    elevated && styles.elevated,
    style
  ];

  const CardContent = () => (
    <View style={cardStyle}>
      {gradient ? (
        <LinearGradient 
          colors={gradientColors} 
          style={styles.gradientContent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {children}
        </LinearGradient>
      ) : (
        children
      )}
    </View>
  );

  if (onPress) {
    return (
      <TouchableOpacity onPress={onPress} activeOpacity={0.95}>
        <CardContent />
      </TouchableOpacity>
    );
  }

  return <CardContent />;
}

const styles = StyleSheet.create({
  card: {
    borderRadius: 24,
    padding: 24,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: '#ffffff',
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  elevated: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.08,
    shadowRadius: 24,
    elevation: 8,
  },
  flat: {
    backgroundColor: '#f8fafc',
    shadowOpacity: 0,
    elevation: 0,
  },
  gradientContent: {
    flex: 1,
    margin: -24,
    padding: 24,
  },
});