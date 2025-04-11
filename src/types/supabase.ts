
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
      events: {
        Row: {
          id: string
          title: string
          description: string
          long_description: string | null
          image_url: string
          date: string
          end_date: string | null
          time: string
          location_name: string
          location_address: string
          location_city: string
          location_country: string
          location_lat: number | null
          location_lng: number | null
          price_currency: string
          price_value: number
          price_formatted: string
          is_free: boolean
          category: string
          tags: string[]
          is_featured: boolean
          is_trending: boolean
          created_at: string
        }
        Insert: {
          id?: string
          title: string
          description: string
          long_description?: string | null
          image_url: string
          date: string
          end_date?: string | null
          time: string
          location_name: string
          location_address: string
          location_city: string
          location_country: string
          location_lat?: number | null
          location_lng?: number | null
          price_currency: string
          price_value: number
          price_formatted: string
          is_free: boolean
          category: string
          tags: string[]
          is_featured?: boolean
          is_trending?: boolean
          created_at?: string
        }
        Update: {
          id?: string
          title?: string
          description?: string
          long_description?: string | null
          image_url?: string
          date?: string
          end_date?: string | null
          time?: string
          location_name?: string
          location_address?: string
          location_city?: string
          location_country?: string
          location_lat?: number | null
          location_lng?: number | null
          price_currency?: string
          price_value?: number
          price_formatted?: string
          is_free?: boolean
          category?: string
          tags?: string[]
          is_featured?: boolean
          is_trending?: boolean
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
  }
}
