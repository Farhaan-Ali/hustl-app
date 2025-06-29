import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface AnimatedButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  gradient?: boolean;
}

export function AnimatedButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  style, 
  textStyle,
  icon,
  gradient = false
}: AnimatedButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
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
    switch (variant) {
      case 'primary':
        return ['#0021A5', '#001E3C'];
      case 'secondary':
        return ['#E6501E', '#FF7849'];
      default:
        return ['#0021A5', '#001E3C'];
    }
  };

  const buttonStyle = [
    styles.button,
    styles[size],
    styles[variant],
    disabled && styles.disabled,
    style
  ];

  const textStyles = [
    styles.text,
    styles[`${size}Text`],
    styles[`${variant}Text`],
    disabled && styles.disabledText,
    textStyle
  ];

  const animatedStyle = {
    transform: [{ scale: scaleAnim }],
  };

  const content = (
    <>
      {icon && <>{icon}</>}
      <Text style={textStyles}>{title}</Text>
    </>
  );

  if (gradient) {
    return (
      <Animated.View style={[animatedStyle, buttonStyle, { padding: 0 }]}>
        <TouchableOpacity 
          onPress={onPress} 
          disabled={disabled}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <LinearGradient
            colors={getGradientColors()}
            style={[styles.gradientButton, styles[size]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {content}
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={animatedStyle}>
      <TouchableOpacity 
        style={buttonStyle} 
        onPress={onPress} 
        disabled={disabled}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={0.8}
      >
        {content}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  button: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  gradientButton: {
    borderRadius: 16,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
  },
  sm: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  md: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  lg: {
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  primary: {
    backgroundColor: '#0021A5',
  },
  secondary: {
    backgroundColor: '#E6501E',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0021A5',
  },
  ghost: {
    backgroundColor: 'rgba(0, 33, 165, 0.1)',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
  },
  smText: {
    fontSize: 14,
  },
  mdText: {
    fontSize: 16,
  },
  lgText: {
    fontSize: 18,
  },
  primaryText: {
    color: '#FFFFFF',
  },
  secondaryText: {
    color: '#FFFFFF',
  },
  outlineText: {
    color: '#0021A5',
  },
  ghostText: {
    color: '#0021A5',
  },
  disabledText: {
    color: '#D8DDE6',
  },
});