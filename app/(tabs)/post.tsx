import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, ShoppingBag, MapPin, DollarSign, Clock, Camera, Zap, Users } from 'lucide-react-native';
import { HustlLogo } from '@/components/HustlLogo';
import { Card } from '@/components/ui/Card';
import { Input } from '@/components/ui/Input';
import { Button } from '@/components/ui/Button';
import { Badge } from '@/components/ui/Badge';

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

  const categories = [
    { 
      id: 'coffee', 
      name: 'Coffee Run', 
      icon: <Coffee size={24} color="#F97316" />, 
      color: '#FFF7ED',
      description: 'Quick caffeine fixes'
    },
    { 
      id: 'printing', 
      name: 'Printing', 
      icon: <Printer size={24} color="#3B82F6" />, 
      color: '#EFF6FF',
      description: 'Documents & materials'
    },
    { 
      id: 'petcare', 
      name: 'Pet Care', 
      icon: <Heart size={24} color="#EF4444" />, 
      color: '#FEF2F2',
      description: 'Walking & sitting'
    },
    { 
      id: 'food', 
      name: 'Food Delivery', 
      icon: <ShoppingBag size={24} color="#10B981" />, 
      color: '#ECFDF5',
      description: 'Pickup & delivery'
    },
    { 
      id: 'shopping', 
      name: 'Shopping', 
      icon: <ShoppingBag size={24} color="#8B5CF6" />, 
      color: '#F3F4F6',
      description: 'Errands & purchases'
    },
  ];

  const urgencyLevels = [
    { 
      id: 'normal', 
      name: 'Normal', 
      description: 'Within a few hours',
      icon: <Clock size={20} color="#6B7280" />,
      color: '#F3F4F6'
    },
    { 
      id: 'urgent', 
      name: 'Urgent', 
      description: 'Within 30 minutes',
      icon: <Zap size={20} color="#F97316" />,
      color: '#FFF7ED'
    },
    { 
      id: 'asap', 
      name: 'ASAP', 
      description: 'Right now!',
      icon: <Users size={20} color="#EF4444" />,
      color: '#FEF2F2'
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
      <StatusBar style="dark" />
      
      {/* Premium Header */}
      <View style={styles.header}>
        <View style={styles.headerTop}>
          <HustlLogo size={32} />
          <View style={styles.headerText}>
            <Text style={styles.headerTitle}>Post Task</Text>
            <Text style={styles.headerSubtitle}>Get help from fellow students</Text>
          </View>
          <Badge variant="success" size="sm">
            <Text>Live</Text>
          </Badge>
        </View>
      </View>

      <ScrollView style={styles.form} showsVerticalScrollIndicator={false}>
        {/* Task Title */}
        <Input
          label="What do you need help with?"
          placeholder="e.g., Starbucks coffee run to Reitz Union"
          value={formData.title}
          onChangeText={(value) => updateFormData('title', value)}
          error={errors.title}
        />

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Category</Text>
          <View style={styles.categoryGrid}>
            {categories.map((category) => (
              <TouchableOpacity
                key={category.id}
                style={[
                  styles.categoryCard,
                  { backgroundColor: category.color },
                  formData.category === category.id && styles.categoryCardSelected
                ]}
                onPress={() => updateFormData('category', category.id)}
              >
                <View style={styles.categoryIcon}>{category.icon}</View>
                <Text style={[
                  styles.categoryName,
                  formData.category === category.id && styles.categoryNameSelected
                ]}>
                  {category.name}
                </Text>
                <Text style={styles.categoryDescription}>{category.description}</Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Description */}
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

        {/* Location */}
        <Input
          label="Pickup/Delivery Location"
          placeholder="e.g., Turlington Plaza, Reitz Union, Library West"
          value={formData.location}
          onChangeText={(value) => updateFormData('location', value)}
          error={errors.location}
          icon={<MapPin size={20} color="#6B7280" />}
        />

        {/* Budget and Time Row */}
        <View style={styles.row}>
          <View style={styles.halfWidth}>
            <Input
              label="Budget ($)"
              placeholder="15"
              value={formData.budget}
              onChangeText={(value) => updateFormData('budget', value)}
              error={errors.budget}
              keyboardType="numeric"
              icon={<DollarSign size={20} color="#6B7280" />}
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
              icon={<Clock size={20} color="#6B7280" />}
              containerStyle={styles.halfInput}
            />
          </View>
        </View>

        {/* Urgency Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Urgency Level</Text>
          <View style={styles.urgencyGrid}>
            {urgencyLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.urgencyCard,
                  { backgroundColor: level.color },
                  formData.urgency === level.id && styles.urgencyCardSelected
                ]}
                onPress={() => updateFormData('urgency', level.id)}
              >
                <View style={styles.urgencyHeader}>
                  <View style={styles.urgencyIcon}>{level.icon}</View>
                  <Text style={[
                    styles.urgencyName,
                    formData.urgency === level.id && styles.urgencyNameSelected
                  ]}>
                    {level.name}
                  </Text>
                </View>
                <Text style={[
                  styles.urgencyDescription,
                  formData.urgency === level.id && styles.urgencyDescriptionSelected
                ]}>
                  {level.description}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>

        {/* Add Photo */}
        <Card style={styles.photoCard}>
          <TouchableOpacity style={styles.photoButton}>
            <Camera size={24} color="#6B7280" />
            <Text style={styles.photoButtonText}>Add Photo (Optional)</Text>
            <Text style={styles.photoButtonSubtext}>Help others understand your task better</Text>
          </TouchableOpacity>
        </Card>

        {/* Task Preview */}
        <Card style={styles.previewCard} gradient gradientColors={['#F8FAFC', '#FFFFFF']}>
          <Text style={styles.previewTitle}>Task Preview</Text>
          <View style={styles.previewContent}>
            <Text style={styles.previewTaskTitle}>{formData.title || 'Your task title'}</Text>
            <Text style={styles.previewDescription}>{formData.description || 'Task description will appear here'}</Text>
            <View style={styles.previewMeta}>
              <Badge variant="info" size="sm">
                <Text>{formData.category || 'Category'}</Text>
              </Badge>
              <Text style={styles.previewPrice}>${formData.budget || '0'}</Text>
            </View>
          </View>
        </Card>

        {/* Submit Button */}
        <Button
          title="Post Task"
          onPress={handleSubmit}
          variant="primary"
          size="lg"
          gradient
          style={styles.submitButton}
        />

        {/* Terms */}
        <Text style={styles.termsText}>
          By posting a task, you agree to our Terms of Service and Community Guidelines. 
          Payment will be held securely until task completion.
        </Text>
      </ScrollView>
    </View>
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
  form: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 24,
  },
  inputGroup: {
    marginBottom: 24,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 12,
  },
  categoryGrid: {
    gap: 12,
  },
  categoryCard: {
    padding: 20,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  categoryCardSelected: {
    borderColor: '#3B82F6',
    shadowColor: '#3B82F6',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
  },
  categoryIcon: {
    marginBottom: 12,
  },
  categoryName: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 4,
  },
  categoryNameSelected: {
    color: '#3B82F6',
  },
  categoryDescription: {
    fontSize: 12,
    color: '#6B7280',
  },
  textArea: {
    height: 100,
    textAlignVertical: 'top',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
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
    padding: 16,
    borderRadius: 16,
    borderWidth: 2,
    borderColor: 'transparent',
  },
  urgencyCardSelected: {
    borderColor: '#F97316',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 0 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 2,
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
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
  },
  urgencyNameSelected: {
    color: '#F97316',
  },
  urgencyDescription: {
    fontSize: 14,
    color: '#6B7280',
  },
  urgencyDescriptionSelected: {
    color: '#EA580C',
  },
  photoCard: {
    marginBottom: 24,
    padding: 0,
  },
  photoButton: {
    padding: 24,
    alignItems: 'center',
    borderWidth: 2,
    borderColor: '#E5E7EB',
    borderStyle: 'dashed',
    borderRadius: 16,
  },
  photoButtonText: {
    fontSize: 16,
    color: '#6B7280',
    fontWeight: '600',
    marginTop: 8,
  },
  photoButtonSubtext: {
    fontSize: 12,
    color: '#9CA3AF',
    marginTop: 4,
  },
  previewCard: {
    marginBottom: 32,
  },
  previewTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#374151',
    marginBottom: 16,
  },
  previewContent: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    borderWidth: 1,
    borderColor: '#E5E7EB',
  },
  previewTaskTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#111827',
    marginBottom: 8,
  },
  previewDescription: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 12,
    lineHeight: 20,
  },
  previewMeta: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  previewPrice: {
    fontSize: 20,
    fontWeight: '800',
    color: '#F97316',
  },
  submitButton: {
    marginBottom: 24,
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
    marginBottom: 40,
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
    marginTop: 4,
  },
});