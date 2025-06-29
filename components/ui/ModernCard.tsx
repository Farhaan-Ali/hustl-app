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
  variant?: 'default' | 'primary' | 'secondary' | 'accent';
}

export function ModernCard({ 
  children, 
  style, 
  gradient = false, 
  gradientColors, 
  elevated = true,
  onPress,
  variant = 'default'
}: ModernCardProps) {
  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    
    switch (variant) {
      case 'primary':
        return ['#0021A5', '#001E3C'];
      case 'secondary':
        return ['#E6501E', '#FF7849'];
      case 'accent':
        return ['#D8DDE6', '#ffffff'];
      default:
        return ['#ffffff', '#D8DDE6'];
    }
  };

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
          colors={getGradientColors()} 
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
    borderRadius: 20,
    padding: 24,
    overflow: 'hidden',
  },
  default: {
    backgroundColor: '#ffffff',
  },
  primary: {
    backgroundColor: '#0021A5',
  },
  secondary: {
    backgroundColor: '#E6501E',
  },
  accent: {
    backgroundColor: '#D8DDE6',
  },
  elevated: {
    shadowColor: '#001E3C',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 16,
    elevation: 8,
  },
  gradientContent: {
    flex: 1,
    margin: -24,
    padding: 24,
  },
});