export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  public: {
    Tables: {
      brands: {
        Row: {
          id: number
          name: string
          slug: string
          origin: string
          description: string
          image_url: string | null
          created_at: string
        }
        Insert: {
          id?: number
          name: string
          slug: string
          origin?: string
          description?: string
          image_url?: string | null
          created_at?: string
        }
        Update: {
          id?: number
          name?: string
          slug?: string
          origin?: string
          description?: string
          image_url?: string | null
          created_at?: string
        }
        Relationships: []
      }
      products: {
        Row: {
          id: number
          brand_id: number
          slug: string
          name: string
          reference: string
          short_desc: string
          description: string
          price: string
          price_value: number
          badge: string | null
          diameter_mm: number | null
          case_material: string | null
          dial_color: string | null
          movement_type: string | null
          water_resistance_m: number | null
          crystal: string | null
          bracelet_material: string | null
          colors: Json
          images: string[]
          created_at: string
        }
        Insert: {
          id?: number
          brand_id: number
          slug: string
          name: string
          reference?: string
          short_desc?: string
          description?: string
          price: string
          price_value: number
          badge?: string | null
          diameter_mm?: number | null
          case_material?: string | null
          dial_color?: string | null
          movement_type?: string | null
          water_resistance_m?: number | null
          crystal?: string | null
          bracelet_material?: string | null
          colors?: Json
          images?: string[]
          created_at?: string
        }
        Update: {
          id?: number
          brand_id?: number
          slug?: string
          name?: string
          reference?: string
          short_desc?: string
          description?: string
          price?: string
          price_value?: number
          badge?: string | null
          diameter_mm?: number | null
          case_material?: string | null
          dial_color?: string | null
          movement_type?: string | null
          water_resistance_m?: number | null
          crystal?: string | null
          bracelet_material?: string | null
          colors?: Json
          images?: string[]
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'products_brand_id_fkey'
            columns: ['brand_id']
            referencedRelation: 'brands'
            referencedColumns: ['id']
          }
        ]
      }
      files_product: {
        Row: {
          id: string
          product_id: number | null
          storage_path: string
          public_url: string
          filename: string
          size_bytes: number | null
          mime_type: string
          sort_order: number
          created_at: string
        }
        Insert: {
          id?: string
          product_id?: number | null
          storage_path: string
          public_url: string
          filename?: string
          size_bytes?: number | null
          mime_type?: string
          sort_order?: number
          created_at?: string
        }
        Update: {
          id?: string
          product_id?: number | null
          storage_path?: string
          public_url?: string
          filename?: string
          size_bytes?: number | null
          mime_type?: string
          sort_order?: number
          created_at?: string
        }
        Relationships: [
          {
            foreignKeyName: 'files_product_product_id_fkey'
            columns: ['product_id']
            referencedRelation: 'products'
            referencedColumns: ['id']
          }
        ]
      }
    }
    Views: { [_ in never]: never }
    Functions: { [_ in never]: never }
    Enums: { [_ in never]: never }
    CompositeTypes: { [_ in never]: never }
  }
}

type DatabaseWithoutInternals = Omit<Database, '__InternalSupabase'>
type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, 'public'>]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends { schema: keyof DatabaseWithoutInternals }
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Tables'] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions['schema']]['Views'])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema['Tables'] & DefaultSchema['Views'])
    ? (DefaultSchema['Tables'] &
        DefaultSchema['Views'])[DefaultSchemaTableNameOrOptions] extends { Row: infer R }
      ? R
      : never
    : never

// ─── Shortcuts ───────────────────────────────────────────────────────────────

export type Brand   = Tables<'brands'>
export type Product = Tables<'products'>
export type FileProduct = Tables<'files_product'>

/** Producto enriquecido con datos de la marca (para catálogo y detalle) */
export type ProductWithBrand = Product & {
  brand: Pick<Brand, 'id' | 'name' | 'slug'>
}

/** Campos para cards / listados */
export type ProductCard = Pick<
  Product,
  'id' | 'slug' | 'name' | 'price' | 'price_value' | 'badge' | 'images' | 'short_desc'
> & {
  brand: Pick<Brand, 'name' | 'slug'>
}

export const Constants = {
  public: { Enums: {} },
} as const
