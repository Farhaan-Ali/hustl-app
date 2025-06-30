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

  const handleFocus = () => {
    setIsFocused(true);
    Animated.parallel([
      Animated.timing(focusAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const handleBlur = () => {
    setIsFocused(false);
    Animated.parallel([
      Animated.timing(focusAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: false,
      }),
      Animated.timing(glowAnim, {
        toValue: 0,
        duration: 200,
        useNativeDriver: true,
      }),
    ]).start();
  };

  const borderColor = focusAnim.interpolate({
    inputRange: [0, 1],
    outputRange: ['#E5E7EB', '#0038FF'],
  });

  const glowStyle = {
    shadowOpacity: glowAnim,
    shadowColor: '#0038FF',
    shadowOffset: { width: 0, height: 0 },
    shadowRadius: 10,
    elevation: isFocused ? 5 : 0,
  };

  return (
    <View style={[styles.container, containerStyle]}>
      {label && <Text style={styles.label}>{label}</Text>}
      
      <Animated.View style={[styles.inputContainer, glowStyle, { borderColor }]}>
        {gradient ? (
          <LinearGradient
            colors={['rgba(0, 56, 255, 0.05)', 'rgba(245, 247, 255, 0.8)']}
            style={styles.gradientBackground}
          />
        ) : null}
        
        {icon && <View style={styles.icon}>{icon}</View>}
        
        <TextInput
          style={[styles.input, icon && styles.inputWithIcon, style]}
          onFocus={handleFocus}
          onBlur={handleBlur}
          placeholderTextColor="#9CA3AF"
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
    color: '#374151',
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
    paddingVertical: 16,
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
  icon: {
    marginRight: 12,
    zIndex: 1,
  },
  input: {
    flex: 1,
    fontSize: 16,
    color: '#111827',
    fontFamily: 'Inter-Regular',
    zIndex: 1,
  },
  inputWithIcon: {
    marginLeft: 0,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
    fontFamily: 'Inter-Medium',
  },
});