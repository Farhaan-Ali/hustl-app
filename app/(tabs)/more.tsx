import React from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircleHelp as HelpCircle, Shield, FileText, Star, MessageCircle, Globe, Bell, CreditCard, Users, Award, ChevronRight } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';

export default function MoreScreen() {
  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      {/* Clean Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <HustlLogo size={28} />
          <Text style={styles.headerTitle}>More</Text>
        </View>
        <Text style={styles.headerSubtitle}>Settings, help, and information</Text>
      </View>

      {/* Quick Stats */}
      <View style={styles.statsSection}>
        <View style={styles.statsCard}>
          <View style={styles.statItem}>
            <Users size={24} color="#3B82F6" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>12,000+</Text>
              <Text style={styles.statLabel}>Active Students</Text>
            </View>
          </View>
          <View style={styles.statItem}>
            <Award size={24} color="#F97316" />
            <View style={styles.statContent}>
              <Text style={styles.statValue}>50,000+</Text>
              <Text style={styles.statLabel}>Tasks Completed</Text>
            </View>
          </View>
        </View>
      </View>

      {/* Account Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Account</Text>
        <View style={styles.menuList}>
          <MenuItem
            icon={<Bell size={20} color="#6B7280" />}
            title="Notifications"
            subtitle="Push notifications, email alerts"
            onPress={() => {}}
          />
          <MenuItem
            icon={<CreditCard size={20} color="#6B7280" />}
            title="Payment Methods"
            subtitle="Manage cards and bank accounts"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Globe size={20} color="#6B7280" />}
            title="Language & Region"
            subtitle="English (US)"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* Support Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Support</Text>
        <View style={styles.menuList}>
          <MenuItem
            icon={<HelpCircle size={20} color="#6B7280" />}
            title="Help Center"
            subtitle="FAQs and troubleshooting"
            onPress={() => {}}
          />
          <MenuItem
            icon={<MessageCircle size={20} color="#6B7280" />}
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Star size={20} color="#6B7280" />}
            title="Rate Hustl"
            subtitle="Share your feedback"
            onPress={() => handleLinkPress('https://apps.apple.com')}
          />
        </View>
      </View>

      {/* Legal Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Legal</Text>
        <View style={styles.menuList}>
          <MenuItem
            icon={<FileText size={20} color="#6B7280" />}
            title="Terms of Service"
            subtitle="User agreement and terms"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Shield size={20} color="#6B7280" />}
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => {}}
          />
          <MenuItem
            icon={<FileText size={20} color="#6B7280" />}
            title="Community Guidelines"
            subtitle="Rules and best practices"
            onPress={() => {}}
          />
        </View>
      </View>

      {/* About Section */}
      <View style={styles.aboutSection}>
        <View style={styles.aboutHeader}>
          <HustlLogo size={32} />
          <Text style={styles.aboutTitle}>About Hustl</Text>
        </View>
        <Text style={styles.aboutDescription}>
          Hustl connects University of Florida students for quick campus errands and tasks. 
          From coffee runs to printing services, we make campus life easier for everyone.
        </Text>
        
        <View style={styles.aboutStats}>
          <View style={styles.aboutStat}>
            <Text style={styles.aboutStatValue}>4.9</Text>
            <Text style={styles.aboutStatLabel}>App Rating</Text>
          </View>
          <View style={styles.aboutStat}>
            <Text style={styles.aboutStatValue}>2023</Text>
            <Text style={styles.aboutStatLabel}>Founded</Text>
          </View>
          <View style={styles.aboutStat}>
            <Text style={styles.aboutStatValue}>UF</Text>
            <Text style={styles.aboutStatLabel}>Campus</Text>
          </View>
        </View>
      </View>

      {/* Social Links */}
      <View style={styles.socialSection}>
        <Text style={styles.sectionTitle}>Connect With Us</Text>
        <View style={styles.socialLinks}>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleLinkPress('https://instagram.com/hustluf')}
          >
            <Text style={styles.socialButtonText}>📱 Instagram</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleLinkPress('https://twitter.com/hustluf')}
          >
            <Text style={styles.socialButtonText}>🐦 Twitter</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.socialButton}
            onPress={() => handleLinkPress('https://discord.gg/hustluf')}
          >
            <Text style={styles.socialButtonText}>💬 Discord</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* App Version */}
      <View style={styles.versionSection}>
        <Text style={styles.versionText}>Hustl v1.2.0</Text>
        <Text style={styles.versionSubtext}>Made with ❤️ for UF Gators</Text>
      </View>
    </ScrollView>
  );
}

function MenuItem({ icon, title, subtitle, onPress }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={styles.menuIcon}>{icon}</View>
      <View style={styles.menuContent}>
        <Text style={styles.menuTitle}>{title}</Text>
        <Text style={styles.menuSubtitle}>{subtitle}</Text>
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
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 24,
    backgroundColor: '#FFFFFF',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginLeft: 12,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
  },
  statsCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 20,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  statContent: {
    marginLeft: 16,
  },
  statValue: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
  },
  statLabel: {
    fontSize: 14,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 12,
  },
  menuList: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  menuIcon: {
    marginRight: 16,
  },
  menuContent: {
    flex: 1,
  },
  menuTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  menuSubtitle: {
    fontSize: 14,
    color: '#6B7280',
  },
  aboutSection: {
    margin: 24,
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    padding: 24,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  aboutTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginLeft: 12,
  },
  aboutDescription: {
    fontSize: 16,
    color: '#6B7280',
    lineHeight: 24,
    marginBottom: 24,
  },
  aboutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  aboutStat: {
    alignItems: 'center',
  },
  aboutStatValue: {
    fontSize: 24,
    fontWeight: '800',
    color: '#F97316',
    marginBottom: 4,
  },
  aboutStatLabel: {
    fontSize: 12,
    color: '#6B7280',
  },
  socialSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  socialLinks: {
    flexDirection: 'row',
    gap: 12,
  },
  socialButton: {
    flex: 1,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 1,
  },
  socialButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#374151',
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 32,
  },
  versionText: {
    fontSize: 14,
    color: '#9CA3AF',
    marginBottom: 4,
  },
  versionSubtext: {
    fontSize: 12,
    color: '#D1D5DB',
  },
});