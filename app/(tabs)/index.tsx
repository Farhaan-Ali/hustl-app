import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, Clock, DollarSign, MapPin, Star, ChevronRight, ArrowRight } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Clean Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.logoSection}>
            <HustlLogo size={36} />
            <View style={styles.logoText}>
              <Text style={styles.logo}>Hustl</Text>
              <Text style={styles.subtitle}>Campus Tasks</Text>
            </View>
          </View>
          
          <View style={styles.authButtons}>
            <TouchableOpacity style={styles.signInButton}>
              <Text style={styles.signInText}>Sign In</Text>
            </TouchableOpacity>
          </View>
        </View>
      </LinearGradient>

      {/* Hero Section - Simplified */}
      <View style={styles.heroSection}>
        <View style={styles.heroContent}>
          <Text style={styles.heroTitle}>Need something done on campus?</Text>
          <Text style={styles.heroDescription}>
            Connect with fellow students for quick errands, coffee runs, and campus tasks.
          </Text>
          
          <View style={styles.ctaButtons}>
            <TouchableOpacity style={styles.primaryCTA}>
              <Text style={styles.primaryCTAText}>Post a Task</Text>
              <ArrowRight size={18} color="#FFFFFF" />
            </TouchableOpacity>
            
            <TouchableOpacity style={styles.secondaryCTA}>
              <Text style={styles.secondaryCTAText}>Browse Tasks</Text>
            </TouchableOpacity>
          </View>
        </View>
        
        <View style={styles.heroImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/1438081/pexels-photo-1438081.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
        </View>
      </View>

      {/* Services - Clean Grid */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <View style={styles.servicesGrid}>
          <ServiceCard
            icon={<Coffee size={28} color="#F97316" />}
            title="Coffee Runs"
            description="Quick coffee delivery"
            color="#FFF7ED"
          />
          <ServiceCard
            icon={<Printer size={28} color="#3B82F6" />}
            title="Printing"
            description="Document services"
            color="#EFF6FF"
          />
          <ServiceCard
            icon={<Heart size={28} color="#EF4444" />}
            title="Pet Care"
            description="Walking & sitting"
            color="#FEF2F2"
          />
        </View>
      </View>

      {/* Recent Tasks - Horizontal Scroll */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>View All</Text>
            <ChevronRight size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tasksList}>
          <TaskCard
            title="Starbucks Run"
            location="Reitz Union"
            price="$12"
            image="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
          <TaskCard
            title="Print Documents"
            location="Library West"
            price="$5"
            image="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
          <TaskCard
            title="Dog Walking"
            location="Campus Area"
            price="$20"
            image="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </ScrollView>
      </View>

      {/* How It Works - Simplified */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How It Works</Text>
        <View style={styles.stepsContainer}>
          <StepCard number="1" title="Post" description="Describe your task" />
          <StepCard number="2" title="Match" description="Get connected" />
          <StepCard number="3" title="Done" description="Task completed" />
        </View>
      </View>

      {/* Final CTA */}
      <View style={styles.finalCTA}>
        <Text style={styles.ctaTitle}>Ready to get started?</Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Join Hustl</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

function ServiceCard({ icon, title, description, color }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  color: string;
}) {
  return (
    <TouchableOpacity style={[styles.serviceCard, { backgroundColor: color }]}>
      <View style={styles.serviceIcon}>{icon}</View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

function TaskCard({ title, location, price, image }: {
  title: string;
  location: string;
  price: string;
  image: string;
}) {
  return (
    <TouchableOpacity style={styles.taskCard}>
      <Image source={{ uri: image }} style={styles.taskImage} />
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.taskMeta}>
          <MapPin size={12} color="#6B7280" />
          <Text style={styles.taskLocation}>{location}</Text>
        </View>
        <Text style={styles.taskPrice}>{price}</Text>
      </View>
    </TouchableOpacity>
  );
}

function StepCard({ number, title, description }: {
  number: string;
  title: string;
  description: string;
}) {
  return (
    <View style={styles.stepCard}>
      <View style={styles.stepNumber}>
        <Text style={styles.stepNumberText}>{number}</Text>
      </View>
      <Text style={styles.stepTitle}>{title}</Text>
      <Text style={styles.stepDescription}>{description}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 24,
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
    marginLeft: 12,
  },
  logo: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 12,
    color: '#E5E7EB',
    fontWeight: '500',
  },
  authButtons: {
    flexDirection: 'row',
  },
  signInButton: {
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  heroSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  heroContent: {
    marginBottom: 32,
  },
  heroTitle: {
    fontSize: 32,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
    lineHeight: 38,
  },
  heroDescription: {
    fontSize: 18,
    color: '#6B7280',
    lineHeight: 26,
    marginBottom: 32,
  },
  ctaButtons: {
    flexDirection: 'row',
    gap: 16,
  },
  primaryCTA: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
    justifyContent: 'center',
  },
  primaryCTAText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  secondaryCTA: {
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flex: 1,
    alignItems: 'center',
  },
  secondaryCTAText: {
    color: '#374151',
    fontSize: 16,
    fontWeight: '600',
  },
  heroImageContainer: {
    borderRadius: 20,
    overflow: 'hidden',
    height: 240,
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  servicesSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#F8FAFC',
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 24,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceCard: {
    padding: 24,
    borderRadius: 16,
    alignItems: 'center',
  },
  serviceIcon: {
    marginBottom: 16,
  },
  serviceTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  serviceDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
  },
  recentSection: {
    paddingVertical: 40,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 24,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 4,
  },
  tasksList: {
    paddingLeft: 24,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    width: 180,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.08,
    shadowRadius: 12,
    elevation: 3,
    overflow: 'hidden',
  },
  taskImage: {
    width: '100%',
    height: 100,
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
    marginBottom: 12,
  },
  taskLocation: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  taskPrice: {
    fontSize: 18,
    fontWeight: '800',
    color: '#F97316',
  },
  howItWorksSection: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    backgroundColor: '#F8FAFC',
  },
  stepsContainer: {
    flexDirection: 'row',
    gap: 16,
  },
  stepCard: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
  },
  stepNumber: {
    width: 40,
    height: 40,
    backgroundColor: '#3B82F6',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 16,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  stepDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  finalCTA: {
    paddingHorizontal: 24,
    paddingVertical: 40,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 24,
    textAlign: 'center',
  },
  ctaButton: {
    backgroundColor: '#F97316',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#FFFFFF',
  },
});