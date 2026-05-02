-- =============================================
-- POSTS — blog posts indexados para SEO
-- Correr en: Supabase → SQL Editor
-- =============================================

create table if not exists public.posts (
  id                uuid        primary key default gen_random_uuid(),

  -- Contenido
  title             text        not null,
  slug              text        not null unique,
  excerpt           text        not null default '',
  content           text        not null default '',

  -- Media
  cover_url         text,

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
create index if not exists posts_slug_idx       on public.posts (slug);
create index if not exists posts_published_idx  on public.posts (published, published_at desc);
create index if not exists posts_tags_idx       on public.posts using gin (tags);

-- Auto-update updated_at
create or replace function public.update_posts_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger posts_updated_at
  before update on public.posts
  for each row execute procedure public.update_posts_updated_at();

-- RLS
alter table public.posts enable row level security;

-- Lectura pública solo para posts publicados
create policy "Public read published" on public.posts
  for select using (published = true);

-- Admins ven todo y pueden escribir
create policy "Auth full access" on public.posts
  for all using (auth.role() = 'authenticated');

-- Storage: bucket para covers de blog
-- Crear bucket "blog" en Supabase → Storage → New bucket (public: true)

create policy "Public read blog covers"
  on storage.objects for select
  using (bucket_id = 'blog');

create policy "Auth upload blog covers"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'blog');

create policy "Auth delete blog covers"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'blog');
