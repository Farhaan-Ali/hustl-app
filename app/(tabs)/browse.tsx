import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Menu, Search, Filter, MapPin, Clock, Star, Coffee, Printer, Heart, ShoppingBag } from 'lucide-react-native';
import { useRouter } from 'expo-router';
import { Typography } from '@/components/ui/Typography';
import { Badge } from '@/components/ui/Badge';
import { SidebarMenu } from '@/components/ui/SidebarMenu';

export default function BrowseScreen() {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const router = useRouter();

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const categories = [
    { id: 'All', name: 'All', count: 24 },
    { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} color="#0038FF" strokeWidth={1.5} />, count: 8 },
    { id: 'Printing', name: 'Print', icon: <Printer size={16} color="#0038FF" strokeWidth={1.5} />, count: 5 },
    { id: 'Pet Care', name: 'Pets', icon: <Heart size={16} color="#FF5A1F" strokeWidth={1.5} />, count: 3 },
    { id: 'Shopping', name: 'Shop', icon: <ShoppingBag size={16} color="#0038FF" strokeWidth={1.5} />, count: 6 },
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
      <StatusBar style="dark" />
      
      {/* Sidebar Menu */}
      <SidebarMenu 
        isOpen={sidebarOpen}
        onClose={() => setSidebarOpen(false)}
        navigation={router}
        currentRoute="browse"
      />
      
      {/* Header */}
      <View style={styles.header}>
        <View style={styles.headerContent}>
          <TouchableOpacity 
            onPress={() => setSidebarOpen(true)}
            style={styles.menuButton}
          >
            <Menu size={24} color="#001E3C" strokeWidth={1.5} />
          </TouchableOpacity>
          
          <Typography variant="h3" style={styles.headerTitle}>Browse Tasks</Typography>
          
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#001E3C" strokeWidth={1.5} />
          </TouchableOpacity>
        </View>

        <View style={styles.statsRow}>
          <Typography variant="caption" color="#666">
            {filteredTasks.length} tasks available • Avg 8min response
          </Typography>
        </View>
      </View>

      <ScrollView 
        style={styles.content}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        {/* Search */}
        <View style={styles.searchSection}>
          <View style={styles.searchContainer}>
            <Search size={20} color="#999" strokeWidth={1.5} />
            <Typography variant="body2" color="#999" style={styles.searchPlaceholder}>
              Search tasks or locations...
            </Typography>
          </View>
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

        {/* Tasks List */}
        <View style={styles.tasksList}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} />
          ))}
        </View>
      </ScrollView>
    </View>
  );
}

function CategoryChip({ category, isSelected, onPress }: { 
  category: any; 
  isSelected: boolean; 
  onPress: () => void; 
}) {
  return (
    <TouchableOpacity
      style={[styles.categoryChip, isSelected && styles.categoryChipSelected]}
      onPress={onPress}
    >
      {category.icon}
      <Typography 
        variant="caption" 
        color={isSelected ? "#FFFFFF" : "#666"}
        style={styles.categoryText}
      >
        {category.name}
      </Typography>
      <Badge 
        variant={isSelected ? "default" : "default"} 
        size="sm"
        style={[styles.categoryBadge, isSelected && styles.categoryBadgeSelected]}
      >
        <Typography variant="caption" color={isSelected ? "#0038FF" : "#666"}>
          {category.count}
        </Typography>
      </Badge>
    </TouchableOpacity>
  );
}

function TaskCard({ task }: { task: any }) {
  return (
    <View style={styles.taskCard}>
      <View style={styles.taskHeader}>
        {task.urgent && (
          <Badge variant="secondary" size="sm" style={styles.urgentBadge}>
            <Typography variant="caption" color="#FFFFFF">Urgent</Typography>
          </Badge>
        )}
        
        <View style={styles.categoryBadgeTask}>
          {task.category === 'Coffee' && <Coffee size={14} color="#0038FF" strokeWidth={1.5} />}
          {task.category === 'Printing' && <Printer size={14} color="#0038FF" strokeWidth={1.5} />}
          <Typography variant="caption" style={styles.categoryTextTask}>{task.category}</Typography>
        </View>
        
        <Typography variant="h4" color="#0038FF" style={styles.priceText}>${task.price}</Typography>
      </View>
      
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <Typography variant="h4" style={styles.taskTitle}>{task.title}</Typography>
        <Typography variant="body2" numberOfLines={2} style={styles.taskDescription}>
          {task.description}
        </Typography>
        
        <View style={styles.taskMeta}>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#666" strokeWidth={1.5} />
            <Typography variant="body2" color="#666">{task.location}</Typography>
            <Typography variant="body2" color="#0038FF">• {task.distance}</Typography>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#666" strokeWidth={1.5} />
            <Typography variant="body2" color="#666">{task.time}</Typography>
          </View>
        </View>
        
        <View style={styles.posterSection}>
          <Image source={{ uri: task.poster.image }} style={styles.posterImage} />
          <View style={styles.posterInfo}>
            <Typography variant="body2" style={styles.posterName}>{task.poster.name}</Typography>
            <View style={styles.posterRating}>
              <Star size={12} color="#FF5A1F" fill="#FF5A1F" />
              <Typography variant="caption" color="#666">{task.poster.rating}</Typography>
            </View>
          </View>
          
          <TouchableOpacity style={styles.acceptButton}>
            <Typography variant="body2" color="#FFFFFF" style={styles.acceptButtonText}>
              Accept
            </Typography>
          </TouchableOpacity>
        </View>
      </View>
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
    paddingHorizontal: 20,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  headerContent: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  menuButton: {
    padding: 8,
    marginRight: 16,
  },
  headerTitle: {
    flex: 1,
    fontWeight: '600',
  },
  filterButton: {
    padding: 8,
  },
  statsRow: {
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 8,
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    alignSelf: 'center',
  },
  content: {
    flex: 1,
  },
  scrollContent: {
    paddingBottom: 40,
  },
  searchSection: {
    paddingHorizontal: 20,
    paddingVertical: 20,
  },
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    borderRadius: 16,
    paddingHorizontal: 16,
    paddingVertical: 16,
    gap: 12,
  },
  searchPlaceholder: {
    flex: 1,
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
    borderRadius: 16,
    backgroundColor: '#f8f9fa',
    gap: 6,
  },
  categoryChipSelected: {
    backgroundColor: '#0038FF',
  },
  categoryBadge: {
    marginLeft: 4,
    backgroundColor: '#FFFFFF',
  },
  categoryBadgeSelected: {
    backgroundColor: '#FFFFFF',
  },
  categoryText: {
    fontWeight: '500',
  },
  tasksList: {
    paddingHorizontal: 20,
    gap: 16,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    overflow: 'hidden',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 3,
  },
  taskHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    gap: 12,
  },
  urgentBadge: {
    backgroundColor: '#FF5A1F',
  },
  categoryBadgeTask: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f8f9fa',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryTextTask: {
    fontWeight: '500',
  },
  priceText: {
    fontWeight: '700',
    marginLeft: 'auto',
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
    fontWeight: '600',
  },
  taskDescription: {
    marginBottom: 16,
    lineHeight: 20,
    color: '#666',
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
    backgroundColor: '#0038FF',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 12,
  },
  acceptButtonText: {
    fontWeight: '600',
  },
});