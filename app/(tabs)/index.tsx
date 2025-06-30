import React, { useRef, useEffect, useState } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Menu, Coffee, UtensilsCrossed, FileText, Heart, Car, Dumbbell, Search, MapPin, Star, Clock, TrendingUp, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { HustlLogo } from '@/components/HustlLogo';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { SidebarMenu } from '@/components/ui/SidebarMenu';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

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
      description: 'Quick coffee pickup from campus cafes',
      price: 'From $5',
      icon: <Coffee size={24} color="#0038FF" strokeWidth={1.5} />,
      count: 12,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'food',
      title: 'Food Delivery',
      description: 'Meal pickup and delivery service',
      price: 'From $8',
      icon: <UtensilsCrossed size={24} color="#FF5A1F" strokeWidth={1.5} />,
      count: 8,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'print',
      title: 'Print & Study',
      description: 'Document printing and study materials',
      price: 'From $3',
      icon: <FileText size={24} color="#0038FF" strokeWidth={1.5} />,
      count: 15,
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'pets',
      title: 'Pet Care',
      description: 'Pet walking and care services',
      price: 'From $12',
      icon: <Heart size={24} color="#FF5A1F" strokeWidth={1.5} />,
      count: 6,
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'rides',
      title: 'Campus Rides',
      description: 'Quick transportation around campus',
      price: 'From $4',
      icon: <Car size={24} color="#0038FF" strokeWidth={1.5} />,
      count: 4,
      image: 'https://images.pexels.com/photos/116675/pexels-photo-116675.jpeg?auto=compress&cs=tinysrgb&w=400'
    },
    {
      id: 'workout',
      title: 'Workout Buddy',
      description: 'Find gym partners and fitness help',
      price: 'From $10',
      icon: <Dumbbell size={24} color="#FF5A1F" strokeWidth={1.5} />,
      count: 9,
      image: 'https://images.pexels.com/photos/1552242/pexels-photo-1552242.jpeg?auto=compress&cs=tinysrgb&w=400'
    }
  ];

  return (
    <View style={styles.container}>
      <StatusBar style="dark" />
      
      {/* Sidebar Menu */}
      <SidebarMenu 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={router}
        currentRoute="index"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => setSidebarOpen(true)}
            style={styles.menuButton}
          >
            <Menu size={24} color="#001E3C" strokeWidth={1.5} />
          </TouchableOpacity>
          
          <View style={styles.headerCenter}>
            <Typography variant="h3" style={styles.headerTitle}>Discover</Typography>
            <View style={styles.locationRow}>
              <MapPin size={12} color="#666" strokeWidth={1.5} />
              <Typography variant="caption" color="#666">University of Florida</Typography>
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
        <View style={styles.statsRow}>
          <View style={styles.statItem}>
            <TrendingUp size={14} color="#FF5A1F" strokeWidth={1.5} />
            <Typography variant="caption" color="#666">54 active tasks</Typography>
          </View>
          <Typography variant="caption" color="#ccc">•</Typography>
          <Typography variant="caption" color="#666">8min avg response</Typography>
        </View>
      </View>

      <ScrollView 
        style={styles.content} 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search Bar */}
        <Animated.View style={[styles.searchSection, { opacity: fadeAnim }]}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#999" strokeWidth={1.5} />
            <Typography variant="body2" color="#999" style={styles.searchPlaceholder}>
              Search for services or tasks...
            </Typography>
          </View>
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
              />
            ))}
          </View>
        </Animated.View>

        {/* Quick Action */}
        <Animated.View style={[styles.quickActionSection, { opacity: fadeAnim }]}>
          <View style={styles.quickActionCard}>
            <LinearGradient
              colors={['#0038FF', '#0021A5']}
              style={styles.quickActionGradient}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 1 }}
            />
            <Typography variant="h4" color="#FFFFFF" style={styles.quickActionTitle}>
              Need something done quickly?
            </Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.9)" style={styles.quickActionDescription}>
              Post your task and get matched with nearby students
            </Typography>
            <TouchableOpacity style={styles.quickActionButton}>
              <Typography variant="body2" color="#0038FF" style={styles.quickActionButtonText}>
                Post Task Now
              </Typography>
            </TouchableOpacity>
          </View>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function ServiceCard({ service, index }: {
  service: any;
  index: number;
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
      toValue: 0.98,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
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
    <Animated.View style={[styles.serviceCard, animatedStyle]}>
      <TouchableOpacity 
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
        style={styles.serviceCardTouch}
      >
        <Image source={{ uri: service.image }} style={styles.serviceImage} />
        
        <View style={styles.serviceContent}>
          <View style={styles.serviceHeader}>
            <View style={styles.serviceIcon}>
              {service.icon}
            </View>
            <Badge variant="default" size="sm" style={styles.serviceCount}>
              <Typography variant="caption">{service.count}</Typography>
            </Badge>
          </View>
          
          <Typography variant="h4" style={styles.serviceTitle}>
            {service.title}
          </Typography>
          <Typography variant="body2" color="#666" style={styles.serviceDescription}>
            {service.description}
          </Typography>
          
          <View style={styles.serviceFooter}>
            <Typography variant="body2" color="#0038FF" style={styles.servicePrice}>
              {service.price}
            </Typography>
          </View>
        </View>
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
    paddingTop: 60,
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  headerCenter: {
    flex: 1,
    alignItems: 'center',
  },
  headerTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  locationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  profileButton: {
    marginLeft: 16,
  },
  profileImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    alignSelf: 'center',
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 24,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
  },
  servicesSection: {
    paddingHorizontal: 20,
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
  serviceCard: {
    width: (width - 56) / 2,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  serviceCardTouch: {
    flex: 1,
  },
  serviceImage: {
    width: '100%',
    height: 120,
  },
  serviceContent: {
    padding: 16,
  },
  serviceHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  serviceIcon: {
    width: 40,
    height: 40,
    borderRadius: 12,
    backgroundColor: '#f8f9fa',
    justifyContent: 'center',
    alignItems: 'center',
  },
  serviceCount: {
    backgroundColor: '#f0f0f0',
  },
  serviceTitle: {
    marginBottom: 6,
    fontWeight: '600',
  },
  serviceDescription: {
    marginBottom: 12,
    lineHeight: 18,
  },
  serviceFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  servicePrice: {
    fontWeight: '600',
  },
  quickActionSection: {
    paddingHorizontal: 20,
    paddingTop: 32,
  },
  quickActionCard: {
    borderRadius: 20,
    padding: 24,
    alignItems: 'center',
    position: 'relative',
    overflow: 'hidden',
  },
  quickActionGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  quickActionTitle: {
    marginBottom: 8,
    textAlign: 'center',
    fontWeight: '600',
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
  quickActionButtonText: {
    fontWeight: '600',
  },
});