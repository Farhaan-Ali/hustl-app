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
          verification_status: string | null
          rating: number | null
          total_tasks_completed: number | null
          total_tasks_posted: number | null
          total_earnings: number | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id: string
          email: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          university?: string | null
          student_id?: string | null
          verification_status?: string | null
          rating?: number | null
          total_tasks_completed?: number | null
          total_tasks_posted?: number | null
          total_earnings?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          email?: string
          full_name?: string | null
          avatar_url?: string | null
          phone?: string | null
          university?: string | null
          student_id?: string | null
          verification_status?: string | null
          rating?: number | null
          total_tasks_completed?: number | null
          total_tasks_posted?: number | null
          total_earnings?: number | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      categories: {
        Row: {
          id: string
          name: string
          description: string | null
          icon: string | null
          color: string | null
          is_active: boolean | null
          sort_order: number | null
          created_at: string | null
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          icon?: string | null
          color?: string | null
          is_active?: boolean | null
          sort_order?: number | null
          created_at?: string | null
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
          urgency: string | null
          status: string | null
          poster_id: string
          assignee_id: string | null
          image_url: string | null
          requirements: string | null
          deadline: string | null
          created_at: string | null
          updated_at: string | null
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
          urgency?: string | null
          status?: string | null
          poster_id: string
          assignee_id?: string | null
          image_url?: string | null
          requirements?: string | null
          deadline?: string | null
          created_at?: string | null
          updated_at?: string | null
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
          urgency?: string | null
          status?: string | null
          poster_id?: string
          assignee_id?: string | null
          image_url?: string | null
          requirements?: string | null
          deadline?: string | null
          created_at?: string | null
          updated_at?: string | null
          completed_at?: string | null
        }
      }
      task_applications: {
        Row: {
          id: string
          task_id: string
          applicant_id: string
          message: string | null
          status: string | null
          created_at: string | null
          updated_at: string | null
        }
        Insert: {
          id?: string
          task_id: string
          applicant_id: string
          message?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
        Update: {
          id?: string
          task_id?: string
          applicant_id?: string
          message?: string | null
          status?: string | null
          created_at?: string | null
          updated_at?: string | null
        }
      }
      messages: {
        Row: {
          id: string
          task_id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type: string | null
          read_at: string | null
          created_at: string | null
        }
        Insert: {
          id?: string
          task_id: string
          sender_id: string
          receiver_id: string
          content: string
          message_type?: string | null
          read_at?: string | null
          created_at?: string | null
        }
        Update: {
          id?: string
          task_id?: string
          sender_id?: string
          receiver_id?: string
          content?: string
          message_type?: string | null
          read_at?: string | null
          created_at?: string | null
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
          review_type: string
          created_at: string | null
        }
        Insert: {
          id?: string
          task_id: string
          reviewer_id: string
          reviewee_id: string
          rating: number
          comment?: string | null
          review_type: string
          created_at?: string | null
        }
        Update: {
          id?: string
          task_id?: string
          reviewer_id?: string
          reviewee_id?: string
          rating?: number
          comment?: string | null
          review_type?: string
          created_at?: string | null
        }
      }
      transactions: {
        Row: {
          id: string
          task_id: string
          payer_id: string
          payee_id: string
          amount: number
          transaction_type: string
          status: string | null
          payment_method: string | null
          stripe_payment_intent_id: string | null
          created_at: string | null
          completed_at: string | null
        }
        Insert: {
          id?: string
          task_id: string
          payer_id: string
          payee_id: string
          amount: number
          transaction_type: string
          status?: string | null
          payment_method?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string | null
          completed_at?: string | null
        }
        Update: {
          id?: string
          task_id?: string
          payer_id?: string
          payee_id?: string
          amount?: number
          transaction_type?: string
          status?: string | null
          payment_method?: string | null
          stripe_payment_intent_id?: string | null
          created_at?: string | null
          completed_at?: string | null
        }
      }
      notifications: {
        Row: {
          id: string
          user_id: string
          title: string
          message: string
          type: string
          read_at: string | null
          action_url: string | null
          metadata: Json | null
          created_at: string | null
        }
        Insert: {
          id?: string
          user_id: string
          title: string
          message: string
          type: string
          read_at?: string | null
          action_url?: string | null
          metadata?: Json | null
          created_at?: string | null
        }
        Update: {
          id?: string
          user_id?: string
          title?: string
          message?: string
          type?: string
          read_at?: string | null
          action_url?: string | null
          metadata?: Json | null
          created_at?: string | null
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