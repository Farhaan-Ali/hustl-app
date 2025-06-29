import React from 'react';
import { Image, StyleSheet, ImageStyle, ViewStyle } from 'react-native';

interface HustlLogoProps {
  size?: number;
  style?: ImageStyle | ViewStyle;
}

export function HustlLogo({ size = 40, style }: HustlLogoProps) {
  return (
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
}

const styles = StyleSheet.create({
  logo: {
    aspectRatio: 1,
  },
});