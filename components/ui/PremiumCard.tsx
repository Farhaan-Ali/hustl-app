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
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(shimmerAnim, {
            toValue: 0,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }
  }, [shimmer]);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.98,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const getGradientColors = () => {
    if (gradientColors) return gradientColors;
    
    switch (variant) {
      case 'primary':
        return ['rgba(0, 56, 255, 0.95)', 'rgba(0, 33, 165, 0.95)'];
      case 'secondary':
        return ['rgba(255, 90, 31, 0.95)', 'rgba(230, 58, 11, 0.95)'];
      case 'accent':
        return ['rgba(248, 250, 252, 0.95)', 'rgba(255, 255, 255, 0.95)'];
      case 'glass':
        return ['rgba(255, 255, 255, 0.15)', 'rgba(255, 255, 255, 0.05)'];
      default:
        return ['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.95)'];
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
                    outputRange: [0, 0.2],
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
                    outputRange: [0, 0.2],
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
    borderRadius: 20,
    padding: 20,
    overflow: 'hidden',
    position: 'relative',
    marginBottom: 16,
  },
  default: {
    backgroundColor: 'rgba(255, 255, 255, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(245, 247, 255, 0.8)',
  },
  primary: {
    backgroundColor: 'rgba(0, 56, 255, 0.95)',
  },
  secondary: {
    backgroundColor: 'rgba(255, 90, 31, 0.95)',
  },
  accent: {
    backgroundColor: 'rgba(248, 250, 252, 0.95)',
    borderWidth: 1,
    borderColor: 'rgba(216, 221, 230, 0.3)',
  },
  glass: {
    backgroundColor: 'rgba(255, 255, 255, 0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.15)',
    backdropFilter: 'blur(20px)',
  },
  elevated: {
    shadowColor: 'rgba(0, 33, 165, 0.15)',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 20,
    elevation: 8,
  },
  glow: {
    shadowColor: 'rgba(0, 56, 255, 0.25)',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 15,
    elevation: 12,
  },
  gradientContent: {
    flex: 1,
    margin: -20,
    padding: 20,
    borderRadius: 20,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 20,
  },
});