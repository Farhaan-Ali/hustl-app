import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin, Clock, Star, Coffee, Printer, Heart, ShoppingBag } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
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
    { id: 'All', name: 'All', icon: null, count: 24 },
    { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} color="#E6501E" />, count: 8 },
    { id: 'Printing', name: 'Print', icon: <Printer size={16} color="#0021A5" />, count: 5 },
    { id: 'Pet Care', name: 'Pets', icon: <Heart size={16} color="#FF7849" />, count: 3 },
    { id: 'Shopping', name: 'Shop', icon: <ShoppingBag size={16} color="#001E3C" />, count: 6 },
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
            <Typography variant="h2" color="#ffffff">Browse Tasks</Typography>
            <TouchableOpacity style={styles.filterButton}>
              <Filter size={20} color="#ffffff" />
            </TouchableOpacity>
          </View>

          <View style={styles.liveStats}>
            <Typography variant="body2" color="rgba(255,255,255,0.8)">
              24 active tasks • Avg 8min response
            </Typography>
          </View>
        </Animated.View>
      </LinearGradient>

      {/* Search */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Search tasks or locations..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={20} color="#001E3C" />}
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
                selectedCategory === category.id && styles.categoryChipActive
              ]}
              onPress={() => setSelectedCategory(category.id)}
            >
              {category.icon}
              <Typography 
                variant="body2" 
                color={selectedCategory === category.id ? "#ffffff" : "#001E3C"}
              >
                {category.name}
              </Typography>
              <Badge 
                variant={selectedCategory === category.id ? "default" : "default"} 
                size="sm"
                style={styles.categoryBadge}
              >
                <Typography variant="caption">{category.count}</Typography>
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tasks Header */}
      <View style={styles.tasksHeader}>
        <Typography variant="h4">{filteredTasks.length} tasks available</Typography>
        <TouchableOpacity>
          <Typography variant="body2" color="#0021A5">Nearest first</Typography>
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
          <Badge variant="secondary" size="sm">
            <Typography variant="caption" color="#FFFFFF">Urgent</Typography>
          </Badge>
        )}
        
        <View style={styles.categoryBadge}>
          {task.category === 'Coffee' && <Coffee size={14} color="#E6501E" />}
          {task.category === 'Printing' && <Printer size={14} color="#0021A5" />}
          <Typography variant="caption" style={styles.categoryText}>{task.category}</Typography>
        </View>
        
        <Typography variant="h3" color="#0021A5">${task.price}</Typography>
      </View>
      
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <Typography variant="h4" style={styles.taskTitle}>{task.title}</Typography>
        <Typography variant="body2" numberOfLines={2} style={styles.taskDescription}>
          {task.description}
        </Typography>
        
        <View style={styles.taskMeta}>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#001E3C" />
            <Typography variant="body2" color="#001E3C">{task.location}</Typography>
            <Typography variant="body2" color="#0021A5">• {task.distance}</Typography>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#001E3C" />
            <Typography variant="body2" color="#001E3C">{task.time}</Typography>
          </View>
        </View>
        
        <View style={styles.posterSection}>
          <Image source={{ uri: task.poster.image }} style={styles.posterImage} />
          <View style={styles.posterInfo}>
            <Typography variant="body2">{task.poster.name}</Typography>
            <View style={styles.posterRating}>
              <Star size={12} color="#E6501E" fill="#E6501E" />
              <Typography variant="caption" color="#001E3C">{task.poster.rating}</Typography>
            </View>
          </View>
          
          <AnimatedButton
            title="Accept"
            onPress={() => {}}
            variant="primary"
            size="sm"
            gradient
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
    marginBottom: 16,
  },
  filterButton: {
    padding: 8,
    backgroundColor: 'rgba(255,255,255,0.2)',
    borderRadius: 8,
    marginLeft: 'auto',
  },
  liveStats: {
    alignItems: 'center',
  },
  searchSection: {
    paddingHorizontal: 24,
    paddingVertical: 20,
    backgroundColor: '#FFFFFF',
  },
  searchContainer: {
    marginBottom: 0,
  },
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 20,
    borderBottomWidth: 1,
    borderBottomColor: '#D8DDE6',
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
    backgroundColor: '#D8DDE6',
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: '#0021A5',
  },
  categoryBadge: {
    marginLeft: 4,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 24,
    paddingVertical: 20,
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