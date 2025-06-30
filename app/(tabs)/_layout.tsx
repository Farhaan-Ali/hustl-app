import React, { useState } from 'react';
import { Tabs } from 'expo-router';
import { Search, Plus, User, MessageCircle, Wallet } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';
import { HamburgerSidebar } from '@/components/ui/HamburgerSidebar';
import { HamburgerButton } from '@/components/ui/HamburgerButton';

export default function TabLayout() {
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <>
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarStyle: {
            display: 'none', // Hide all tab bars
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
        <Tabs.Screen
          name="messages"
          options={{
            title: 'Messages',
            tabBarIcon: ({ size, color }) => (
              <MessageCircle size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="wallet"
          options={{
            title: 'Wallet',
            tabBarIcon: ({ size, color }) => (
              <Wallet size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="more"
          options={{
            title: 'More',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
        <Tabs.Screen
          name="notifications"
          options={{
            title: 'Notifications',
            tabBarIcon: ({ size, color }) => (
              <User size={size} color={color} />
            ),
          }}
        />
      </Tabs>

      {/* Hamburger Button - Integrated into page design */}
      <HamburgerButton 
        onPress={() => setSidebarOpen(true)}
        isOpen={sidebarOpen}
      />

      {/* Hamburger Sidebar */}
      <HamburgerSidebar
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
      />
    </>
  );
}