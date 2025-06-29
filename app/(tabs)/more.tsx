import React, { useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { CircleHelp as HelpCircle, Shield, FileText, Star, MessageCircle, Globe, Bell, CreditCard, Users, Award, ChevronRight, Sparkles, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Typography } from '@/components/ui/Typography';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function MoreScreen() {
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

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Premium Header */}
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
          <View style={styles.headerTop}>
            <HustlLogo size={32} />
            <Typography variant="h2" color="#ffffff">More</Typography>
          </View>
          <Typography variant="body2" color="rgba(255,255,255,0.8)">
            Settings, help, and information
          </Typography>
        </Animated.View>
      </LinearGradient>

      {/* Community Stats */}
      <Animated.View 
        style={[
          styles.statsSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <GlassCard style={styles.statsCard} gradient gradientColors={['rgba(255,255,255,0.95)', 'rgba(248,250,252,0.9)']}>
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Users size={24} color="#667eea" />
              <View style={styles.statContent}>
                <Typography variant="h3">12,000+</Typography>
                <Typography variant="body2" color="#718096">Active Students</Typography>
              </View>
            </View>
            <View style={styles.statItem}>
              <Award size={24} color="#f093fb" />
              <View style={styles.statContent}>
                <Typography variant="h3">50,000+</Typography>
                <Typography variant="body2" color="#718096">Tasks Completed</Typography>
              </View>
            </View>
            <View style={styles.statItem}>
              <TrendingUp size={24} color="#10b981" />
              <View style={styles.statContent}>
                <Typography variant="h3">4.9★</Typography>
                <Typography variant="body2" color="#718096">Average Rating</Typography>
              </View>
            </View>
          </View>
        </GlassCard>
      </Animated.View>

      {/* Account Section */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Account</Typography>
        <ModernCard style={styles.menuList}>
          <MenuItem
            icon={<Bell size={20} color="#f97316" />}
            title="Notifications"
            subtitle="Push notifications, email alerts"
            onPress={() => {}}
            gradient={['#fff7ed', '#fed7aa']}
          />
          <MenuItem
            icon={<CreditCard size={20} color="#3b82f6" />}
            title="Payment Methods"
            subtitle="Manage cards and bank accounts"
            onPress={() => {}}
            gradient={['#eff6ff', '#dbeafe']}
          />
          <MenuItem
            icon={<Globe size={20} color="#10b981" />}
            title="Language & Region"
            subtitle="English (US)"
            onPress={() => {}}
            gradient={['#ecfdf5', '#a7f3d0']}
          />
        </ModernCard>
      </Animated.View>

      {/* Support Section */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Support</Typography>
        <ModernCard style={styles.menuList}>
          <MenuItem
            icon={<HelpCircle size={20} color="#8b5cf6" />}
            title="Help Center"
            subtitle="FAQs and troubleshooting"
            onPress={() => {}}
            gradient={['#f3f4f6', '#e5e7eb']}
          />
          <MenuItem
            icon={<MessageCircle size={20} color="#f093fb" />}
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => {}}
            gradient={['#fdf2f8', '#fce7f3']}
          />
          <MenuItem
            icon={<Star size={20} color="#ffd89b" />}
            title="Rate Hustl"
            subtitle="Share your feedback"
            onPress={() => handleLinkPress('https://apps.apple.com')}
            gradient={['#fffbeb', '#fde68a']}
          />
        </ModernCard>
      </Animated.View>

      {/* Legal Section */}
      <Animated.View 
        style={[
          styles.section,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Legal</Typography>
        <ModernCard style={styles.menuList}>
          <MenuItem
            icon={<FileText size={20} color="#718096" />}
            title="Terms of Service"
            subtitle="User agreement and terms"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Shield size={20} color="#718096" />}
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => {}}
          />
          <MenuItem
            icon={<FileText size={20} color="#718096" />}
            title="Community Guidelines"
            subtitle="Rules and best practices"
            onPress={() => {}}
          />
        </ModernCard>
      </Animated.View>

      {/* About Section */}
      <Animated.View 
        style={[
          styles.aboutSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <GlassCard style={styles.aboutCard} gradient gradientColors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.05)']}>
          <View style={styles.aboutHeader}>
            <HustlLogo size={40} />
            <Typography variant="h3" style={styles.aboutTitle}>About Hustl</Typography>
          </View>
          <Typography variant="body1" style={styles.aboutDescription}>
            Hustl connects University of Florida students for quick campus errands and tasks. 
            From coffee runs to printing services, we make campus life easier for everyone.
          </Typography>
          
          <View style={styles.aboutStats}>
            <View style={styles.aboutStat}>
              <Typography variant="h2" color="#667eea">4.9</Typography>
              <Typography variant="body2" color="#718096">App Rating</Typography>
            </View>
            <View style={styles.aboutStat}>
              <Typography variant="h2" color="#f093fb">2023</Typography>
              <Typography variant="body2" color="#718096">Founded</Typography>
            </View>
            <View style={styles.aboutStat}>
              <Typography variant="h2" color="#ffd89b">UF</Typography>
              <Typography variant="body2" color="#718096">Campus</Typography>
            </View>
          </View>
        </GlassCard>
      </Animated.View>

      {/* Social Links */}
      <Animated.View 
        style={[
          styles.socialSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="h3" style={styles.sectionTitle}>Connect With Us</Typography>
        <View style={styles.socialLinks}>
          <SocialButton 
            title="📱 Instagram"
            onPress={() => handleLinkPress('https://instagram.com/hustluf')}
            gradient={['#f093fb', '#f5576c']}
          />
          <SocialButton 
            title="🐦 Twitter"
            onPress={() => handleLinkPress('https://twitter.com/hustluf')}
            gradient={['#667eea', '#764ba2']}
          />
          <SocialButton 
            title="💬 Discord"
            onPress={() => handleLinkPress('https://discord.gg/hustluf')}
            gradient={['#8b5cf6', '#a855f7']}
          />
        </View>
      </Animated.View>

      {/* Premium CTA */}
      <Animated.View 
        style={[
          styles.premiumSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <GlassCard style={styles.premiumCard} gradient gradientColors={['rgba(240, 147, 251, 0.1)', 'rgba(102, 126, 234, 0.05)']}>
          <Sparkles size={32} color="#f093fb" style={styles.premiumIcon} />
          <Typography variant="h3" style={styles.premiumTitle}>Unlock Premium</Typography>
          <Typography variant="body2" style={styles.premiumDescription}>
            Get priority matching, advanced analytics, and exclusive campus perks
          </Typography>
          <AnimatedButton
            title="Upgrade Now"
            onPress={() => {}}
            variant="primary"
            size="lg"
            gradient
            gradientColors={['#f093fb', '#f5576c']}
            style={styles.premiumButton}
          />
        </GlassCard>
      </Animated.View>

      {/* App Version */}
      <Animated.View 
        style={[
          styles.versionSection,
          {
            opacity: fadeAnim,
            transform: [{ translateY: slideAnim }]
          }
        ]}
      >
        <Typography variant="body2" color="#a0aec0">Hustl v1.2.0</Typography>
        <Typography variant="caption" color="#d1d5db">Made with ❤️ for UF Gators</Typography>
      </Animated.View>
    </ScrollView>
  );
}

function MenuItem({ icon, title, subtitle, onPress, gradient }: {
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  onPress: () => void;
  gradient?: string[];
}) {
  return (
    <TouchableOpacity style={styles.menuItem} onPress={onPress}>
      <View style={[styles.menuIcon, gradient && { backgroundColor: 'transparent' }]}>
        {gradient ? (
          <LinearGradient colors={gradient} style={styles.menuIconGradient}>
            {icon}
          </LinearGradient>
        ) : (
          icon
        )}
      </View>
      <View style={styles.menuContent}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="#718096">{subtitle}</Typography>
      </View>
      <ChevronRight size={16} color="#d1d5db" />
    </TouchableOpacity>
  );
}

function SocialButton({ title, onPress, gradient }: {
  title: string;
  onPress: () => void;
  gradient: string[];
}) {
  return (
    <AnimatedButton
      title={title}
      onPress={onPress}
      variant="primary"
      size="md"
      gradient
      gradientColors={gradient}
      style={styles.socialButton}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 32,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
    gap: 12,
  },
  statsSection: {
    paddingHorizontal: 24,
    paddingVertical: 24,
    marginTop: -16,
  },
  statsCard: {
    marginBottom: 0,
  },
  statsGrid: {
    gap: 20,
  },
  statItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  statContent: {
    flex: 1,
  },
  section: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  sectionTitle: {
    marginBottom: 16,
  },
  menuList: {
    padding: 0,
    overflow: 'hidden',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  menuIcon: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
  },
  menuIconGradient: {
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  menuContent: {
    flex: 1,
  },
  aboutSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  aboutCard: {
    alignItems: 'center',
    padding: 32,
  },
  aboutHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    gap: 12,
  },
  aboutTitle: {
    marginBottom: 0,
  },
  aboutDescription: {
    textAlign: 'center',
    marginBottom: 24,
    lineHeight: 24,
  },
  aboutStats: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    width: '100%',
  },
  aboutStat: {
    alignItems: 'center',
  },
  socialSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  socialLinks: {
    gap: 12,
  },
  socialButton: {
    width: '100%',
  },
  premiumSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
  },
  premiumCard: {
    alignItems: 'center',
    padding: 32,
  },
  premiumIcon: {
    marginBottom: 16,
  },
  premiumTitle: {
    marginBottom: 8,
    textAlign: 'center',
  },
  premiumDescription: {
    marginBottom: 24,
    textAlign: 'center',
    color: '#718096',
  },
  premiumButton: {
    width: '100%',
  },
  versionSection: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 4,
  },
});