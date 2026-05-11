-- ============================================================
-- elite_clinic_config (singleton, JSONB)
-- ============================================================
-- Una sola fila (id = 1) con el contenido completo del Elite Clinic.

create table if not exists public.elite_clinic_config (
  id          smallint    primary key default 1 check (id = 1),
  content     jsonb       not null default '{}'::jsonb,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Auto-update updated_at
create or replace function public.touch_elite_clinic_config()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists elite_clinic_config_updated_at on public.elite_clinic_config;
create trigger elite_clinic_config_updated_at
  before update on public.elite_clinic_config
  for each row execute procedure public.touch_elite_clinic_config();

-- Seed inicial (idempotente)
insert into public.elite_clinic_config (id, content)
values (1, '{
  "title": "Elite Clinic 2026",
  "subtitle": "Take your skills to the next level",
  "description": "Join us for an exciting clinic led by top-level coaches. The first 10 people to register will receive 12% off. After that, get 10% off if you sign up before June 1st.",
  "dates": "July 27th – 30th, 2026",
  "time": "8:00 AM – 1:30 PM",
  "minimumLevel": "Level Testing 3",
  "location": {
    "venue": "Newport Hills Swim and Tennis Club",
    "city": "Seattle, Washington",
    "poolAddress": "5464 119th Ave SE, Bellevue, WA 98006",
    "crossfitAddress": "Grey Coast Crossfit · 5620 119th Ave SE B, Bellevue"
  },
  "manager": {
    "name": "Daniela Garmendia",
    "role": "Head Coach Seattle Synchro",
    "email": "info@seattlesynchro.com"
  },
  "pricing": {
    "basePrice": "$TBD",
    "earlyBird": "First 10 to register get 12% off",
    "standardDiscount": "10% off if you sign up before June 1st"
  },
  "coaches": [
    { "name": "Tammy Mcgregor", "role": "Head Coach" },
    { "name": "Paula Klamburg", "role": "Head Coach" },
    { "name": "Patricia Camaran", "role": "Assistant Coach" },
    { "name": "Maria Romero", "role": "Assistant Coach" }
  ],
  "objectives": [
    "Refine basic technique",
    "Review difficulty skills",
    "Elevate your execution"
  ],
  "packingList": [
    "Water Bottle",
    "Tennis Shoes",
    "Yoga Mat",
    "Ankle Weights",
    "Elastic Bands",
    "Yoga Blocks"
  ],
  "registerUrl": "https://www.seattlesynchrosst.com/page/system/classreg-shopping"
}'::jsonb)
on conflict (id) do nothing;

-- ============================================================
-- RLS
-- ============================================================
alter table public.elite_clinic_config enable row level security;

drop policy if exists "Public read elite_clinic_config" on public.elite_clinic_config;
create policy "Public read elite_clinic_config" on public.elite_clinic_config
  for select using (true);

drop policy if exists "Auth full access elite_clinic_config" on public.elite_clinic_config;
create policy "Auth full access elite_clinic_config" on public.elite_clinic_config
  for all using (auth.role() = 'authenticated');
