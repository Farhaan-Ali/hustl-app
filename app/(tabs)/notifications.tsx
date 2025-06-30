import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Animated, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Bell, Settings, Filter, CheckCircle2 } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { NotificationCard } from '@/components/ui/NotificationCard';

export default function NotificationsScreen() {
  const [filter, setFilter] = useState('all');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const notifications = [
    {
      id: '1',
      type: 'task' as const,
      title: 'Task Completed!',
      message: 'Sarah completed your coffee run. Payment has been processed.',
      time: '5 min ago',
      read: false,
      avatar: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100',
      actionRequired: false
    },
    {
      id: '2',
      type: 'message' as const,
      title: 'New Message',
      message: 'Mike: "Thanks for the quick delivery! Great service."',
      time: '1 hour ago',
      read: false,
      avatar: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100',
      actionRequired: false
    },
    {
      id: '3',
      type: 'payment' as const,
      title: 'Payment Received',
      message: 'You earned $12.00 from your recent coffee run task.',
      time: '2 hours ago',
      read: true,
      actionRequired: false
    },
    {
      id: '4',
      type: 'task' as const,
      title: 'Task Request',
      message: 'Emma wants you to pick up her Chipotle order. Accept before 3 PM.',
      time: '3 hours ago',
      read: false,
      avatar: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100',
      actionRequired: true
    },
    {
      id: '5',
      type: 'system' as const,
      title: 'Profile Update',
      message: 'Your profile verification has been approved. You can now accept premium tasks.',
      time: '1 day ago',
      read: true,
      actionRequired: false
    },
    {
      id: '6',
      type: 'payment' as const,
      title: 'Weekly Summary',
      message: 'You earned $85.00 this week from 7 completed tasks. Great work!',
      time: '2 days ago',
      read: true,
      actionRequired: false
    }
  ];

  const filters = [
    { id: 'all', name: 'All', count: notifications.length },
    { id: 'unread', name: 'Unread', count: notifications.filter(n => !n.read).length },
    { id: 'task', name: 'Tasks', count: notifications.filter(n => n.type === 'task').length },
    { id: 'message', name: 'Messages', count: notifications.filter(n => n.type === 'message').length },
    { id: 'payment', name: 'Payments', count: notifications.filter(n => n.type === 'payment').length }
  ];

  const filteredNotifications = notifications.filter(notification => {
    switch (filter) {
      case 'unread':
        return !notification.read;
      case 'task':
      case 'message':
      case 'payment':
        return notification.type === filter;
      default:
        return true;
    }
  });

  const unreadCount = notifications.filter(n => !n.read).length;

  const markAsRead = (id: string) => {
    // Handle mark as read logic
  };

  const markAllAsRead = () => {
    // Handle mark all as read logic
  };

  return (
    <View style={styles.container}>
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
            <Typography variant="h2" color="#ffffff">Notifications</Typography>
            <View style={styles.headerActions}>
              {unreadCount > 0 && (
                <Badge variant="secondary" size="sm" style={styles.unreadBadge}>
                  <Typography variant="caption" color="#FFFFFF">{unreadCount}</Typography>
                </Badge>
              )}
              <TouchableOpacity style={styles.settingsButton}>
                <Settings size={20} color="#ffffff" />
              </TouchableOpacity>
            </View>
          </View>

          <View style={styles.headerStats}>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              {unreadCount > 0 ? `${unreadCount} unread notifications` : 'All caught up!'}
            </Typography>
            {unreadCount > 0 && (
              <TouchableOpacity onPress={markAllAsRead} style={styles.markAllButton}>
                <CheckCircle2 size={16} color="rgba(255,255,255,0.8)" />
                <Typography variant="body2" color="rgba(255,255,255,0.8)">Mark all read</Typography>
              </TouchableOpacity>
            )}
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Filters */}
      <Animated.View style={[styles.filtersSection, { opacity: fadeAnim }]}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={styles.filtersContent}
        >
          {filters.map((filterItem) => (
            <TouchableOpacity
              key={filterItem.id}
              style={[
                styles.filterChip,
                filter === filterItem.id && styles.filterChipActive
              ]}
              onPress={() => setFilter(filterItem.id)}
            >
              <Typography 
                variant="body2" 
                color={filter === filterItem.id ? "#ffffff" : "#001E3C"}
              >
                {filterItem.name}
              </Typography>
              <Badge 
                variant={filter === filterItem.id ? "default" : "default"} 
                size="sm"
                style={[
                  styles.filterBadge,
                  filter === filterItem.id && styles.filterBadgeActive
                ]}
              >
                <Typography 
                  variant="caption"
                  color={filter === filterItem.id ? "#001E3C" : "#001E3C"}
                >
                  {filterItem.count}
                </Typography>
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </Animated.View>

      {/* Notifications List */}
      <Animated.View style={[styles.notificationsSection, { opacity: fadeAnim }]}>
        {filteredNotifications.length > 0 ? (
          <FlatList
            data={filteredNotifications}
            renderItem={({ item }) => (
              <NotificationCard
                notification={item}
                onPress={() => {}}
                onMarkAsRead={() => markAsRead(item.id)}
              />
            )}
            keyExtractor={(item) => item.id}
            contentContainerStyle={styles.notificationsList}
            showsVerticalScrollIndicator={false}
          />
        ) : (
          <View style={styles.emptyState}>
            <Bell size={48} color="#D8DDE6" />
            <Typography variant="h4" color="#D8DDE6" style={styles.emptyTitle}>
              No notifications
            </Typography>
            <Typography variant="body2" color="#D8DDE6" style={styles.emptyMessage}>
              {filter === 'all' 
                ? "You're all caught up! New notifications will appear here."
                : `No ${filter} notifications at the moment.`
              }
            </Typography>
          </View>
        )}
      </Animated.View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 24,
  },
  headerContent: {
    flex: 1,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
    marginBottom: 12,
  },
  headerActions: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginLeft: 'auto',
  },
  unreadBadge: {
    backgroundColor: '#E6501E',
  },
  settingsButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
  },
  headerStats: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  markAllButton: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    padding: 8,
  },
  filtersSection: {
    backgroundColor: '#FFFFFF',
    paddingVertical: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8DDE6',
  },
  filtersContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  filterChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#D8DDE6',
    gap: 8,
  },
  filterChipActive: {
    backgroundColor: '#0021A5',
  },
  filterBadge: {
    backgroundColor: '#FFFFFF',
  },
  filterBadgeActive: {
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  notificationsSection: {
    flex: 1,
  },
  notificationsList: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 40,
  },
  emptyState: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 40,
  },
  emptyTitle: {
    marginTop: 16,
    marginBottom: 8,
  },
  emptyMessage: {
    textAlign: 'center',
    lineHeight: 20,
  },
});