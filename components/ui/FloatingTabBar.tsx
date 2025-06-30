import React, { useRef } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
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
        useNativeDriver: true,
      }).start();
    });

    // Glow effect for active tab
    Animated.loop(
      Animated.sequence([
        Animated.timing(glowAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(glowAnim, {
          toValue: 0.3,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, [state.index]);

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['rgba(255,255,255,0.95)', 'rgba(245,247,255,0.95)']}
        style={styles.tabBar}
      >
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
                    outputRange: [1, 1.1],
                  }),
                },
              ],
            };

            const glowStyle = isFocused ? {
              shadowColor: '#0038FF',
              shadowOffset: { width: 0, height: 0 },
              shadowOpacity: glowAnim,
              shadowRadius: 15,
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
                      colors={['#0038FF', '#0021A5']}
                      style={styles.activeBackground}
                      start={{ x: 0, y: 0 }}
                      end={{ x: 1, y: 1 }}
                    />
                  )}
                  
                  <View style={styles.iconContainer}>
                    {options.tabBarIcon && options.tabBarIcon({
                      size: 24,
                      color: isFocused ? '#FFFFFF' : '#001E3C',
                    })}
                  </View>
                  
                  <Typography 
                    variant="caption" 
                    color={isFocused ? '#FFFFFF' : '#001E3C'}
                    style={styles.label}
                  >
                    {label}
                  </Typography>
                </Animated.View>
              </TouchableOpacity>
            );
          })}
        </View>
      </LinearGradient>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 20,
    left: 20,
    right: 20,
    zIndex: 1000,
  },
  tabBar: {
    borderRadius: 25,
    paddingVertical: 8,
    paddingHorizontal: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.15,
    shadowRadius: 25,
    elevation: 15,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  tabContainer: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  tab: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 8,
    paddingHorizontal: 4,
  },
  tabContent: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 18,
    minWidth: 60,
    position: 'relative',
  },
  activeBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderRadius: 18,
  },
  iconContainer: {
    marginBottom: 4,
  },
  label: {
    fontSize: 11,
    fontWeight: '600',
    textAlign: 'center',
  },
});