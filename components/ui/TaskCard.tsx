import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Clock, MapPin, Star } from 'lucide-react-native';
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
}

export function TaskCard({ task, onPress }: TaskCardProps) {
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

  const getPriceColor = () => {
    if (task.price === 0) return '#3B82F6'; // Blue for free
    if (task.price <= 10) return '#F97316'; // Orange for low price
    return '#EF4444'; // Red for higher price
  };

  return (
    <TouchableOpacity 
      style={styles.card} 
      onPress={onPress}
      activeOpacity={0.95}
    >
      {/* Circular Icon */}
      <View style={styles.iconContainer}>
        <View style={styles.iconCircle}>
          <Typography variant="h3" style={styles.iconEmoji}>
            {getCategoryIcon()}
          </Typography>
        </View>
      </View>

      {/* Task Content */}
      <View style={styles.content}>
        <Typography variant="h4" style={styles.title} numberOfLines={1}>
          {task.title}
        </Typography>
        <Typography variant="body2" style={styles.subtitle} numberOfLines={1}>
          {task.description}
        </Typography>
      </View>

      {/* Bottom Row */}
      <View style={styles.bottomRow}>
        <View style={styles.timeContainer}>
          <Clock size={14} color="#888888" />
          <Typography variant="caption" style={styles.timeText}>
            {task.time}
          </Typography>
        </View>

        <View style={[styles.priceTag, { backgroundColor: getPriceColor() }]}>
          <Typography variant="caption" style={styles.priceText}>
            {task.price === 0 ? 'FREE' : `$${task.price}`}
          </Typography>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 8,
    elevation: 3,
    borderWidth: 1,
    borderColor: 'rgba(0, 0, 0, 0.05)',
  },
  iconContainer: {
    alignItems: 'center',
    marginBottom: 12,
  },
  iconCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 2,
    borderColor: '#E5E7EB',
    backgroundColor: '#FFFFFF',
    alignItems: 'center',
    justifyContent: 'center',
  },
  iconEmoji: {
    fontSize: 20,
  },
  content: {
    marginBottom: 16,
    alignItems: 'center',
  },
  title: {
    fontWeight: '700',
    color: '#1F2937',
    marginBottom: 4,
    textAlign: 'center',
  },
  subtitle: {
    color: '#888888',
    textAlign: 'center',
    lineHeight: 18,
  },
  bottomRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  timeContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  timeText: {
    color: '#888888',
    fontSize: 12,
  },
  priceTag: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
  },
  priceText: {
    color: '#FFFFFF',
    fontWeight: '600',
    fontSize: 12,
  },
});