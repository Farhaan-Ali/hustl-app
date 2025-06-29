import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, Clock, DollarSign, MapPin, Star, ArrowRight, Zap, Users, TrendingUp } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';
import { Card } from '@/components/ui/Card';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Premium Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6', '#60A5FA']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoSection}>
            <HustlLogo size={40} />
            <View style={styles.logoText}>
              <Text style={styles.logo}>Hustl</Text>
              <Text style={styles.subtitle}>Campus Network</Text>
            </View>
          </View>
          
          <TouchableOpacity style={styles.profileButton}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100' }}
              style={styles.profileImage}
            />
            <Badge variant="success" size="sm" style={styles.onlineBadge}>
              <Text style={styles.onlineText}>●</Text>
            </Badge>
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Hero Section with Glass Morphism */}
      <View style={styles.heroSection}>
        <Card style={styles.heroCard} gradient gradientColors={['rgba(255,255,255,0.95)', 'rgba(248,250,252,0.9)']}>
          <View style={styles.heroContent}>
            <View style={styles.heroStats}>
              <View style={styles.statItem}>
                <Users size={16} color="#3B82F6" />
                <Text style={styles.statText}>12K+ Students</Text>
              </View>
              <View style={styles.statItem}>
                <Zap size={16} color="#F97316" />
                <Text style={styles.statText}>Avg 8min</Text>
              </View>
              <View style={styles.statItem}>
                <TrendingUp size={16} color="#10B981" />
                <Text style={styles.statText}>98% Success</Text>
              </View>
            </View>
            
            <Text style={styles.heroTitle}>Campus life, simplified</Text>
            <Text style={styles.heroDescription}>
              Connect with fellow Gators for instant help with errands, tasks, and campus needs.
            </Text>
            
            <View style={styles.ctaButtons}>
              <Button
                title="Post Task"
                onPress={() => {}}
                variant="primary"
                size="lg"
                gradient
                icon={<ArrowRight size={20} color="#FFFFFF" />}
                style={styles.primaryButton}
              />
              
              <Button
                title="Browse Tasks"
                onPress={() => {}}
                variant="outline"
                size="lg"
                style={styles.secondaryButton}
              />
            </View>
          </View>
        </Card>
        
        <View style={styles.heroImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          <LinearGradient
            colors={['transparent', 'rgba(0,0,0,0.3)']}
            style={styles.imageOverlay}
          />
        </View>
      </View>

      {/* Services with Modern Cards */}
      <View style={styles.servicesSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Popular Services</Text>
          <Badge variant="info" size="sm">
            <Text>Live</Text>
          </Badge>
        </View>
        
        <View style={styles.servicesGrid}>
          <ServiceCard
            icon={<Coffee size={32} color="#F97316" />}
            title="Coffee Runs"
            description="Quick caffeine fixes"
            price="$5-15"
            time="10-20 min"
            color="#FFF7ED"
            accent="#F97316"
          />
          <ServiceCard
            icon={<Printer size={32} color="#3B82F6" />}
            title="Printing"
            description="Documents & materials"
            price="$3-10"
            time="15-30 min"
            color="#EFF6FF"
            accent="#3B82F6"
          />
          <ServiceCard
            icon={<Heart size={32} color="#EF4444" />}
            title="Pet Care"
            description="Walking & sitting"
            price="$15-30"
            time="30-60 min"
            color="#FEF2F2"
            accent="#EF4444"
          />
        </View>
      </View>

      {/* Live Tasks Feed */}
      <View style={styles.liveSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Live Tasks</Text>
          <View style={styles.liveIndicator}>
            <View style={styles.liveDot} />
            <Text style={styles.liveText}>24 active</Text>
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
          />
          <TaskCard
            title="Print Documents"
            location="Library West"
            price="$5"
            time="20 min"
            image="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
          <TaskCard
            title="Dog Walking"
            location="Campus Area"
            price="$20"
            time="45 min"
            image="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </ScrollView>
      </View>

      {/* How It Works - Interactive */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How Hustl Works</Text>
        <View style={styles.stepsContainer}>
          <StepCard 
            number="1" 
            title="Post" 
            description="Describe your task with details and budget"
            icon={<ArrowRight size={20} color="#3B82F6" />}
          />
          <StepCard 
            number="2" 
            title="Match" 
            description="Get connected with nearby students instantly"
            icon={<Users size={20} color="#10B981" />}
          />
          <StepCard 
            number="3" 
            title="Done" 
            description="Task completed, payment processed securely"
            icon={<Star size={20} color="#F59E0B" />}
          />
        </View>
      </View>

      {/* Social Proof */}
      <Card style={styles.socialProofCard} gradient gradientColors={['#F8FAFC', '#FFFFFF']}>
        <View style={styles.socialProofContent}>
          <Text style={styles.socialProofTitle}>Trusted by UF Students</Text>
          <View style={styles.socialProofStats}>
            <View style={styles.socialStat}>
              <Text style={styles.socialStatNumber}>12,000+</Text>
              <Text style={styles.socialStatLabel}>Active Users</Text>
            </View>
            <View style={styles.socialStat}>
              <Text style={styles.socialStatNumber}>50K+</Text>
              <Text style={styles.socialStatLabel}>Tasks Completed</Text>
            </View>
            <View style={styles.socialStat}>
              <Text style={styles.socialStatNumber}>4.9★</Text>
              <Text style={styles.socialStatLabel}>Average Rating</Text>
            </View>
          </View>
          
          <Button
            title="Join the Community"
            onPress={() => {}}
            variant="primary"
            size="lg"
            gradient
            style={styles.joinButton}
          />
        </View>
      </Card>
    </ScrollView>
  );
}

function ServiceCard({ icon, title, description, price, time, color, accent }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  time: string;
  color: string;
  accent: string;
}) {
  return (
    <TouchableOpacity style={styles.serviceCard}>
      <Card style={[styles.serviceCardInner, { backgroundColor: color }]}>
        <View style={[styles.serviceIcon, { backgroundColor: accent + '20' }]}>
          {icon}
        </View>
        <Text style={styles.serviceTitle}>{title}</Text>
        <Text style={styles.serviceDescription}>{description}</Text>
        <View style={styles.serviceMeta}>
          <Badge variant="default" size="sm">
            <Text>{price}</Text>
          </Badge>
          <View style={styles.serviceTime}>
            <Clock size={12} color="#6B7280" />
            <Text style={styles.serviceTimeText}>{time}</Text>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function TaskCard({ title, location, price, time, urgent = false, image }: {
  title: string;
  location: string;
  price: string;
  time: string;
  urgent?: boolean;
  image: string;
}) {
  return (
    <TouchableOpacity style={styles.taskCard}>
      <Card style={styles.taskCardInner}>
        {urgent && (
          <Badge variant="error" size="sm" style={styles.urgentBadge}>
            <Text>Urgent</Text>
          </Badge>
        )}
        
        <Image source={{ uri: image }} style={styles.taskImage} />
        
        <View style={styles.taskContent}>
          <Text style={styles.taskTitle}>{title}</Text>
          <View style={styles.taskMeta}>
            <MapPin size={12} color="#6B7280" />
            <Text style={styles.taskLocation}>{location}</Text>
          </View>
          <View style={styles.taskFooter}>
            <Text style={styles.taskPrice}>{price}</Text>
            <Badge variant="info" size="sm">
              <Text>{time}</Text>
            </Badge>
          </View>
        </View>
      </Card>
    </TouchableOpacity>
  );
}

function StepCard({ number, title, description, icon }: {
  number: string;
  title: string;
  description: string;
  icon: React.ReactNode;
}) {
  return (
    <Card style={styles.stepCard}>
      <View style={styles.stepHeader}>
        <View style={styles.stepNumber}>
          <Text style={styles.stepNumberText}>{number}</Text>
        </View>
        <View style={styles.stepIcon}>{icon}</View>
      </View>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logoSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  logoText: {
    marginLeft: 16,
  },
  logo: {
    fontSize: 28,
    fontWeight: '900',
    color: '#FFFFFF',
    letterSpacing: -0.5,
  },
  subtitle: {
    fontSize: 12,
    color: '#E5E7EB',
    fontWeight: '600',
    letterSpacing: 0.5,
    textTransform: 'uppercase',
  },
  profileButton: {
    position: 'relative',
  },
  profileImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    borderWidth: 3,
    borderColor: '#FFFFFF',
  },
  onlineBadge: {
    position: 'absolute',
    bottom: -2,
    right: -2,
    minWidth: 16,
    height: 16,
    borderRadius: 8,
    paddingHorizontal: 0,
  },
  onlineText: {
    fontSize: 8,
    color: '#16A34A',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  heroCard: {
    marginBottom: 24,
    borderWidth: 1,
    borderColor: 'rgba(255,255,255,0.2)',
  },
  heroContent: {
    alignItems: 'center',
  },
  heroStats: {
    flexDirection: 'row',
    gap: 20,
    marginBottom: 24,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  statText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
  },
  heroTitle: {
    fontSize: 36,
    fontWeight: '900',
    color: '#111827',
    marginBottom: 16,
    textAlign: 'center',
    letterSpacing: -1,
  },
  heroDescription: {
    fontSize: 18,
    color: '#6B7280',
    lineHeight: 28,
    marginBottom: 32,
    textAlign: 'center',
    maxWidth: 320,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 16,
    width: '100%',
  },
  primaryButton: {
    flex: 1,
  },
  secondaryButton: {
    flex: 1,
  },
  heroImageContainer: {
    borderRadius: 24,
    overflow: 'hidden',
    height: 200,
    position: 'relative',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  imageOverlay: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    height: '50%',
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
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    marginBottom: 16,
  },
  serviceCardInner: {
    padding: 24,
  },
  serviceIcon: {
    width: 64,
    height: 64,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
  },
  serviceTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 16,
    lineHeight: 20,
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
  serviceTimeText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  liveSection: {
    paddingBottom: 40,
  },
  liveIndicator: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  liveDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#10B981',
  },
  liveText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#10B981',
  },
  tasksList: {
    paddingLeft: 24,
  },
  taskCard: {
    marginRight: 16,
    width: 200,
  },
  taskCardInner: {
    padding: 0,
    overflow: 'hidden',
    position: 'relative',
  },
  urgentBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    zIndex: 1,
  },
  taskImage: {
    width: '100%',
    height: 120,
  },
  taskContent: {
    padding: 16,
  },
  taskTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  taskMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginBottom: 12,
  },
  taskLocation: {
    fontSize: 12,
    color: '#6B7280',
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F97316',
  },
  howItWorksSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  stepsContainer: {
    gap: 16,
  },
  stepCard: {
    padding: 24,
  },
  stepHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumber: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 16,
  },
  stepNumberText: {
    fontSize: 18,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepIcon: {
    marginLeft: 'auto',
  },
  stepTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
  },
  socialProofCard: {
    margin: 24,
    padding: 32,
    alignItems: 'center',
  },
  socialProofContent: {
    alignItems: 'center',
  },
  socialProofTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
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
  socialStatNumber: {
    fontSize: 24,
    fontWeight: '900',
    color: '#F97316',
    marginBottom: 4,
  },
  socialStatLabel: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  joinButton: {
    width: '100%',
  },
});