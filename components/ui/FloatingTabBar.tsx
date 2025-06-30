import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Typography } from './Typography';

interface FloatingTabBarProps {
  state: any;
  descriptors: any;
  navigation: any;
}

export function FloatingTabBar({ state, descriptors, navigation }: FloatingTabBarProps) {
  const animatedValues = useRef(
    state.routes.map(() => new Animated.Value(0))
  ).current;

  const glowAnim = useRef(new Animated.Value(0)).current;

  React.useEffect(() => {
    // Animate active tab
    animatedValues.forEach((anim, index) => {
      Animated.spring(anim, {
        toValue: state.index === index ? 1 : 0,
        tension: 300,
        friction: 10,
        useNativeDriver: true,
      }).start();
    });

    // Glow effect for active tab
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.6,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      <View style={styles.tabBarWrapper}>
        {Platform.OS === 'web' ? (
          <View style={styles.webBlur}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.9)', 'rgba(248, 250, 252, 0.9)']}
              style={styles.tabBar}
            />
          </View>
        ) : (
          <BlurView intensity={20} tint="light" style={styles.tabBar} />
        )}
        
        <View style={styles.tabContainer}>
          {state.routes.map((route: any, index: number) => {
            const { options } = descriptors[route.key];
            const label = options.tabBarLabel !== undefined 
              ? options.tabBarLabel 
              : options.title !== undefined 
              ? options.title 
              : route.name;

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

            const animatedStyle = {
              transform: [
                {
                  scale: animatedValues[index].interpolate({
                    inputRange: [0, 1],
                    outputRange: [1, 1.05],
                  }),
                },
              ],
            };

            const glowStyle = isFocused ? {
              shadowColor: 'rgba(0, 56, 255, 0.4)',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: glowAnim,
              shadowRadius: 12,
              elevation: 8,
            } : {};

            return (
              <TouchableOpacity
                key={route.key}
                accessibilityRole="button"
                accessibilityState={isFocused ? { selected: true } : {}}
                accessibilityLabel={options.tabBarAccessibilityLabel}
                testID={options.tabBarTestID}
                onPress={onPress}
                style={[styles.tab, glowStyle]}
                activeOpacity={0.8}
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
                      size: 22,
                      color: isFocused ? '#FFFFFF' : 'rgba(0, 30, 60, 0.7)',
                    })}
                  </View>
                  
                  <Typography 
                    variant="caption" 
                    color={isFocused ? '#FFFFFF' : 'rgba(0, 30, 60, 0.7)'}
                    style={styles.label}
                  >
                    {label}
                  </Typography>
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
    bottom: 30,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  tabBarWrapper: {
    borderRadius: 28,
    overflow: 'hidden',
    shadowColor: 'rgba(0, 33, 165, 0.15)',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  tabBar: {
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
  },
  webBlur: {
    position: 'relative',
    paddingVertical: 12,
    paddingHorizontal: 8,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.2)',
    borderRadius: 28,
    overflow: 'hidden',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    paddingVertical: 12,
    paddingHorizontal: 8,
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 6,
    paddingHorizontal: 4,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    minWidth: 60,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 20,
  },
  iconContainer: {
    marginBottom: 2,
  },
  label: {
    fontSize: 10,
    fontWeight: '600',
    textAlign: 'center',
  },
});