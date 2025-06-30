import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin, Clock, Star, Coffee, Printer, Heart, ShoppingBag, Zap } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { PremiumCard } from '@/components/ui/PremiumCard';
import { PremiumInput } from '@/components/ui/PremiumInput';
import { Badge } from '@/components/ui/Badge';
import { GlowButton } from '@/components/ui/GlowButton';
import { Typography } from '@/components/ui/Typography';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scrollY = useRef(new Animated.Value(0)).current;
  const pulseAnim = useRef(new Animated.Value(1)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();

    // Pulse animation for live indicator
    Animated.loop(
      Animated.sequence([
        Animated.timing(pulseAnim, {
          toValue: 1.1,
          duration: 1500,
          useNativeDriver: true,
        }),
        Animated.timing(pulseAnim, {
          toValue: 1,
          duration: 1500,
          useNativeDriver: true,
        }),
      ])
    ).start();
  }, []);

  const categories = [
    { id: 'All', name: 'All', icon: null, count: 24, gradient: ['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)'] },
    { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} color="#FFFFFF" />, count: 8, gradient: ['rgba(255, 90, 31, 0.9)', 'rgba(230, 58, 11, 0.9)'] },
    { id: 'Printing', name: 'Print', icon: <Printer size={16} color="#FFFFFF" />, count: 5, gradient: ['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)'] },
    { id: 'Pet Care', name: 'Pets', icon: <Heart size={16} color="#FFFFFF" />, count: 3, gradient: ['rgba(255, 90, 31, 0.9)', 'rgba(230, 58, 11, 0.9)'] },
    { id: 'Shopping', name: 'Shop', icon: <ShoppingBag size={16} color="#FFFFFF" />, count: 6, gradient: ['rgba(0, 56, 255, 0.9)', 'rgba(0, 33, 165, 0.9)'] },
  ];

  const tasks = [
    {
      id: 1,
      title: 'Starbucks Coffee Run',
      description: 'Need a venti iced coffee with oat milk from Starbucks at Reitz Union.',
      category: 'Coffee',
      price: 12,
      time: '15 min',
      location: 'Reitz Union',
      rating: 4.8,
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
      description: 'Print 20 pages double-sided and deliver to Turlington Plaza.',
      category: 'Printing',
      price: 8,
      time: '20 min',
      location: 'Library West',
      rating: 4.9,
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      distance: '0.5 mi',
      poster: {
        name: 'Mike R.',
        rating: 5.0,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const headerOpacity = scrollY.interpolate({
    inputRange: [0, 100],
    outputRange: [1, 0.95],
    extrapolate: 'clamp',
  });

  return (
    <View style={styles.container}>
      <StatusBar style="light" />
      
      {/* Compact Header */}
      <Animated.View style={[styles.header, { opacity: headerOpacity }]}>
        <LinearGradient
          colors={['rgba(0, 56, 255, 0.95)', 'rgba(0, 33, 165, 0.95)']}
          style={styles.headerGradient}
          start={{ x: 0, y: 0 }}
          end={{ x: 1, y: 1 }}
        />
        
        <View style={styles.headerContent}>
          <View style={styles.headerTop}>
            <HustlLogo size={28} />
            <Typography variant="h3" color="#ffffff" style={styles.headerTitle}>Browse Tasks</Typography>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={18} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.liveStats}>
            <Animated.View style={[styles.liveIndicator, { transform: [{ scale: pulseAnim }] }]}>
              <Zap size={14} color="#FF5A1F" />
            </Animated.View>
            <Typography variant="caption" color="rgba(255,255,255,0.9)">
              24 active tasks • Avg 8min response
            </Typography>
          </View>
        </View>
      </Animated.View>

      <Animated.ScrollView
        style={styles.content}
        showsVerticalScrollIndicator={false}
        onScroll={Animated.event(
          [{ nativeEvent: { contentOffset: { y: scrollY } } }],
          { useNativeDriver: false }
        )}
        scrollEventThrottle={16}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search */}
        <View style={styles.searchSection}>
          <PremiumInput
            placeholder="Search tasks or locations..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            icon={<Search size={18} color="rgba(0, 56, 255, 0.7)" />}
            containerStyle={styles.searchContainer}
            gradient
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
              <CategoryChip
                key={category.id}
                category={category}
                isSelected={selectedCategory === category.id}
                onPress={() => setSelectedCategory(category.id)}
              />
            ))}
          </ScrollView>
        </View>

        {/* Tasks Header */}
        <View style={styles.tasksHeader}>
          <Typography variant="body2" style={styles.tasksHeaderText}>
            {filteredTasks.length} tasks available
          </Typography>
          <TouchableOpacity>
            <Typography variant="caption" color="rgba(0, 56, 255, 0.7)" style={styles.sortText}>Nearest first</Typography>
          </TouchableOpacity>
        </View>

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>

        {/* Bottom Spacing */}
        <View style={styles.bottomSpacing} />
      </Animated.ScrollView>
    </View>
  );
}

function CategoryChip({ category, isSelected, onPress }: { 
  category: any; 
  isSelected: boolean; 
  onPress: () => void; 
}) {
  const scaleAnim = useRef(new Animated.Value(1)).current;

  const handlePressIn = () => {
    Animated.spring(scaleAnim, {
      toValue: 0.96,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
  };

  const handlePressOut = () => {
    Animated.spring(scaleAnim, {
      toValue: 1,
      tension: 300,
      friction: 10,
      useNativeDriver: true,
    }).start();
    onPress();
  };

  if (isSelected) {
    return (
      <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
        <TouchableOpacity
          onPressIn={handlePressIn}
          onPressOut={handlePressOut}
          activeOpacity={1}
        >
          <LinearGradient
            colors={category.gradient}
            style={styles.categoryChipSelected}
            start={{ x: 0, y: 0 }}
            end={{ x: 1, y: 1 }}
          >
            {category.icon}
            <Typography variant="caption" color="#ffffff" style={styles.categoryText}>
              {category.name}
            </Typography>
            <Badge variant="default" size="sm" style={styles.categoryBadgeSelected}>
              <Typography variant="caption">{category.count}</Typography>
            </Badge>
          </LinearGradient>
        </TouchableOpacity>
      </Animated.View>
    );
  }

  return (
    <Animated.View style={{ transform: [{ scale: scaleAnim }] }}>
      <TouchableOpacity
        style={styles.categoryChip}
        onPressIn={handlePressIn}
        onPressOut={handlePressOut}
        activeOpacity={1}
      >
        {category.icon}
        <Typography variant="caption" color="rgba(0, 30, 60, 0.8)" style={styles.categoryText}>
          {category.name}
        </Typography>
        <Badge variant="default" size="sm" style={styles.categoryBadge}>
          <Typography variant="caption">{category.count}</Typography>
        </Badge>
      </TouchableOpacity>
    </Animated.View>
  );
}

function TaskCard({ task }: { task: any }) {
  return (
    <PremiumCard style={styles.taskCard} onPress={() => {}} glowEffect>
      <View style={styles.taskHeader}>
        {task.urgent && (
          <Badge variant="secondary" size="sm" style={styles.urgentBadge}>
            <View style={styles.urgentPulse} />
            <Typography variant="caption" color="#FFFFFF">Urgent</Typography>
          </Badge>
        )}
        
        <View style={styles.categoryBadgeTask}>
          {task.category === 'Coffee' && <Coffee size={14} color="#FF5A1F" />}
          {task.category === 'Printing' && <Printer size={14} color="#0038FF" />}
          <Typography variant="caption" style={styles.categoryTextTask}>{task.category}</Typography>
        </View>
        
        <Typography variant="h4" color="#0038FF" style={styles.priceText}>${task.price}</Typography>
      </View>
      
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      
      <LinearGradient
        colors={['transparent', 'rgba(0,0,0,0.2)']}
        style={styles.imageOverlay}
      />
      
      <View style={styles.taskContent}>
        <Typography variant="body2" style={styles.taskTitle}>{task.title}</Typography>
        <Typography variant="caption" numberOfLines={2} style={styles.taskDescription}>
          {task.description}
        </Typography>
        
        <View style={styles.taskMeta}>
          <View style={styles.metaItem}>
            <MapPin size={12} color="rgba(0, 30, 60, 0.6)" />
            <Typography variant="caption" color="rgba(0, 30, 60, 0.8)">{task.location}</Typography>
            <Typography variant="caption" color="rgba(0, 56, 255, 0.8)">• {task.distance}</Typography>
          </View>
          <View style={styles.metaItem}>
            <Clock size={12} color="rgba(0, 30, 60, 0.6)" />
            <Typography variant="caption" color="rgba(0, 30, 60, 0.8)">{task.time}</Typography>
          </View>
        </View>
        
        <View style={styles.posterSection}>
          <Image source={{ uri: task.poster.image }} style={styles.posterImage} />
          <View style={styles.posterInfo}>
            <Typography variant="caption" style={styles.posterName}>{task.poster.name}</Typography>
            <View style={styles.posterRating}>
              <Star size={10} color="#FF5A1F" fill="#FF5A1F" />
              <Typography variant="caption" color="rgba(0, 30, 60, 0.7)">{task.poster.rating}</Typography>
            </View>
          </View>
          
          <GlowButton
            title="Accept"
            onPress={() => {}}
            variant="primary"
            size="sm"
            style={styles.acceptButton}
          />
        </View>
      </View>
    </PremiumCard>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFFFFF',
  },
  header: {
    paddingTop: 50,
    paddingBottom: 20,
    paddingHorizontal: 20,
    zIndex: 100,
  },
  headerGradient: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
  },
  headerContent: {
    gap: 12,
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  headerTitle: {
    fontWeight: '600',
    flex: 1,
  },
  filterButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.15)',
    borderRadius: 12,
  },
  liveStats: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: 'rgba(255, 255, 255, 0.15)',
    borderRadius: 16,
    alignSelf: 'center',
  },
  liveIndicator: {
    width: 28,
    height: 28,
    borderRadius: 14,
    backgroundColor: 'rgba(255, 90, 31, 0.2)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingTop: 20,
  },
  searchSection: {
    paddingHorizontal: 20,
    marginBottom: 24,
  },
  searchContainer: {
    marginBottom: 0,
  },
  categoriesSection: {
    marginBottom: 24,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    gap: 6,
    borderWidth: 1,
    borderColor: 'rgba(216, 221, 230, 0.3)',
  },
  categoryChipSelected: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 10,
    borderRadius: 18,
    gap: 6,
  },
  categoryBadge: {
    marginLeft: 4,
    backgroundColor: 'rgba(255, 255, 255, 0.9)',
  },
  categoryBadgeSelected: {
    marginLeft: 4,
    backgroundColor: 'rgba(255,255,255,0.9)',
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  tasksHeaderText: {
    fontWeight: '500',
  },
  sortText: {
    fontWeight: '500',
  },
  tasksList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  taskCard: {
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
  urgentPulse: {
    width: 6,
    height: 6,
    borderRadius: 3,
    backgroundColor: '#FFFFFF',
  },
  categoryBadgeTask: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(248, 250, 252, 0.9)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryTextTask: {
    fontFamily: 'Inter-SemiBold',
    fontWeight: '600',
  },
  priceText: {
    fontWeight: '700',
    marginLeft: 'auto',
  },
  taskImage: {
    width: '100%',
    height: 140,
  },
  imageOverlay: {
    position: 'absolute',
    top: 60,
    left: 0,
    right: 0,
    height: 140,
  },
  taskContent: {
    padding: 20,
  },
  taskTitle: {
    marginBottom: 6,
    fontWeight: '600',
  },
  taskDescription: {
    marginBottom: 16,
    lineHeight: 16,
    color: 'rgba(0, 30, 60, 0.7)',
  },
  taskMeta: {
    gap: 8,
    marginBottom: 16,
  },
  metaItem: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  posterSection: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  posterImage: {
    width: 36,
    height: 36,
    borderRadius: 18,
  },
  posterInfo: {
    flex: 1,
  },
  posterName: {
    fontWeight: '600',
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
  bottomSpacing: {
    height: 120,
    marginTop: 40,
  },
});