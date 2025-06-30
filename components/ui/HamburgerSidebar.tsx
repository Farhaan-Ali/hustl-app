import React, { useRef, useEffect } from 'react';
import { View, StyleSheet, TouchableOpacity, Animated, Dimensions, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { X, User, Wallet, MessageCircle, Bell, Settings, MoveHorizontal as MoreHorizontal, Search, Plus, Chrome as Home } from 'lucide-react-native';
import { router } from 'expo-router';
import { Typography } from './Typography';
import { Badge } from './Badge';
import { HustlLogo } from '../HustlLogo';

const { width } = Dimensions.get('window');

interface HamburgerSidebarProps {
  isOpen: boolean;
  onClose: () => void;
}

export function HamburgerSidebar({ isOpen, onClose }: HamburgerSidebarProps) {
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
    {
      id: 'home',
      title: 'Home',
      icon: <HustlLogo size={20} clickable={false} />,
      route: '/(tabs)/',
      badge: null,
    },
    {
      id: 'browse',
      title: 'Browse Tasks',
      icon: <Search size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/browse',
      badge: null,
    },
    {
      id: 'post',
      title: 'Post Task',
      icon: <Plus size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/post',
      badge: null,
    },
    {
      id: 'profile',
      title: 'Profile',
      icon: <User size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/profile',
      badge: null,
    },
    {
      id: 'wallet',
      title: 'Wallet',
      icon: <Wallet size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/wallet',
      badge: null,
    },
    {
      id: 'messages',
      title: 'Messages',
      icon: <MessageCircle size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/messages',
      badge: 3,
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: <Bell size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/notifications',
      badge: 5,
    },
    {
      id: 'more',
      title: 'More',
      icon: <MoreHorizontal size={20} color="rgba(0, 30, 60, 0.8)" />,
      route: '/(tabs)/more',
      badge: null,
    },
  ];

  const handleItemPress = (route: string) => {
    try {
      router.push(route as any);
      onClose();
    } catch (error) {
      console.log('Navigation error:', error);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <View style={styles.container}>
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
          colors={['rgba(255, 255, 255, 0.95)', 'rgba(248, 250, 252, 0.98)']}
          style={styles.sidebarContent}
        />

        <View style={styles.content}>
          {/* Header */}
          <View style={styles.header}>
            <View style={styles.headerLeft}>
              <Typography variant="h3" style={styles.headerTitle}>Navigation</Typography>
              <Typography variant="caption" color="rgba(0, 30, 60, 0.6)">
                All app sections
              </Typography>
            </View>
            <TouchableOpacity 
              style={styles.closeButton}
              onPress={onClose}
            >
              <X size={18} color="rgba(0, 30, 60, 0.7)" />
            </TouchableOpacity>
          </View>

          {/* Menu Items */}
          <View style={styles.menuItems}>
            {menuItems.map((item, index) => (
              <MenuItem
                key={item.id}
                item={item}
                onPress={() => handleItemPress(item.route)}
                index={index}
              />
            ))}
          </View>

          {/* Footer */}
          <View style={styles.footer}>
            <TouchableOpacity style={styles.settingsButton}>
              <Settings size={16} color="rgba(0, 30, 60, 0.6)" />
              <Typography variant="caption" color="rgba(0, 30, 60, 0.6)">
                Settings
              </Typography>
            </TouchableOpacity>
          </View>
        </View>
      </Animated.View>
    </View>
  );
}

function MenuItem({ item, onPress, index }: { 
  item: any; 
  onPress: () => void; 
  index: number;
}) {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 300,
      delay: index * 50,
      useNativeDriver: true,
    }).start();
  }, []);

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      tension: 400,
      friction: 8,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 400,
      friction: 8,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  return (
    <Animated.View 
      style={[
        styles.menuItem,
        {
          opacity: fadeAnim,
          transform: [{ scale: scaleAnim }],
        }
      ]}
    >
      <TouchableOpacity
        style={styles.menuItemButton}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        <View style={styles.menuItemLeft}>
          <View style={styles.menuItemIcon}>
            {item.icon}
          </View>
          <Typography variant="body2" style={styles.menuItemText}>
            {item.title}
          </Typography>
        </View>
        
        {item.badge && (
          <Badge variant="secondary" size="sm">
            <Typography variant="caption" color="#FFFFFF">
              {item.badge}
            </Typography>
          </Badge>
        )}
      </TouchableOpacity>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    zIndex: 1500,
  },
  overlay: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0, 0, 0, 0.3)',
  },
  overlayTouch: {
    flex: 1,
  },
  sidebar: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    width: width * 0.75,
    maxWidth: 300,
  },
  sidebarContent: {
    flex: 1,
    borderTopRightRadius: 20,
    borderBottomRightRadius: 20,
    borderWidth: 1,
    borderLeftWidth: 0,
    borderColor: 'rgba(245, 247, 255, 0.8)',
    shadowColor: 'rgba(0, 33, 165, 0.15)',
    shadowOffset: { width: 4, height: 0 },
    shadowOpacity: 0.2,
    shadowRadius: 20,
    elevation: 15,
  },
  content: {
    flex: 1,
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    padding: 20,
    paddingTop: 60,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 32,
  },
  headerLeft: {
    flex: 1,
  },
  headerTitle: {
    fontWeight: '600',
    marginBottom: 4,
  },
  closeButton: {
    width: 36,
    height: 36,
    borderRadius: 18,
    backgroundColor: 'rgba(248, 250, 252, 0.8)',
    alignItems: 'center',
    justifyContent: 'center',
    marginLeft: 16,
    borderWidth: 1,
    borderColor: 'rgba(216, 221, 230, 0.3)',
  },
  menuItems: {
    flex: 1,
    gap: 6,
  },
  menuItem: {
    marginBottom: 4,
  },
  menuItemButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 14,
    paddingHorizontal: 16,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 255, 255, 0.7)',
    borderWidth: 1,
    borderColor: 'rgba(245, 247, 255, 0.8)',
  },
  menuItemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  menuItemIcon: {
    width: 36,
    height: 36,
    borderRadius: 10,
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 14,
    borderWidth: 1,
    borderColor: 'rgba(216, 221, 230, 0.2)',
  },
  menuItemText: {
    fontWeight: '500',
  },
  footer: {
    paddingTop: 20,
    borderTopWidth: 1,
    borderTopColor: 'rgba(216, 221, 230, 0.3)',
  },
  settingsButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 10,
    paddingVertical: 12,
    paddingHorizontal: 16,
  },
});