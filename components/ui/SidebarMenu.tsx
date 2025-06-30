import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { X, Chrome as Home, Search, Plus, MessageCircle, Wallet, User, Settings, CircleHelp as HelpCircle, LogOut } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { Typography } from './Typography';
import { Badge } from './Badge';

const { width } = Dimensions.get('window');

interface SidebarMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navigation: any;
  currentRoute: string;
}

export function SidebarMenu({ isOpen, onClose, navigation, currentRoute }: SidebarMenuProps) {
  const slideAnim = useRef(new Animated.Value(-width)).current;
  const overlayAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isOpen) {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: 0,
          duration: 300,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 1,
          duration: 300,
          useNativeDriver: true,
        }),
      ]).start();
    } else {
      Animated.parallel([
        Animated.timing(slideAnim, {
          toValue: -width,
          duration: 250,
          useNativeDriver: true,
        }),
        Animated.timing(overlayAnim, {
          toValue: 0,
          duration: 250,
          useNativeDriver: true,
        }),
      ]).start();
    }
  }, [isOpen]);

  const menuItems = [
    { id: 'index', name: 'Home', icon: Home, route: 'index' },
    { id: 'browse', name: 'Browse Tasks', icon: Search, route: 'browse' },
    { id: 'post', name: 'Post Task', icon: Plus, route: 'post' },
    { id: 'messages', name: 'Messages', icon: MessageCircle, route: 'messages', badge: 3 },
    { id: 'wallet', name: 'Wallet', icon: Wallet, route: 'wallet' },
    { id: 'profile', name: 'Profile', icon: User, route: 'profile' },
  ];

  const bottomItems = [
    { id: 'settings', name: 'Settings', icon: Settings },
    { id: 'help', name: 'Help & Support', icon: HelpCircle },
    { id: 'logout', name: 'Sign Out', icon: LogOut },
  ];

  const handleNavigation = (route: string) => {
    try {
      navigation.push(route);
      onClose();
    } catch (error) {
      console.log('Navigation error:', error);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <>
      <StatusBar style="light" />
      
      {/* Overlay */}
      <Animated.View 
        style={[styles.overlay, { opacity: overlayAnim }]}
      >
        <TouchableOpacity 
          style={styles.overlayTouch} 
          onPress={onClose}
          activeOpacity={1}
        />
      </Animated.View>

      {/* Sidebar */}
      <Animated.View 
        style={[
          styles.sidebar,
          { transform: [{ translateX: slideAnim }] }
        ]}
      >
        <LinearGradient
          colors={['#0038FF', '#0021A5']}
          style={styles.sidebarGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />

        {/* Header */}
        <View style={styles.header}>
          <View style={styles.headerTop}>
            <HustlLogo size={32} />
            <TouchableOpacity onPress={onClose} style={styles.closeButton}>
              <X size={24} color="#ffffff" strokeWidth={1.5} />
            </TouchableOpacity>
          </View>
          
          <View style={styles.userInfo}>
            <Typography variant="h3" color="#ffffff">Alex Johnson</Typography>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              alex.johnson@ufl.edu
            </Typography>
            <Badge variant="secondary" size="sm" style={styles.verifiedBadge}>
              <Typography variant="caption" color="#FFFFFF">Verified Student</Typography>
            </Badge>
          </View>
        </View>

        {/* Main Menu */}
        <View style={styles.menuSection}>
          <Typography variant="caption" color="rgba(255,255,255,0.6)" style={styles.sectionTitle}>
            MAIN MENU
          </Typography>
          
          {menuItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={currentRoute === item.id}
              onPress={() => handleNavigation(item.route)}
            />
          ))}
        </View>

        {/* Bottom Menu */}
        <View style={styles.bottomSection}>
          <Typography variant="caption" color="rgba(255,255,255,0.6)" style={styles.sectionTitle}>
            ACCOUNT
          </Typography>
          
          {bottomItems.map((item) => (
            <MenuItem
              key={item.id}
              item={item}
              isActive={false}
              onPress={() => {}}
            />
          ))}
        </View>

        {/* App Version */}
        <View style={styles.footer}>
          <Typography variant="caption" color="rgba(255,255,255,0.5)">
            Hustl v1.2.0
          </Typography>
        </View>
      </Animated.View>
    </>
  );
}

function MenuItem({ item, isActive, onPress }: {
  item: any;
  isActive: boolean;
  onPress: () => void;
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={[styles.menuItem, isActive && styles.activeMenuItem]}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.menuItemContent}>
          <item.icon 
            size={20} 
            color={isActive ? "#ffffff" : "rgba(255,255,255,0.8)"} 
            strokeWidth={1.5}
          />
          <Typography 
            variant="body2" 
            color={isActive ? "#ffffff" : "rgba(255,255,255,0.8)"}
            style={styles.menuItemText}
          >
            {item.name}
          </Typography>
          {item.badge && (
            <Badge variant="secondary" size="sm" style={styles.menuBadge}>
              <Typography variant="caption" color="#FFFFFF">{item.badge}</Typography>
            </Badge>
          )}
        </View>
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    zIndex: 1000,
  },
  overlayTouch: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.85,
    maxWidth: 320,
    zIndex: 1001,
    overflow: 'hidden',
  },
  sidebarGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  header: {
    paddingTop: 60,
    paddingHorizontal: 24,
    paddingBottom: 32,
    borderBottomWidth: 1,
    borderBottomColor: 'rgba(255,255,255,0.1)',
  },
  headerTop: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  closeButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.1)',
    borderRadius: 12,
  },
  userInfo: {
    gap: 4,
  },
  verifiedBadge: {
    alignSelf: 'flex-start',
    marginTop: 8,
  },
  menuSection: {
    flex: 1,
    paddingTop: 24,
    paddingHorizontal: 24,
  },
  bottomSection: {
    paddingHorizontal: 24,
    paddingBottom: 24,
    borderTopWidth: 1,
    borderTopColor: 'rgba(255,255,255,0.1)',
    paddingTop: 24,
  },
  sectionTitle: {
    marginBottom: 16,
    fontWeight: '600',
    letterSpacing: 1,
  },
  menuItem: {
    marginBottom: 4,
    borderRadius: 16,
    overflow: 'hidden',
  },
  activeMenuItem: {
    backgroundColor: 'rgba(255,255,255,0.15)',
  },
  menuItemContent: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
    gap: 16,
  },
  menuItemText: {
    flex: 1,
    fontWeight: '500',
  },
  menuBadge: {
    marginLeft: 'auto',
  },
  footer: {
    paddingHorizontal: 24,
    paddingBottom: 32,
    alignItems: 'center',
  },
});