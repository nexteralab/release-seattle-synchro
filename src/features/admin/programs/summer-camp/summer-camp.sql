-- =============================================
-- SUMMER CAMP — configuración de página (singleton, JSONB)
-- Correr en: Supabase → SQL Editor
-- =============================================

-- Tabla singleton: una sola fila (id = 1) con todo el contenido editable
create table if not exists public.summer_camp (
  id          smallint    primary key default 1 check (id = 1),
  content     jsonb       not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.update_summer_camp_updated_at()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists summer_camp_updated_at on public.summer_camp;
create trigger summer_camp_updated_at
  before update on public.summer_camp
  for each row execute procedure public.update_summer_camp_updated_at();

-- Seed inicial (idempotente). El editor del admin sobreescribe este content.
insert into public.summer_camp (id, content)
values (1, '{
  "details": {
    "ages": "6–11 years old",
    "skill_level": "For safety reasons, campers should be able to independently swim two laps of crawl stroke and float on their back.",
    "schedule": "9:00 AM – 11:00 AM"
  },
  "sessions": [
    {
      "name": "July in Bellevue (Newport Hills)",
      "dates": "July 27 – July 31, 2026",
      "address": "Newport Swim and Tennis Club\n5464 119th Ave SE, Bellevue, WA 98006",
      "register_url": "https://www.seattlesynchrosst.com/page/system/classreg-shopping"
    },
    {
      "name": "August in Somerset",
      "dates": "August 3 – August 7, 2026",
      "address": "4445 Somerset Blvd SE, Bellevue, WA 98006",
      "register_url": "https://www.seattlesynchrosst.com/page/system/classreg-shopping"
    }
  ],
  "price_per_week": "$330 per week"
}'::jsonb)
on conflict (id) do nothing;

-- =============================================
-- RLS
-- =============================================
alter table public.summer_camp enable row level security;

-- Lectura pública (la página es pública)
drop policy if exists "Public read summer camp" on public.summer_camp;
create policy "Public read summer camp" on public.summer_camp
  for select using (true);

-- Admins (autenticados) pueden leer y escribir todo
drop policy if exists "Auth full access summer camp" on public.summer_camp;
create policy "Auth full access summer camp" on public.summer_camp
  for all using (auth.role() = 'authenticated');
