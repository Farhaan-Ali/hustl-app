import { supabase } from './supabase';
import { Database } from '@/types/database';

type Profile = Database['public']['Tables']['profiles']['Row'];
type ProfileUpdate = Database['public']['Tables']['profiles']['Update'];

// Get current user profile
export const getCurrentProfile = async () => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', user.id)
    .single();

  if (error) throw error;
  return data;
};

// Get profile by ID
export const getProfileById = async (id: string) => {
  const { data, error } = await supabase
    .from('profiles')
    .select('*')
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Update profile
export const updateProfile = async (updates: ProfileUpdate) => {
  const { data: { user } } = await supabase.auth.getUser();
  if (!user) throw new Error('No authenticated user');

  const { data, error } = await supabase
    .from('profiles')
    .update(updates)
    .eq('id', user.id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update profile stats after task completion
export const updateProfileStats = async (userId: string, stats: {
  tasksCompleted?: number;
  tasksPosted?: number;
  earnings?: number;
  rating?: number;
}) => {
  const { data, error } = await supabase
    .from('profiles')
    .update({
      total_tasks_completed: stats.tasksCompleted,
      total_tasks_posted: stats.tasksPosted,
      total_earnings: stats.earnings,
      rating: stats.rating,
    })
    .eq('id', userId)
    .select()
    .single();

  if (error) throw error;
  return data;
};