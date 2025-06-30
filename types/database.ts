export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string
          email: string
          full_name: string | null
          avatar_url: string | null
          phone: string | null
          university: string | null
          student_id: string | null
          verification_status: 'pending' | 'verified' | 'rejected'
          rating: number
          total_tasks_completed: number
          total_tasks_posted: number
          total_earnings: number
          created_at: string
          updated_at: string
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          university?: string | null
          student_id?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          rating?: number
          total_tasks_completed?: number
          total_tasks_posted?: number
          total_earnings?: number
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          university?: string | null
          student_id?: string | null
          verification_status?: 'pending' | 'verified' | 'rejected'
          rating?: number
          total_tasks_completed?: number
          total_tasks_posted?: number
          total_earnings?: number
          created_at?: string
          updated_at?: string
        }
      }
      tasks: {
        Row: {
          id: string
          title: string
          description: string
          category: string
          price: number
          time_estimate: string
          location: string
          location_details: string | null
          urgency: 'low' | 'normal' | 'high' | 'urgent'
          status: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
          poster_id: string
          assignee_id: string | null
          image_url: string | null
          requirements: string | null
          deadline: string | null
          created_at: string
          updated_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          title: string
          description: string
          category: string
          price: number
          time_estimate: string
          location: string
          location_details?: string | null
          urgency?: 'low' | 'normal' | 'high' | 'urgent'
          status?: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
          poster_id: string
          assignee_id?: string | null
          image_url?: string | null
          requirements?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          title?: string
          description?: string
          category?: string
          price?: number
          time_estimate?: string
          location?: string
          location_details?: string | null
          urgency?: 'low' | 'normal' | 'high' | 'urgent'
          status?: 'open' | 'assigned' | 'in_progress' | 'completed' | 'cancelled'
          poster_id?: string
          assignee_id?: string | null
          image_url?: string | null
          requirements?: string | null
          deadline?: string | null
          created_at?: string
          updated_at?: string
          completed_at?: string | null
        }
      }
      task_applications: {
        Row: {
          id: string
          task_id: string
          applicant_id: string
          message: string | null
          status: 'pending' | 'accepted' | 'rejected'
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          task_id: string
          applicant_id: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          applicant_id?: string
          message?: string | null
          status?: 'pending' | 'accepted' | 'rejected'
          created_at?: string
          updated_at?: string
        }
      }
      messages: {
        Row: {
          id: string
          task_id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type: 'text' | 'image' | 'location' | 'system'
          read_at: string | null
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type?: 'text' | 'image' | 'location' | 'system'
          read_at?: string | null
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          message_type?: 'text' | 'image' | 'location' | 'system'
          read_at?: string | null
          created_at?: string
        }
      }
      reviews: {
        Row: {
          id: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment: string | null
          review_type: 'poster_to_assignee' | 'assignee_to_poster'
          created_at: string
        }
        Insert: {
          id?: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          review_type: 'poster_to_assignee' | 'assignee_to_poster'
          created_at?: string
        }
        Update: {
          id?: string
          task_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          review_type?: 'poster_to_assignee' | 'assignee_to_poster'
          created_at?: string
        }
      }
      transactions: {
        Row: {
          id: string
          task_id: string
          payer_id: string
          payee_id: string
          amount: number
          transaction_type: 'payment' | 'refund' | 'withdrawal' | 'deposit'
          status: 'pending' | 'completed' | 'failed' | 'cancelled'
          payment_method: string | null
          stripe_payment_intent_id: string | null
          created_at: string
          completed_at: string | null
        }
        Insert: {
          id?: string
          task_id: string
          payer_id: string
          payee_id: string
          amount: number
          transaction_type: 'payment' | 'refund' | 'withdrawal' | 'deposit'
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          payment_method?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
          completed_at?: string | null
        }
        Update: {
          id?: string
          task_id?: string
          payer_id?: string
          payee_id?: string
          amount?: number
          transaction_type?: 'payment' | 'refund' | 'withdrawal' | 'deposit'
          status?: 'pending' | 'completed' | 'failed' | 'cancelled'
          payment_method?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string
          completed_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: 'task_update' | 'message' | 'payment' | 'review' | 'system'
          read_at: string | null
          action_url: string | null
          metadata: Json | null
          created_at: string
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: 'task_update' | 'message' | 'payment' | 'review' | 'system'
          read_at?: string | null
          action_url?: string | null
          metadata?: Json | null
          created_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: 'task_update' | 'message' | 'payment' | 'review' | 'system'
          read_at?: string | null
          action_url?: string | null
          metadata?: Json | null
          created_at?: string
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          is_active: boolean
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean
          sort_order?: number
          created_at?: string
        }
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}