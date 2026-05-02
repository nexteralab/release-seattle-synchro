-- ============================================================
-- summer_camp_config
-- ============================================================

create table if not exists summer_camp_config (
  id             uuid        primary key default gen_random_uuid(),
  year           smallint    not null default extract(year from now()),

  -- Overview: free text, double newline = paragraph break
  overview_text  text        not null default '',

  -- Camp details
  ages           text        not null default '',
  skill_level    text        not null default '',
  schedule       text        not null default '',

  -- Sessions/locations: [{name, dates, address}]
  locations      jsonb       not null default '[]',

  -- Pricing & registration
  price_per_week text        not null default '',
  register_url   text        not null default '',

  -- What to bring: [{name, note, link}]
  requirements   jsonb       not null default '[]',

  updated_at     timestamptz not null default now()
);

-- RLS
alter table summer_camp_config enable row level security;

create policy "auth_all_summer_camp_config"
  on summer_camp_config for all
  to authenticated using (true) with check (true);

create policy "anon_read_summer_camp_config"
  on summer_camp_config for select
  to anon using (true);

-- Auto-update updated_at
create or replace function touch_summer_camp_config()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end;
$$;

create trigger summer_camp_config_updated_at
  before update on summer_camp_config
  for each row execute function touch_summer_camp_config();

-- Migration if table already exists with old columns:
-- alter table summer_camp_config
--   drop column if exists overview_p1,
--   drop column if exists overview_p2,
--   drop column if exists overview_p3,
--   add column if not exists overview_text text not null default '';
