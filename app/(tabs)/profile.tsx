import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CreditCard as Edit, Star, Clock, DollarSign, Award, Settings, LogOut, Shield, Bell, CreditCard, ChevronRight, TrendingUp, Users, Target } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
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
      status: 'completed',
    },
    {
      id: 2,
      title: 'Print Assignment',
      date: '1 day ago',
      earnings: 8,
      rating: 5,
      status: 'completed',
    },
    {
      id: 3,
      title: 'Grocery Shopping',
      date: '2 days ago',
      earnings: 25,
      rating: 4,
      status: 'completed',
    },
  ];

  const achievements = [
    { id: 1, title: 'Coffee Master', description: '50+ coffee runs', icon: '☕', unlocked: true, gradient: ['#fff7ed', '#fed7aa'] },
    { id: 2, title: 'Speed Demon', description: 'Fast response time', icon: '⚡', unlocked: true, gradient: ['#eff6ff', '#dbeafe'] },
    { id: 3, title: 'Top Rated', description: '4.8+ star rating', icon: '⭐', unlocked: true, gradient: ['#fffbeb', '#fde68a'] },
    { id: 4, title: 'Century Club', description: '100+ tasks', icon: '💯', unlocked: false, gradient: ['#f3f4f6', '#e5e7eb'] },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Header with Profile */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
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
                <Star size={16} color="#ffd89b" fill="#ffd89b" />
                <Typography variant="body2" color="#ffffff">{userStats.rating}</Typography>
                <Typography variant="body2" color="#ffd89b">• Verified Student</Typography>
              </View>
            </View>
            <TouchableOpacity style={styles.editButton}>
              <Edit size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Floating Stats Cards */}
      <Animated.View 
        style={[
          styles.statsSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Award size={24} color="#f97316" />}
            value={userStats.tasksCompleted.toString()}
            label="Tasks"
            trend="+12 this week"
            gradient={['#fff7ed', '#fed7aa']}
          />
          <StatCard
            icon={<DollarSign size={24} color="#10b981" />}
            value={`$${userStats.totalEarned}`}
            label="Earned"
            trend="+$240 this month"
            gradient={['#ecfdf5', '#a7f3d0']}
          />
          <StatCard
            icon={<Star size={24} color="#f59e0b" />}
            value={userStats.rating.toString()}
            label="Rating"
            trend="New high!"
            gradient={['#fffbeb', '#fde68a']}
          />
          <StatCard
            icon={<Clock size={24} color="#3b82f6" />}
            value={userStats.responseTime}
            label="Response"
            trend="Faster than 90%"
            gradient={['#eff6ff', '#dbeafe']}
          />
        </View>
      </Animated.View>

      {/* Performance Overview */}
      <Animated.View 
        style={[
          styles.performanceSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Performance Overview</Typography>
        <GlassCard style={styles.performanceCard} gradient gradientColors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.05)']}>
          <View style={styles.performanceGrid}>
            <PerformanceItem 
              icon={<TrendingUp size={20} color="#10b981" />}
              label="This Week"
              value="12 tasks"
              change="+25%"
            />
            <PerformanceItem 
              icon={<Users size={20} color="#3b82f6" />}
              label="Repeat Clients"
              value="8 clients"
              change="+3 new"
            />
            <PerformanceItem 
              icon={<Target size={20} color="#f97316" />}
              label="Success Rate"
              value="98.5%"
              change="Perfect!"
            />
          </View>
        </GlassCard>
      </Animated.View>

      {/* Achievements */}
      <Animated.View 
        style={[
          styles.achievementsSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Achievements</Typography>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </View>
      </Animated.View>

      {/* Recent Activity */}
      <Animated.View 
        style={[
          styles.activitySection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <View style={styles.sectionHeader}>
          <Typography variant="h3">Recent Activity</Typography>
          <TouchableOpacity style={styles.seeAllButton}>
            <Typography variant="body2" color="#667eea">See All</Typography>
            <ChevronRight size={16} color="#667eea" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityList}>
          {recentTasks.map((task) => (
            <ActivityCard key={task.id} task={task} />
          ))}
        </View>
      </Animated.View>

      {/* Settings */}
      <Animated.View 
        style={[
          styles.settingsSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Settings</Typography>
        <ModernCard style={styles.settingsList}>
          <SettingsItem
            icon={<Settings size={20} color="#3b82f6" />}
            title="Account Settings"
            subtitle="Privacy, notifications, security"
          />
          <SettingsItem
            icon={<Shield size={20} color="#10b981" />}
            title="Verification"
            subtitle="Student ID, background check"
          />
          <SettingsItem
            icon={<Bell size={20} color="#f97316" />}
            title="Notifications"
            subtitle="Push notifications, email alerts"
          />
          <SettingsItem
            icon={<CreditCard size={20} color="#8b5cf6" />}
            title="Payment Methods"
            subtitle="Bank account, payment history"
          />
          <SettingsItem
            icon={<LogOut size={20} color="#ef4444" />}
            title="Sign Out"
            subtitle="Log out of your account"
            isDestructive
          />
        </ModernCard>
      </Animated.View>

      {/* Upgrade CTA */}
      <Animated.View 
        style={[
          styles.upgradeSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <GlassCard style={styles.upgradeCard} gradient gradientColors={['rgba(240, 147, 251, 0.1)', 'rgba(102, 126, 234, 0.05)']}>
          <Typography variant="h4" style={styles.upgradeTitle}>Unlock Premium Features</Typography>
          <Typography variant="body2" style={styles.upgradeDescription}>
            Get priority matching, advanced analytics, and exclusive perks
          </Typography>
          <AnimatedButton
            title="Upgrade to Pro"
            onPress={() => {}}
            variant="primary"
            size="md"
            gradient
            gradientColors={['#f093fb', '#f5576c']}
            style={styles.upgradeButton}
          />
        </GlassCard>
      </Animated.View>
    </ScrollView>
  );
}

function StatCard({ icon, value, label, trend, gradient }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  trend: string;
  gradient: string[];
}) {
  return (
    <ModernCard style={styles.statCard} gradient gradientColors={gradient}>
      <View style={styles.statIcon}>{icon}</View>
      <Typography variant="h3" style={styles.statValue}>{value}</Typography>
      <Typography variant="body2" style={styles.statLabel}>{label}</Typography>
      <Typography variant="caption" color="#10b981" style={styles.statTrend}>{trend}</Typography>
    </ModernCard>
  );
}

function PerformanceItem({ icon, label, value, change }: {
  icon: React.ReactNode;
  label: string;
  value: string;
  change: string;
}) {
  return (
    <View style={styles.performanceItem}>
      <View style={styles.performanceIcon}>{icon}</View>
      <Typography variant="body2" color="#718096">{label}</Typography>
      <Typography variant="h4" style={styles.performanceValue}>{value}</Typography>
      <Typography variant="caption" color="#10b981">{change}</Typography>
    </View>
  );
}

function AchievementCard({ achievement }: { achievement: any }) {
  return (
    <ModernCard 
      style={[styles.achievementCard, !achievement.unlocked && styles.achievementCardLocked]}
      gradient
      gradientColors={achievement.gradient}
    >
      <Typography variant="h2" style={styles.achievementIcon}>{achievement.icon}</Typography>
      <Typography 
        variant="h4" 
        style={[
          styles.achievementTitle, 
          !achievement.unlocked && styles.achievementTitleLocked
        ]}
      >
        {achievement.title}
      </Typography>
      <Typography 
        variant="body2" 
        style={[
          styles.achievementDescription, 
          !achievement.unlocked && styles.achievementDescriptionLocked
        ]}
      >
        {achievement.description}
      </Typography>
      {!achievement.unlocked && (
        <View style={styles.lockedOverlay}>
          <Typography variant="body1">🔒</Typography>
        </View>
      )}
    </ModernCard>
  );
}

function ActivityCard({ task }: { task: any }) {
  return (
    <ModernCard style={styles.activityCard}>
      <View style={styles.activityContent}>
        <Typography variant="h4">{task.title}</Typography>
        <Typography variant="body2" color="#718096">{task.date}</Typography>
      </View>
      <View style={styles.activityMeta}>
        <View style={styles.earningsContainer}>
          <Typography variant="body2" color="#10b981">+${task.earnings}</Typography>
        </View>
        <View style={styles.activityRating}>
          <Star size={14} color="#f59e0b" fill="#f59e0b" />
          <Typography variant="caption" color="#718096">{task.rating}</Typography>
        </View>
      </View>
    </ModernCard>
  );
}

function SettingsItem({ icon, title, subtitle, isDestructive = false }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  isDestructive?: boolean;
}) {
  return (
    <TouchableOpacity style={styles.settingsItem}>
      <View style={styles.settingsIconContainer}>
        {icon}
      </View>
      <View style={styles.settingsContent}>
        <Typography 
          variant="h4" 
          color={isDestructive ? "#ef4444" : undefined}
          style={styles.settingsTitle}
        >
          {title}
        </Typography>
        <Typography variant="body2" color="#718096">{subtitle}</Typography>
      </View>
      <ChevronRight size={16} color="#d1d5db" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
  performanceSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  performanceCard: {
    marginTop: 16,
  },
  performanceGrid: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  performanceItem: {
    alignItems: 'center',
    flex: 1,
  },
  performanceIcon: {
    marginBottom: 8,
  },
  performanceValue: {
    marginVertical: 4,
  },
  achievementsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    width: '48%',
    alignItems: 'center',
    padding: 16,
    position: 'relative',
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    marginBottom: 12,
  },
  achievementTitle: {
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#9ca3af',
  },
  achievementDescription: {
    textAlign: 'center',
  },
  achievementDescriptionLocked: {
    color: '#d1d5db',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
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
  earningsContainer: {
    backgroundColor: '#ecfdf5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
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
  settingsList: {
    padding: 0,
    overflow: 'hidden',
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
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
    color: '#718096',
  },
  upgradeButton: {
    width: '100%',
  },
});