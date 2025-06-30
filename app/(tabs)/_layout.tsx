import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Search, Plus, User, MessageCircle, Wallet } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';
import { FloatingActionDock } from '@/components/ui/FloatingActionDock';
import { HamburgerSidebar } from '@/components/ui/HamburgerSidebar';
import { HamburgerButton } from '@/components/ui/HamburgerButton';
import { View, StyleSheet } from 'react-native';

export default function TabLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Tabs
        tabBar={(props) => <FloatingActionDock {...props} />}
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: '#FFFFFF',
          tabBarInactiveTintColor: '#001E3C',
          tabBarStyle: {
            display: 'none', // Hide default tab bar since we're using custom floating dock
          },
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ size, color }) => (
              <HustlLogo size={size} />
            ),
          }}
        />
        <Tabs.Screen
          name="browse"
          options={{
            title: 'Browse',
            tabBarIcon: ({ size, color }) => (
              <Search size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="post"
          options={{
            title: 'Post',
            tabBarIcon: ({ size, color }) => (
              <Plus size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
        {/* Hidden tabs - accessible via sidebar */}
        <Tabs.Screen
          name="messages"
          options={{
            href: null, // Hide from tab bar
            title: 'Messages',
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            href: null, // Hide from tab bar
            title: 'Wallet',
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            href: null, // Hide from tab bar
            title: 'More',
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            href: null, // Hide from tab bar
            title: 'Notifications',
          }}
        />
      </Tabs>

      {/* Hamburger Button */}
      <View style={styles.hamburgerContainer}>
        <HamburgerButton 
          onPress={() => setSidebarOpen(true)}
          isOpen={sidebarOpen}
        />
      </View>

      {/* Hamburger Sidebar */}
      <HamburgerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={null} // Will be passed from parent if needed
      />
    </>
  );
}

const styles = StyleSheet.create({
  hamburgerContainer: {
    position: 'absolute',
    top: 60,
    left: 20,
    zIndex: 1500,
  },
});