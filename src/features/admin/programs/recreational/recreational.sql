-- ============================================================
-- recreational_config
-- ============================================================
-- One active row. sub_programs = SubProgram[]
-- (id ∈ 'sea-stars' | 'sharks-mermaids' | 'dolphins')

create table if not exists recreational_config (
  id              uuid        primary key default gen_random_uuid(),

  -- Array of { id, name, ages, coach, workout_days_times,
  --           schedule_note, duration, cost, cost_note }
  sub_programs    jsonb       not null default '[]',

  updated_at      timestamptz not null default now()
);

-- Seed inicial (idempotente). El editor del admin sobreescribe este content.
insert into recreational_config (sub_programs)
select '[
  {
    "id": "sea-stars",
    "name": "Sea Stars",
    "ages": "5–10",
    "coach": "Sophie Lin & Daniela Garmendia",
    "workout_days_times": "Fridays 4:00-5:00pm",
    "schedule_note": "No class Friday May 15th. Last class June 5th.",
    "duration": "",
    "cost": "$50 registration fee + $60 March dues",
    "cost_note": "Pool fees should be covered through one payment to the booster club (approximately $280)"
  },
  {
    "id": "sharks-mermaids",
    "name": "Sharks & Mermaids",
    "ages": "5–10",
    "coach": "Sophie Lin & Daniela Garmendia",
    "workout_days_times": "Saturdays 11:00am – 11:50am",
    "schedule_note": "No class Friday May 15th. Last class June 5th.",
    "duration": "",
    "cost": "$50 registration fee + $60 March dues",
    "cost_note": "Pool fees should be covered through one payment to the booster club (approximately $280)"
  },
  {
    "id": "dolphins",
    "name": "Dolphins",
    "ages": "6–12",
    "coach": "TBD",
    "workout_days_times": "Not available - TBD",
    "schedule_note": "",
    "duration": "8-week session",
    "cost": "$150 + $15 registration fee",
    "cost_note": ""
  }
]'::jsonb
where not exists (select 1 from recreational_config);

-- RLS
alter table recreational_config enable row level security;

drop policy if exists "auth_all_recreational_config" on recreational_config;
create policy "auth_all_recreational_config"
  on recreational_config for all
  to authenticated using (true) with check (true);

drop policy if exists "anon_read_recreational_config" on recreational_config;
create policy "anon_read_recreational_config"
  on recreational_config for select
  to anon using (true);

create or replace function touch_recreational_config()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

drop trigger if exists recreational_config_updated_at on recreational_config;
create trigger recreational_config_updated_at
  before update on recreational_config
  for each row execute function touch_recreational_config();
