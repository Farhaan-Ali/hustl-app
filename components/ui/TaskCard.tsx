import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Image, Animated } from 'react-native';
import { Clock, MapPin, Star } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Typography } from './Typography';

interface TaskCardProps {
  task: {
    id: number;
    title: string;
    description: string;
    category: string;
    price: number;
    time: string;
    location: string;
    image?: string;
    urgent?: boolean;
    poster?: {
      name: string;
      rating: number;
      image: string;
    };
  };
  onPress?: () => void;
  index?: number;
}

export function TaskCard({ task, onPress, index = 0 }: TaskCardProps) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;
  const shimmerAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();

    // Shimmer effect
    Animated.loop(
      Animated.sequence([
        Animated.timing(shimmerAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(shimmerAnim, {
          toValue: 0,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const getCategoryIcon = () => {
    switch (task.category.toLowerCase()) {
      case 'coffee':
        return '☕️';
      case 'food':
      case 'food delivery':
        return '🍔';
      case 'printing':
      case 'print & study pickup':
        return '📄';
      case 'pet care':
        return '🐶';
      case 'campus ride':
        return '🚗';
      case 'workout partner':
        return '💪';
      case 'study buddy':
        return '📚';
      default:
        return '⚡';
    }
  };

  const getPriceGradient = () => {
    if (task.price === 0) return ['#667eea', '#764ba2']; // Purple for free
    if (task.price <= 10) return ['#ff9a9e', '#fecfef']; // Pink for low price
    return ['#ff6b6b', '#ff8e53']; // Orange-red for higher price
  };

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.95,
      tension: 300,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 8,
      useNativeDriver: true,
    }).start();
    onPress?.();
  };

  const shimmerTranslate = shimmerAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [-100, 100],
  });

  return (
    <Animated.View 
      style={[
        styles.container,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      <TouchableOpacity 
        style={styles.card} 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {/* Background Gradient */}
        <LinearGradient
          colors={['#ffffff', '#f8f9ff']}
          style={styles.cardBackground}
        />

        {/* Shimmer Effect */}
        <Animated.View 
          style={[
            styles.shimmer,
            {
              transform: [{ translateX: shimmerTranslate }],
              opacity: shimmerAnim.interpolate({
                inputRange: [0, 1],
                outputRange: [0, 0.3],
              }),
            }
          ]}
        />

        {/* Circular Icon */}
        <View style={styles.iconContainer}>
          <LinearGradient
            colors={getPriceGradient()}
            style={styles.iconCircle}
          >
            <Typography variant="h3" style={styles.iconEmoji}>
              {getCategoryIcon()}
            </Typography>
          </LinearGradient>
        </View>

        {/* Task Content */}
        <View style={styles.content}>
          <Typography variant="h4" style={styles.title} numberOfLines={1}>
            {task.title}
          </Typography>
          <Typography variant="body2" style={styles.subtitle} numberOfLines={2}>
            {task.description}
          </Typography>
        </View>

        {/* Bottom Row */}
        <View style={styles.bottomRow}>
          <View style={styles.timeContainer}>
            <Clock size={12} color="#8b5cf6" />
            <Typography variant="caption" style={styles.timeText}>
              {task.time}
            </Typography>
          </View>

          <LinearGradient
            colors={getPriceGradient()}
            style={styles.priceTag}
          >
            <Typography variant="caption" style={styles.priceText}>
              {task.price === 0 ? 'FREE' : `$${task.price}`}
            </Typography>
          </LinearGradient>
        </View>

        {/* Urgent Badge */}
        {task.urgent && (
          <View style={styles.urgentBadge}>
            <LinearGradient
              colors={['#ff6b6b', '#ff8e53']}
              style={styles.urgentGradient}
            >
              <Typography variant="caption" style={styles.urgentText}>
                🔥 URGENT
              </Typography>
            </LinearGradient>
          </View>
        )}

        {/* Glow Effect */}
        <View style={styles.glowEffect} />
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 20,
  },
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 20,
    padding: 20,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.15,
    shadowRadius: 20,
    elevation: 10,
    borderWidth: 1,
    borderColor: 'rgba(139, 92, 246, 0.1)',
  },
  cardBackground: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  shimmer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(255, 255, 255, 0.5)',
    width: 50,
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  iconCircle: {
    width: 56,
    height: 56,
    borderRadius: 28,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#8b5cf6',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 10,
    elevation: 8,
  },
  iconEmoji: {
    fontSize: 24,
  },
  content: {
    marginBottom: 20,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#2d3748',
    marginBottom: 6,
    textAlign: 'center',
  },
  subtitle: {
    color: '#718096',
    textAlign: 'center',
    lineHeight: 20,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    paddingHorizontal: 10,
    paddingVertical: 6,
    borderRadius: 12,
  },
  timeText: {
    color: '#8b5cf6',
    fontSize: 11,
    fontWeight: '600',
  },
  priceTag: {
    paddingHorizontal: 14,
    paddingVertical: 8,
    borderRadius: 16,
    shadowColor: '#ff6b6b',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 5,
  },
  priceText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 12,
  },
  urgentBadge: {
    position: 'absolute',
    top: 12,
    right: 12,
    borderRadius: 12,
    overflow: 'hidden',
  },
  urgentGradient: {
    paddingHorizontal: 8,
    paddingVertical: 4,
  },
  urgentText: {
    color: '#FFFFFF',
    fontWeight: '700',
    fontSize: 10,
  },
  glowEffect: {
    position: 'absolute',
    top: -2,
    left: -2,
    right: -2,
    bottom: -2,
    borderRadius: 22,
    backgroundColor: 'rgba(139, 92, 246, 0.1)',
    zIndex: -1,
  },
});