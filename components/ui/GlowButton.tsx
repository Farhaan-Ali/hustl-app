import React, { useRef } from 'react';
import { TouchableOpacity, Text, StyleSheet, ViewStyle, TextStyle, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';

interface GlowButtonProps {
  title: string;
  onPress: () => void;
  variant?: 'primary' | 'secondary' | 'outline' | 'ghost';
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  style?: ViewStyle;
  textStyle?: TextStyle;
  icon?: React.ReactNode;
  gradient?: boolean;
  glow?: boolean;
  shine?: boolean;
}

export function GlowButton({ 
  title, 
  onPress, 
  variant = 'primary', 
  size = 'md', 
  disabled = false, 
  style, 
  textStyle,
  icon,
  gradient = true,
  glow = true,
  shine = true
}: GlowButtonProps) {
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shineAnim = useRef(new Animated.Value(0)).current;
  const glowAnim = useRef(new Animated.Value(0.7)).current;

  React.useEffect(() => {
    // Continuous glow animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        useNativeDriver: true,
      }),
      shine && Animated.timing(shineAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      })
    ]).start();
  };

  const handlePressOut = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 1,
        useNativeDriver: true,
      }),
      shine && Animated.timing(shineAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      })
    ]).start();
  };

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['#0038FF', '#0021A5'];
      case 'secondary':
        return ['#FF5A1F', '#E63A0B'];
      default:
        return ['#0038FF', '#0021A5'];
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
    opacity: glow ? glowAnim : 1,
  };

  const content = (
    <>
      {icon && <>{icon}</>}
      <Text style={textStyles}>{title}</Text>
    </>
  );

  if (gradient && (variant === 'primary' || variant === 'secondary')) {
    return (
      <Animated.View style={[animatedStyle, buttonStyle, { padding: 0 }]}>
        <TouchableOpacity 
          onPress={onPress} 
          disabled={disabled}
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
          style={styles.touchable}
        >
          <LinearGradient
            colors={getGradientColors()}
            style={[styles.gradientButton, styles[size]]}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {content}
            {shine && (
              <Animated.View 
                style={[
                  styles.shineOverlay,
                  {
                    opacity: shineAnim,
                    transform: [
                      {
                        translateX: shineAnim.interpolate({
                          inputRange: [0, 1],
                          outputRange: [-100, 100],
                        }),
                      },
                    ],
                  }
                ]}
              />
            )}
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
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#0038FF',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 12,
    elevation: 8,
  },
  touchable: {
    borderRadius: 20,
  },
  gradientButton: {
    borderRadius: 20,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  sm: {
    paddingHorizontal: 20,
    paddingVertical: 12,
  },
  md: {
    paddingHorizontal: 28,
    paddingVertical: 16,
  },
  lg: {
    paddingHorizontal: 36,
    paddingVertical: 20,
  },
  primary: {
    backgroundColor: '#0038FF',
  },
  secondary: {
    backgroundColor: '#FF5A1F',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#0038FF',
  },
  ghost: {
    backgroundColor: 'rgba(0, 56, 255, 0.1)',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
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
    color: '#0038FF',
  },
  ghostText: {
    color: '#0038FF',
  },
  disabledText: {
    color: '#D8DDE6',
  },
  shineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.3)',
    transform: [{ skewX: '-20deg' }],
    width: 30,
  },
});