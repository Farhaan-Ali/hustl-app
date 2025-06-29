import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image, TouchableOpacity, Dimensions } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, Clock, DollarSign, MapPin, Star, ChevronRight } from 'lucide-react-native';

const { width } = Dimensions.get('window');

export default function HomeScreen() {
  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
      >
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <Text style={styles.logo}>Hustl</Text>
            <Text style={styles.subtitle}>Campus Gigs</Text>
            <View style={styles.authButtons}>
              <TouchableOpacity style={styles.signInButton}>
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.signUpButton}>
                <Text style={styles.signUpText}>Sign Up</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </LinearGradient>

      {/* Hero Section */}
      <View style={styles.heroSection}>
        <LinearGradient
          colors={['#1E40AF', '#2563EB']}
          style={styles.heroContent}
        >
          <View style={styles.heroTextContainer}>
            <Text style={styles.heroTitle}>Running late for class?</Text>
            <Text style={styles.heroSubtitle}>Get coffee delivered right to you</Text>
            <Text style={styles.heroDescription}>
              Campus errands, covered. Coffee runs, printing, pet care — Hustl connects Gators in minutes.
            </Text>
            
            <View style={styles.ctaButtons}>
              <TouchableOpacity style={styles.primaryCTA}>
                <Text style={styles.primaryCTAText}>Post a Task</Text>
                <ChevronRight size={20} color="#FFFFFF" />
              </TouchableOpacity>
              
              <TouchableOpacity style={styles.secondaryCTA}>
                <Text style={styles.secondaryCTAText}>Browse Tasks</Text>
                <ChevronRight size={20} color="#1E40AF" />
              </TouchableOpacity>
            </View>
          </View>
        </LinearGradient>
        
        <View style={styles.heroImageContainer}>
          <Image
            source={{ uri: 'https://images.pexels.com/photos/324028/pexels-photo-324028.jpeg?auto=compress&cs=tinysrgb&w=800' }}
            style={styles.heroImage}
          />
          
          {/* Service Card Overlay */}
          <View style={styles.serviceCard}>
            <View style={styles.serviceCardHeader}>
              <Coffee size={24} color="#F97316" />
              <View style={styles.serviceCardInfo}>
                <Text style={styles.serviceCardTitle}>Coffee Run</Text>
                <View style={styles.serviceCardMeta}>
                  <Clock size={14} color="#6B7280" />
                  <Text style={styles.serviceCardTime}>15 min</Text>
                  <DollarSign size={14} color="#6B7280" />
                  <Text style={styles.serviceCardPrice}>$8</Text>
                </View>
              </View>
            </View>
          </View>
        </View>
      </View>

      {/* Popular Services */}
      <View style={styles.servicesSection}>
        <Text style={styles.sectionTitle}>Popular Services</Text>
        <View style={styles.servicesGrid}>
          <ServiceTile
            icon={<Coffee size={32} color="#F97316" />}
            title="Coffee Runs"
            description="Get your favorite drink delivered"
            price="$5-15"
            time="10-20 min"
          />
          <ServiceTile
            icon={<Printer size={32} color="#3B82F6" />}
            title="Printing"
            description="Documents printed and delivered"
            price="$3-10"
            time="15-30 min"
          />
          <ServiceTile
            icon={<Heart size={32} color="#EF4444" />}
            title="Pet Care"
            description="Walking, feeding, and care"
            price="$10-25"
            time="30-60 min"
          />
        </View>
      </View>

      {/* Recent Tasks */}
      <View style={styles.recentSection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Tasks</Text>
          <TouchableOpacity>
            <Text style={styles.seeAllText}>See All</Text>
          </TouchableOpacity>
        </View>
        
        <ScrollView horizontal showsHorizontalScrollIndicator={false} style={styles.tasksList}>
          <TaskCard
            title="Starbucks Coffee Run"
            location="Turlington Plaza"
            price="$12"
            time="15 min"
            rating={4.8}
            image="https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
          <TaskCard
            title="Print Assignment"
            location="Library West"
            price="$5"
            time="20 min"
            rating={4.9}
            image="https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
          <TaskCard
            title="Dog Walking"
            location="Campus Area"
            price="$20"
            time="45 min"
            rating={5.0}
            image="https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400"
          />
        </ScrollView>
      </View>

      {/* How It Works */}
      <View style={styles.howItWorksSection}>
        <Text style={styles.sectionTitle}>How Hustl Works</Text>
        <View style={styles.stepsContainer}>
          <StepCard
            number="1"
            title="Post Your Task"
            description="Describe what you need done and set your budget"
          />
          <StepCard
            number="2"
            title="Get Matched"
            description="Students nearby will offer to help you out"
          />
          <StepCard
            number="3"
            title="Task Complete"
            description="Pay securely and rate your experience"
          />
        </View>
      </View>

      {/* CTA Section */}
      <LinearGradient
        colors={['#F97316', '#EA580C']}
        style={styles.ctaSection}
      >
        <Text style={styles.ctaTitle}>Ready to get started?</Text>
        <Text style={styles.ctaDescription}>
          Join thousands of students making campus life easier
        </Text>
        <TouchableOpacity style={styles.ctaButton}>
          <Text style={styles.ctaButtonText}>Join Hustl Today</Text>
        </TouchableOpacity>
      </LinearGradient>
    </ScrollView>
  );
}

function ServiceTile({ icon, title, description, price, time }: {
  icon: React.ReactNode;
  title: string;
  description: string;
  price: string;
  time: string;
}) {
  return (
    <TouchableOpacity style={styles.serviceTile}>
      <View style={styles.serviceIcon}>{icon}</View>
      <Text style={styles.serviceTitle}>{title}</Text>
      <Text style={styles.serviceDescription}>{description}</Text>
      <View style={styles.serviceMeta}>
        <Text style={styles.servicePrice}>{price}</Text>
        <Text style={styles.serviceTime}>{time}</Text>
      </View>
    </TouchableOpacity>
  );
}

function TaskCard({ title, location, price, time, rating, image }: {
  title: string;
  location: string;
  price: string;
  time: string;
  rating: number;
  image: string;
}) {
  return (
    <TouchableOpacity style={styles.taskCard}>
      <Image source={{ uri: image }} style={styles.taskImage} />
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{title}</Text>
        <View style={styles.taskLocation}>
          <MapPin size={14} color="#6B7280" />
          <Text style={styles.taskLocationText}>{location}</Text>
        </View>
        <View style={styles.taskMeta}>
          <Text style={styles.taskPrice}>{price}</Text>
          <Text style={styles.taskTime}>{time}</Text>
          <View style={styles.taskRating}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.taskRatingText}>{rating}</Text>
          </View>
        </View>
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
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
  },
  headerContent: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  headerTop: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  logo: {
    fontSize: 28,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  subtitle: {
    fontSize: 14,
    color: '#E5E7EB',
    position: 'absolute',
    left: 80,
  },
  authButtons: {
    flexDirection: 'row',
    gap: 12,
  },
  signInButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    borderWidth: 1,
    borderColor: '#FFFFFF',
  },
  signInText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  signUpButton: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 8,
    backgroundColor: '#F97316',
  },
  signUpText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '600',
  },
  heroSection: {
    minHeight: 400,
  },
  heroContent: {
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  heroTextContainer: {
    maxWidth: width > 768 ? '50%' : '100%',
  },
  heroTitle: {
    fontSize: width > 768 ? 32 : 28,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 12,
    lineHeight: width > 768 ? 38 : 34,
  },
  heroSubtitle: {
    fontSize: width > 768 ? 20 : 18,
    fontWeight: '600',
    color: '#E5E7EB',
    marginBottom: 16,
  },
  heroDescription: {
    fontSize: 16,
    color: '#CBD5E1',
    lineHeight: 24,
    marginBottom: 32,
  },
  ctaButtons: {
    gap: 16,
  },
  primaryCTA: {
    backgroundColor: '#F97316',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 8,
    elevation: 4,
  },
  primaryCTAText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  secondaryCTA: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 24,
    paddingVertical: 16,
    borderRadius: 12,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 2,
  },
  secondaryCTAText: {
    color: '#1E40AF',
    fontSize: 16,
    fontWeight: '700',
    marginRight: 8,
  },
  heroImageContainer: {
    position: 'relative',
    height: 300,
    marginTop: -100,
    marginHorizontal: 20,
    borderRadius: 16,
    overflow: 'hidden',
  },
  heroImage: {
    width: '100%',
    height: '100%',
  },
  serviceCard: {
    position: 'absolute',
    bottom: 20,
    right: 20,
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
    minWidth: 160,
  },
  serviceCardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  serviceCardInfo: {
    marginLeft: 12,
  },
  serviceCardTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
  },
  serviceCardMeta: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
  },
  serviceCardTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  serviceCardPrice: {
    fontSize: 12,
    color: '#6B7280',
  },
  servicesSection: {
    padding: 20,
    marginTop: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 20,
  },
  servicesGrid: {
    gap: 16,
  },
  serviceTile: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  serviceIcon: {
    width: 60,
    height: 60,
    backgroundColor: '#F8FAFC',
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
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
    lineHeight: 20,
    marginBottom: 12,
  },
  serviceMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  servicePrice: {
    fontSize: 14,
    fontWeight: '600',
    color: '#F97316',
  },
  serviceTime: {
    fontSize: 14,
    color: '#6B7280',
  },
  recentSection: {
    paddingHorizontal: 20,
    paddingBottom: 20,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  tasksList: {
    paddingLeft: 0,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    marginRight: 16,
    width: 200,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
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
  taskLocation: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  taskLocationText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  taskMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskPrice: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F97316',
  },
  taskTime: {
    fontSize: 12,
    color: '#6B7280',
  },
  taskRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskRatingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  howItWorksSection: {
    padding: 20,
    backgroundColor: '#F8FAFC',
  },
  stepsContainer: {
    gap: 20,
  },
  stepCard: {
    backgroundColor: '#FFFFFF',
    padding: 20,
    borderRadius: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  stepNumber: {
    width: 50,
    height: 50,
    backgroundColor: '#3B82F6',
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  stepNumberText: {
    fontSize: 20,
    fontWeight: '800',
    color: '#FFFFFF',
  },
  stepTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
    textAlign: 'center',
  },
  stepDescription: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 20,
  },
  ctaSection: {
    margin: 20,
    padding: 32,
    borderRadius: 20,
    alignItems: 'center',
  },
  ctaTitle: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 8,
    textAlign: 'center',
  },
  ctaDescription: {
    fontSize: 16,
    color: '#FED7AA',
    textAlign: 'center',
    marginBottom: 24,
  },
  ctaButton: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 32,
    paddingVertical: 16,
    borderRadius: 12,
  },
  ctaButtonText: {
    fontSize: 16,
    fontWeight: '700',
    color: '#F97316',
  },
});