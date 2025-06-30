import React from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Bell, CircleCheck as CheckCircle, CircleAlert as AlertCircle, MessageCircle, DollarSign } from 'lucide-react-native';
import { ModernCard } from './ModernCard';
import { Typography } from './Typography';
import { Badge } from './Badge';

interface NotificationCardProps {
  notification: {
    id: string;
    type: 'task' | 'message' | 'payment' | 'system';
    title: string;
    message: string;
    time: string;
    read: boolean;
    avatar?: string;
    actionRequired?: boolean;
  };
  onPress?: () => void;
  onMarkAsRead?: () => void;
}

export function NotificationCard({ notification, onPress, onMarkAsRead }: NotificationCardProps) {
  const getIcon = () => {
    switch (notification.type) {
      case 'task':
        return <CheckCircle size={20} color="#E6501E" />;
      case 'message':
        return <MessageCircle size={20} color="#0021A5" />;
      case 'payment':
        return <DollarSign size={20} color="#E6501E" />;
      case 'system':
        return <AlertCircle size={20} color="#0021A5" />;
      default:
        return <Bell size={20} color="#001E3C" />;
    }
  };

  const getTypeColor = () => {
    switch (notification.type) {
      case 'task':
        return '#E6501E';
      case 'message':
        return '#0021A5';
      case 'payment':
        return '#E6501E';
      case 'system':
        return '#0021A5';
      default:
        return '#001E3C';
    }
  };

  return (
    <ModernCard 
      style={[styles.card, !notification.read && styles.unreadCard]} 
      onPress={onPress}
    >
      <View style={styles.content}>
        <View style={[styles.iconContainer, { backgroundColor: `${getTypeColor()}20` }]}>
          {notification.avatar ? (
            <Image source={{ uri: notification.avatar }} style={styles.avatar} />
          ) : (
            getIcon()
          )}
        </View>
        
        <View style={styles.textContent}>
          <View style={styles.header}>
            <Typography variant="h4" numberOfLines={1} style={styles.title}>
              {notification.title}
            </Typography>
            <Typography variant="caption" color="#D8DDE6">
              {notification.time}
            </Typography>
          </View>
          
          <Typography variant="body2" color="#001E3C" numberOfLines={2} style={styles.message}>
            {notification.message}
          </Typography>
          
          <View style={styles.footer}>
            {notification.actionRequired && (
              <Badge variant="secondary" size="sm">
                <Typography variant="caption" color="#FFFFFF">Action Required</Typography>
              </Badge>
            )}
            
            {!notification.read && (
              <TouchableOpacity onPress={onMarkAsRead} style={styles.markReadButton}>
                <Typography variant="caption" color="#0021A5">Mark as read</Typography>
              </TouchableOpacity>
            )}
          </View>
        </View>
        
        {!notification.read && <View style={styles.unreadDot} />}
      </View>
    </ModernCard>
  );
}

const styles = StyleSheet.create({
  card: {
    marginBottom: 12,
    padding: 16,
  },
  unreadCard: {
    borderLeftWidth: 4,
    borderLeftColor: '#E6501E',
  },
  content: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    position: 'relative',
  },
  iconContainer: {
    width: 40,
    height: 40,
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  avatar: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  textContent: {
    flex: 1,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  title: {
    flex: 1,
    marginRight: 8,
  },
  message: {
    marginBottom: 8,
    lineHeight: 20,
  },
  footer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  markReadButton: {
    padding: 4,
  },
  unreadDot: {
    position: 'absolute',
    top: 0,
    right: 0,
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#E6501E',
  },
});