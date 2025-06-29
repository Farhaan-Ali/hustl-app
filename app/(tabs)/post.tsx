import React, { useState, useRef, useEffect } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, ShoppingBag, MapPin, DollarSign, Clock, Camera, Zap, Users, Sparkles } from 'lucide-react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { HustlLogo } from '@/components/HustlLogo';
import { ModernCard } from '@/components/ui/ModernCard';
import { GlassCard } from '@/components/ui/GlassCard';
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
  const slideAnim = useRef(new Animated.Value(30)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      }),
    ]).start();
  }, []);

  const categories = [
    { 
      id: 'coffee', 
      name: 'Coffee Run', 
      icon: <Coffee size={24} color="#f97316" />, 
      gradient: ['#fff7ed', '#fed7aa'],
      description: 'Quick caffeine fixes'
    },
    { 
      id: 'printing', 
      name: 'Printing', 
      icon: <Printer size={24} color="#3b82f6" />, 
      gradient: ['#eff6ff', '#dbeafe'],
      description: 'Documents & materials'
    },
    { 
      id: 'petcare', 
      name: 'Pet Care', 
      icon: <Heart size={24} color="#ef4444" />, 
      gradient: ['#fef2f2', '#fecaca'],
      description: 'Walking & sitting'
    },
    { 
      id: 'food', 
      name: 'Food Delivery', 
      icon: <ShoppingBag size={24} color="#10b981" />, 
      gradient: ['#ecfdf5', '#a7f3d0'],
      description: 'Pickup & delivery'
    },
    { 
      id: 'shopping', 
      name: 'Shopping', 
      icon: <ShoppingBag size={24} color="#8b5cf6" />, 
      gradient: ['#f3f4f6', '#e5e7eb'],
      description: 'Errands & purchases'
    },
  ];

  const urgencyLevels = [
    { 
      id: 'normal', 
      name: 'Normal', 
      description: 'Within a few hours',
      icon: <Clock size={20} color="#718096" />,
      gradient: ['#f8fafc', '#f1f5f9']
    },
    { 
      id: 'urgent', 
      name: 'Urgent', 
      description: 'Within 30 minutes',
      icon: <Zap size={20} color="#f97316" />,
      gradient: ['#fff7ed', '#fed7aa']
    },
    { 
      id: 'asap', 
      name: 'ASAP', 
      description: 'Right now!',
      icon: <Users size={20} color="#ef4444" />,
      gradient: ['#fef2f2', '#fecaca']
    },
  ];

  const validateForm = () => {
    const newErrors: { [key: string]: string } = {};

    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    }

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.description.trim()) {
      newErrors.description = 'Task description is required';
    }

    if (!formData.location.trim()) {
      newErrors.location = 'Location is required';
    }

    if (!formData.budget.trim()) {
      newErrors.budget = 'Budget is required';
    } else if (isNaN(Number(formData.budget)) || Number(formData.budget) <= 0) {
      newErrors.budget = 'Please enter a valid budget amount';
    }

    if (!formData.timeEstimate.trim()) {
      newErrors.timeEstimate = 'Time estimate is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = () => {
    if (validateForm()) {
      Alert.alert(
        'Task Posted Successfully! 🎉',
        'Your task is now live. Students nearby will be notified and can start accepting it.',
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
      
      {/* Premium Header */}
      <LinearGradient
        colors={['#667eea', '#764ba2']}
        style={styles.header}
        start={{ x: 0, y: 0 }}
        end={{ x: 1, y: 1 }}
      >
        <Animated.View 
          style={[
            styles.headerContent,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.headerTop}>
            <HustlLogo size={32} />
            <View style={styles.headerText}>
              <Typography variant="h2" color="#ffffff">Post Task</Typography>
              <Typography variant="body2" color="rgba(255,255,255,0.8)">
                Get help from fellow students
              </Typography>
            </View>
            <Badge variant="success" size="sm">
              <Typography variant="caption" color="#16a34a">Live</Typography>
            </Badge>
          </View>

          <GlassCard style={styles.quickStats}>
            <View style={styles.quickStatsContent}>
              <View style={styles.quickStat}>
                <Sparkles size={16} color="#ffd89b" />
                <Typography variant="caption" color="#ffffff">Avg Response: 8min</Typography>
              </View>
              <View style={styles.quickStat}>
                <Users size={16} color="#10b981" />
                <Typography variant="caption" color="#ffffff">24 Students Online</Typography>
              </View>
            </View>
          </GlassCard>
        </Animated.View>
      </LinearGradient>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {/* Task Title */}
        <Animated.View 
          style={[
            styles.inputSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Input
            label="What do you need help with?"
            placeholder="e.g., Starbucks coffee run to Reitz Union"
            value={formData.title}
            onChangeText={(value) => updateFormData('title', value)}
            error={errors.title}
          />
        </Animated.View>

        {/* Category Selection */}
        <Animated.View 
          style={[
            styles.inputGroup,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
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
                  gradient
                  gradientColors={category.gradient}
                >
                  <View style={styles.categoryIcon}>{category.icon}</View>
                  <Typography 
                    variant="h4" 
                    style={[
                      styles.categoryName,
                      formData.category === category.id && styles.categoryNameSelected
                    ]}
                  >
                    {category.name}
                  </Typography>
                  <Typography variant="body2" style={styles.categoryDescription}>
                    {category.description}
                  </Typography>
                </ModernCard>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && <Typography variant="caption" color="#ef4444">{errors.category}</Typography>}
        </Animated.View>

        {/* Description */}
        <Animated.View 
          style={[
            styles.inputSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Input
            label="Task Details"
            placeholder="Provide specific details, preferences, and any special instructions..."
            value={formData.description}
            onChangeText={(value) => updateFormData('description', value)}
            error={errors.description}
            multiline
            numberOfLines={4}
            style={styles.textArea}
          />
        </Animated.View>

        {/* Location */}
        <Animated.View 
          style={[
            styles.inputSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Input
            label="Pickup/Delivery Location"
            placeholder="e.g., Turlington Plaza, Reitz Union, Library West"
            value={formData.location}
            onChangeText={(value) => updateFormData('location', value)}
            error={errors.location}
            icon={<MapPin size={20} color="#718096" />}
          />
        </Animated.View>

        {/* Budget and Time Row */}
        <Animated.View 
          style={[
            styles.row,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <View style={styles.halfWidth}>
            <Input
              label="Budget ($)"
              placeholder="15"
              value={formData.budget}
              onChangeText={(value) => updateFormData('budget', value)}
              error={errors.budget}
              keyboardType="numeric"
              icon={<DollarSign size={20} color="#718096" />}
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
              icon={<Clock size={20} color="#718096" />}
              containerStyle={styles.halfInput}
            />
          </View>
        </Animated.View>

        {/* Urgency Level */}
        <Animated.View 
          style={[
            styles.inputGroup,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <Typography variant="h4" style={styles.inputLabel}>Urgency Level</Typography>
          <View style={styles.urgencyGrid}>
            {urgencyLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.urgencyCard,
                  formData.urgency === level.id && styles.urgencyCardSelected
                ]}
                onPress={() => updateFormData('urgency', level.id)}
              >
                <ModernCard 
                  style={styles.urgencyCardInner} 
                  gradient
                  gradientColors={level.gradient}
                >
                  <View style={styles.urgencyHeader}>
                    <View style={styles.urgencyIcon}>{level.icon}</View>
                    <Typography 
                      variant="h4" 
                      style={[
                        styles.urgencyName,
                        formData.urgency === level.id && styles.urgencyNameSelected
                      ]}
                    >
                      {level.name}
                    </Typography>
                  </View>
                  <Typography 
                    variant="body2" 
                    style={[
                      styles.urgencyDescription,
                      formData.urgency === level.id && styles.urgencyDescriptionSelected
                    ]}
                  >
                    {level.description}
                  </Typography>
                </ModernCard>
              </TouchableOpacity>
            ))}
          </View>
        </Animated.View>

        {/* Add Photo */}
        <Animated.View 
          style={[
            styles.photoSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <ModernCard style={styles.photoCard}>
            <TouchableOpacity style={styles.photoButton}>
              <Camera size={24} color="#718096" />
              <Typography variant="h4" color="#718096" style={styles.photoButtonText}>
                Add Photo (Optional)
              </Typography>
              <Typography variant="body2" color="#a0aec0" style={styles.photoButtonSubtext}>
                Help others understand your task better
              </Typography>
            </TouchableOpacity>
          </ModernCard>
        </Animated.View>

        {/* Task Preview */}
        <Animated.View 
          style={[
            styles.previewSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <GlassCard style={styles.previewCard} gradient gradientColors={['rgba(102, 126, 234, 0.1)', 'rgba(118, 75, 162, 0.05)']}>
            <Typography variant="h4" style={styles.previewTitle}>Task Preview</Typography>
            <ModernCard style={styles.previewContent}>
              <Typography variant="h4" style={styles.previewTaskTitle}>
                {formData.title || 'Your task title'}
              </Typography>
              <Typography variant="body2" style={styles.previewDescription}>
                {formData.description || 'Task description will appear here'}
              </Typography>
              <View style={styles.previewMeta}>
                <Badge variant="info" size="sm">
                  <Typography variant="caption">{formData.category || 'Category'}</Typography>
                </Badge>
                <Typography variant="h3" color="#667eea">
                  ${formData.budget || '0'}
                </Typography>
              </View>
            </ModernCard>
          </GlassCard>
        </Animated.View>

        {/* Submit Button */}
        <Animated.View 
          style={[
            styles.submitSection,
            {
              opacity: fadeAnim,
              transform: [{ translateY: slideAnim }]
            }
          ]}
        >
          <AnimatedButton
            title="Post Task"
            onPress={handleSubmit}
            variant="primary"
            size="lg"
            gradient
            gradientColors={['#667eea', '#764ba2']}
            style={styles.submitButton}
          />

          <Typography variant="body2" color="#718096" style={styles.termsText}>
            By posting a task, you agree to our Terms of Service and Community Guidelines. 
            Payment will be held securely until task completion.
          </Typography>
        </Animated.View>
      </ScrollView>
    </View>
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
  quickStats: {
    marginTop: 16,
  },
  quickStatsContent: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  quickStat: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 6,
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
    gap: 16,
  },
  categoryCard: {
    marginBottom: 0,
  },
  categoryCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  categoryCardInner: {
    padding: 20,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryName: {
    marginBottom: 8,
  },
  categoryNameSelected: {
    color: '#667eea',
  },
  categoryDescription: {
    color: '#718096',
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
  urgencyGrid: {
    gap: 12,
  },
  urgencyCard: {
    marginBottom: 0,
  },
  urgencyCardSelected: {
    transform: [{ scale: 1.02 }],
  },
  urgencyCardInner: {
    padding: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  urgencyHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  urgencyIcon: {
    marginRight: 12,
  },
  urgencyName: {
    marginBottom: 0,
  },
  urgencyNameSelected: {
    color: '#667eea',
  },
  urgencyDescription: {
    color: '#718096',
  },
  urgencyDescriptionSelected: {
    color: '#667eea',
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
    borderColor: '#e5e7eb',
    borderStyle: 'dashed',
    borderRadius: 24,
  },
  photoButtonText: {
    marginTop: 12,
    marginBottom: 4,
  },
  photoButtonSubtext: {
    textAlign: 'center',
  },
  previewSection: {
    marginBottom: 32,
  },
  previewCard: {
    marginBottom: 0,
  },
  previewTitle: {
    marginBottom: 16,
  },
  previewContent: {
    padding: 20,
    borderWidth: 1,
    borderColor: 'rgba(102, 126, 234, 0.2)',
  },
  previewTaskTitle: {
    marginBottom: 8,
  },
  previewDescription: {
    marginBottom: 16,
    lineHeight: 22,
  },
  previewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
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