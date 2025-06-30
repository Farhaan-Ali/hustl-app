import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, UtensilsCrossed, FileText, Heart, Car, Dumbbell, Search, MapPin, Star, Clock, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { Input } from '@/components/ui/Input';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const services = [
    {
      id: 'coffee',
      title: 'Coffee Runs',
      emoji: '☕️',
      icon: <Coffee size={28} color="#FFFFFF" />,
      gradient: ['#8B4513', '#D2691E'],
      count: 12
    },
    {
      id: 'food',
      title: 'Food Pickup',
      emoji: '🍔',
      icon: <UtensilsCrossed size={28} color="#FFFFFF" />,
      gradient: ['#FF6B35', '#F7931E'],
      count: 8
    },
    {
      id: 'print',
      title: 'Print & Study',
      emoji: '📄',
      icon: <FileText size={28} color="#FFFFFF" />,
      gradient: ['#0021A5', '#001E3C'],
      count: 15
    },
    {
      id: 'pets',
      title: 'Pet Care',
      emoji: '🐶',
      icon: <Heart size={28} color="#FFFFFF" />,
      gradient: ['#E91E63', '#AD1457'],
      count: 6
    },
    {
      id: 'rides',
      title: 'Campus Rides',
      emoji: '🚗',
      icon: <Car size={28} color="#FFFFFF" />,
      gradient: ['#2196F3', '#1976D2'],
      count: 4
    },
    {
      id: 'workout',
      title: 'Workout Buddy',
      emoji: '💪',
      icon: <Dumbbell size={28} color="#FFFFFF" />,
      gradient: ['#4CAF50', '#388E3C'],
      count: 9
    }
  ];

  const featuredTasks = [
    {
      id: 1,
      title: 'Starbucks Venti Iced Coffee',
      location: 'Reitz Union',
      price: 12,
      time: '15 min',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Coffee',
      urgent: true,
      poster: {
        name: 'Sarah M.',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 2,
      title: 'Chipotle Bowl Pickup',
      location: 'Student Union',
      price: 8,
      time: '20 min',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Food',
      urgent: false,
      poster: {
        name: 'Mike R.',
        rating: 5.0,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 3,
      title: 'Print 50 Pages Double-Sided',
      location: 'Library West',
      price: 10,
      time: '25 min',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
      category: 'Print',
      urgent: false,
      poster: {
        name: 'Emma K.',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <Animated.View style={[styles.header, { opacity: fadeAnim }]}>
        <View style={styles.headerTop}>
          <View style={styles.headerLeft}>
            <HustlLogo size={32} />
            <View style={styles.headerText}>
              <Typography variant="h2" style={styles.headerTitle}>Browse Services</Typography>
              <View style={styles.locationRow}>
                <MapPin size={14} color="#001E3C" />
                <Typography variant="body2" color="#001E3C">University of Florida</Typography>
              </View>
            </View>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.profileImage}
            />
          </TouchableOpacity>
        </View>

        {/* Live Stats */}
        <View style={styles.liveStats}>
          <View style={styles.statItem}>
            <TrendingUp size={16} color="#E6501E" />
            <Typography variant="body2" color="#001E3C">54 active tasks</Typography>
          </View>
          <Typography variant="body2" color="#D8DDE6">•</Typography>
          <Typography variant="body2" color="#001E3C">Avg response: 8min</Typography>
        </View>
      </Animated.View>

      <ScrollView style={styles.content} showsVerticalScrollIndicator={false}>
        {/* Search Bar */}
        <Animated.View style={[styles.searchSection, { opacity: fadeAnim }]}>
          <Input
            placeholder="Search for services or tasks..."
            icon={<Search size={20} color="#001E3C" />}
            containerStyle={styles.searchContainer}
          />
        </Animated.View>

        {/* Services Grid */}
        <Animated.View style={[styles.servicesSection, { opacity: fadeAnim }]}>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onPress={() => {}}
              />
            ))}
          </View>
        </Animated.View>

        {/* Featured Tasks */}
        <Animated.View style={[styles.featuredSection, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">Explore Tasks Near You</Typography>
            <Badge variant="secondary" size="sm">
              <Typography variant="caption" color="#FFFFFF">Live</Typography>
            </Badge>
          </View>
          
          <FlatList
            data={featuredTasks}
            renderItem={({ item }) => <FeaturedTaskCard task={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.tasksList}
          />
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickActionsSection, { opacity: fadeAnim }]}>
          <ModernCard style={styles.quickActionCard} variant="primary" gradient>
            <Typography variant="h4" color="#FFFFFF" style={styles.quickActionTitle}>
              Need something done quickly?
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)" style={styles.quickActionDescription}>
              Post your task and get matched with nearby students in minutes
            </Typography>
            <TouchableOpacity style={styles.quickActionButton}>
              <Typography variant="h4" color="#0021A5">Post Task Now</Typography>
            </TouchableOpacity>
          </ModernCard>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function ServiceCard({ service, index, onPress }: {
  service: any;
  index: number;
  onPress: () => void;
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [20, 0],
        }),
      },
    ],
  };

  return (
    <Animated.View style={[styles.serviceCardContainer, animatedStyle]}>
      <TouchableOpacity onPress={onPress} activeOpacity={0.8}>
        <LinearGradient
          colors={service.gradient}
          style={styles.serviceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.serviceIconContainer}>
            {service.icon}
          </View>
          <Typography variant="h4" color="#FFFFFF" style={styles.serviceTitle}>
            {service.title}
          </Typography>
          <Badge variant="default" size="sm" style={styles.serviceCount}>
            <Typography variant="caption">{service.count} available</Typography>
          </Badge>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

function FeaturedTaskCard({ task }: { task: any }) {
  return (
    <ModernCard style={styles.featuredTaskCard} onPress={() => {}}>
      <Image source={{ uri: task.image }} style={styles.featuredTaskImage} />
      
      <View style={styles.featuredTaskContent}>
        <View style={styles.featuredTaskHeader}>
          {task.urgent && (
            <Badge variant="secondary" size="sm">
              <Typography variant="caption" color="#FFFFFF">Urgent</Typography>
            </Badge>
          )}
          <Typography variant="h3" color="#0021A5">${task.price}</Typography>
        </View>
        
        <Typography variant="h4" numberOfLines={2} style={styles.featuredTaskTitle}>
          {task.title}
        </Typography>
        
        <View style={styles.featuredTaskMeta}>
          <View style={styles.metaItem}>
            <MapPin size={12} color="#001E3C" />
            <Typography variant="body2" color="#001E3C">{task.location}</Typography>
          </View>
          <View style={styles.metaItem}>
            <Clock size={12} color="#001E3C" />
            <Typography variant="body2" color="#001E3C">{task.time}</Typography>
          </View>
        </View>
        
        <View style={styles.featuredTaskFooter}>
          <View style={styles.posterInfo}>
            <Image source={{ uri: task.poster.image }} style={styles.posterImage} />
            <View>
              <Typography variant="caption">{task.poster.name}</Typography>
              <View style={styles.posterRating}>
                <Star size={10} color="#E6501E" fill="#E6501E" />
                <Typography variant="caption" color="#001E3C">{task.poster.rating}</Typography>
              </View>
            </View>
          </View>
        </View>
      </View>
    </ModernCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  headerLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profileButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  profileImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  liveStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingVertical: 8,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  content: {
    flex: 1,
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  searchContainer: {
    marginBottom: 0,
  },
  servicesSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serviceCardContainer: {
    width: (width - 80) / 2,
  },
  serviceCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
  },
  serviceIconContainer: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
  },
  serviceCount: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  featuredSection: {
    paddingBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  tasksList: {
    paddingLeft: 24,
  },
  featuredTaskCard: {
    marginRight: 16,
    width: 280,
    padding: 0,
    overflow: 'hidden',
  },
  featuredTaskImage: {
    width: '100%',
    height: 140,
  },
  featuredTaskContent: {
    padding: 16,
  },
  featuredTaskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 8,
  },
  featuredTaskTitle: {
    marginBottom: 12,
    lineHeight: 24,
  },
  featuredTaskMeta: {
    gap: 8,
    marginBottom: 12,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  featuredTaskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  posterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  posterImage: {
    width: 24,
    height: 24,
    borderRadius: 12,
  },
  posterRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 2,
    marginTop: 2,
  },
  quickActionsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  quickActionCard: {
    alignItems: 'center',
    padding: 24,
  },
  quickActionTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  quickActionDescription: {
    marginBottom: 20,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickActionButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 12,
  },
});