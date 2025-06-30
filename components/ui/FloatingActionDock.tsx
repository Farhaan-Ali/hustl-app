import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Typography } from './Typography';

interface FloatingActionDockProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function FloatingActionDock({ state, descriptors, navigation }: FloatingActionDockProps) {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  const glowAnim = useRef(new Animated.Value(0.7)).current;

  React.useEffect(() => {
    // Animate active tab
    animatedValues.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: state.index === index ? 1 : 0,
        tension: 400,
        friction: 8,
        useNativeDriver: true,
      }).start();
    });

    // Continuous glow effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.7,
          duration: 2500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [state.index]);

  // Only show main 4 tabs in dock
  const mainTabs = state.routes.filter((route: any, index: number) => index < 4);

  return (
    <View style={styles.container}>
      <View style={styles.dockWrapper}>
        {Platform.OS === 'web' ? (
          <View style={styles.webBlur}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.85)', 'rgba(248, 250, 252, 0.9)']}
              style={styles.dock}
            />
          </View>
        ) : (
          <BlurView intensity={25} tint="light" style={styles.dock} />
        )}
        
        <View style={styles.tabContainer}>
          {mainTabs.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const isFocused = state.index === index;

            const onPress = () => {
              const event = navigation.emit({
                type: 'tabPress',
                target: route.key,
                canPreventDefault: true,
              });

              if (!isFocused && !event.defaultPrevented) {
                navigation.navigate(route.name);
              }
            };

            const scaleAnim = animatedValues[index];
            const liftAnim = useRef(new Animated.Value(0)).current;

            const handlePressIn = () => {
              Animated.spring(liftAnim, {
                toValue: 1,
                tension: 400,
                friction: 8,
                useNativeDriver: true,
              }).start();
            };

            const handlePressOut = () => {
              Animated.spring(liftAnim, {
                toValue: 0,
                tension: 400,
                friction: 8,
                useNativeDriver: true,
              }).start();
            };

            const animatedStyle = {
              transform: [
                {
                  scale: scaleAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.1],
                  }),
                },
                {
                  translateY: liftAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, -4],
                  }),
                },
              ],
            };

            const glowStyle = isFocused ? {
              shadowColor: 'rgba(0, 56, 255, 0.5)',
              shadowOffset: { width: 0, height: 4 },
              shadowOpacity: glowAnim,
              shadowRadius: 15,
              elevation: 10,
            } : {};

            return (
              <TouchableOpacity
                key={route.key}
                onPress={onPress}
                onPressIn={handlePressIn}
                onPressOut={handlePressOut}
                style={[styles.tab, glowStyle]}
                activeOpacity={1}
              >
                <Animated.View style={[styles.tabContent, animatedStyle]}>
                  {isFocused && (
                    <LinearGradient
                      colors={['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)']}
                      style={styles.activeBackground}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  
                  <View style={styles.iconContainer}>
                    {options.tabBarIcon && options.tabBarIcon({
                      size: 24,
                      color: isFocused ? '#FFFFFF' : 'rgba(0, 30, 60, 0.7)',
                    })}
                  </View>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 24,
    left: 0,
    right: 0,
    alignItems: 'center',
    zIndex: 1000,
  },
  dockWrapper: {
    borderRadius: 32,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 33, 165, 0.2)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.25,
    shadowRadius: 24,
    elevation: 20,
  },
  dock: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  webBlur: {
    paddingVertical: 16,
    paddingHorizontal: 20,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
    borderRadius: 32,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 24,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 16,
    paddingHorizontal: 20,
    justifyContent: 'center',
  },
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    width: 48,
    height: 48,
    borderRadius: 24,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 24,
  },
  iconContainer: {
    alignItems: 'center',
    justifyContent: 'center',
  },
});