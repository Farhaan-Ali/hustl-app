import React, { useState, useRef, useEffect } from 'react';
import { View, StyleSheet, ScrollView, TouchableOpacity, Alert, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, ShoppingBag, MapPin, DollarSign, Clock, Camera } from 'lucide-react-native';
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
      variant: 'secondary' as const
    },
    { 
      id: 'printing', 
      name: 'Printing', 
      icon: <Printer size={24} color="#FFFFFF" />, 
      variant: 'primary' as const
    },
    { 
      id: 'petcare', 
      name: 'Pet Care', 
      icon: <Heart size={24} color="#E6501E" />, 
      variant: 'accent' as const
    },
    { 
      id: 'shopping', 
      name: 'Shopping', 
      icon: <ShoppingBag size={24} color="#FFFFFF" />, 
      variant: 'primary' as const
    },
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