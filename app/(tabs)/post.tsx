import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TextInput, TouchableOpacity, Alert } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { Coffee, Printer, Heart, ShoppingBag, MapPin, DollarSign, Clock, Camera } from 'lucide-react-native';

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
    { id: 'coffee', name: 'Coffee Run', icon: <Coffee size={24} color="#F97316" /> },
    { id: 'printing', name: 'Printing', icon: <Printer size={24} color="#3B82F6" /> },
    { id: 'petcare', name: 'Pet Care', icon: <Heart size={24} color="#EF4444" /> },
    { id: 'food', name: 'Food Delivery', icon: <ShoppingBag size={24} color="#10B981" /> },
    { id: 'shopping', name: 'Shopping', icon: <ShoppingBag size={24} color="#8B5CF6" /> },
  ];

  const urgencyLevels = [
    { id: 'normal', name: 'Normal', description: 'Within a few hours' },
    { id: 'urgent', name: 'Urgent', description: 'Within 30 minutes' },
    { id: 'asap', name: 'ASAP', description: 'Right now!' },
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
        'Task Posted!',
        'Your task has been posted successfully. Students nearby will be notified.',
        [{ text: 'OK', onPress: () => {
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
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <StatusBar style="dark" />
      
      {/* Header */}
      <View style={styles.header}>
        <Text style={styles.headerTitle}>Post a Task</Text>
        <Text style={styles.headerSubtitle}>Get help from fellow students</Text>
      </View>

      <View style={styles.form}>
        {/* Task Title */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Task Title *</Text>
          <TextInput
            style={[styles.input, errors.title && styles.inputError]}
            value={formData.title}
            onChangeText={(value) => updateFormData('title', value)}
            placeholder="e.g., Starbucks coffee run"
            placeholderTextColor="#9CA3AF"
          />
          {errors.title && <Text style={styles.errorText}>{errors.title}</Text>}
        </View>

        {/* Category Selection */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Category *</Text>
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
                <View style={styles.categoryIcon}>{category.icon}</View>
                <Text style={[
                  styles.categoryName,
                  formData.category === category.id && styles.categoryNameSelected
                ]}>
                  {category.name}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          {errors.category && <Text style={styles.errorText}>{errors.category}</Text>}
        </View>

        {/* Description */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Description *</Text>
          <TextInput
            style={[styles.textArea, errors.description && styles.inputError]}
            value={formData.description}
            onChangeText={(value) => updateFormData('description', value)}
            placeholder="Describe what you need done, include specific details..."
            placeholderTextColor="#9CA3AF"
            multiline
            numberOfLines={4}
            textAlignVertical="top"
          />
          {errors.description && <Text style={styles.errorText}>{errors.description}</Text>}
        </View>

        {/* Location */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Pickup/Delivery Location *</Text>
          <View style={styles.inputWithIcon}>
            <MapPin size={20} color="#6B7280" />
            <TextInput
              style={[styles.inputWithIconText, errors.location && styles.inputError]}
              value={formData.location}
              onChangeText={(value) => updateFormData('location', value)}
              placeholder="e.g., Turlington Plaza, Reitz Union"
              placeholderTextColor="#9CA3AF"
            />
          </View>
          {errors.location && <Text style={styles.errorText}>{errors.location}</Text>}
        </View>

        {/* Budget and Time */}
        <View style={styles.row}>
          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Budget *</Text>
            <View style={styles.inputWithIcon}>
              <DollarSign size={20} color="#6B7280" />
              <TextInput
                style={[styles.inputWithIconText, errors.budget && styles.inputError]}
                value={formData.budget}
                onChangeText={(value) => updateFormData('budget', value)}
                placeholder="15"
                placeholderTextColor="#9CA3AF"
                keyboardType="numeric"
              />
            </View>
            {errors.budget && <Text style={styles.errorText}>{errors.budget}</Text>}
          </View>

          <View style={[styles.inputGroup, styles.halfWidth]}>
            <Text style={styles.inputLabel}>Time Estimate *</Text>
            <View style={styles.inputWithIcon}>
              <Clock size={20} color="#6B7280" />
              <TextInput
                style={[styles.inputWithIconText, errors.timeEstimate && styles.inputError]}
                value={formData.timeEstimate}
                onChangeText={(value) => updateFormData('timeEstimate', value)}
                placeholder="30 min"
                placeholderTextColor="#9CA3AF"
              />
            </View>
            {errors.timeEstimate && <Text style={styles.errorText}>{errors.timeEstimate}</Text>}
          </View>
        </View>

        {/* Urgency Level */}
        <View style={styles.inputGroup}>
          <Text style={styles.inputLabel}>Urgency Level</Text>
          <View style={styles.urgencyOptions}>
            {urgencyLevels.map((level) => (
              <TouchableOpacity
                key={level.id}
                style={[
                  styles.urgencyOption,
                  formData.urgency === level.id && styles.urgencyOptionSelected
                ]}
                onPress={() => updateFormData('urgency', level.id)}
              >
                <Text style={[
                  styles.urgencyName,
                  formData.urgency === level.id && styles.urgencyNameSelected
                ]}>
                  {level.name}
                </Text>
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
        <TouchableOpacity style={styles.photoButton}>
          <Camera size={24} color="#6B7280" />
          <Text style={styles.photoButtonText}>Add Photo (Optional)</Text>
        </TouchableOpacity>

        {/* Submit Button */}
        <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
          <Text style={styles.submitButtonText}>Post Task</Text>
        </TouchableOpacity>

        {/* Terms */}
        <Text style={styles.termsText}>
          By posting a task, you agree to our Terms of Service and Community Guidelines.
        </Text>
      </View>
    </ScrollView>
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
  form: {
    padding: 20,
    gap: 24,
  },
  inputGroup: {
    gap: 8,
  },
  inputLabel: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
  },
  input: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
  },
  textArea: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
    fontSize: 16,
    color: '#111827',
    height: 100,
  },
  inputWithIcon: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 16,
    paddingVertical: 16,
  },
  inputWithIconText: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#111827',
  },
  inputError: {
    borderColor: '#EF4444',
  },
  errorText: {
    fontSize: 12,
    color: '#EF4444',
  },
  categoryGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 12,
  },
  categoryCard: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
    alignItems: 'center',
    width: '48%',
  },
  categoryCardSelected: {
    borderColor: '#3B82F6',
    backgroundColor: '#EFF6FF',
  },
  categoryIcon: {
    marginBottom: 8,
  },
  categoryName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#6B7280',
    textAlign: 'center',
  },
  categoryNameSelected: {
    color: '#3B82F6',
  },
  row: {
    flexDirection: 'row',
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  urgencyOptions: {
    gap: 12,
  },
  urgencyOption: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 16,
  },
  urgencyOptionSelected: {
    borderColor: '#F97316',
    backgroundColor: '#FFF7ED',
  },
  urgencyName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#374151',
    marginBottom: 4,
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
  photoButton: {
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    padding: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    borderStyle: 'dashed',
  },
  photoButtonText: {
    fontSize: 16,
    color: '#6B7280',
    marginLeft: 12,
  },
  submitButton: {
    backgroundColor: '#F97316',
    paddingVertical: 18,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#F97316',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  submitButtonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontWeight: '700',
  },
  termsText: {
    fontSize: 12,
    color: '#6B7280',
    textAlign: 'center',
    lineHeight: 18,
  },
});