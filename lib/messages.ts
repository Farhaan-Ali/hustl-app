import { supabase } from './supabase';
import { Database } from '@/types/database';

type Message = Database['public']['Tables']['messages']['Row'];
type MessageInsert = Database['public']['Tables']['messages']['Insert'];

// Get messages for a task
export const getTaskMessages = async (taskId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(
        id,
        full_name,
        avatar_url
      ),
      receiver:profiles!messages_receiver_id_fkey(
        id,
        full_name,
        avatar_url
      )
    `)
    .eq('task_id', taskId)
    .order('created_at', { ascending: true });

  if (error) throw error;
  return data;
};

// Send a message
export const sendMessage = async (message: MessageInsert) => {
  const { data, error } = await supabase
    .from('messages')
    .insert(message)
    .select(`
      *,
      sender:profiles!messages_sender_id_fkey(
        id,
        full_name,
        avatar_url
      ),
      receiver:profiles!messages_receiver_id_fkey(
        id,
        full_name,
        avatar_url
      )
    `)
    .single();

  if (error) throw error;
  return data;
};

// Mark message as read
export const markMessageAsRead = async (messageId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .update({ read_at: new Date().toISOString() })
    .eq('id', messageId)
    .select()
    .single();

  if (error) throw error;
  return data;
};

// Get conversation list for user
export const getUserConversations = async (userId: string) => {
  const { data, error } = await supabase
    .from('messages')
    .select(`
      task_id,
      sender_id,
      receiver_id,
      content,
      created_at,
      task:tasks(
        id,
        title,
        status,
        price
      ),
      sender:profiles!messages_sender_id_fkey(
        id,
        full_name,
        avatar_url
      ),
      receiver:profiles!messages_receiver_id_fkey(
        id,
        full_name,
        avatar_url
      )
    `)
    .or(`sender_id.eq.${userId},receiver_id.eq.${userId}`)
    .order('created_at', { ascending: false });

  if (error) throw error;

  // Group by task and get latest message for each
  const conversations = data.reduce((acc: any[], message: any) => {
    const existingConv = acc.find(conv => conv.task_id === message.task_id);
    if (!existingConv) {
      acc.push({
        task_id: message.task_id,
        task: message.task,
        other_user: message.sender_id === userId ? message.receiver : message.sender,
        latest_message: message.content,
        latest_message_time: message.created_at,
        unread_count: 0, // TODO: Calculate unread count
      });
    }
    return acc;
  }, []);

  return conversations;
};

// Subscribe to real-time messages for a task
export const subscribeToTaskMessages = (taskId: string, callback: (message: any) => void) => {
  return supabase
    .channel(`task-messages-${taskId}`)
    .on(
      'postgres_changes',
      {
        event: 'INSERT',
        schema: 'public',
        table: 'messages',
        filter: `task_id=eq.${taskId}`,
      },
      callback
    )
    .subscribe();
};