-- =============================================
-- NEWS — noticias y anuncios de Seattle Synchro
-- Correr en: Supabase → SQL Editor
-- =============================================

create table if not exists public.news (
  id                uuid        primary key default gen_random_uuid(),

  -- Contenido
  title             text        not null,
  slug              text        not null unique,
  excerpt           text        not null default '',
  content           text        not null default '',

  -- Media
  cover_url         text,

  -- Categoría
  category          text,

  -- Autoría
  author            text        not null default '',
  user_id           uuid        references auth.users(id) on delete set null,

  -- Taxonomía / SEO
  tags              text[]      not null default '{}',
  meta_title        text,
  meta_description  text,

  -- Lectura
  read_time_minutes integer,

  -- Estado
  published         boolean     not null default false,
  published_at      timestamptz,

  -- Timestamps
  created_at        timestamptz not null default now(),
  updated_at        timestamptz not null default now()
);

-- Índices para consultas frecuentes
create index if not exists news_slug_idx       on public.news (slug);
create index if not exists news_published_idx  on public.news (published, published_at desc);
create index if not exists news_category_idx   on public.news (category);
create index if not exists news_tags_idx       on public.news using gin (tags);

-- Auto-update updated_at
create or replace function public.update_news_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger news_updated_at
  before update on public.news
  for each row execute procedure public.update_news_updated_at();

-- RLS
alter table public.news enable row level security;

-- Lectura pública solo para news publicados
create policy "Public read published news" on public.news
  for select using (published = true);

-- Admins ven todo y pueden escribir
create policy "Auth full access news" on public.news
  for all using (auth.role() = 'authenticated');

-- Storage: bucket para covers de news
-- Crear bucket "news" en Supabase → Storage → New bucket (public: true)

create policy "Public read news covers"
  on storage.objects for select
  using (bucket_id = 'news');

create policy "Auth upload news covers"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'news');

create policy "Auth delete news covers"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'news');
