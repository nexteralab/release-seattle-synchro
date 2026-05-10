-- ============================================================
-- free_try_config (singleton, JSONB)
-- ============================================================
-- Una sola fila (id = 1) con todo el contenido editable del programa Free Try.

create table if not exists public.free_try_config (
  id          smallint    primary key default 1 check (id = 1),
  content     jsonb       not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.touch_free_try_config()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists free_try_config_updated_at on public.free_try_config;
create trigger free_try_config_updated_at
  before update on public.free_try_config
  for each row execute procedure public.touch_free_try_config();

-- Seed inicial (idempotente)
insert into public.free_try_config (id, content)
values (1, '{
  "date": "June 7th, 2026",
  "time": "11:30 am – 12:00 pm",
  "ages": "7 – 11 years old",
  "location": {
    "name": "Newport Hills",
    "address": "Swim and Tennis Club\nAthletic Excellence Center"
  }
}'::jsonb)
on conflict (id) do nothing;

-- ============================================================
-- RLS
-- ============================================================
alter table public.free_try_config enable row level security;

drop policy if exists "Public read free_try_config" on public.free_try_config;
create policy "Public read free_try_config" on public.free_try_config
  for select using (true);

drop policy if exists "Auth full access free_try_config" on public.free_try_config;
create policy "Auth full access free_try_config" on public.free_try_config
  for all using (auth.role() = 'authenticated');
