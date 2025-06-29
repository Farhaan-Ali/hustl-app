import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin, Clock, Star, Coffee, Printer, Heart, ShoppingBag, Zap } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = [
    { id: 'All', name: 'All', icon: null, count: 24 },
    { id: 'Coffee', name: 'Coffee', icon: <Coffee size={16} color="#F97316" />, count: 8 },
    { id: 'Printing', name: 'Print', icon: <Printer size={16} color="#3B82F6" />, count: 5 },
    { id: 'Pet Care', name: 'Pets', icon: <Heart size={16} color="#EF4444" />, count: 3 },
    { id: 'Food', name: 'Food', icon: <ShoppingBag size={16} color="#10B981" />, count: 6 },
    { id: 'Shopping', name: 'Shop', icon: <ShoppingBag size={16} color="#8B5CF6" />, count: 2 },
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
      <StatusBar style="dark" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <HustlLogo size={32} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Browse Tasks</Text>
            <Text style={styles.headerSubtitle}>Find your next gig</Text>
          </View>
          <TouchableOpacity style={styles.filterButton}>
            <Filter size={20} color="#6B7280" />
          </TouchableOpacity>
        </View>
      </View>

      {/* Search Section */}
      <View style={styles.searchSection}>
        <Input
          placeholder="Search tasks, locations, or keywords..."
          value={searchQuery}
          onChangeText={setSearchQuery}
          icon={<Search size={20} color="#6B7280" />}
          containerStyle={styles.searchContainer}
        />
      </View>

      {/* Categories with Counts */}
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
              <Text style={[
                styles.categoryText,
                selectedCategory === category.id && styles.categoryTextActive
              ]}>
                {category.name}
              </Text>
              <Badge 
                variant={selectedCategory === category.id ? "info" : "default"} 
                size="sm"
                style={styles.categoryBadge}
              >
                <Text>{category.count}</Text>
              </Badge>
            </TouchableOpacity>
          ))}
        </ScrollView>
      </View>

      {/* Tasks Header */}
      <View style={styles.tasksHeader}>
        <Text style={styles.tasksCount}>{filteredTasks.length} tasks available</Text>
        <View style={styles.sortContainer}>
          <Text style={styles.sortText}>Nearest first</Text>
        </View>
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
    <Card style={styles.taskCard}>
      <View style={styles.taskHeader}>
        {task.urgent && (
          <Badge variant="error" size="sm" style={styles.urgentBadge}>
            <Zap size={12} color="#DC2626" />
            <Text style={styles.urgentText}>Urgent</Text>
          </Badge>
        )}
        
        <View style={styles.categoryBadge}>
          {task.category === 'Coffee' && <Coffee size={14} color="#F97316" />}
          {task.category === 'Printing' && <Printer size={14} color="#3B82F6" />}
          {task.category === 'Pet Care' && <Heart size={14} color="#EF4444" />}
          {task.category === 'Food' && <ShoppingBag size={14} color="#10B981" />}
          <Text style={styles.categoryText}>{task.category}</Text>
        </View>
        
        <Text style={styles.taskPrice}>${task.price}</Text>
      </View>
      
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription} numberOfLines={2}>{task.description}</Text>
        
        <View style={styles.taskMeta}>
          <View style={styles.metaItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.metaText}>{task.location}</Text>
            <Text style={styles.distanceText}>• {task.distance}</Text>
          </View>
          <View style={styles.metaItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.metaText}>{task.time}</Text>
          </View>
        </View>
        
        <View style={styles.posterSection}>
          <Image source={{ uri: task.poster.image }} style={styles.posterImage} />
          <View style={styles.posterInfo}>
            <Text style={styles.posterName}>{task.poster.name}</Text>
            <View style={styles.posterRating}>
              <Star size={12} color="#F59E0B" fill="#F59E0B" />
              <Text style={styles.ratingText}>{task.poster.rating}</Text>
            </View>
          </View>
          
          <Button
            title="Accept"
            onPress={() => {}}
            variant="primary"
            size="sm"
            style={styles.acceptButton}
          />
        </View>
      </View>
    </Card>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 24,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  headerTop: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 16,
  },
  headerText: {
    flex: 1,
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '900',
    color: '#111827',
    letterSpacing: -0.5,
  },
  headerSubtitle: {
    fontSize: 14,
    color: '#6B7280',
    fontWeight: '500',
  },
  filterButton: {
    padding: 12,
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
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
    borderBottomColor: '#F3F4F6',
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
    borderRadius: 16,
    backgroundColor: '#F3F4F6',
    gap: 8,
  },
  categoryChipActive: {
    backgroundColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
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
  tasksCount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
  },
  sortContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  sortText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
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
  urgentText: {
    fontSize: 12,
    fontWeight: '700',
    color: '#DC2626',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
    gap: 4,
    flex: 1,
  },
  taskPrice: {
    fontSize: 24,
    fontWeight: '900',
    color: '#F97316',
  },
  taskImage: {
    width: '100%',
    height: 160,
  },
  taskContent: {
    padding: 20,
  },
  taskTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 8,
  },
  taskDescription: {
    fontSize: 14,
    color: '#6B7280',
    lineHeight: 20,
    marginBottom: 16,
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
  metaText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
  },
  distanceText: {
    fontSize: 12,
    color: '#3B82F6',
    fontWeight: '600',
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
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginBottom: 2,
  },
  posterRating: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 4,
  },
  ratingText: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '600',
  },
  acceptButton: {
    paddingHorizontal: 20,
  },
});