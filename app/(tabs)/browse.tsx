import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin, Clock, Star, Coffee, Printer, Heart, ShoppingBag, Zap, TrendingUp } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { GlassCard } from '@/components/ui/GlassCard';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Typography } from '@/components/ui/Typography';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const categories = [
    { id: 'All', name: 'All', icon: null, count: 24, color: '#667eea' },
    { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} color="#f97316" />, count: 8, color: '#f97316' },
    { id: 'Printing', name: 'Print', icon: <Printer size={16} color="#3b82f6" />, count: 5, color: '#3b82f6' },
    { id: 'Pet Care', name: 'Pets', icon: <Heart size={16} color="#ef4444" />, count: 3, color: '#ef4444' },
    { id: 'Food', name: 'Food', icon: <ShoppingBag size={16} color="#10b981" />, count: 6, color: '#10b981' },
    { id: 'Shopping', name: 'Shop', icon: <ShoppingBag size={16} color="#8b5cf6" />, count: 2, color: '#8b5cf6' },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Starbucks Coffee Run',
      description: 'Need a venti iced coffee with oat milk from Starbucks at Reitz Union. Will tip well for quick service!',
      category: 'Coffee',
      price: 12,
      time: '15 min',
      location: 'Reitz Union',
      rating: 4.8,
      reviews: 24,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: true,
      distance: '0.2 mi',
      poster: {
        name: 'Sarah M.',
        rating: 4.9,
        image: 'https://images.pexels.com/photos/1239291/pexels-photo-1239291.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 2,
      title: 'Print Assignment',
      description: 'Print 20 pages double-sided and deliver to Turlington Plaza. PDF will be shared via email.',
      category: 'Printing',
      price: 8,
      time: '20 min',
      location: 'Library West',
      rating: 4.9,
      reviews: 18,
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      distance: '0.5 mi',
      poster: {
        name: 'Mike R.',
        rating: 5.0,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 3,
      title: 'Dog Walking',
      description: 'Walk my golden retriever for 30 minutes around campus area. Very friendly and well-behaved.',
      category: 'Pet Care',
      price: 20,
      time: '45 min',
      location: 'Campus Area',
      rating: 5.0,
      reviews: 12,
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      distance: '0.8 mi',
      poster: {
        name: 'Emma K.',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1130626/pexels-photo-1130626.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 4,
      title: 'Chipotle Pickup',
      description: 'Pick up my mobile order from Chipotle and deliver to Beaty Towers. Order already paid for.',
      category: 'Food',
      price: 15,
      time: '25 min',
      location: 'Midtown',
      rating: 4.7,
      reviews: 31,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: true,
      distance: '1.2 mi',
      poster: {
        name: 'Alex J.',
        rating: 4.6,
        image: 'https://images.pexels.com/photos/1043471/pexels-photo-1043471.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Premium Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View style={[styles.headerContent, { opacity: fadeAnim }]}>
          <View style={styles.headerTop}>
            <HustlLogo size={32} />
            <View style={styles.headerText}>
              <Typography variant="h2" color="#ffffff">Browse Tasks</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Find your next gig
              </Typography>
            </View>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          {/* Live Stats */}
          <GlassCard style={styles.liveStats}>
            <View style={styles.liveStatsContent}>
              <View style={styles.liveStat}>
                <TrendingUp size={16} color="#10b981" />
                <Typography variant="caption" color="#ffffff">24 Active</Typography>
              </View>
              <View style={styles.liveStat}>
                <Clock size={16} color="#f97316" />
                <Typography variant="caption" color="#ffffff">Avg 8min</Typography>
              </View>
              <View style={styles.liveStat}>
                <Star size={16} color="#ffd89b" />
                <Typography variant="caption" color="#ffffff">4.9★ Rating</Typography>
              </View>
            </View>
          </GlassCard>
        </Animated.View>
      </LinearGradient>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Search tasks, locations, or keywords..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={20} color="#718096" />}
          containerStyle={styles.searchContainer}
        />
      </View>

      {/* Categories */}
      <View style={styles.categoriesSection}>
        <ScrollView 
          horizontal 
          showsHorizontalScrollIndicator={false} 
          contentContainerStyle={styles.categoriesContent}
        >
          {categories.map((category) => (
            <TouchableOpacity
              key={category.id}
              style={[
                styles.categoryChip,
                selectedCategory === category.id && [
                  styles.categoryChipActive,
                  { backgroundColor: category.color }
                ]
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <Typography 
                variant="body2" 
                color={selectedCategory === category.id ? "#ffffff" : "#4a5568"}
                style={styles.categoryText}
              >
                {category.name}
              </Typography>
              <Badge 
                variant={selectedCategory === category.id ? "default" : "default"} 
                size="sm"
                style={[
                  styles.categoryBadge,
                  selectedCategory === category.id && { backgroundColor: 'rgba(255,255,255,0.2)' }
                ]}
              >
                <Typography 
                  variant="caption" 
                  color={selectedCategory === category.id ? "#ffffff" : "#718096"}
                >
                  {category.count}
                </Typography>
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tasks Header */}
      <View style={styles.tasksHeader}>
        <Typography variant="h4">{filteredTasks.length} tasks available</Typography>
        <TouchableOpacity style={styles.sortContainer}>
          <Typography variant="body2" color="#667eea">Nearest first</Typography>
        </TouchableOpacity>
      </View>

      {/* Tasks List */}
      <FlatList
        data={filteredTasks}
        renderItem={({ item }) => <TaskCard task={item} />}
        keyExtractor={(item) => item.id.toString()}
        contentContainerStyle={styles.tasksList}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
}

function TaskCard({ task }: { task: any }) {
  return (
    <ModernCard style={styles.taskCard} onPress={() => {}}>
      <View style={styles.taskHeader}>
        {task.urgent && (
          <Badge variant="error" size="sm" style={styles.urgentBadge}>
            <Zap size={12} color="#dc2626" />
            <Typography variant="caption" color="#dc2626">Urgent</Typography>
          </Badge>
        )}
        
        <View style={styles.categoryBadge}>
          {task.category === 'Coffee' && <Coffee size={14} color="#f97316" />}
          {task.category === 'Printing' && <Printer size={14} color="#3b82f6" />}
          {task.category === 'Pet Care' && <Heart size={14} color="#ef4444" />}
          {task.category === 'Food' && <ShoppingBag size={14} color="#10b981" />}
          <Typography variant="caption" style={styles.categoryText}>{task.category}</Typography>
        </View>
        
        <Typography variant="h3" color="#667eea">${task.price}</Typography>
      </View>
      
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <Typography variant="h4" style={styles.taskTitle}>{task.title}</Typography>
        <Typography variant="body2" numberOfLines={2} style={styles.taskDescription}>
          {task.description}
        </Typography>
        
        <View style={styles.taskMeta}>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#718096" />
            <Typography variant="body2" color="#718096">{task.location}</Typography>
            <Typography variant="body2" color="#667eea">• {task.distance}</Typography>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#718096" />
            <Typography variant="body2" color="#718096">{task.time}</Typography>
          </View>
        </View>
        
        <View style={styles.posterSection}>
          <Image source={{ uri: task.poster.image }} style={styles.posterImage} />
          <View style={styles.posterInfo}>
            <Typography variant="body2">{task.poster.name}</Typography>
            <View style={styles.posterRating}>
              <Star size={12} color="#f59e0b" fill="#f59e0b" />
              <Typography variant="caption" color="#718096">{task.poster.rating}</Typography>
            </View>
          </View>
          
          <AnimatedButton
            title="Accept"
            onPress={() => {}}
            variant="primary"
            size="sm"
            gradient
            gradientColors={['#667eea', '#764ba2']}
            style={styles.acceptButton}
          />
        </View>
      </View>
    </ModernCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f8fafc',
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
    marginBottom: 24,
  },
  headerText: {
    flex: 1,
  },
  filterButton: {
    padding: 12,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 12,
  },
  liveStats: {
    marginTop: 16,
  },
  liveStatsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  liveStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#ffffff',
  },
  searchContainer: {
    marginBottom: 0,
  },
  categoriesSection: {
    backgroundColor: '#ffffff',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#f3f4f6',
  },
  categoriesContent: {
    paddingHorizontal: 24,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderRadius: 20,
    backgroundColor: '#f3f4f6',
    gap: 8,
  },
  categoryChipActive: {
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 4,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
  },
  categoryBadge: {
    marginLeft: 4,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  tasksList: {
    paddingHorizontal: 24,
    paddingBottom: 40,
  },
  taskCard: {
    marginBottom: 20,
    padding: 0,
    overflow: 'hidden',
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  urgentBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f3f4f6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    flex: 1,
  },
  taskImage: {
    width: '100%',
    height: 160,
  },
  taskContent: {
    padding: 20,
  },
  taskTitle: {
    marginBottom: 8,
  },
  taskDescription: {
    marginBottom: 16,
    lineHeight: 20,
  },
  taskMeta: {
    gap: 12,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
  },
  posterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  posterImage: {
    width: 40,
    height: 40,
    borderRadius: 20,
  },
  posterInfo: {
    flex: 1,
  },
  posterRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
    marginTop: 2,
  },
  acceptButton: {
    paddingHorizontal: 20,
  },
});