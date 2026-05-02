import { supabase } from '#/utils/supabase'

// ============================================================
// Interfaces
// ============================================================

export interface AnalyticsEvent {
  post_id: string
  post_type: 'blog' | 'news'
  event_type: 'view' | 'scroll_depth' | 'read_complete' | 'exit'
  session_id: string
  visitor_id?: string | null
  scroll_pct?: 25 | 50 | 75 | 100 | null
  time_spent?: number | null
  referrer?: string | null
  device?: 'mobile' | 'tablet' | 'desktop' | null
}

export interface OverviewStats {
  totalViews: number
  uniqueVisitors: number
  avgTimeSpent: number
  completionRate: number
}

export interface DailyPoint {
  day: string
  views: number
  uniqueVisitors: number
}

export interface TopPost {
  postId: string
  views: number
  uniqueVisitors: number
  avgTimeSpent: number
  completionRate: number
}

export interface BreakdownItem {
  dimension: string
  value: string
  count: number
}

// ============================================================
// trackEvent
// ============================================================

export async function trackEvent(event: AnalyticsEvent): Promise<void> {
  const { error } = await (supabase as any)
    .from('post_analytics')
    .insert({
      post_id:    event.post_id,
      post_type:  event.post_type,
      event_type: event.event_type,
      session_id: event.session_id,
      visitor_id: event.visitor_id  ?? null,
      scroll_pct: event.scroll_pct  ?? null,
      time_spent: event.time_spent  ?? null,
      referrer:   event.referrer    ?? null,
      device:     event.device      ?? null,
    })

  if (error) throw error
}

// ============================================================
// getOverview
// ============================================================

export async function getOverview(
  postType: string,
  days: number,
): Promise<OverviewStats> {
  const { data, error } = await (supabase as any).rpc('get_analytics_overview', {
    p_post_type: postType,
    p_days:      days,
  })

  if (error) throw error

  // rpc returns an array with one row for set-returning functions
  const row = Array.isArray(data) ? data[0] : data

  return {
    totalViews:     Number(row?.total_views     ?? 0),
    uniqueVisitors: Number(row?.unique_visitors ?? 0),
    avgTimeSpent:   Number(row?.avg_time_spent  ?? 0),
    completionRate: Number(row?.completion_rate ?? 0),
  }
}

// ============================================================
// getTimeseries
// ============================================================

export async function getTimeseries(
  postType: string,
  days: number,
): Promise<DailyPoint[]> {
  const { data, error } = await (supabase as any).rpc('get_analytics_timeseries', {
    p_post_type: postType,
    p_days:      days,
  })

  if (error) throw error

  return ((data as any[]) ?? []).map((row) => ({
    day:            String(row.day),
    views:          Number(row.views),
    uniqueVisitors: Number(row.unique_visitors),
  }))
}

// ============================================================
// getTopPosts
// ============================================================

export async function getTopPosts(
  postType: string,
  days: number,
): Promise<TopPost[]> {
  const { data, error } = await (supabase as any).rpc('get_analytics_top_posts', {
    p_post_type: postType,
    p_days:      days,
  })

  if (error) throw error

  return ((data as any[]) ?? []).map((row) => ({
    postId:         String(row.post_id),
    views:          Number(row.views),
    uniqueVisitors: Number(row.unique_visitors),
    avgTimeSpent:   Number(row.avg_time_spent  ?? 0),
    completionRate: Number(row.completion_rate ?? 0),
  }))
}

// ============================================================
// getBreakdown
// ============================================================

export async function getBreakdown(
  postType: string,
  days: number,
): Promise<BreakdownItem[]> {
  const { data, error } = await (supabase as any).rpc('get_analytics_breakdown', {
    p_post_type: postType,
    p_days:      days,
  })

  if (error) throw error

  return ((data as any[]) ?? []).map((row) => ({
    dimension: String(row.dimension),
    value:     String(row.value),
    count:     Number(row.count),
  }))
}