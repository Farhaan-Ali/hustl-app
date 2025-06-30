import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, UtensilsCrossed, FileText, Heart, Car, Dumbbell, Search, MapPin, Star, Clock, TrendingUp, Sparkles, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { ConfettiAnimation } from '@/components/ui/ConfettiAnimation';
import { TaskCard } from '@/components/ui/TaskCard';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 1200,
      useNativeDriver: true,
    }).start();

    // Continuous pulse animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.05,
          duration: 2000,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 2000,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const services = [
    {
      id: 'coffee',
      title: 'Coffee Runs',
      emoji: '☕️',
      icon: <Coffee size={28} color="#FFFFFF" />,
      gradient: ['#FF6B6B', '#FF8E53'],
      count: 12,
      description: 'Quick campus coffee delivery'
    },
    {
      id: 'food',
      title: 'Food Pickup',
      emoji: '🍔',
      icon: <UtensilsCrossed size={28} color="#FFFFFF" />,
      gradient: ['#4ECDC4', '#44A08D'],
      count: 8,
      description: 'Fresh meals delivered fast'
    },
    {
      id: 'print',
      title: 'Print & Study',
      emoji: '📄',
      icon: <FileText size={28} color="#FFFFFF" />,
      gradient: ['#667eea', '#764ba2'],
      count: 15,
      description: 'Documents & study materials'
    },
    {
      id: 'pets',
      title: 'Pet Care',
      emoji: '🐶',
      icon: <Heart size={28} color="#FFFFFF" />,
      gradient: ['#f093fb', '#f5576c'],
      count: 6,
      description: 'Loving pet care services'
    },
    {
      id: 'rides',
      title: 'Campus Rides',
      emoji: '🚗',
      icon: <Car size={28} color="#FFFFFF" />,
      gradient: ['#4facfe', '#00f2fe'],
      count: 4,
      description: 'Quick campus transportation'
    },
    {
      id: 'workout',
      title: 'Workout Buddy',
      emoji: '💪',
      icon: <Dumbbell size={28} color="#FFFFFF" />,
      gradient: ['#fa709a', '#fee140'],
      count: 9,
      description: 'Find your fitness partner'
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
    }
  ];

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.85],
    extrapolate: 'clamp',
  });

  const headerScale = scrollY.interpolate({
    inputRange: [0, 150],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Confetti Animation */}
      <ConfettiAnimation 
        active={showConfetti} 
        onComplete={() => setShowConfetti(false)} 
      />
      
      {/* Dynamic Header */}
      <Animated.View style={[
        styles.header, 
        { 
          opacity: headerOpacity,
          transform: [{ scale: headerScale }]
        }
      ]}>
        <LinearGradient
          colors={['#667eea', '#764ba2', '#f093fb']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <HustlLogo size={32} />
            <View style={styles.headerText}>
              <Typography variant="h2" color="#FFFFFF" style={styles.headerTitle}>
                Discover Magic ✨
              </Typography>
              <View style={styles.locationRow}>
                <MapPin size={14} color="rgba(255, 255, 255, 0.8)" />
                <Typography variant="body2" color="rgba(255, 255, 255, 0.9)">
                  University of Florida
                </Typography>
                <Animated.View style={{ transform: [{ scale: pulseAnim }] }}>
                  <Sparkles size={14} color="#FFD700" />
                </Animated.View>
              </View>
            </View>
          </View>

          {/* Live Stats with Glow */}
          <Animated.View style={[styles.liveStats, { transform: [{ scale: pulseAnim }] }]}>
            <LinearGradient
              colors={['rgba(255, 255, 255, 0.25)', 'rgba(255, 255, 255, 0.1)']}
              style={styles.statsContainer}
            >
              <View style={styles.statItem}>
                <Zap size={16} color="#FFD700" />
                <Typography variant="body2" color="rgba(255, 255, 255, 0.95)">
                  54 active tasks
                </Typography>
              </View>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.7)">•</Typography>
              <Typography variant="body2" color="rgba(255, 255, 255, 0.95)">
                8min avg response
              </Typography>
              <View style={styles.pulseIndicator} />
            </LinearGradient>
          </Animated.View>
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
        {/* Search Bar with Glow */}
        <Animated.View style={[styles.searchSection, { opacity: fadeAnim }]}>
          <View style={styles.searchGlow}>
            <PremiumInput
              placeholder="What magic do you need today? ✨"
              icon={<Search size={20} color="#667eea" />}
              containerStyle={styles.searchContainer}
              gradient
            />
          </View>
        </Animated.View>

        {/* Services Grid with Staggered Animation */}
        <Animated.View style={[styles.servicesSection, { opacity: fadeAnim }]}>
          <Typography variant="h3" style={styles.sectionTitle}>
            🌟 Popular Services
          </Typography>
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
            <Typography variant="h3" style={styles.sectionTitle}>
              🎯 Choose Your Adventure
            </Typography>
            <TouchableOpacity style={styles.customTaskButton}>
              <LinearGradient
                colors={['#ff9a9e', '#fecfef']}
                style={styles.customTaskGradient}
              >
                <Typography variant="body2" color="#FFFFFF" style={styles.customTaskText}>
                  Create Custom ⚡
                </Typography>
              </LinearGradient>
            </TouchableOpacity>
          </View>
          
          <View style={styles.tasksGrid}>
            {featuredTasks.map((task, index) => (
              <View key={task.id} style={styles.taskCardContainer}>
                <TaskCard 
                  task={task} 
                  onPress={() => setShowConfetti(true)}
                  index={index}
                />
              </View>
            ))}
          </View>
        </Animated.View>

        {/* CTA Section */}
        <Animated.View style={[styles.ctaSection, { opacity: fadeAnim }]}>
          <LinearGradient
            colors={['#667eea', '#764ba2']}
            style={styles.ctaCard}
          >
            <View style={styles.ctaContent}>
              <Typography variant="h3" color="#FFFFFF" style={styles.ctaTitle}>
                🚀 Ready to Get Started?
              </Typography>
              <Typography variant="body1" color="rgba(255,255,255,0.9)" style={styles.ctaDescription}>
                Join thousands of students making campus life easier
              </Typography>
              <GlowButton
                title="Post Your First Task"
                onPress={() => setShowConfetti(true)}
                variant="secondary"
                size="lg"
                style={styles.ctaButton}
                glow
                shine
              />
            </View>
            
            {/* Floating Elements */}
            <View style={styles.floatingElements}>
              <Animated.View style={[styles.floatingElement, { transform: [{ scale: pulseAnim }] }]}>
                <Typography variant="h2">✨</Typography>
              </Animated.View>
              <Animated.View style={[styles.floatingElement2, { transform: [{ scale: pulseAnim }] }]}>
                <Typography variant="h2">🎯</Typography>
              </Animated.View>
            </View>
          </LinearGradient>
        </Animated.View>

        {/* Bottom Spacing */}
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
  const rotateAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(animatedValue, {
      toValue: 1,
      duration: 800,
      delay: index * 150,
      useNativeDriver: true,
    }).start();

    // Continuous rotation for icon
    Animated.loop(
      Animated.timing(rotateAnim, {
        toValue: 1,
        duration: 10000,
        useNativeDriver: true,
      })
    ).start();
  }, []);

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
    onPress();
  };

  const animatedStyle = {
    opacity: animatedValue,
    transform: [
      { scale: scaleAnim },
      {
        translateY: animatedValue.interpolate({
          inputRange: [0, 1],
          outputRange: [50, 0],
        }),
      },
    ],
  };

  const iconRotation = {
    transform: [
      {
        rotate: rotateAnim.interpolate({
          inputRange: [0, 1],
          outputRange: ['0deg', '360deg'],
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
          <Animated.View style={[styles.serviceIconContainer, iconRotation]}>
            {service.icon}
          </Animated.View>
          
          <Typography variant="h4" color="#FFFFFF" style={styles.serviceTitle}>
            {service.title}
          </Typography>
          
          <Typography variant="caption" color="rgba(255,255,255,0.9)" style={styles.serviceDescription}>
            {service.description}
          </Typography>
          
          <View style={styles.serviceFooter}>
            <Badge variant="default" size="sm" style={styles.serviceCount}>
              <Typography variant="caption" style={styles.serviceCountText}>
                {service.count} active
              </Typography>
            </Badge>
          </View>
          
          {/* Shine effect */}
          <View style={styles.serviceShine} />
        </LinearGradient>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8f9ff',
  },
  header: {
    paddingTop: 50,
    paddingHorizontal: 24,
    paddingBottom: 24,
    position: 'relative',
    zIndex: 100,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    borderBottomLeftRadius: 30,
    borderBottomRightRadius: 30,
  },
  headerContent: {
    gap: 20,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    marginBottom: 4,
    fontWeight: '700',
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveStats: {
    alignSelf: 'center',
  },
  statsContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
    paddingHorizontal: 20,
    paddingVertical: 12,
    borderRadius: 25,
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.3)',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  pulseIndicator: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#FFD700',
    marginLeft: 8,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 30,
  },
  searchSection: {
    paddingHorizontal: 24,
    marginBottom: 40,
  },
  searchGlow: {
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 8 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 10,
  },
  searchContainer: {
    marginBottom: 0,
  },
  servicesSection: {
    paddingHorizontal: 24,
    marginBottom: 50,
  },
  sectionTitle: {
    marginBottom: 24,
    fontWeight: '700',
    color: '#2d3748',
  },
  servicesGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 20,
  },
  serviceCardContainer: {
    width: (width - 88) / 2,
  },
  serviceCard: {
    borderRadius: 25,
    padding: 24,
    alignItems: 'center',
    minHeight: 180,
    justifyContent: 'space-between',
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 10 },
    shadowOpacity: 0.3,
    shadowRadius: 20,
    elevation: 15,
  },
  serviceIconContainer: {
    width: 60,
    height: 60,
    borderRadius: 30,
    backgroundColor: 'rgba(255,255,255,0.25)',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    textAlign: 'center',
    marginBottom: 8,
    lineHeight: 24,
    fontWeight: '600',
  },
  serviceDescription: {
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 16,
  },
  serviceFooter: {
    alignItems: 'center',
  },
  serviceCount: {
    backgroundColor: 'rgba(255,255,255,0.9)',
    paddingHorizontal: 12,
    paddingVertical: 6,
  },
  serviceCountText: {
    fontWeight: '600',
    color: '#2d3748',
  },
  serviceShine: {
    position: 'absolute',
    top: -50,
    right: -50,
    width: 100,
    height: 100,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 50,
  },
  tasksSection: {
    paddingHorizontal: 24,
    marginBottom: 50,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  customTaskButton: {
    borderRadius: 20,
    overflow: 'hidden',
  },
  customTaskGradient: {
    paddingHorizontal: 16,
    paddingVertical: 10,
  },
  customTaskText: {
    fontWeight: '600',
  },
  tasksGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
    gap: 20,
  },
  taskCardContainer: {
    width: (width - 88) / 2,
  },
  ctaSection: {
    paddingHorizontal: 24,
    marginBottom: 50,
  },
  ctaCard: {
    borderRadius: 30,
    padding: 32,
    position: 'relative',
    overflow: 'hidden',
    shadowColor: '#667eea',
    shadowOffset: { width: 0, height: 15 },
    shadowOpacity: 0.4,
    shadowRadius: 25,
    elevation: 20,
  },
  ctaContent: {
    alignItems: 'center',
    zIndex: 2,
  },
  ctaTitle: {
    marginBottom: 12,
    textAlign: 'center',
    fontWeight: '700',
  },
  ctaDescription: {
    marginBottom: 28,
    textAlign: 'center',
    lineHeight: 24,
  },
  ctaButton: {
    paddingHorizontal: 40,
  },
  floatingElements: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1,
  },
  floatingElement: {
    position: 'absolute',
    top: 20,
    right: 30,
  },
  floatingElement2: {
    position: 'absolute',
    bottom: 20,
    left: 30,
  },
  bottomSpacing: {
    height: 150,
  },
});