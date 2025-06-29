import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CreditCard as Edit, Star, Clock, DollarSign, Award, Settings, ChevronRight, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const userStats = {
    tasksCompleted: 47,
    totalEarned: 1240,
    rating: 4.9,
    responseTime: '12 min',
  };

  const recentTasks = [
    {
      id: 1,
      title: 'Coffee Run - Starbucks',
      date: '2 hours ago',
      earnings: 12,
      rating: 5,
    },
    {
      id: 2,
      title: 'Print Assignment',
      date: '1 day ago',
      earnings: 8,
      rating: 5,
    },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Header with Profile */}
      <LinearGradient
        colors={['#0021A5', '#001E3C']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <View style={styles.headerLogo}>
            <HustlLogo size={24} />
          </View>
          
          <View style={styles.profileSection}>
            <Image
              source={{ uri: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=300' }}
              style={styles.profileImage}
            />
            <View style={styles.profileInfo}>
              <Typography variant="h2" color="#ffffff">Alex Johnson</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                alex.johnson@ufl.edu
              </Typography>
              <View style={styles.profileBadge}>
                <Star size={16} color="#E6501E" fill="#E6501E" />
                <Typography variant="body2" color="#ffffff">{userStats.rating}</Typography>
                <Typography variant="body2" color="#E6501E">• Verified Student</Typography>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Stats Cards */}
      <Animated.View style={[styles.statsSection, { opacity: fadeAnim }]}>
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Award size={24} color="#E6501E" />}
            value={userStats.tasksCompleted.toString()}
            label="Tasks"
            trend="+12 this week"
          />
          <StatCard
            icon={<DollarSign size={24} color="#0021A5" />}
            value={`$${userStats.totalEarned}`}
            label="Earned"
            trend="+$240 this month"
          />
          <StatCard
            icon={<Star size={24} color="#E6501E" />}
            value={userStats.rating.toString()}
            label="Rating"
            trend="New high!"
          />
          <StatCard
            icon={<Clock size={24} color="#0021A5" />}
            value={userStats.responseTime}
            label="Response"
            trend="Faster than 90%"
          />
        </View>
      </Animated.View>

      {/* Recent Activity */}
      <Animated.View style={[styles.activitySection, { opacity: fadeAnim }]}>
        <View style={styles.sectionHeader}>
          <Typography variant="h3">Recent Activity</Typography>
          <TouchableOpacity style={styles.seeAllButton}>
            <Typography variant="body2" color="#0021A5">See All</Typography>
            <ChevronRight size={16} color="#0021A5" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityList}>
          {recentTasks.map((task) => (
            <ActivityCard key={task.id} task={task} />
          ))}
        </View>
      </Animated.View>

      {/* Settings */}
      <Animated.View style={[styles.settingsSection, { opacity: fadeAnim }]}>
        <Typography variant="h3" style={styles.sectionTitle}>Settings</Typography>
        <ModernCard style={styles.settingsList}>
          <SettingsItem
            icon={<Settings size={20} color="#0021A5" />}
            title="Account Settings"
            subtitle="Privacy, notifications, security"
          />
          <SettingsItem
            icon={<TrendingUp size={20} color="#E6501E" />}
            title="Performance"
            subtitle="Analytics and insights"
          />
        </ModernCard>
      </Animated.View>

      {/* Upgrade CTA */}
      <Animated.View style={[styles.upgradeSection, { opacity: fadeAnim }]}>
        <ModernCard style={styles.upgradeCard} variant="secondary" gradient>
          <Typography variant="h4" color="#FFFFFF" style={styles.upgradeTitle}>
            Unlock Premium Features
          </Typography>
          <Typography variant="body2" color="rgba(255,255,255,0.8)" style={styles.upgradeDescription}>
            Get priority matching and advanced analytics
          </Typography>
          <AnimatedButton
            title="Upgrade to Pro"
            onPress={() => {}}
            variant="outline"
            size="md"
            style={[styles.upgradeButton, { borderColor: '#FFFFFF' }]}
            textStyle={{ color: '#FFFFFF' }}
          />
        </ModernCard>
      </Animated.View>
    </ScrollView>
  );
}

function StatCard({ icon, value, label, trend }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
}) {
  return (
    <ModernCard style={styles.statCard} variant="accent">
      <View style={styles.statIcon}>{icon}</View>
      <Typography variant="h3" style={styles.statValue}>{value}</Typography>
      <Typography variant="body2" style={styles.statLabel}>{label}</Typography>
      <Typography variant="caption" color="#E6501E" style={styles.statTrend}>{trend}</Typography>
    </ModernCard>
  );
}

function ActivityCard({ task }: { task: any }) {
  return (
    <ModernCard style={styles.activityCard}>
      <View style={styles.activityContent}>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="body2" color="#001E3C">{task.date}</Typography>
      </View>
      <View style={styles.activityMeta}>
        <Badge variant="secondary" size="sm">
          <Typography variant="caption" color="#FFFFFF">+${task.earnings}</Typography>
        </Badge>
        <View style={styles.activityRating}>
          <Star size={14} color="#E6501E" fill="#E6501E" />
          <Typography variant="caption" color="#001E3C">{task.rating}</Typography>
        </View>
      </View>
    </ModernCard>
  );
}

function SettingsItem({ icon, title, subtitle }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsIconContainer}>
        {icon}
      </View>
      <View style={styles.settingsContent}>
        <Typography variant="h4" style={styles.settingsTitle}>{title}</Typography>
        <Typography variant="body2" color="#001E3C">{subtitle}</Typography>
      </View>
      <ChevronRight size={16} color="#D8DDE6" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 40,
    paddingHorizontal: 24,
    position: 'relative',
  },
  headerContent: {
    flex: 1,
  },
  headerLogo: {
    position: 'absolute',
    top: 0,
    right: 0,
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileImage: {
    width: 80,
    height: 80,
    borderRadius: 40,
    marginRight: 16,
    borderWidth: 3,
    borderColor: 'rgba(255,255,255,0.3)',
  },
  profileInfo: {
    flex: 1,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
    gap: 4,
  },
  editButton: {
    backgroundColor: 'rgba(255, 255, 255, 0.2)',
    padding: 12,
    borderRadius: 12,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: -20,
  },
  statsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  statCard: {
    width: '48%',
    alignItems: 'center',
    padding: 20,
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    marginBottom: 4,
  },
  statLabel: {
    textAlign: 'center',
    marginBottom: 4,
  },
  statTrend: {
    textAlign: 'center',
    fontFamily: 'Inter-SemiBold',
  },
  activitySection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  seeAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 16,
  },
  activityContent: {
    flex: 1,
  },
  activityMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  activityRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  settingsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  settingsList: {
    padding: 0,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#D8DDE6',
  },
  settingsIconContainer: {
    marginRight: 16,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    marginBottom: 2,
  },
  upgradeSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  upgradeCard: {
    alignItems: 'center',
    padding: 32,
  },
  upgradeTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  upgradeDescription: {
    marginBottom: 24,
    textAlign: 'center',
  },
  upgradeButton: {
    width: '100%',
  },
});