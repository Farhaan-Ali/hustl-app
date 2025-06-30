import React, { useState, useRef } from 'react';
import { View, TextInput, Text, StyleSheet, TextInputProps, ViewStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface PremiumInputProps extends TextInputProps {
  label?: string;
  error?: string;
  icon?: React.ReactNode;
  containerStyle?: ViewStyle;
  gradient?: boolean;
}

export function PremiumInput({ label, error, icon, containerStyle, style, gradient = false, ...props }: PremiumInputProps) {
  const [isFocused, setIsFocused] = useState(false);
  const focusAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Continuous shimmer effect
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
  }, []);

  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(focusAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.parallel([
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['rgba(139, 92, 246, 0.2)', '#8b5cf6'],
  });

  const glowStyle = {
    shadowOpacity: glowAnim,
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 15,
    elevation: isFocused ? 8 : 0,
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <Animated.View style={[styles.inputContainer, glowStyle, { borderColor }]}>
        <LinearGradient
          colors={gradient ? ['rgba(139, 92, 246, 0.05)', 'rgba(255, 255, 255, 0.95)'] : ['#ffffff', '#ffffff']}
          style={styles.gradientBackground}
        />
        
        {/* Shimmer Effect */}
        <Animated.View 
          style={[
            styles.shimmerOverlay,
            {
              transform: [{ translateX: shimmerTranslate }],
              opacity: shimmerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              }),
            }
          ]}
        />
        
        {icon && <View style={styles.icon}>{icon}</View>}
        
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="rgba(113, 128, 150, 0.7)"
          {...props}
        />
      </Animated.View>
      
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    fontWeight: '600',
    color: '#2d3748',
    marginBottom: 8,
    fontFamily: 'Inter-SemiBold',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 2,
    borderRadius: 20,
    paddingHorizontal: 20,
    paddingVertical: 18,
    position: 'relative',
    overflow: 'hidden',
  },
  gradientBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmerOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 50,
  },
  icon: {
    marginRight: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#2d3748',
    fontFamily: 'Inter-Regular',
    zIndex: 1,
  },
  inputWithIcon: {
    marginLeft: 0,
  },
  errorText: {
    fontSize: 12,
    color: '#ff6b6b',
    marginTop: 4,
    fontFamily: 'Inter-Medium',
  },
});