import React from 'react';
import { View, StyleSheet, ViewStyle } from 'react-native';
import { BlurView } from 'expo-blur';
import { LinearGradient } from 'expo-linear-gradient';

interface GlassCardProps {
  children: React.ReactNode;
  style?: ViewStyle;
  intensity?: number;
  tint?: 'light' | 'dark' | 'default';
  gradient?: boolean;
  gradientColors?: string[];
}

export function GlassCard({ 
  children, 
  style, 
  intensity = 20, 
  tint = 'light',
  gradient = false,
  gradientColors = ['rgba(255,255,255,0.1)', 'rgba(255,255,255,0.05)']
}: GlassCardProps) {
  if (gradient) {
    return (
      <View style={[styles.container, style]}>
        <LinearGradient
          colors={gradientColors}
          style={styles.gradient}
        />
        <BlurView intensity={intensity} tint={tint} style={styles.blur}>
          <View style={styles.content}>
            {children}
          </View>
        </BlurView>
      </View>
    );
  }

  return (
    <View style={[styles.container, style]}>
      <BlurView intensity={intensity} tint={tint} style={styles.blur}>
        <View style={styles.content}>
          {children}
        </View>
      </BlurView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 24,
    overflow: 'hidden',
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.1,
    shadowRadius: 24,
    elevation: 8,
  },
  gradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  blur: {
    flex: 1,
  },
  content: {
    flex: 1,
    padding: 20,
  },
});