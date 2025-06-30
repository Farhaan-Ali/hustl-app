import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, UtensilsCrossed, FileText, Heart, Car, Dumbbell, Search, MapPin, Star, Clock, TrendingUp, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { ConfettiAnimation } from '@/components/ui/ConfettiAnimation';
import { TaskCard } from '@/components/ui/TaskCard';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1000,
      useNativeDriver: true,
    }).start();
  }, []);

  const services = [
    {
      id: 'coffee',
      title: 'Coffee Runs',
      emoji: '☕️',
      icon: <Coffee size={24} color="#FFFFFF" />,
      gradient: ['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)'],
      count: 12
    },
    {
      id: 'food',
      title: 'Food Pickup',
      emoji: '🍔',
      icon: <UtensilsCrossed size={24} color="#FFFFFF" />,
      gradient: ['rgba(255, 90, 31, 0.9)', 'rgba(230, 58, 11, 0.9)'],
      count: 8
    },
    {
      id: 'print',
      title: 'Print & Study',
      emoji: '📄',
      icon: <FileText size={24} color="#FFFFFF" />,
      gradient: ['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)'],
      count: 15
    },
    {
      id: 'pets',
      title: 'Pet Care',
      emoji: '🐶',
      icon: <Heart size={24} color="#FFFFFF" />,
      gradient: ['rgba(255, 90, 31, 0.9)', 'rgba(230, 58, 11, 0.9)'],
      count: 6
    },
    {
      id: 'rides',
      title: 'Campus Rides',
      emoji: '🚗',
      icon: <Car size={24} color="#FFFFFF" />,
      gradient: ['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)'],
      count: 4
    },
    {
      id: 'workout',
      title: 'Workout Buddy',
      emoji: '💪',
      icon: <Dumbbell size={24} color="#FFFFFF" />,
      gradient: ['rgba(255, 90, 31, 0.9)', 'rgba(230, 58, 11, 0.9)'],
      count: 9
    }
  ];

  const featuredTasks = [
    {
      id: 1,
      title: 'Coffee Run',
      description: 'Get coffee delivered from campus locations',
      category: 'Coffee',
      price: 8,
      time: '15-20 minutes',
      location: 'Reitz Union',
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: true,
      poster: {
        name: 'Sarah M.',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 2,
      title: 'Food Delivery',
      description: 'Get food delivered from dining halls and restaurants',
      category: 'Food Delivery',
      price: 12,
      time: '15-20 minutes',
      location: 'Student Union',
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      poster: {
        name: 'Mike R.',
        rating: 5.0,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 3,
      title: 'Print & Study Pickup',
      description: 'Print homework, practice tests, or grab textbooks from campus',
      category: 'Print & Study Pickup',
      price: 6,
      time: '15-30 minutes',
      location: 'Library West',
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      poster: {
        name: 'Emma K.',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 4,
      title: 'Workout Partner',
      description: 'Find a gym or sports buddy for your next workout or pickup game',
      category: 'Workout Partner',
      price: 0,
      time: '30-60 minutes',
      location: 'Campus Gym',
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      poster: {
        name: 'Alex T.',
        rating: 4.7,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 5,
      title: 'Campus Ride',
      description: 'Get a ride around campus',
      category: 'Campus Ride',
      price: 8,
      time: '10-20 minutes',
      location: 'Various',
      image: 'https://images.pexels.com/photos/1592384/pexels-photo-1592384.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      poster: {
        name: 'Jordan P.',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 6,
      title: 'Pet Care',
      description: 'Dog walking and pet sitting services',
      category: 'Pet Care',
      price: 15,
      time: '30-60 minutes',
      location: 'Near Campus',
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      poster: {
        name: 'Casey L.',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 7,
      title: 'Study Buddy',
      description: 'Find someone to study with',
      category: 'Study Buddy',
      price: 0,
      time: '1-3 hours',
      location: 'Library',
      image: 'https://images.pexels.com/photos/159711/books-bookstore-book-reading-159711.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      poster: {
        name: 'Taylor M.',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    }
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.9],
    extrapolate: 'clamp',
  });

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [0, -20],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Confetti Animation */}
      <ConfettiAnimation 
        active={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      {/* Compact Header */}
      <Animated.View style={[
        styles.header, 
        { 
          opacity: headerOpacity,
          transform: [{ translateY: headerTranslateY }]
        }
      ]}>
        <LinearGradient
          colors={['rgba(248, 250, 252, 0.95)', 'rgba(255, 255, 255, 0.9)']}
          style={styles.headerGradient}
        />
        
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <HustlLogo size={28} />
            <View style={styles.headerText}>
              <Typography variant="h3" style={styles.headerTitle}>Discover</Typography>
              <View style={styles.locationRow}>
                <MapPin size={12} color="rgba(0, 30, 60, 0.6)" />
                <Typography variant="caption" color="rgba(0, 30, 60, 0.6)">University of Florida</Typography>
                <Sparkles size={12} color="#FF5A1F" />
              </View>
            </View>
          </View>

          {/* Compact Live Stats */}
          <View style={styles.compactStats}>
            <View style={styles.statItem}>
              <TrendingUp size={14} color="#FF5A1F" />
              <Typography variant="caption" color="rgba(0, 30, 60, 0.8)">54 active</Typography>
            </View>
            <Typography variant="caption" color="rgba(216, 221, 230, 0.8)">•</Typography>
            <Typography variant="caption" color="rgba(0, 30, 60, 0.8)">8min avg</Typography>
            <View style={styles.pulseIndicator} />
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <Animated.View style={[styles.searchSection, { opacity: fadeAnim }]}>
          <PremiumInput
            placeholder="Search for services or tasks..."
            icon={<Search size={18} color="rgba(0, 56, 255, 0.7)" />}
            containerStyle={styles.searchContainer}
            gradient
          />
        </Animated.View>

        {/* Services Grid */}
        <Animated.View style={[styles.servicesSection, { opacity: fadeAnim }]}>
          <Typography variant="h4" style={styles.sectionTitle}>Popular Services</Typography>
          <View style={styles.servicesGrid}>
            {services.map((service, index) => (
              <ServiceCard
                key={service.id}
                service={service}
                index={index}
                onPress={() => setShowConfetti(true)}
              />
            ))}
          </View>
        </Animated.View>

        {/* Task Cards Grid */}
        <Animated.View style={[styles.tasksSection, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Typography variant="h4" style={styles.sectionTitle}>Choose a Task Type</Typography>
            <TouchableOpacity>
              <Typography variant="body2" color="rgba(0, 56, 255, 0.7)" style={styles.customTaskText}>
                Create Custom Task ⚡
              </Typography>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tasksGrid}>
            {featuredTasks.map((task) => (
              <View key={task.id} style={styles.taskCardContainer}>
                <TaskCard 
                  task={task} 
                  onPress={() => setShowConfetti(true)} 
                />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* Quick Actions */}
        <Animated.View style={[styles.quickActionsSection, { opacity: fadeAnim }]}>
          <PremiumCard style={styles.quickActionCard} variant="primary" gradient glowEffect>
            <Typography variant="h4" color="#FFFFFF" style={styles.quickActionTitle}>
              Need something done quickly?
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.9)" style={styles.quickActionDescription}>
              Post your task and get matched with nearby students in minutes
            </Typography>
            <GlowButton
              title="Post Task Now"
              onPress={() => setShowConfetti(true)}
              variant="secondary"
              size="md"
              style={styles.quickActionButton}
            />
          </PremiumCard>
        </Animated.View>

        {/* Bottom Spacing for Floating Tab Bar */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </View>
  );
}

function ServiceCard({ service, index, onPress }: {
  service: any;
  index: number;
  onPress: () => void;
}) {
  const animatedValue = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 600,
      delay: index * 100,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      { scale: scaleAnim },
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
      <TouchableOpacity 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <LinearGradient
          colors={service.gradient}
          style={styles.serviceCard}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        >
          <View style={styles.serviceIconContainer}>
            {service.icon}
          </View>
          <Typography variant="body2" color="#FFFFFF" style={styles.serviceTitle}>
            {service.title}
          </Typography>
          <Badge variant="default" size="sm" style={styles.serviceCount}>
            <Typography variant="caption">{service.count}</Typography>
          </Badge>
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 20,
    paddingBottom: 16,
    position: 'relative',
    zIndex: 100,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 2,
    fontWeight: '600',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  compactStats: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.8)',
    borderRadius: 16,
    alignSelf: 'flex-start',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  pulseIndicator: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FF5A1F',
    marginLeft: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 32,
  },
  searchContainer: {
    marginBottom: 0,
  },
  servicesSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionTitle: {
    marginBottom: 20,
    fontWeight: '600',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  serviceCardContainer: {
    width: (width - 72) / 2,
  },
  serviceCard: {
    borderRadius: 20,
    padding: 20,
    alignItems: 'center',
    minHeight: 140,
    justifyContent: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  serviceIconContainer: {
    width: 48,
    height: 48,
    borderRadius: 24,
    backgroundColor: 'rgba(255,255,255,0.2)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceTitle: {
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 20,
    fontWeight: '500',
  },
  serviceCount: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  tasksSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  customTaskText: {
    fontWeight: '600',
  },
  tasksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 16,
  },
  taskCardContainer: {
    width: (width - 72) / 2,
  },
  quickActionsSection: {
    paddingHorizontal: 20,
    marginBottom: 40,
  },
  quickActionCard: {
    alignItems: 'center',
    padding: 32,
  },
  quickActionTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
  },
  quickActionDescription: {
    marginBottom: 24,
    textAlign: 'center',
    lineHeight: 20,
  },
  quickActionButton: {
    paddingHorizontal: 32,
  },
  bottomSpacing: {
    height: 120,
  },
});