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
  const glowAnim = useRef(new Animated.Value(0.8)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  React.useEffect(() => {
    // Continuous glow animation
    if (glow) {
      Animated.loop(
        Animated.sequence([
          Animated.timing(glowAnim, {
            toValue: 1,
            duration: 2000,
            useNativeDriver: true,
          }),
          Animated.timing(glowAnim, {
            toValue: 0.8,
            duration: 2000,
            useNativeDriver: true,
          }),
        ])
      ).start();
    }

    // Pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.02,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const handlePressIn = () => {
    Animated.parallel([
      Animated.spring(scaleAnim, {
        toValue: 0.96,
        tension: 300,
        friction: 8,
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
        tension: 300,
        friction: 8,
        useNativeDriver: true,
      }),
      shine && Animated.timing(shineAnim, {
        toValue: 0,
        duration: 400,
        useNativeDriver: true,
      })
    ]).start();
  };

  const getGradientColors = () => {
    switch (variant) {
      case 'primary':
        return ['#667eea', '#764ba2'];
      case 'secondary':
        return ['#ff9a9e', '#fecfef'];
      default:
        return ['#667eea', '#764ba2'];
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
    transform: [{ scale: scaleAnim }, { scale: pulseAnim }],
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
                          outputRange: [-150, 150],
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
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.4,
    shadowRadius: 20,
    elevation: 15,
  },
  touchable: {
    borderRadius: 25,
  },
  gradientButton: {
    borderRadius: 25,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row',
    gap: 8,
    position: 'relative',
    overflow: 'hidden',
  },
  sm: {
    paddingHorizontal: 24,
    paddingVertical: 14,
  },
  md: {
    paddingHorizontal: 32,
    paddingVertical: 18,
  },
  lg: {
    paddingHorizontal: 40,
    paddingVertical: 22,
  },
  primary: {
    backgroundColor: '#667eea',
  },
  secondary: {
    backgroundColor: '#ff9a9e',
  },
  outline: {
    backgroundColor: 'transparent',
    borderWidth: 2,
    borderColor: '#667eea',
  },
  ghost: {
    backgroundColor: 'rgba(102, 126, 234, 0.1)',
  },
  disabled: {
    opacity: 0.5,
  },
  text: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '700',
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
    color: '#667eea',
  },
  ghostText: {
    color: '#667eea',
  },
  disabledText: {
    color: '#a0aec0',
  },
  shineOverlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255,255,255,0.4)',
    transform: [{ skewX: '-20deg' }],
    width: 40,
  },
});