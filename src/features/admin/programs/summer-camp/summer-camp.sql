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
  "hero_image_url": "",
  "overview_body": "Dive into the world of artistic swimming at our recreational summer camp! Join us for a week of fun and creativity as we blend athleticism with artistry in the pool. Designed for swimmers of all levels, our camp offers expert instruction in technique, choreography, and teamwork.\n\nParticipants will learn a routine set to music, develop their swimming skills, and unleash their creativity through water-based performances. Whether you''re a beginner or have some experience, come make a splash with us this summer!\n\nSkills: campers will reinforce swimming technique, learn basic artistic swimming skills and a routine that will be performed at the end of the week.",
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
  "price_per_week": "$330 per week",
  "requirements": [
    { "name": "Swim Suit" },
    { "name": "Swim Cap" },
    { "name": "Goggles" },
    { "name": "Nose Clips", "note": "Recomendations", "link": "https://www.amazon.com/Hurdilen-Swimming-Waterproof-Silica-Multi-Color/dp/B07HH4HQXW" },
    { "name": "Towel" }
  ]
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

-- =============================================
-- Storage: bucket "summer-camp" para imagen del hero
-- Crear bucket en Supabase → Storage → New bucket (public: true)
-- =============================================
drop policy if exists "Public read summer-camp images"   on storage.objects;
create policy "Public read summer-camp images"
  on storage.objects for select
  using (bucket_id = 'summer-camp');

drop policy if exists "Auth upload summer-camp images"   on storage.objects;
create policy "Auth upload summer-camp images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'summer-camp');

drop policy if exists "Auth update summer-camp images"   on storage.objects;
create policy "Auth update summer-camp images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'summer-camp');

drop policy if exists "Auth delete summer-camp images"   on storage.objects;
create policy "Auth delete summer-camp images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'summer-camp');
