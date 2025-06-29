import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Linking, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { HelpCircle, Shield, FileText, Star, MessageCircle, Bell, CreditCard, ChevronRight, Users, Award, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { Typography } from '@/components/ui/Typography';
import { AnimatedButton } from '@/components/ui/AnimatedButton';

export default function MoreScreen() {
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const handleLinkPress = (url: string) => {
    Linking.openURL(url);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="light" />
      
      {/* Header */}
      <LinearGradient
        colors={['#0021A5', '#001E3C']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
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
      <Animated.View style={[styles.statsSection, { opacity: fadeAnim }]}>
        <ModernCard style={styles.statsCard} variant="accent">
          <View style={styles.statsGrid}>
            <View style={styles.statItem}>
              <Users size={24} color="#0021A5" />
              <View style={styles.statContent}>
                <Typography variant="h3">12,000+</Typography>
                <Typography variant="body2" color="#001E3C">Active Students</Typography>
              </View>
            </View>
            <View style={styles.statItem}>
              <Award size={24} color="#E6501E" />
              <View style={styles.statContent}>
                <Typography variant="h3">50,000+</Typography>
                <Typography variant="body2" color="#001E3C">Tasks Completed</Typography>
              </View>
            </View>
            <View style={styles.statItem}>
              <TrendingUp size={24} color="#E6501E" />
              <View style={styles.statContent}>
                <Typography variant="h3">4.9★</Typography>
                <Typography variant="body2" color="#001E3C">Average Rating</Typography>
              </View>
            </View>
          </View>
        </ModernCard>
      </Animated.View>

      {/* Account Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Typography variant="h3" style={styles.sectionTitle}>Account</Typography>
        <ModernCard style={styles.menuList}>
          <MenuItem
            icon={<Bell size={20} color="#E6501E" />}
            title="Notifications"
            subtitle="Push notifications, email alerts"
            onPress={() => {}}
          />
          <MenuItem
            icon={<CreditCard size={20} color="#0021A5" />}
            title="Payment Methods"
            subtitle="Manage cards and bank accounts"
            onPress={() => {}}
          />
        </ModernCard>
      </Animated.View>

      {/* Support Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Typography variant="h3" style={styles.sectionTitle}>Support</Typography>
        <ModernCard style={styles.menuList}>
          <MenuItem
            icon={<HelpCircle size={20} color="#0021A5" />}
            title="Help Center"
            subtitle="FAQs and troubleshooting"
            onPress={() => {}}
          />
          <MenuItem
            icon={<MessageCircle size={20} color="#E6501E" />}
            title="Contact Support"
            subtitle="Get help from our team"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Star size={20} color="#E6501E" />}
            title="Rate Hustl"
            subtitle="Share your feedback"
            onPress={() => handleLinkPress('https://apps.apple.com')}
          />
        </ModernCard>
      </Animated.View>

      {/* Legal Section */}
      <Animated.View style={[styles.section, { opacity: fadeAnim }]}>
        <Typography variant="h3" style={styles.sectionTitle}>Legal</Typography>
        <ModernCard style={styles.menuList}>
          <MenuItem
            icon={<FileText size={20} color="#001E3C" />}
            title="Terms of Service"
            subtitle="User agreement and terms"
            onPress={() => {}}
          />
          <MenuItem
            icon={<Shield size={20} color="#001E3C" />}
            title="Privacy Policy"
            subtitle="How we protect your data"
            onPress={() => {}}
          />
        </ModernCard>
      </Animated.View>

      {/* About Section */}
      <Animated.View style={[styles.aboutSection, { opacity: fadeAnim }]}>
        <ModernCard style={styles.aboutCard} variant="primary" gradient>
          <View style={styles.aboutHeader}>
            <HustlLogo size={40} />
            <Typography variant="h3" color="#FFFFFF" style={styles.aboutTitle}>About Hustl</Typography>
          </View>
          <Typography variant="body1" color="rgba(255,255,255,0.8)" style={styles.aboutDescription}>
            Hustl connects University of Florida students for quick campus errands and tasks. 
            From coffee runs to printing services, we make campus life easier for everyone.
          </Typography>
          
          <View style={styles.aboutStats}>
            <View style={styles.aboutStat}>
              <Typography variant="h2" color="#FFFFFF">4.9</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">App Rating</Typography>
            </View>
            <View style={styles.aboutStat}>
              <Typography variant="h2" color="#FFFFFF">2023</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">Founded</Typography>
            </View>
            <View style={styles.aboutStat}>
              <Typography variant="h2" color="#FFFFFF">UF</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">Campus</Typography>
            </View>
          </View>
        </ModernCard>
      </Animated.View>

      {/* Social Links */}
      <Animated.View style={[styles.socialSection, { opacity: fadeAnim }]}>
        <Typography variant="h3" style={styles.sectionTitle}>Connect With Us</Typography>
        <View style={styles.socialLinks}>
          <SocialButton 
            title="📱 Instagram"
            onPress={() => handleLinkPress('https://instagram.com/hustluf')}
            variant="secondary"
          />
          <SocialButton 
            title="🐦 Twitter"
            onPress={() => handleLinkPress('https://twitter.com/hustluf')}
            variant="primary"
          />
        </View>
      </Animated.View>

      {/* App Version */}
      <Animated.View style={[styles.versionSection, { opacity: fadeAnim }]}>
        <Typography variant="body2" color="#D8DDE6">Hustl v1.2.0</Typography>
        <Typography variant="caption" color="#D8DDE6">Made with ❤️ for UF Gators</Typography>
      </Animated.View>
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
      <View style={styles.menuIcon}>
        {icon}
      </View>
      <View style={styles.menuContent}>
        <Typography variant="h4">{title}</Typography>
        <Typography variant="body2" color="#001E3C">{subtitle}</Typography>
      </View>
      <ChevronRight size={16} color="#D8DDE6" />
    </TouchableOpacity>
  );
}

function SocialButton({ title, onPress, variant }: {
  title: string;
  onPress: () => void;
  variant: 'primary' | 'secondary';
}) {
  return (
    <AnimatedButton
      title={title}
      onPress={onPress}
      variant={variant}
      size="md"
      gradient
      style={styles.socialButton}
    />
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
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
    borderBottomColor: '#D8DDE6',
  },
  menuIcon: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#D8DDE6',
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
  versionSection: {
    alignItems: 'center',
    paddingVertical: 32,
    gap: 4,
  },
});