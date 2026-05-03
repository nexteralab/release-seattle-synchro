-- ============================================================
-- competitive_config
-- ============================================================
-- One active row. overview = string[], age_groups = AgeGroup[].

create table if not exists competitive_config (
  id              uuid        primary key default gen_random_uuid(),

  -- Array of paragraph strings
  overview        jsonb       not null default '[]',

  commitment_note text        not null default '',

  -- Array of { id, name, coaches, workout_days, description?, highlights? }
  age_groups      jsonb       not null default '[]',

  updated_at      timestamptz not null default now()
);

-- RLS
alter table competitive_config enable row level security;

create policy "auth_all_competitive_config"
  on competitive_config for all
  to authenticated using (true) with check (true);

create policy "anon_read_competitive_config"
  on competitive_config for select
  to anon using (true);

create or replace function touch_competitive_config()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger competitive_config_updated_at
  before update on competitive_config
  for each row execute function touch_competitive_config();
