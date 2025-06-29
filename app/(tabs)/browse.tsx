import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, TextInput, Image } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Search, Filter, MapPin, Clock, DollarSign, Star, Coffee, Printer, Heart, ShoppingBag } from 'lucide-react-native';

export default function BrowseScreen() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All');

  const categories = ['All', 'Coffee', 'Printing', 'Pet Care', 'Food', 'Shopping'];

  const tasks = [
    {
      id: 1,
      title: 'Starbucks Coffee Run',
      description: 'Need a venti iced coffee with oat milk from Starbucks at Reitz Union',
      category: 'Coffee',
      price: 12,
      time: '15 min',
      location: 'Reitz Union',
      rating: 4.8,
      reviews: 24,
      image: 'https://images.pexels.com/photos/312418/pexels-photo-312418.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: true,
    },
    {
      id: 2,
      title: 'Print Assignment',
      description: 'Print 20 pages double-sided and deliver to Turlington Plaza',
      category: 'Printing',
      price: 8,
      time: '20 min',
      location: 'Library West',
      rating: 4.9,
      reviews: 18,
      image: 'https://images.pexels.com/photos/4226140/pexels-photo-4226140.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
    },
    {
      id: 3,
      title: 'Dog Walking',
      description: 'Walk my golden retriever for 30 minutes around campus area',
      category: 'Pet Care',
      price: 20,
      time: '45 min',
      location: 'Campus Area',
      rating: 5.0,
      reviews: 12,
      image: 'https://images.pexels.com/photos/1108099/pexels-photo-1108099.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
    },
    {
      id: 4,
      title: 'Chipotle Pickup',
      description: 'Pick up my mobile order from Chipotle and deliver to dorm',
      category: 'Food',
      price: 15,
      time: '25 min',
      location: 'Midtown',
      rating: 4.7,
      reviews: 31,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: true,
    },
    {
      id: 5,
      title: 'Grocery Shopping',
      description: 'Pick up groceries from Publix - list provided',
      category: 'Shopping',
      price: 25,
      time: '60 min',
      location: 'Archer Road',
      rating: 4.6,
      reviews: 8,
      image: 'https://images.pexels.com/photos/264636/pexels-photo-264636.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
    },
    {
      id: 6,
      title: 'Dunkin Coffee & Donuts',
      description: 'Medium iced coffee and 6 donuts from Dunkin near campus',
      category: 'Coffee',
      price: 18,
      time: '20 min',
      location: 'SW 13th St',
      rating: 4.5,
      reviews: 15,
      image: 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
    },
  ];

  const filteredTasks = tasks.filter(task => {
    const matchesSearch = task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         task.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'All' || task.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'Coffee': return <Coffee size={16} color="#F97316" />;
      case 'Printing': return <Printer size={16} color="#3B82F6" />;
      case 'Pet Care': return <Heart size={16} color="#EF4444" />;
      case 'Food': return <ShoppingBag size={16} color="#10B981" />;
      case 'Shopping': return <ShoppingBag size={16} color="#8B5CF6" />;
      default: return null;
    }
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Browse Tasks</Text>
        <Text style={styles.headerSubtitle}>Find tasks that match your skills</Text>
      </View>

      {/* Search Bar */}
      <View style={styles.searchSection}>
        <View style={styles.searchBar}>
          <Search size={20} color="#6B7280" />
          <TextInput
            style={styles.searchInput}
            placeholder="Search tasks..."
            value={searchQuery}
            onChangeText={setSearchQuery}
            placeholderTextColor="#9CA3AF"
          />
        </View>
        <TouchableOpacity style={styles.filterButton}>
          <Filter size={20} color="#6B7280" />
        </TouchableOpacity>
      </View>

      {/* Categories */}
      <ScrollView 
        horizontal 
        showsHorizontalScrollIndicator={false} 
        style={styles.categoriesSection}
        contentContainerStyle={styles.categoriesContent}
      >
        {categories.map((category) => (
          <TouchableOpacity
            key={category}
            style={[
              styles.categoryChip,
              selectedCategory === category && styles.categoryChipActive
            ]}
            onPress={() => setSelectedCategory(category)}
          >
            <Text style={[
              styles.categoryText,
              selectedCategory === category && styles.categoryTextActive
            ]}>
              {category}
            </Text>
          </TouchableOpacity>
        ))}
      </ScrollView>

      {/* Tasks List */}
      <View style={styles.tasksSection}>
        <View style={styles.tasksHeader}>
          <Text style={styles.tasksCount}>{filteredTasks.length} tasks available</Text>
          <TouchableOpacity>
            <Text style={styles.sortText}>Sort by: Nearest</Text>
          </TouchableOpacity>
        </View>

        <View style={styles.tasksList}>
          {filteredTasks.map((task) => (
            <TaskCard key={task.id} task={task} getCategoryIcon={getCategoryIcon} />
          ))}
        </View>
      </View>
    </ScrollView>
  );
}

function TaskCard({ task, getCategoryIcon }: { 
  task: any; 
  getCategoryIcon: (category: string) => React.ReactNode;
}) {
  return (
    <TouchableOpacity style={styles.taskCard}>
      {task.urgent && (
        <View style={styles.urgentBadge}>
          <Text style={styles.urgentText}>Urgent</Text>
        </View>
      )}
      
      <Image source={{ uri: task.image }} style={styles.taskImage} />
      
      <View style={styles.taskContent}>
        <View style={styles.taskHeader}>
          <View style={styles.categoryBadge}>
            {getCategoryIcon(task.category)}
            <Text style={styles.categoryBadgeText}>{task.category}</Text>
          </View>
          <Text style={styles.taskPrice}>${task.price}</Text>
        </View>
        
        <Text style={styles.taskTitle}>{task.title}</Text>
        <Text style={styles.taskDescription}>{task.description}</Text>
        
        <View style={styles.taskMeta}>
          <View style={styles.taskMetaItem}>
            <MapPin size={14} color="#6B7280" />
            <Text style={styles.taskMetaText}>{task.location}</Text>
          </View>
          <View style={styles.taskMetaItem}>
            <Clock size={14} color="#6B7280" />
            <Text style={styles.taskMetaText}>{task.time}</Text>
          </View>
        </View>
        
        <View style={styles.taskFooter}>
          <View style={styles.taskRating}>
            <Star size={14} color="#F59E0B" fill="#F59E0B" />
            <Text style={styles.taskRatingText}>{task.rating}</Text>
            <Text style={styles.taskReviews}>({task.reviews})</Text>
          </View>
          
          <TouchableOpacity style={styles.acceptButton}>
            <Text style={styles.acceptButtonText}>Accept Task</Text>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F8FAFC',
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 60,
    paddingBottom: 20,
    backgroundColor: '#FFFFFF',
  },
  headerTitle: {
    fontSize: 28,
    fontWeight: '800',
    color: '#111827',
    marginBottom: 4,
  },
  headerSubtitle: {
    fontSize: 16,
    color: '#6B7280',
  },
  searchSection: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#FFFFFF',
    gap: 12,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  searchInput: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  filterButton: {
    backgroundColor: '#F3F4F6',
    borderRadius: 12,
    padding: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
  categoriesSection: {
    backgroundColor: '#FFFFFF',
    paddingBottom: 16,
  },
  categoriesContent: {
    paddingHorizontal: 20,
    gap: 12,
  },
  categoryChip: {
    paddingHorizontal: 16,
    paddingVertical: 8,
    borderRadius: 20,
    backgroundColor: '#F3F4F6',
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  categoryChipActive: {
    backgroundColor: '#3B82F6',
    borderColor: '#3B82F6',
  },
  categoryText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
  },
  categoryTextActive: {
    color: '#FFFFFF',
  },
  tasksSection: {
    padding: 20,
  },
  tasksHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  tasksCount: {
    fontSize: 16,
    fontWeight: '600',
    color: '#111827',
  },
  sortText: {
    fontSize: 14,
    color: '#3B82F6',
    fontWeight: '600',
  },
  tasksList: {
    gap: 16,
  },
  taskCard: {
    backgroundColor: '#FFFFFF',
    borderRadius: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 2,
    overflow: 'hidden',
    position: 'relative',
  },
  urgentBadge: {
    position: 'absolute',
    top: 12,
    left: 12,
    backgroundColor: '#EF4444',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    zIndex: 1,
  },
  urgentText: {
    color: '#FFFFFF',
    fontSize: 12,
    fontWeight: '700',
  },
  taskImage: {
    width: '100%',
    height: 160,
  },
  taskContent: {
    padding: 16,
  },
  taskHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 12,
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F3F4F6',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 8,
  },
  categoryBadgeText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#6B7280',
    marginLeft: 4,
  },
  taskPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F97316',
  },
  taskTitle: {
    fontSize: 18,
    fontWeight: '700',
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
    flexDirection: 'row',
    gap: 16,
    marginBottom: 16,
  },
  taskMetaItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMetaText: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  taskFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  taskRating: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskRatingText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#111827',
    marginLeft: 4,
  },
  taskReviews: {
    fontSize: 12,
    color: '#6B7280',
    marginLeft: 4,
  },
  acceptButton: {
    backgroundColor: '#3B82F6',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
  },
  acceptButtonText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: '700',
  },
});