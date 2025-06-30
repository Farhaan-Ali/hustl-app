import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Animated, Image, FlatList } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, ShoppingBag, MapPin, DollarSign, Clock, Camera, Star, UtensilsCrossed, Car, Dumbbell } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { Input } from '@/components/ui/Input';
import { AnimatedButton } from '@/components/ui/AnimatedButton';
import { Badge } from '@/components/ui/Badge';
import { Typography } from '@/components/ui/Typography';

export default function PostTaskScreen() {
  const [formData, setFormData] = useState({
    title: '',
    category: '',
    description: '',
    location: '',
    budget: '',
    timeEstimate: '',
    urgency: 'normal',
  });

  const [errors, setErrors] = useState<{ [key: string]: string }>({});
  const fadeAnim = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 800,
      useNativeDriver: true,
    }).start();
  }, []);

  const categories = [
    { 
      id: 'coffee', 
      name: 'Coffee Run', 
      icon: <Coffee size={24} color="#FFFFFF" />, 
      variant: 'secondary' as const,
      cardVariant: 'secondary' as const // Orange
    },
    { 
      id: 'food', 
      name: 'Food Pickup', 
      icon: <UtensilsCrossed size={24} color="#FFFFFF" />, 
      variant: 'primary' as const,
      cardVariant: 'primary' as const // Blue
    },
    { 
      id: 'printing', 
      name: 'Printing', 
      icon: <Printer size={24} color="#001E3C" />, 
      variant: 'accent' as const,
      cardVariant: 'accent' as const // Grey/White
    },
    { 
      id: 'petcare', 
      name: 'Pet Care', 
      icon: <Heart size={24} color="#FFFFFF" />, 
      variant: 'secondary' as const,
      cardVariant: 'secondary' as const // Orange
    },
    { 
      id: 'rides', 
      name: 'Campus Rides', 
      icon: <Car size={24} color="#FFFFFF" />, 
      variant: 'primary' as const,
      cardVariant: 'primary' as const // Blue
    },
    { 
      id: 'workout', 
      name: 'Workout Buddy', 
      icon: <Dumbbell size={24} color="#001E3C" />, 
      variant: 'accent' as const,
      cardVariant: 'accent' as const // Grey/White
    },
  ];

  const categoryTasks = [
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
      cardVariant: 'secondary', // Orange
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
      cardVariant: 'primary', // Blue
      poster: {
        name: 'Mike R.',
        rating: 5.0,
        image: 'https://images.pexels.com/photos/1222271/pexels-photo-1222271.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    },
    {
      id: 3,
      title: 'Chipotle Bowl Pickup',
      description: 'Pick up my usual bowl from Chipotle at Student Union and deliver to Broward Hall.',
      category: 'Food',
      price: 10,
      time: '25 min',
      location: 'Student Union',
      rating: 4.7,
      image: 'https://images.pexels.com/photos/1640777/pexels-photo-1640777.jpeg?auto=compress&cs=tinysrgb&w=400',
      urgent: false,
      distance: '0.3 mi',
      cardVariant: 'accent', // Grey/White
      poster: {
        name: 'Emma K.',
        rating: 4.8,
        image: 'https://images.pexels.com/photos/1181686/pexels-photo-1181686.jpeg?auto=compress&cs=tinysrgb&w=100'
      }
    }
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) newErrors.title = 'Task title is required';
    if (!formData.category) newErrors.category = 'Please select a category';
    if (!formData.description.trim()) newErrors.description = 'Task description is required';
    if (!formData.location.trim()) newErrors.location = 'Location is required';
    if (!formData.budget.trim()) newErrors.budget = 'Budget is required';
    if (!formData.timeEstimate.trim()) newErrors.timeEstimate = 'Time estimate is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Task Posted Successfully! 🎉',
        'Your task is now live. Students nearby will be notified.',
        [{ text: 'Great!', onPress: () => {
          setFormData({
            title: '',
            category: '',
            description: '',
            location: '',
            budget: '',
            timeEstimate: '',
            urgency: 'normal',
          });
        }}]
      );
    }
  };

  const updateFormData = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
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
            <Typography variant="h2" color="#ffffff">Post Task</Typography>
            <Badge variant="secondary" size="sm">
              <Typography variant="caption" color="#FFFFFF">Live</Typography>
            </Badge>
          </View>

          <Typography variant="body2" color="rgba(255,255,255,0.8)" style={styles.headerSubtitle}>
            Get help from fellow students • Avg response: 8min
          </Typography>
        </Animated.View>
      </LinearGradient>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {/* Task Title */}
        <Animated.View style={[styles.inputSection, { opacity: fadeAnim }]}>
          <Input
            label="What do you need help with?"
            placeholder="e.g., Starbucks coffee run to Reitz Union"
            value={formData.title}
            onChangeText={(value) => updateFormData('title', value)}
            error={errors.title}
          />
        </Animated.View>

        {/* Category Selection */}
        <Animated.View style={[styles.inputGroup, { opacity: fadeAnim }]}>
          <Typography variant="h4" style={styles.inputLabel}>Category</Typography>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  formData.category === category.id && styles.categoryCardSelected
                ]}
                onPress={() => updateFormData('category', category.id)}
              >
                <ModernCard 
                  style={styles.categoryCardInner} 
                  variant={category.variant}
                >
                  <View style={styles.categoryIcon}>{category.icon}</View>
                  <Typography 
                    variant="h4" 
                    color={category.variant === 'accent' ? '#001E3C' : '#FFFFFF'}
                  >
                    {category.name}
                  </Typography>
                </ModernCard>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && <Typography variant="caption" color="#E6501E">{errors.category}</Typography>}
        </Animated.View>

        {/* Category Task Cards */}
        <Animated.View style={[styles.categoryTasksSection, { opacity: fadeAnim }]}>
          <View style={styles.sectionHeader}>
            <Typography variant="h3">Popular in Categories</Typography>
            <Badge variant="secondary" size="sm">
              <Typography variant="caption" color="#FFFFFF">Live</Typography>
            </Badge>
          </View>
          
          <FlatList
            data={categoryTasks}
            renderItem={({ item }) => <CategoryTaskCard task={item} />}
            keyExtractor={(item) => item.id.toString()}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.categoryTasksList}
          />
        </Animated.View>

        {/* Description */}
        <Animated.View style={[styles.inputSection, { opacity: fadeAnim }]}>
          <Input
            label="Task Details"
            placeholder="Provide specific details and instructions..."
            value={formData.description}
            onChangeText={(value) => updateFormData('description', value)}
            error={errors.description}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </Animated.View>

        {/* Location */}
        <Animated.View style={[styles.inputSection, { opacity: fadeAnim }]}>
          <Input
            label="Location"
            placeholder="e.g., Turlington Plaza, Reitz Union"
            value={formData.location}
            onChangeText={(value) => updateFormData('location', value)}
            error={errors.location}
            icon={<MapPin size={20} color="#001E3C" />}
          />
        </Animated.View>

        {/* Budget and Time */}
        <Animated.View style={[styles.row, { opacity: fadeAnim }]}>
          <View style={styles.halfWidth}>
            <Input
              label="Budget ($)"
              placeholder="15"
              value={formData.budget}
              onChangeText={(value) => updateFormData('budget', value)}
              error={errors.budget}
              keyboardType="numeric"
              icon={<DollarSign size={20} color="#001E3C" />}
              containerStyle={styles.halfInput}
            />
          </View>

          <View style={styles.halfWidth}>
            <Input
              label="Time Estimate"
              placeholder="30 min"
              value={formData.timeEstimate}
              onChangeText={(value) => updateFormData('timeEstimate', value)}
              error={errors.timeEstimate}
              icon={<Clock size={20} color="#001E3C" />}
              containerStyle={styles.halfInput}
            />
          </View>
        </Animated.View>

        {/* Add Photo */}
        <Animated.View style={[styles.photoSection, { opacity: fadeAnim }]}>
          <ModernCard style={styles.photoCard} variant="accent">
            <TouchableOpacity style={styles.photoButton}>
              <Camera size={24} color="#001E3C" />
              <Typography variant="h4" color="#001E3C" style={styles.photoButtonText}>
                Add Photo (Optional)
              </Typography>
            </TouchableOpacity>
          </ModernCard>
        </Animated.View>

        {/* Submit Button */}
        <Animated.View style={[styles.submitSection, { opacity: fadeAnim }]}>
          <AnimatedButton
            title="Post Task"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            gradient
            style={styles.submitButton}
          />

          <Typography variant="body2" color="#001E3C" style={styles.termsText}>
            By posting a task, you agree to our Terms of Service. 
            Payment will be held securely until completion.
          </Typography>
        </Animated.View>
      </ScrollView>
    </View>
  );
}

function CategoryTaskCard({ task }: { task: any }) {
  const getHeaderColors = () => {
    switch (task.cardVariant) {
      case 'secondary': // Orange
        return {
          backgroundColor: '#E6501E',
          textColor: '#FFFFFF'
        };
      case 'primary': // Blue
        return {
          backgroundColor: '#0021A5',
          textColor: '#FFFFFF'
        };
      case 'accent': // Grey/White
        return {
          backgroundColor: '#D8DDE6',
          textColor: '#001E3C'
        };
      default:
        return {
          backgroundColor: '#D8DDE6',
          textColor: '#001E3C'
        };
    }
  };

  const headerColors = getHeaderColors();

  return (
    <ModernCard style={styles.categoryTaskCard} onPress={() => {}}>
      <View style={[styles.taskHeader, { backgroundColor: headerColors.backgroundColor }]}>
        {task.urgent && (
          <Badge variant="default" size="sm" style={styles.urgentBadge}>
            <Typography variant="caption" color="#001E3C">Urgent</Typography>
          </Badge>
        )}
        
        <View style={styles.categoryBadge}>
          {task.category === 'Coffee' && <Coffee size={14} color={headerColors.textColor} />}
          {task.category === 'Printing' && <Printer size={14} color={headerColors.textColor} />}
          {task.category === 'Food' && <UtensilsCrossed size={14} color={headerColors.textColor} />}
          <Typography variant="caption" color={headerColors.textColor} style={styles.categoryText}>
            {task.category}
          </Typography>
        </View>
        
        <Typography variant="h3" color={headerColors.textColor}>${task.price}</Typography>
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
            variant={task.cardVariant === 'accent' ? 'primary' : 'secondary'}
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
    marginBottom: 8,
  },
  headerSubtitle: {
    textAlign: 'center',
  },
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  inputSection: {
    marginBottom: 24,
  },
  inputGroup: {
    marginBottom: 32,
  },
  inputLabel: {
    marginBottom: 16,
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 16,
  },
  categoryCard: {
    width: '48%',
  },
  categoryCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  categoryCardInner: {
    padding: 20,
    alignItems: 'center',
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryTasksSection: {
    marginBottom: 32,
  },
  sectionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  categoryTasksList: {
    paddingRight: 24,
  },
  categoryTaskCard: {
    marginRight: 16,
    width: 280,
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
    backgroundColor: '#FFFFFF',
  },
  categoryBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: 'rgba(255,255,255,0.2)',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  categoryText: {
    fontFamily: 'Inter-SemiBold',
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
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
    marginBottom: 24,
  },
  halfWidth: {
    flex: 1,
  },
  halfInput: {
    marginBottom: 0,
  },
  photoSection: {
    marginBottom: 32,
  },
  photoCard: {
    padding: 0,
  },
  photoButton: {
    padding: 32,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#D8DDE6',
    borderStyle: 'dashed',
    borderRadius: 20,
  },
  photoButtonText: {
    marginTop: 12,
  },
  submitSection: {
    marginBottom: 40,
  },
  submitButton: {
    marginBottom: 24,
  },
  termsText: {
    textAlign: 'center',
    lineHeight: 20,
  },
});