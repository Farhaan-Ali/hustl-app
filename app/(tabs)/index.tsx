import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, Clock, DollarSign, MapPin, Star, ArrowRight, Zap, Users, TrendingUp, Sparkles, Award, Target } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 1000,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 800,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Premium Hero Section */}
      <LinearGradient
        colors={['#667eea', '#764ba2', '#f093fb']}
        style={styles.heroGradient}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <View style={styles.heroContent}>
          <Animated.View 
            style={[
              styles.heroHeader,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.logoSection}>
              <HustlLogo size={48} />
              <View style={styles.logoText}>
                <Typography variant="h2" color="#ffffff">Hustl</Typography>
                <Typography variant="caption" color="rgba(255,255,255,0.8)">
                  Campus Network
                </Typography>
              </View>
            </View>
            
            <TouchableOpacity style={styles.profileButton}>
              <Image
                source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100' }}
                style={styles.profileImage}
              />
              <View style={styles.onlineDot} />
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            style={[
              styles.heroMain,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <View style={styles.heroStats}>
              <StatPill icon={<Users size={16} color="#ffffff" />} text="12K+ Students" />
              <StatPill icon={<Zap size={16} color="#ffffff" />} text="Avg 8min" />
              <StatPill icon={<TrendingUp size={16} color="#ffffff" />} text="98% Success" />
            </View>
            
            <Typography variant="h1" color="#ffffff" style={styles.heroTitle}>
              Campus life, simplified
            </Typography>
            <Typography variant="body1" color="rgba(255,255,255,0.9)" style={styles.heroSubtitle}>
              Connect with fellow Gators for instant help with errands, tasks, and campus needs.
            </Typography>
            
            <View style={styles.heroButtons}>
              <AnimatedButton
                title="Post Task"
                onPress={() => {}}
                variant="primary"
                size="lg"
                gradient
                gradientColors={['rgba(255,255,255,0.2)', 'rgba(255,255,255,0.1)']}
                icon={<ArrowRight size={20} color="#ffffff" />}
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
          </Animated.View>
        </View>
      </LinearGradient>

      {/* Floating Stats Card */}
      <View style={styles.floatingSection}>
        <GlassCard style={styles.statsCard} gradient gradientColors={['rgba(255,255,255,0.95)', 'rgba(248,250,252,0.9)']}>
          <View style={styles.statsGrid}>
            <StatsItem 
              icon={<Award size={24} color="#667eea" />}
              value="47"
              label="Tasks Today"
              trend="+12%"
            />
            <StatsItem 
              icon={<Target size={24} color="#f093fb" />}
              value="$1,240"
              label="Earned This Month"
              trend="+23%"
            />
            <StatsItem 
              icon={<Sparkles size={24} color="#ffd89b" />}
              value="4.9★"
              label="Average Rating"
              trend="New High"
            />
          </View>
        </GlassCard>
      </View>

      {/* Services Section */}
      <View style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3">Popular Services</Typography>
          <Badge variant="success" size="sm">
            <Typography variant="caption" color="#16a34a">Live</Typography>
          </Badge>
        </View>
        
        <View style={styles.servicesGrid}>
          <ServiceCard
            icon={<Coffee size={32} color="#f97316" />}
            title="Coffee Runs"
            description="Quick caffeine fixes from campus cafes"
            price="$5-15"
            time="10-20 min"
            gradient
            gradientColors={['#fff7ed', '#fed7aa']}
            accent="#f97316"
          />
          <ServiceCard
            icon={<Printer size={32} color="#3b82f6" />}
            title="Printing"
            description="Documents, assignments & materials"
            price="$3-10"
            time="15-30 min"
            gradient
            gradientColors={['#eff6ff', '#dbeafe']}
            accent="#3b82f6"
          />
          <ServiceCard
            icon={<Heart size={32} color="#ef4444" />}
            title="Pet Care"
            description="Walking, sitting & pet services"
            price="$15-30"
            time="30-60 min"
            gradient
            gradientColors={['#fef2f2', '#fecaca']}
            accent="#ef4444"
          />
        </View>
      </View>

      {/* Live Tasks Feed */}
      <View style={styles.liveSection}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3">Live Tasks</Typography>
          <View style={styles.liveIndicator}>
            <View style={styles.livePulse} />
            <Typography variant="caption" color="#10b981">24 active</Typography>
          </View>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tasksList}>
          <TaskCard
            title="Starbucks Run"
            location="Reitz Union"
            price="$12"
            time="15 min"
            urgent
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
          <TaskCard
            title="Dog Walking"
            location="Campus Area"
            price="$20"
            time="45 min"
            image="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
            poster={{
              name: "Emma K.",
              rating: 4.8,
              image: "https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100"
            }}
          />
        </ScrollView>
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksSection}>
        <Typography variant="h3" style={styles.sectionTitle}>How Hustl Works</Typography>
        <View style={styles.stepsContainer}>
          <StepCard 
            number="1" 
            title="Post Your Task" 
            description="Describe what you need with details, location, and budget"
            icon={<ArrowRight size={24} color="#667eea" />}
            gradient
            gradientColors={['#667eea', '#764ba2']}
          />
          <StepCard 
            number="2" 
            title="Get Matched" 
            description="Connect with verified students nearby instantly"
            icon={<Users size={24} color="#f093fb" />}
            gradient
            gradientColors={['#f093fb', '#f5576c']}
          />
          <StepCard 
            number="3" 
            title="Task Complete" 
            description="Secure payment processing and rating system"
            icon={<Star size={24} color="#ffd89b" />}
            gradient
            gradientColors={['#ffd89b', '#19547b']}
          />
        </View>
      </View>

      {/* Social Proof */}
      <ModernCard style={styles.socialProofCard} gradient gradientColors={['#f8fafc', '#ffffff']}>
        <View style={styles.socialProofContent}>
          <Typography variant="h3" style={styles.socialProofTitle}>
            Trusted by UF Students
          </Typography>
          <View style={styles.socialProofStats}>
            <View style={styles.socialStat}>
              <Typography variant="h2" color="#667eea">12,000+</Typography>
              <Typography variant="body2">Active Users</Typography>
            </View>
            <View style={styles.socialStat}>
              <Typography variant="h2" color="#f093fb">50K+</Typography>
              <Typography variant="body2">Tasks Completed</Typography>
            </View>
            <View style={styles.socialStat}>
              <Typography variant="h2" color="#ffd89b">4.9★</Typography>
              <Typography variant="body2">Average Rating</Typography>
            </View>
          </View>
          
          <AnimatedButton
            title="Join the Community"
            onPress={() => {}}
            variant="primary"
            size="lg"
            gradient
            gradientColors={['#667eea', '#764ba2']}
            style={styles.joinButton}
          />
        </View>
      </ModernCard>
    </ScrollView>
  );
}

function StatPill({ icon, text }: { icon: React.ReactNode; text: string }) {
  return (
    <View style={styles.statPill}>
      {icon}
      <Typography variant="caption" color="#ffffff">{text}</Typography>
    </View>
  );
}

function StatsItem({ icon, value, label, trend }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
}) {
  return (
    <View style={styles.statsItem}>
      <View style={styles.statsIcon}>{icon}</View>
      <Typography variant="h4" style={styles.statsValue}>{value}</Typography>
      <Typography variant="body2" style={styles.statsLabel}>{label}</Typography>
      <Typography variant="caption" color="#10b981" style={styles.statsTrend}>{trend}</Typography>
    </View>
  );
}

function ServiceCard({ icon, title, description, price, time, gradient, gradientColors, accent }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  time: string;
  gradient?: boolean;
  gradientColors?: string[];
  accent: string;
}) {
  return (
    <ModernCard 
      style={styles.serviceCard} 
      gradient={gradient}
      gradientColors={gradientColors}
      onPress={() => {}}
    >
      <View style={[styles.serviceIcon, { backgroundColor: accent + '20' }]}>
        {icon}
      </View>
      <Typography variant="h4" style={styles.serviceTitle}>{title}</Typography>
      <Typography variant="body2" style={styles.serviceDescription}>{description}</Typography>
      <View style={styles.serviceMeta}>
        <Badge variant="default" size="sm">
          <Typography variant="caption">{price}</Typography>
        </Badge>
        <View style={styles.serviceTime}>
          <Clock size={12} color="#718096" />
          <Typography variant="caption" color="#718096">{time}</Typography>
        </View>
      </View>
    </ModernCard>
  );
}

function TaskCard({ title, location, price, time, urgent = false, image, poster }: {
  title: string;
  location: string;
  price: string;
  time: string;
  urgent?: boolean;
  image: string;
  poster: {
    name: string;
    rating: number;
    image: string;
  };
}) {
  return (
    <ModernCard style={styles.taskCard} onPress={() => {}}>
      {urgent && (
        <Badge variant="error" size="sm" style={styles.urgentBadge}>
          <Zap size={12} color="#dc2626" />
          <Typography variant="caption" color="#dc2626">Urgent</Typography>
        </Badge>
      )}
      
      <Image source={{ uri: image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <Typography variant="h4" numberOfLines={1}>{title}</Typography>
        <View style={styles.taskMeta}>
          <MapPin size={12} color="#718096" />
          <Typography variant="caption" color="#718096">{location}</Typography>
        </View>
        
        <View style={styles.taskFooter}>
          <View style={styles.posterInfo}>
            <Image source={{ uri: poster.image }} style={styles.posterImage} />
            <View>
              <Typography variant="caption">{poster.name}</Typography>
              <View style={styles.posterRating}>
                <Star size={10} color="#f59e0b" fill="#f59e0b" />
                <Typography variant="caption" color="#718096">{poster.rating}</Typography>
              </View>
            </View>
          </View>
          
          <View style={styles.taskPricing}>
            <Typography variant="h4" color="#667eea">{price}</Typography>
            <Badge variant="info" size="sm">
              <Typography variant="caption">{time}</Typography>
            </Badge>
          </View>
        </View>
      </View>
    </ModernCard>
  );
}

function StepCard({ number, title, description, icon, gradient, gradientColors }: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
  gradient?: boolean;
  gradientColors?: string[];
}) {
  return (
    <ModernCard style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <LinearGradient
          colors={gradientColors || ['#667eea', '#764ba2']}
          style={styles.stepNumber}
        >
          <Typography variant="h4" color="#ffffff">{number}</Typography>
        </LinearGradient>
        <View style={styles.stepIcon}>{icon}</View>
      </View>
      <Typography variant="h4" style={styles.stepTitle}>{title}</Typography>
      <Typography variant="body2" style={styles.stepDescription}>{description}</Typography>
    </ModernCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  heroGradient: {
    paddingTop: 60,
    paddingBottom: 80,
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
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 16,
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 48,
    height: 48,
    borderRadius: 24,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  onlineDot: {
    position: 'absolute',
    bottom: 2,
    right: 2,
    width: 12,
    height: 12,
    backgroundColor: '#10b981',
    borderRadius: 6,
    borderWidth: 2,
    borderColor: '#ffffff',
  },
  heroMain: {
    alignItems: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 32,
  },
  statPill: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 20,
  },
  heroTitle: {
    textAlign: 'center',
    marginBottom: 16,
  },
  heroSubtitle: {
    textAlign: 'center',
    marginBottom: 32,
    maxWidth: 320,
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
  floatingSection: {
    paddingHorizontal: 24,
    marginTop: -40,
    marginBottom: 40,
  },
  statsCard: {
    marginBottom: 0,
  },
  statsGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  statsItem: {
    alignItems: 'center',
    flex: 1,
  },
  statsIcon: {
    marginBottom: 8,
  },
  statsValue: {
    marginBottom: 4,
  },
  statsLabel: {
    textAlign: 'center',
    marginBottom: 4,
  },
  statsTrend: {
    fontFamily: 'Inter-SemiBold',
  },
  servicesSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    marginBottom: 0,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  serviceTitle: {
    marginBottom: 8,
  },
  serviceDescription: {
    marginBottom: 16,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  serviceTime: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  liveSection: {
    paddingBottom: 40,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  livePulse: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10b981',
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
  urgentBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
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
  howItWorksSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  sectionTitle: {
    marginBottom: 24,
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    marginBottom: 0,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepIcon: {
    marginLeft: 'auto',
  },
  stepTitle: {
    marginBottom: 8,
  },
  stepDescription: {
    lineHeight: 22,
  },
  socialProofCard: {
    margin: 24,
    alignItems: 'center',
  },
  socialProofContent: {
    alignItems: 'center',
  },
  socialProofTitle: {
    marginBottom: 24,
    textAlign: 'center',
  },
  socialProofStats: {
    flexDirection: 'row',
    gap: 32,
    marginBottom: 32,
  },
  socialStat: {
    alignItems: 'center',
  },
  joinButton: {
    width: '100%',
  },
});