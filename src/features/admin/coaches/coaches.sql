-- =============================================
-- LOCAL: run against schema public
-- PRODUCTION: change public → public
-- =============================================

create table if not exists public.coaches (
  id             uuid primary key default gen_random_uuid(),
  name           text not null,
  title          text not null default '',
  email          text,
  bio            text not null default '',
  specialties    text[] not null default '{}',
  certifications text[] not null default '{}',
  image_url      text,
  active         boolean not null default true,
  sort_order     integer not null default 0,
  created_at     timestamptz not null default now(),
  updated_at     timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.update_coaches_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger coaches_updated_at
  before update on public.coaches
  for each row execute procedure public.update_coaches_updated_at();

-- RLS: only authenticated users can write
alter table public.coaches enable row level security;

create policy "Public read" on public.coaches
  for select using (true);

create policy "Auth write" on public.coaches
  for all using (auth.role() = 'authenticated');
