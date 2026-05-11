-- ============================================================
-- competitive_config
-- ============================================================
-- One active row. age_groups = AgeGroup[] (id, name, coaches, workout_days).

create table if not exists competitive_config (
  id              uuid        primary key default gen_random_uuid(),

  -- Array of { id, name, coaches, workout_days }
  -- id ∈ '12u' | '13-15' | 'junior'
  age_groups      jsonb       not null default '[]',

  updated_at      timestamptz not null default now()
);

-- Seed inicial (idempotente). El editor del admin sobreescribe este content.
insert into competitive_config (age_groups)
select '[
  {
    "id": "12u",
    "name": "12 & Under Age Group",
    "coaches": "Maria Romero\nDaniela Garmendia\nPatricia Camaran\nIvy Huang",
    "workout_days": "Monday, Wednesday & Saturday morning"
  },
  {
    "id": "13-15",
    "name": "13–15 Age Group",
    "coaches": "A Team: Patricia Camaran\nB Team: Daniela Garmendia\nC Team: Ivy Huang",
    "workout_days": "2 Weekdays and Saturday morning"
  },
  {
    "id": "junior",
    "name": "Junior / 16–19 Age Group",
    "coaches": "Maria Romero",
    "workout_days": "3 Weekdays and Sunday morning"
  }
]'::jsonb
where not exists (select 1 from competitive_config);

-- ============================================================
-- RLS
-- ============================================================
alter table competitive_config enable row level security;

drop policy if exists "auth_all_competitive_config" on competitive_config;
create policy "auth_all_competitive_config"
  on competitive_config for all
  to authenticated using (true) with check (true);

drop policy if exists "anon_read_competitive_config" on competitive_config;
create policy "anon_read_competitive_config"
  on competitive_config for select
  to anon using (true);

-- ============================================================
-- Trigger: auto-update updated_at
-- ============================================================
create or replace function touch_competitive_config()
returns trigger language plpgsql as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists competitive_config_updated_at on competitive_config;
create trigger competitive_config_updated_at
  before update on competitive_config
  for each row execute function touch_competitive_config();
