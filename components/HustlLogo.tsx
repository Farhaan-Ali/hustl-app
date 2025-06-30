import React from 'react';
import { Image, StyleSheet, ImageStyle, ViewStyle, TouchableOpacity } from 'react-native';
import { router } from 'expo-router';

interface HustlLogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
  clickable?: boolean;
}

export function HustlLogo({ size = 40, style, clickable = true }: HustlLogoProps) {
  const handlePress = () => {
    if (clickable) {
      try {
        router.push('/(tabs)/');
      } catch (error) {
        console.log('Navigation error:', error);
      }
    }
  };

  const logoElement = (
    <Image
      source={require('../assets/images/Screenshot 2025-06-30 005452.png')}
      style={[
        styles.logo,
        {
          width: size,
          height: size,
        },
        style,
      ]}
      resizeMode="contain"
    />
  );

  if (clickable) {
    return (
      <TouchableOpacity onPress={handlePress} activeOpacity={0.8}>
        {logoElement}
      </TouchableOpacity>
    );
  }

  return logoElement;
}

const styles = StyleSheet.create({
  logo: {
    aspectRatio: 1,
  },
});