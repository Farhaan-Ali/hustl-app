import { supabase } from './supabase';
import { Database } from '@/types/database';

type Task = Database['public']['Tables']['tasks']['Row'];
type TaskInsert = Database['public']['Tables']['tasks']['Insert'];
type TaskUpdate = Database['public']['Tables']['tasks']['Update'];

// Get all tasks with poster information
export const getTasks = async (filters?: {
  category?: string;
  status?: string;
  search?: string;
}) => {
  let query = supabase
    .from('tasks')
    .select(`
      *,
      poster:profiles!tasks_poster_id_fkey(
        id,
        full_name,
        avatar_url,
        rating
      ),
      assignee:profiles!tasks_assignee_id_fkey(
        id,
        full_name,
        avatar_url,
        rating
      )
    `)
    .order('created_at', { ascending: false });

  if (filters?.category && filters.category !== 'All') {
    query = query.eq('category', filters.category);
  }

  if (filters?.status) {
    query = query.eq('status', filters.status);
  }

  if (filters?.search) {
    query = query.or(`title.ilike.%${filters.search}%,description.ilike.%${filters.search}%`);
  }

  const { data, error } = await query;
  if (error) throw error;
  return data;
};

// Get task by ID
export const getTaskById = async (id: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      poster:profiles!tasks_poster_id_fkey(
        id,
        full_name,
        avatar_url,
        rating,
        phone
      ),
      assignee:profiles!tasks_assignee_id_fkey(
        id,
        full_name,
        avatar_url,
        rating,
        phone
      )
    `)
    .eq('id', id)
    .single();

  if (error) throw error;
  return data;
};

// Create a new task
export const createTask = async (task: TaskInsert) => {
  const { data, error } = await supabase
    .from('tasks')
    .insert(task)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Update a task
export const updateTask = async (id: string, updates: TaskUpdate) => {
  const { data, error } = await supabase
    .from('tasks')
    .update(updates)
    .eq('id', id)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Delete a task
export const deleteTask = async (id: string) => {
  const { error } = await supabase
    .from('tasks')
    .delete()
    .eq('id', id);

  if (error) throw error;
};

// Get tasks posted by user
export const getUserPostedTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      assignee:profiles!tasks_assignee_id_fkey(
        id,
        full_name,
        avatar_url,
        rating
      )
    `)
    .eq('poster_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Get tasks assigned to user
export const getUserAssignedTasks = async (userId: string) => {
  const { data, error } = await supabase
    .from('tasks')
    .select(`
      *,
      poster:profiles!tasks_poster_id_fkey(
        id,
        full_name,
        avatar_url,
        rating
      )
    `)
    .eq('assignee_id', userId)
    .order('created_at', { ascending: false });

  if (error) throw error;
  return data;
};

// Get categories
export const getCategories = async () => {
  const { data, error } = await supabase
    .from('categories')
    .select('*')
    .eq('is_active', true)
    .order('sort_order');

  if (error) throw error;
  return data;
};