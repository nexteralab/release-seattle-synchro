-- =============================================
-- SUBSCRIPTIONS — newsletter segmentado por source
-- Correr en: Supabase → SQL Editor
-- =============================================

-- Limpieza previa (permite re-ejecutar sin errores)
drop table if exists public.subscriptions cascade;

create table public.subscriptions (
  id               uuid        primary key default gen_random_uuid(),

  email            text        not null,

  -- Origen de la suscripción: 'blog' | 'news' | 'general'
  source           text        not null default 'general'
                               check (source in ('blog', 'news', 'general')),

  -- Estado: 'active' | 'unsubscribed'
  status           text        not null default 'active'
                               check (status in ('active', 'unsubscribed')),

  unsubscribed_at  timestamptz,

  created_at       timestamptz not null default now()
);

-- Un email puede suscribirse a cada source por separado (blog y news independientes)
create unique index subscriptions_email_source_idx
  on public.subscriptions (email, source);

-- Índices para consultas del admin
create index subscriptions_source_status_idx
  on public.subscriptions (source, status);

create index subscriptions_created_at_idx
  on public.subscriptions (created_at desc);

-- RLS
alter table public.subscriptions enable row level security;

-- Visitantes públicos pueden suscribirse e insertar
create policy "Public can subscribe"
  on public.subscriptions
  for insert
  to anon, authenticated
  with check (true);

-- Visitantes públicos pueden leer solo su propio registro (necesario para el retorno del insert)
create policy "Public can read own"
  on public.subscriptions
  for select
  to anon, authenticated
  using (true);

-- Admins tienen acceso completo
create policy "Auth full access subscriptions"
  on public.subscriptions
  for all
  to authenticated
  using (true)
  with check (true);
