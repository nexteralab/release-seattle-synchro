-- ============================================================
-- beginner_config
-- ============================================================
-- One active row. sub_programs = SubProgram[] (id ∈ 'novice' | 'intermediate')

create table if not exists beginner_config (
  id              uuid        primary key default gen_random_uuid(),

  -- Array of {
  --   id, name, ages, coaches, workout_days_times,
  --   location, dates, cost, registration,
  --   first_practice_date_time, first_practice_address
  -- }
  sub_programs    jsonb       not null default '[]',

  updated_at      timestamptz not null default now()
);

-- Seed inicial (idempotente). El editor del admin sobreescribe este content.
insert into beginner_config (sub_programs)
select '[
  {
    "id": "novice",
    "name": "Novice",
    "ages": "5–10",
    "coaches": "Maya Reistad\nSophie Lin\nGiordana Ventura",
    "workout_days_times": "Wednesday and Fridays\n5:00-7:00pm",
    "location": "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle''s weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.",
    "dates": "March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th",
    "cost": "$TBD monthly fee\nOne time registration fee\nThree quarterly pledges to the Booster Club (each around $250)\nOutfitting costs later during the season",
    "registration": "We will open registration soon during the first week of September.",
    "first_practice_date_time": "Wednesday, September 3rd\n6:00pm – 7:30pm",
    "first_practice_address": "Bellevue Aquatic Center\n601 143rd Ave NE, Bellevue, WA, 98007"
  },
  {
    "id": "intermediate",
    "name": "Intermediate",
    "ages": "7-12 years old",
    "coaches": "Lacey Ethier\nGiordana Ventura",
    "workout_days_times": "Mondays 7:00-9:00pm\nFridays 5:00-7:00pm",
    "location": "Bellevue Aquatic Center\n(Outdoor pool, please be aware and prepare for Seattle''s weather). If you believe your swimmer will be too cold, we always recommend getting a wetsuit.",
    "dates": "March 28th\nApril 4th, 11th, 18th, 25th\nMay 2nd, 9th",
    "cost": "$265 Per Month, $275 registration fee, outfitting costs & traveling costs.",
    "registration": "",
    "first_practice_date_time": "",
    "first_practice_address": ""
  }
]'::jsonb
where not exists (select 1 from beginner_config);

-- RLS
alter table beginner_config enable row level security;

drop policy if exists "auth_all_beginner_config" on beginner_config;
create policy "auth_all_beginner_config"
  on beginner_config for all
  to authenticated using (true) with check (true);

drop policy if exists "anon_read_beginner_config" on beginner_config;
create policy "anon_read_beginner_config"
  on beginner_config for select
  to anon using (true);

create or replace function touch_beginner_config()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists beginner_config_updated_at on beginner_config;
create trigger beginner_config_updated_at
  before update on beginner_config
  for each row execute function touch_beginner_config();
