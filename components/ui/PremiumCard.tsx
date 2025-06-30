import React, { useRef } from 'react';
import { View, StyleSheet, ViewStyle, TouchableOpacity, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PremiumCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  gradient?: boolean;
  gradientColors?: string[];
  elevated?: boolean;
  onPress?: () => void;
  variant?: 'default' | 'primary' | 'secondary' | 'accent' | 'glass';
  glowEffect?: boolean;
  shimmer?: boolean;
}

export function PremiumCard({ 
  children, 
  style, 
  gradient = false, 
  gradientColors, 
  elevated = true,
  onPress,
  variant = 'default',
  glowEffect = false,
  shimmer = false
}: PremiumCardProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    if (shimmer) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(shimmerAnim, {
            toValue: 1,
            duration: 1500,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 1500,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [shimmer]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
  };

  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    
    switch (variant) {
      case 'primary':
        return ['#0038FF', '#0021A5'];
      case 'secondary':
        return ['#FF5A1F', '#E63A0B'];
      case 'accent':
        return ['#F5F7FF', '#ffffff'];
      case 'glass':
        return ['rgba(255,255,255,0.25)', 'rgba(255,255,255,0.1)'];
      default:
        return ['#ffffff', '#F5F7FF'];
    }
  };

  const cardStyle = [
    styles.card,
    styles[variant],
    elevated && styles.elevated,
    glowEffect && styles.glow,
    style
  ];

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const CardContent = () => (
    <Animated.View style={[cardStyle, animatedStyle]}>
      {gradient || variant === 'glass' ? (
        <LinearGradient 
          colors={getGradientColors()} 
          style={styles.gradientContent}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          {shimmer && (
            <Animated.View 
              style={[
                styles.shimmerOverlay,
                {
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.3],
                  }),
                }
              ]}
            />
          )}
          {children}
        </LinearGradient>
      ) : (
        <>
          {shimmer && (
            <Animated.View 
              style={[
                styles.shimmerOverlay,
                {
                  opacity: shimmerAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 0.3],
                  }),
                }
              ]}
            />
          )}
          {children}
        </>
      )}
    </Animated.View>
  );

  if (onPress) {
    return (
      <TouchableOpacity 
        onPress={onPress} 
        activeOpacity={1}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
      >
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
    position: 'relative',
  },
  default: {
    backgroundColor: '#ffffff',
  },
  primary: {
    backgroundColor: '#0038FF',
  },
  secondary: {
    backgroundColor: '#FF5A1F',
  },
  accent: {
    backgroundColor: '#F5F7FF',
  },
  glass: {
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    backdropFilter: 'blur(20px)',
  },
  elevated: {
    shadowColor: '#0021A5',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 24,
    elevation: 12,
  },
  glow: {
    shadowColor: '#0038FF',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  gradientContent: {
    flex: 1,
    margin: -24,
    padding: 24,
    borderRadius: 24,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.5)',
    borderRadius: 24,
  },
});