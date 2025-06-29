import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CreditCard as Edit, Star, Clock, DollarSign, Award, Settings, LogOut, Shield, Bell, CreditCard, ChevronRight } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';

const { width } = Dimensions.get('window');

export default function ProfileScreen() {
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
    { id: 1, title: 'Coffee Master', description: '50+ coffee runs', icon: '☕', unlocked: true },
    { id: 2, title: 'Speed Demon', description: 'Fast response time', icon: '⚡', unlocked: true },
    { id: 3, title: 'Top Rated', description: '4.8+ star rating', icon: '⭐', unlocked: true },
    { id: 4, title: 'Century Club', description: '100+ tasks', icon: '💯', unlocked: false },
  ];

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Header with Profile */}
      <LinearGradient
        colors={['#1E40AF', '#3B82F6']}
        style={styles.header}
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
            <Text style={styles.profileName}>Alex Johnson</Text>
            <Text style={styles.profileEmail}>alex.johnson@ufl.edu</Text>
            <View style={styles.profileBadge}>
              <Star size={16} color="#F97316" fill="#F97316" />
              <Text style={styles.profileRating}>{userStats.rating}</Text>
              <Text style={styles.profileLevel}>• Verified Student</Text>
            </View>
          </View>
          <TouchableOpacity style={styles.editButton}>
            <Edit size={20} color="#FFFFFF" />
          </TouchableOpacity>
        </View>
      </LinearGradient>

      {/* Stats Cards */}
      <View style={styles.statsSection}>
        <View style={styles.statsGrid}>
          <StatCard
            icon={<Award size={20} color="#F97316" />}
            value={userStats.tasksCompleted.toString()}
            label="Tasks"
            color="#FFF7ED"
          />
          <StatCard
            icon={<DollarSign size={20} color="#10B981" />}
            value={`$${userStats.totalEarned}`}
            label="Earned"
            color="#ECFDF5"
          />
          <StatCard
            icon={<Star size={20} color="#F59E0B" />}
            value={userStats.rating.toString()}
            label="Rating"
            color="#FFFBEB"
          />
          <StatCard
            icon={<Clock size={20} color="#3B82F6" />}
            value={userStats.responseTime}
            label="Response"
            color="#EFF6FF"
          />
        </View>
      </View>

      {/* Achievements */}
      <View style={styles.achievementsSection}>
        <Text style={styles.sectionTitle}>Achievements</Text>
        <View style={styles.achievementsGrid}>
          {achievements.map((achievement) => (
            <AchievementCard
              key={achievement.id}
              achievement={achievement}
            />
          ))}
        </View>
      </View>

      {/* Recent Activity */}
      <View style={styles.activitySection}>
        <View style={styles.sectionHeader}>
          <Text style={styles.sectionTitle}>Recent Activity</Text>
          <TouchableOpacity style={styles.seeAllButton}>
            <Text style={styles.seeAllText}>See All</Text>
            <ChevronRight size={16} color="#3B82F6" />
          </TouchableOpacity>
        </View>
        
        <View style={styles.activityList}>
          {recentTasks.map((task) => (
            <ActivityCard key={task.id} task={task} />
          ))}
        </View>
      </View>

      {/* Settings */}
      <View style={styles.settingsSection}>
        <Text style={styles.sectionTitle}>Settings</Text>
        <View style={styles.settingsList}>
          <SettingsItem
            icon={<Settings size={20} color="#3B82F6" />}
            title="Account Settings"
            subtitle="Privacy, notifications, security"
          />
          <SettingsItem
            icon={<Shield size={20} color="#10B981" />}
            title="Verification"
            subtitle="Student ID, background check"
          />
          <SettingsItem
            icon={<Bell size={20} color="#F97316" />}
            title="Notifications"
            subtitle="Push notifications, email alerts"
          />
          <SettingsItem
            icon={<CreditCard size={20} color="#8B5CF6" />}
            title="Payment Methods"
            subtitle="Bank account, payment history"
          />
          <SettingsItem
            icon={<LogOut size={20} color="#EF4444" />}
            title="Sign Out"
            subtitle="Log out of your account"
            isDestructive
          />
        </View>
      </View>
    </ScrollView>
  );
}

function StatCard({ icon, value, label, color }: {
  icon: React.ReactNode;
  value: string;
  label: string;
  color: string;
}) {
  return (
    <View style={[styles.statCard, { backgroundColor: color }]}>
      <View style={styles.statIcon}>{icon}</View>
      <Text style={styles.statValue}>{value}</Text>
      <Text style={styles.statLabel}>{label}</Text>
    </View>
  );
}

function AchievementCard({ achievement }: { achievement: any }) {
  return (
    <View style={[styles.achievementCard, !achievement.unlocked && styles.achievementCardLocked]}>
      <Text style={styles.achievementIcon}>{achievement.icon}</Text>
      <Text style={[styles.achievementTitle, !achievement.unlocked && styles.achievementTitleLocked]}>
        {achievement.title}
      </Text>
      <Text style={[styles.achievementDescription, !achievement.unlocked && styles.achievementDescriptionLocked]}>
        {achievement.description}
      </Text>
      {!achievement.unlocked && (
        <View style={styles.lockedOverlay}>
          <Text style={styles.lockedText}>🔒</Text>
        </View>
      )}
    </View>
  );
}

function ActivityCard({ task }: { task: any }) {
  return (
    <View style={styles.activityCard}>
      <View style={styles.activityContent}>
        <Text style={styles.activityTitle}>{task.title}</Text>
        <Text style={styles.activityDate}>{task.date}</Text>
      </View>
      <View style={styles.activityMeta}>
        <View style={styles.earningsContainer}>
          <Text style={styles.activityEarnings}>+${task.earnings}</Text>
        </View>
        <View style={styles.activityRating}>
          <Star size={14} color="#F59E0B" fill="#F59E0B" />
          <Text style={styles.activityRatingText}>{task.rating}</Text>
        </View>
      </View>
    </View>
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
        <Text style={[styles.settingsTitle, isDestructive && styles.settingsTitleDestructive]}>
          {title}
        </Text>
        <Text style={styles.settingsSubtitle}>{subtitle}</Text>
      </View>
      <ChevronRight size={16} color="#D1D5DB" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 30,
    paddingHorizontal: 24,
    position: 'relative',
  },
  headerLogo: {
    position: 'absolute',
    top: 60,
    right: 24,
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
    borderColor: '#FFFFFF',
  },
  profileInfo: {
    flex: 1,
  },
  profileName: {
    fontSize: 24,
    fontWeight: '800',
    color: '#FFFFFF',
    marginBottom: 4,
  },
  profileEmail: {
    fontSize: 14,
    color: '#E5E7EB',
    marginBottom: 8,
  },
  profileBadge: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  profileRating: {
    fontSize: 14,
    fontWeight: '600',
    color: '#FFFFFF',
    marginLeft: 4,
  },
  profileLevel: {
    fontSize: 14,
    color: '#F97316',
    fontWeight: '600',
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
    borderRadius: 16,
    padding: 20,
    alignItems: 'center',
    width: '48%',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statIcon: {
    marginBottom: 12,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  statLabel: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    fontWeight: '600',
  },
  achievementsSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 16,
  },
  achievementsGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  achievementCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    alignItems: 'center',
    width: '48%',
    position: 'relative',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  achievementCardLocked: {
    opacity: 0.6,
  },
  achievementIcon: {
    fontSize: 32,
    marginBottom: 12,
  },
  achievementTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 4,
    textAlign: 'center',
  },
  achievementTitleLocked: {
    color: '#9CA3AF',
  },
  achievementDescription: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
  },
  achievementDescriptionLocked: {
    color: '#D1D5DB',
  },
  lockedOverlay: {
    position: 'absolute',
    top: 8,
    right: 8,
  },
  lockedText: {
    fontSize: 16,
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
  },
  seeAllText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
    marginRight: 4,
  },
  activityList: {
    gap: 12,
  },
  activityCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 16,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  activityContent: {
    flex: 1,
  },
  activityTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 4,
  },
  activityDate: {
    fontSize: 12,
    color: '#6B7280',
  },
  activityMeta: {
    alignItems: 'flex-end',
    gap: 8,
  },
  earningsContainer: {
    backgroundColor: '#ECFDF5',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 12,
  },
  activityEarnings: {
    fontSize: 14,
    fontWeight: '700',
    color: '#10B981',
  },
  activityRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  activityRatingText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
    fontWeight: '600',
  },
  settingsSection: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  settingsList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  settingsItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  settingsIconContainer: {
    marginRight: 16,
  },
  settingsContent: {
    flex: 1,
  },
  settingsTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  settingsTitleDestructive: {
    color: '#EF4444',
  },
  settingsSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
});