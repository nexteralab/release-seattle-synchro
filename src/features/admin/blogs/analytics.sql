-- ============================================================
-- post_analytics: tracks engagement events for blog/news posts
-- ============================================================

create table if not exists post_analytics (
  id          uuid        primary key default gen_random_uuid(),
  post_id     uuid        not null,
  post_type   text        not null default 'blog'
                          check (post_type in ('blog', 'news')),
  event_type  text        not null
                          check (event_type in ('view', 'scroll_depth', 'read_complete', 'exit')),
  session_id  uuid        not null,
  visitor_id  uuid        null,     -- persistent cookie ss_vid (null if no consent)
  scroll_pct  smallint    null
                          check (scroll_pct in (25, 50, 75, 100)),
  time_spent  smallint    null,          -- seconds
  referrer    text        null,
  device      text        null
                          check (device in ('mobile', 'tablet', 'desktop')),
  created_at  timestamptz not null default now()
);

-- Indexes
create index if not exists idx_post_analytics_post_id_created_at
  on post_analytics (post_id, created_at desc);

create index if not exists idx_post_analytics_post_type_event_type_created_at
  on post_analytics (post_type, event_type, created_at desc);

create index if not exists idx_post_analytics_session_id
  on post_analytics (session_id);

create index if not exists idx_post_analytics_visitor_id
  on post_analytics (visitor_id)
  where visitor_id is not null;

-- ============================================================
-- Row-Level Security
-- ============================================================

alter table post_analytics enable row level security;

-- Anyone can insert events (anon = public visitors, authenticated = admin browsing the site)
create policy "public_insert_post_analytics"
  on post_analytics
  for insert
  to anon, authenticated
  with check (true);

-- Authenticated users (admin) can read all analytics
create policy "auth_select_post_analytics"
  on post_analytics
  for select
  to authenticated
  using (true);

-- ============================================================
-- Function 1: get_analytics_overview
-- Returns aggregate KPIs for a given post_type over the last p_days days.
-- ============================================================

create or replace function get_analytics_overview(
  p_post_type text,
  p_days      int
)
returns table (
  total_views       bigint,
  unique_visitors   bigint,
  avg_time_spent    numeric,
  completion_rate   numeric
)
language sql
security definer
as $$
  select
    -- total view events
    count(*) filter (where event_type = 'view')                                       as total_views,
    -- distinct sessions that had at least one view
    count(distinct session_id) filter (where event_type = 'view')                    as unique_visitors,
    -- average seconds spent (from exit events)
    round(avg(time_spent) filter (where event_type = 'exit'), 2)                     as avg_time_spent,
    -- % of view sessions that also fired read_complete
    (
      count(distinct session_id) filter (where event_type = 'read_complete')
      * 100.0
      / nullif(
          count(distinct session_id) filter (where event_type = 'view'),
          0
        )
    )                                                                                  as completion_rate
  from post_analytics
  where post_type  = p_post_type
    and created_at >= now() - (p_days || ' days')::interval;
$$;

-- ============================================================
-- Function 2: get_analytics_timeseries
-- Returns daily view counts for the last p_days days.
-- ============================================================

create or replace function get_analytics_timeseries(
  p_post_type text,
  p_days      int
)
returns table (
  day              date,
  views            bigint,
  unique_visitors  bigint
)
language sql
security definer
as $$
  select
    created_at::date                   as day,
    count(*)                           as views,
    count(distinct session_id)         as unique_visitors
  from post_analytics
  where post_type  = p_post_type
    and event_type = 'view'
    and created_at >= now() - (p_days || ' days')::interval
  group by created_at::date
  order by created_at::date;
$$;

-- ============================================================
-- Function 3: get_analytics_top_posts
-- Returns the top p_limit posts by view count.
-- ============================================================

create or replace function get_analytics_top_posts(
  p_post_type text,
  p_days      int,
  p_limit     int default 10
)
returns table (
  post_id          uuid,
  views            bigint,
  unique_visitors  bigint,
  avg_time_spent   numeric,
  completion_rate  numeric
)
language sql
security definer
as $$
  select
    pa.post_id,
    count(*)         filter (where pa.event_type = 'view')                             as views,
    count(distinct pa.session_id) filter (where pa.event_type = 'view')               as unique_visitors,
    round(avg(pa.time_spent) filter (where pa.event_type = 'exit'), 2)                as avg_time_spent,
    (
      count(distinct pa.session_id) filter (where pa.event_type = 'read_complete')
      * 100.0
      / nullif(
          count(distinct pa.session_id) filter (where pa.event_type = 'view'),
          0
        )
    )                                                                                   as completion_rate
  from post_analytics pa
  where pa.post_type  = p_post_type
    and pa.created_at >= now() - (p_days || ' days')::interval
  group by pa.post_id
  order by views desc
  limit p_limit;
$$;

-- ============================================================
-- Function 4: get_analytics_breakdown
-- Returns dimensional breakdowns: device, referrer source, scroll milestones.
-- ============================================================

create or replace function get_analytics_breakdown(
  p_post_type text,
  p_days      int
)
returns table (
  dimension text,
  value     text,
  count     bigint
)
language sql
security definer
as $$
  -- Device breakdown
  select
    'device'                    as dimension,
    coalesce(device, 'unknown') as value,
    count(*)                    as count
  from post_analytics
  where post_type  = p_post_type
    and event_type = 'view'
    and created_at >= now() - (p_days || ' days')::interval
  group by device

  union all

  -- Referrer breakdown (parse domain from URL, fallback to 'Direct')
  select
    'referrer'                                                              as dimension,
    case
      when referrer is null or referrer = ''
        then 'Direct'
      when referrer ~ '^https?://([^/]+)'
        then regexp_replace(referrer, '^https?://([^/]+).*$', '\1')
      else referrer
    end                                                                     as value,
    count(*)                                                                as count
  from post_analytics
  where post_type  = p_post_type
    and event_type = 'view'
    and created_at >= now() - (p_days || ' days')::interval
  group by value

  union all

  -- Scroll milestone breakdown
  select
    'scroll'             as dimension,
    scroll_pct::text     as value,
    count(*)             as count
  from post_analytics
  where post_type   = p_post_type
    and event_type  in ('scroll_depth', 'read_complete')
    and scroll_pct  is not null
    and created_at  >= now() - (p_days || ' days')::interval
  group by scroll_pct

  order by dimension, count desc;
$$;
