export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      reforestation_projects: {
        Row: {
          area_coordinates: Json
          area_hectares: number
          climate_zone: string | null
          created_at: string | null
          description: string | null
          id: string
          name: string
          priority_score: number | null
          soil_type: string | null
          status: string | null
          updated_at: string | null
          user_id: string
        }
        Insert: {
          area_coordinates: Json
          area_hectares: number
          climate_zone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name: string
          priority_score?: number | null
          soil_type?: string | null
          status?: string | null
          updated_at?: string | null
          user_id: string
        }
        Update: {
          area_coordinates?: Json
          area_hectares?: number
          climate_zone?: string | null
          created_at?: string | null
          description?: string | null
          id?: string
          name?: string
          priority_score?: number | null
          soil_type?: string | null
          status?: string | null
          updated_at?: string | null
          user_id?: string
        }
        Relationships: []
      }
      species_recommendations: {
        Row: {
          created_at: string | null
          estimated_survival_rate: number
          id: string
          priority_level: string
          project_id: string
          recommendation_reason: string | null
          recommended_density_per_hectare: number
          species_id: string
          suitability_score: number
        }
        Insert: {
          created_at?: string | null
          estimated_survival_rate: number
          id?: string
          priority_level: string
          project_id: string
          recommendation_reason?: string | null
          recommended_density_per_hectare: number
          species_id: string
          suitability_score: number
        }
        Update: {
          created_at?: string | null
          estimated_survival_rate?: number
          id?: string
          priority_level?: string
          project_id?: string
          recommendation_reason?: string | null
          recommended_density_per_hectare?: number
          species_id?: string
          suitability_score?: number
        }
        Relationships: [
          {
            foreignKeyName: "species_recommendations_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "reforestation_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "species_recommendations_species_id_fkey"
            columns: ["species_id"]
            isOneToOne: false
            referencedRelation: "tree_species"
            referencedColumns: ["id"]
          },
        ]
      }
      tree_species: {
        Row: {
          biodiversity_value: number | null
          carbon_sequestration_rate: number | null
          common_name: string
          created_at: string | null
          drought_tolerance: string | null
          erosion_control_value: number | null
          growth_rate: string | null
          id: string
          max_height_m: number | null
          max_rainfall_mm: number
          max_temperature_c: number
          min_rainfall_mm: number
          min_temperature_c: number
          native_regions: string[]
          scientific_name: string
          soil_types: string[]
          updated_at: string | null
        }
        Insert: {
          biodiversity_value?: number | null
          carbon_sequestration_rate?: number | null
          common_name: string
          created_at?: string | null
          drought_tolerance?: string | null
          erosion_control_value?: number | null
          growth_rate?: string | null
          id?: string
          max_height_m?: number | null
          max_rainfall_mm: number
          max_temperature_c: number
          min_rainfall_mm: number
          min_temperature_c: number
          native_regions: string[]
          scientific_name: string
          soil_types: string[]
          updated_at?: string | null
        }
        Update: {
          biodiversity_value?: number | null
          carbon_sequestration_rate?: number | null
          common_name?: string
          created_at?: string | null
          drought_tolerance?: string | null
          erosion_control_value?: number | null
          growth_rate?: string | null
          id?: string
          max_height_m?: number | null
          max_rainfall_mm?: number
          max_temperature_c?: number
          min_rainfall_mm?: number
          min_temperature_c?: number
          native_regions?: string[]
          scientific_name?: string
          soil_types?: string[]
          updated_at?: string | null
        }
        Relationships: []
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

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {},
  },
} as const
