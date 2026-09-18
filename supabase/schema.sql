-- MEC Hub database
-- Run this entire file once in Supabase SQL Editor.
-- It creates the flexible content tree, click counters, RLS policies,
-- and preserves every existing Google Drive link from the current site.

create extension if not exists pgcrypto;

create table if not exists public.hub_nodes (
  id uuid primary key default gen_random_uuid(),
  parent_id uuid references public.hub_nodes(id) on delete cascade,
  type text not null check (type in ('department','archive','folder','batch','year','term','link','button')),
  title text not null,
  title_ar text,
  department text check (department in ('production','power')),
  batch_year integer,
  year_number integer check (year_number between 1 and 4),
  semester_number integer check (semester_number >= 1),
  url text,
  icon text,
  sort_order integer not null default 0,
  active boolean not null default true,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.hub_clicks (
  node_id uuid primary key references public.hub_nodes(id) on delete cascade,
  clicks bigint not null default 0,
  last_clicked timestamptz
);

create index if not exists hub_nodes_parent_idx on public.hub_nodes(parent_id);
create index if not exists hub_nodes_department_idx on public.hub_nodes(department);
create index if not exists hub_nodes_batch_idx on public.hub_nodes(department, batch_year);
create index if not exists hub_nodes_url_idx on public.hub_nodes(url);

alter table public.hub_nodes enable row level security;
alter table public.hub_clicks enable row level security;

drop policy if exists "public can read active nodes" on public.hub_nodes;
create policy "public can read active nodes"
on public.hub_nodes for select
using (active = true);

drop policy if exists "public can read click counts" on public.hub_clicks;
create policy "public can read click counts"
on public.hub_clicks for select
using (true);

-- Writes are intentionally NOT granted to anonymous/authenticated users.
-- The Next.js server API checks the allow-listed admin email and uses the
-- service-role key for writes.

create or replace function public.increment_hub_click(p_node_id uuid)
returns bigint
language plpgsql
security definer
set search_path = public
as $$
declare new_count bigint;
begin
  insert into public.hub_clicks(node_id, clicks, last_clicked)
  values (p_node_id, 1, now())
  on conflict (node_id)
  do update set clicks = hub_clicks.clicks + 1, last_clicked = now()
  returning clicks into new_count;
  return new_count;
end;
$$;

grant execute on function public.increment_hub_click(uuid) to anon, authenticated;

-- -------------------------
-- Seed existing site content
-- -------------------------

insert into public.hub_nodes (id, parent_id, type, title, title_ar, department, icon, sort_order)
values
('10000000-0000-0000-0000-000000000001', null, 'department', 'Mechanical Production', 'ميكانيكا إنتاج', 'production', '⚙️', 0),
('10000000-0000-0000-0000-000000000002', null, 'department', 'Mechanical Power', 'ميكانيكا قوى', 'power', '🚗', 1)
on conflict (id) do nothing;

-- Helper blocks: each batch is a direct child of its department so the
-- existing /production and /power pages keep working exactly as before.

insert into public.hub_nodes (id,parent_id,type,title,title_ar,department,batch_year,icon,sort_order)
select gen_random_uuid(), '10000000-0000-0000-0000-000000000001'::uuid, 'batch', 'دفعة إنتاج '||y, 'دفعة إنتاج '||y, 'production', y, '📁', row_number() over(order by y desc)-1
from (values (2027),(2026),(2025),(2024),(2023)) v(y)
where not exists (select 1 from public.hub_nodes n where n.department='production' and n.type='batch' and n.batch_year=y);

insert into public.hub_nodes (id,parent_id,type,title,title_ar,department,batch_year,icon,sort_order)
select gen_random_uuid(), '10000000-0000-0000-0000-000000000002'::uuid, 'batch', 'دفعة قوى '||y, 'دفعة قوى '||y, 'power', y, '📁', row_number() over(order by y desc)-1
from (values (2027),(2026),(2025),(2024),(2023)) v(y)
where not exists (select 1 from public.hub_nodes n where n.department='power' and n.type='batch' and n.batch_year=y);

-- Create 4 year folders under every existing batch.
insert into public.hub_nodes (id,parent_id,type,title,title_ar,department,batch_year,year_number,icon,sort_order)
select gen_random_uuid(), b.id, 'year', 'الفرقة '||y, 'الفرقة '||y, b.department, b.batch_year, y, '📚', y-1
from public.hub_nodes b
cross join generate_series(1,4) y
where b.type='batch'
and not exists (
  select 1 from public.hub_nodes n where n.parent_id=b.id and n.type='year' and n.year_number=y
);

-- Existing Production links.
with links(department,batch_year,year_number,semester_number,url) as (
  values
  ('production',2027,1,1,'https://drive.google.com/drive/folders/1ubnkcgSbDn8YMhrZvZM1RuBRAqKWoQcA'),
  ('production',2027,1,2,'https://drive.google.com/drive/folders/1h-FduDNRvj3Dh-t-fUBho8su2GswQd4C'),
  ('production',2026,1,1,'https://drive.google.com/drive/folders/1LifNol611mkoKs33dSN1MpA07-2_bXgm'),
  ('production',2026,1,2,'https://drive.google.com/drive/folders/1_FTtZ-8Zplv7iPAMOy3ANApAaC_-ZjiK'),
  ('production',2026,2,1,'https://drive.google.com/drive/folders/1bRjkqK8e9OaFzIsCPI85rRBSLoaspiXq'),
  ('production',2026,2,2,'https://drive.google.com/drive/folders/1Eo1w5n5KrQW6ROGfYKmnfJsL-9fTjeAn'),
  ('production',2026,3,1,'https://drive.google.com/drive/folders/1Kdmt8mTz6K7q0OYWCLkXMMhrkE7ihAZ1'),
  ('production',2026,3,2,'https://drive.google.com/drive/folders/11WhqOOvvlsZUB9Y7ohJ16OfI3AL82UHH'),
  ('production',2026,4,1,'https://drive.google.com/drive/folders/1SF8HWgiMk-4SG5TQo8UAN2DQjdx5zw1s'),
  ('production',2026,4,2,'https://drive.google.com/drive/folders/15TOh6bn6d2nkf1yVCbUhIpF3XFPW0VZA'),
  ('production',2025,2,1,'https://drive.google.com/drive/folders/1foK1oqDad938B8BYTFiTUXyEo09dycsN?usp=drive_link'),
  ('production',2025,2,2,'https://drive.google.com/drive/folders/1Sc6aU9v7vgwCa-G_-APamK6DZYk4Ev9O?usp=drive_link'),
  ('production',2025,3,1,'https://drive.google.com/drive/folders/11YrpKOt3Mk4umU5vOxR7iV7thvPTZS1D'),
  ('production',2024,3,1,'https://drive.google.com/drive/folders/1CACxtvUtVI56PuKeszE8UoLA-2wJmBfR'),
  ('production',2024,3,2,'https://drive.google.com/drive/folders/1-16Hf22uLr8W2y1hyE-DICj0d-lag355'),
  ('production',2023,4,1,'https://drive.google.com/drive/folders/1-1pLR9bLvjS8olMrKAPusJP0SL_U31hY'),
  ('production',2023,4,2,'https://drive.google.com/drive/folders/1-3Zuehnz_bcc34ZBek-vWJFJVgx64ljQ')
)
insert into public.hub_nodes(parent_id,type,title,title_ar,department,batch_year,year_number,semester_number,url,icon,sort_order)
select y.id,'term',case when l.semester_number=1 then 'الترم الأول' else 'الترم الثاني' end,case when l.semester_number=1 then 'الترم الأول' else 'الترم الثاني' end,l.department,l.batch_year,l.year_number,l.semester_number,l.url,'🔗',l.semester_number-1
from links l join public.hub_nodes y on y.type='year' and y.department=l.department and y.batch_year=l.batch_year and y.year_number=l.year_number
where not exists (select 1 from public.hub_nodes n where n.url=l.url);

-- Existing Power links (the 2025 links supplied for the current project).
with links(department,batch_year,year_number,semester_number,url) as (
  values
  ('power',2025,1,1,'https://drive.google.com/drive/folders/179EPTKGcrYeoyBnEXQq3vu8FYVBDbNij?usp=drive_link'),
  ('power',2025,1,2,'https://drive.google.com/drive/folders/179VWs5LwmyzYWc0xE6HRM4FC9Um9y_yH?usp=drive_link'),
  ('power',2025,2,1,'https://drive.google.com/drive/folders/19PuK2iX6W3_V-p3v87Mi0JTENygklZrZ?usp=drive_link'),
  ('power',2025,2,2,'https://drive.google.com/drive/folders/17CxDcvchB0B9Lvjo6ZraTcrRpgDpx-Pe?usp=drive_link'),
  ('power',2025,3,1,'https://drive.google.com/drive/folders/1yswnsNbSFBIbe89MKTnsSM1tJvwyIjIs?usp=drive_link'),
  ('power',2025,3,2,'https://drive.google.com/drive/folders/1TRQ9GtkO91KxUkdKUbACYBDdg6ItXpBH?usp=drive_link'),
  ('power',2025,4,1,'https://drive.google.com/drive/folders/12mgUNJPnyJZGtm73v1V2aQD2B182buHQ?usp=drive_link'),
  ('power',2025,4,2,'https://drive.google.com/drive/folders/1t-wOoKDSnHU3N__2Znuj1bvor66yqewA?usp=drive_link')
)
insert into public.hub_nodes(parent_id,type,title,title_ar,department,batch_year,year_number,semester_number,url,icon,sort_order)
select y.id,'term',case when l.semester_number=1 then 'الترم الأول' else 'الترم الثاني' end,case when l.semester_number=1 then 'الترم الأول' else 'الترم الثاني' end,l.department,l.batch_year,l.year_number,l.semester_number,l.url,'🔗',l.semester_number-1
from links l join public.hub_nodes y on y.type='year' and y.department=l.department and y.batch_year=l.batch_year and y.year_number=l.year_number
where not exists (select 1 from public.hub_nodes n where n.url=l.url);

-- Timestamp trigger.
create or replace function public.touch_hub_node()
returns trigger language plpgsql as $$
begin new.updated_at = now(); return new; end; $$;

drop trigger if exists hub_nodes_touch on public.hub_nodes;
create trigger hub_nodes_touch before update on public.hub_nodes for each row execute function public.touch_hub_node();
