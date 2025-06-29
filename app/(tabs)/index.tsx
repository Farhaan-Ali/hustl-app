import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, Clock, DollarSign, MapPin, Star, ArrowRight, Users, TrendingUp, Award } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
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

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Hero Section */}
      <LinearGradient
        colors={['#0021A5', '#001E3C']}
        style={styles.hero}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.heroContent, { opacity: fadeAnim }]}>
          <View style={styles.heroHeader}>
            <HustlLogo size={40} />
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.profileImage}
              />
            </TouchableOpacity>
          </View>

          <View style={styles.heroMain}>
            <Typography variant="h1" color="#FFFFFF" style={styles.heroTitle}>
              Campus life, simplified
            </Typography>
            <Typography variant="body1" color="rgba(255,255,255,0.8)" style={styles.heroSubtitle}>
              Connect with fellow Gators for instant help with errands and campus needs.
            </Typography>
            
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Users size={20} color="#FFFFFF" />
                <Typography variant="body2" color="#FFFFFF">12K+ Students</Typography>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={20} color="#FFFFFF" />
                <Typography variant="body2" color="#FFFFFF">98% Success</Typography>
              </View>
            </View>
            
            <View style={styles.heroButtons}>
              <AnimatedButton
                title="Post Task"
                onPress={() => {}}
                variant="secondary"
                size="lg"
                gradient
                style={styles.primaryButton}
              />
              
              <AnimatedButton
                title="Browse Tasks"
                onPress={() => {}}
                variant="outline"
                size="lg"
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <ModernCard style={styles.statCard} variant="accent">
            <Award size={24} color="#E6501E" />
            <Typography variant="h3" style={styles.statValue}>47</Typography>
            <Typography variant="body2" color="#001E3C">Tasks Today</Typography>
          </ModernCard>
          
          <ModernCard style={styles.statCard} variant="accent">
            <DollarSign size={24} color="#E6501E" />
            <Typography variant="h3" style={styles.statValue}>$1,240</Typography>
            <Typography variant="body2" color="#001E3C">This Month</Typography>
          </ModernCard>
        </View>
      </View>

      {/* Services */}
      <View style={styles.servicesSection}>
        <Typography variant="h3" style={styles.sectionTitle}>Popular Services</Typography>
        
        <View style={styles.servicesGrid}>
          <ServiceCard
            icon={<Coffee size={28} color="#FFFFFF" />}
            title="Coffee Runs"
            description="Quick caffeine fixes from campus cafes"
            price="$5-15"
            variant="secondary"
          />
          <ServiceCard
            icon={<Printer size={28} color="#FFFFFF" />}
            title="Printing"
            description="Documents, assignments & materials"
            price="$3-10"
            variant="primary"
          />
          <ServiceCard
            icon={<Heart size={28} color="#E6501E" />}
            title="Pet Care"
            description="Walking, sitting & pet services"
            price="$15-30"
            variant="accent"
          />
        </View>
      </View>

      {/* Live Tasks */}
      <View style={styles.liveSection}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3">Live Tasks</Typography>
          <Badge variant="secondary" size="sm">
            <Typography variant="caption" color="#FFFFFF">24 active</Typography>
          </Badge>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tasksList}>
          <TaskCard
            title="Starbucks Run"
            location="Reitz Union"
            price="$12"
            time="15 min"
            image="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400"
            poster={{
              name: "Sarah M.",
              rating: 4.9,
              image: "https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100"
            }}
          />
          <TaskCard
            title="Print Documents"
            location="Library West"
            price="$5"
            time="20 min"
            image="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400"
            poster={{
              name: "Mike R.",
              rating: 5.0,
              image: "https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100"
            }}
          />
        </ScrollView>
      </View>

      {/* CTA Section */}
      <ModernCard style={styles.ctaCard} variant="primary" gradient>
        <Typography variant="h3" color="#FFFFFF" style={styles.ctaTitle}>
          Ready to get started?
        </Typography>
        <Typography variant="body1" color="rgba(255,255,255,0.8)" style={styles.ctaDescription}>
          Join thousands of UF students making campus life easier
        </Typography>
        <AnimatedButton
          title="Join Hustl"
          onPress={() => {}}
          variant="secondary"
          size="lg"
          gradient
          style={styles.ctaButton}
        />
      </ModernCard>
    </ScrollView>
  );
}

function ServiceCard({ icon, title, description, price, variant }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  variant: 'primary' | 'secondary' | 'accent';
}) {
  return (
    <ModernCard style={styles.serviceCard} variant={variant} onPress={() => {}}>
      <View style={styles.serviceIcon}>{icon}</View>
      <Typography variant="h4" color={variant === 'accent' ? '#001E3C' : '#FFFFFF'} style={styles.serviceTitle}>
        {title}
      </Typography>
      <Typography variant="body2" color={variant === 'accent' ? '#001E3C' : 'rgba(255,255,255,0.8)'} style={styles.serviceDescription}>
        {description}
      </Typography>
      <Badge variant={variant === 'accent' ? 'primary' : 'default'} size="sm" style={styles.serviceBadge}>
        <Typography variant="caption">{price}</Typography>
      </Badge>
    </ModernCard>
  );
}

function TaskCard({ title, location, price, time, image, poster }: {
  title: string;
  location: string;
  price: string;
  time: string;
  image: string;
  poster: {
    name: string;
    rating: number;
    image: string;
  };
}) {
  return (
    <ModernCard style={styles.taskCard} onPress={() => {}}>
      <Image source={{ uri: image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <Typography variant="h4" numberOfLines={1}>{title}</Typography>
        <View style={styles.taskMeta}>
          <MapPin size={12} color="#001E3C" />
          <Typography variant="caption" color="#001E3C">{location}</Typography>
        </View>
        
        <View style={styles.taskFooter}>
          <View style={styles.posterInfo}>
            <Image source={{ uri: poster.image }} style={styles.posterImage} />
            <View>
              <Typography variant="caption">{poster.name}</Typography>
              <View style={styles.posterRating}>
                <Star size={10} color="#E6501E" fill="#E6501E" />
                <Typography variant="caption" color="#001E3C">{poster.rating}</Typography>
              </View>
            </View>
          </View>
          
          <View style={styles.taskPricing}>
            <Typography variant="h4" color="#0021A5">{price}</Typography>
            <Badge variant="default" size="sm">
              <Typography variant="caption">{time}</Typography>
            </Badge>
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
  hero: {
    paddingTop: 60,
    paddingBottom: 60,
    paddingHorizontal: 24,
  },
  heroContent: {
    flex: 1,
  },
  heroHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 40,
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
  heroMain: {
    alignItems: 'center',
  },
  heroTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 300,
  },
  heroStats: {
    flexDirection: 'row',
    gap: 24,
    marginBottom: 32,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  heroButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  primaryButton: {
    flex: 1,
  },
  secondaryButton: {
    flex: 1,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 32,
  },
  statsGrid: {
    flexDirection: 'row',
    gap: 16,
  },
  statCard: {
    flex: 1,
    alignItems: 'center',
    padding: 20,
  },
  statValue: {
    marginVertical: 8,
  },
  servicesSection: {
    paddingHorizontal: 24,
    paddingBottom: 32,
  },
  sectionTitle: {
    marginBottom: 24,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    padding: 24,
  },
  serviceIcon: {
    marginBottom: 16,
  },
  serviceTitle: {
    marginBottom: 8,
  },
  serviceDescription: {
    marginBottom: 16,
  },
  serviceBadge: {
    alignSelf: 'flex-start',
  },
  liveSection: {
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
  taskCard: {
    marginRight: 16,
    width: 240,
    padding: 0,
    overflow: 'hidden',
  },
  taskImage: {
    width: '100%',
    height: 120,
  },
  taskContent: {
    padding: 16,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginVertical: 8,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 12,
  },
  posterInfo: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    flex: 1,
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
  },
  taskPricing: {
    alignItems: 'flex-end',
    gap: 4,
  },
  ctaCard: {
    margin: 24,
    alignItems: 'center',
    padding: 32,
  },
  ctaTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    width: '100%',
  },
});