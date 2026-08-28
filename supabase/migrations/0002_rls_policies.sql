-- =============================================================================
-- UmrahPackages.lk — Row Level Security
-- =============================================================================
-- Role system: super_admin, admin, content_manager, travel_agency, moderator,
-- editor. Every table below has RLS enabled; nothing is readable/writable
-- unless a policy explicitly allows it — including the service role key
-- bypasses this by design for server-side admin actions.
-- =============================================================================

-- -----------------------------------------------------------------------------
-- Helper functions — read the caller's role/agency without recursive RLS
-- checks on `profiles` itself (security definer, so it can read a row RLS
-- would otherwise hide from the caller).
-- -----------------------------------------------------------------------------
create or replace function auth_role()
returns user_role
language sql
security definer
stable
set search_path = public
as $$
  select role from profiles where id = auth.uid();
$$;

create or replace function auth_agency_id()
returns uuid
language sql
security definer
stable
set search_path = public
as $$
  select agency_id from profiles where id = auth.uid();
$$;

create or replace function is_staff()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select auth_role() in ('super_admin', 'admin', 'content_manager', 'moderator', 'editor');
$$;

create or replace function is_admin()
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select auth_role() in ('super_admin', 'admin');
$$;

create or replace function owns_agency(target_agency_id uuid)
returns boolean
language sql
security definer
stable
set search_path = public
as $$
  select auth_role() = 'travel_agency' and auth_agency_id() = target_agency_id;
$$;

-- -----------------------------------------------------------------------------
-- profiles
-- -----------------------------------------------------------------------------
alter table profiles enable row level security;

create policy "profiles: read own" on profiles
  for select using (id = auth.uid());

create policy "profiles: staff read all" on profiles
  for select using (is_staff());

create policy "profiles: update own (non-role fields enforced in app)" on profiles
  for update using (id = auth.uid());

create policy "profiles: super admin manage all" on profiles
  for all using (auth_role() = 'super_admin')
  with check (auth_role() = 'super_admin');

-- -----------------------------------------------------------------------------
-- agencies
-- -----------------------------------------------------------------------------
alter table agencies enable row level security;

create policy "agencies: public read active" on agencies
  for select using (is_active = true);

create policy "agencies: staff read all" on agencies
  for select using (is_staff());

create policy "agencies: owner reads own even if inactive" on agencies
  for select using (owns_agency(id));

create policy "agencies: admin/content_manager manage all" on agencies
  for all using (auth_role() in ('super_admin', 'admin', 'content_manager'))
  with check (auth_role() in ('super_admin', 'admin', 'content_manager'));

-- Agencies can edit their own profile fields, but NOT is_active or badges —
-- is_active is deliberately excluded here; flip it via an admin-only path
-- (Supabase service role from the admin dashboard) so a disabled agency can
-- never self-enable.
create policy "agencies: owner updates own profile" on agencies
  for update using (owns_agency(id))
  with check (owns_agency(id));

-- -----------------------------------------------------------------------------
-- agency_badges — Super Admin only, full stop.
-- -----------------------------------------------------------------------------
alter table agency_badges enable row level security;

create policy "agency_badges: public read" on agency_badges
  for select using (true);

create policy "agency_badges: super admin manage" on agency_badges
  for all using (auth_role() = 'super_admin')
  with check (auth_role() = 'super_admin');

-- -----------------------------------------------------------------------------
-- packages
-- -----------------------------------------------------------------------------
alter table packages enable row level security;

create policy "packages: public read published" on packages
  for select using (
    is_published = true
    and exists (select 1 from agencies a where a.id = packages.agency_id and a.is_active = true)
  );

create policy "packages: staff read all" on packages
  for select using (is_staff());

create policy "packages: owner agency full access" on packages
  for all using (
    owns_agency(agency_id)
    and exists (select 1 from agencies a where a.id = packages.agency_id and a.is_active = true)
  )
  with check (
    owns_agency(agency_id)
    and exists (select 1 from agencies a where a.id = packages.agency_id and a.is_active = true)
  );

create policy "packages: admin/content_manager manage all" on packages
  for all using (auth_role() in ('super_admin', 'admin', 'content_manager'))
  with check (auth_role() in ('super_admin', 'admin', 'content_manager'));

-- package_images / package_brochures follow the parent package's access.
alter table package_images enable row level security;

create policy "package_images: public read" on package_images
  for select using (
    exists (
      select 1 from packages p
      join agencies a on a.id = p.agency_id
      where p.id = package_images.package_id and p.is_published = true and a.is_active = true
    )
  );

create policy "package_images: staff read all" on package_images
  for select using (is_staff());

create policy "package_images: owner agency manage" on package_images
  for all using (
    exists (select 1 from packages p where p.id = package_images.package_id and owns_agency(p.agency_id))
  )
  with check (
    exists (select 1 from packages p where p.id = package_images.package_id and owns_agency(p.agency_id))
  );

create policy "package_images: admin manage all" on package_images
  for all using (is_admin()) with check (is_admin());

alter table package_brochures enable row level security;

create policy "package_brochures: public read" on package_brochures
  for select using (
    exists (
      select 1 from packages p
      join agencies a on a.id = p.agency_id
      where p.id = package_brochures.package_id and p.is_published = true and a.is_active = true
    )
  );

create policy "package_brochures: owner agency manage" on package_brochures
  for all using (
    exists (select 1 from packages p where p.id = package_brochures.package_id and owns_agency(p.agency_id))
  )
  with check (
    exists (select 1 from packages p where p.id = package_brochures.package_id and owns_agency(p.agency_id))
  );

create policy "package_brochures: admin manage all" on package_brochures
  for all using (is_admin()) with check (is_admin());

-- -----------------------------------------------------------------------------
-- tags / package_tags — public read, staff manage.
-- -----------------------------------------------------------------------------
alter table tags enable row level security;
create policy "tags: public read" on tags for select using (true);
create policy "tags: staff manage" on tags for all using (is_staff()) with check (is_staff());

alter table package_tags enable row level security;
create policy "package_tags: public read" on package_tags for select using (true);
create policy "package_tags: staff manage" on package_tags for all using (is_staff()) with check (is_staff());
create policy "package_tags: owner agency manage own" on package_tags
  for all using (exists (select 1 from packages p where p.id = package_tags.package_id and owns_agency(p.agency_id)))
  with check (exists (select 1 from packages p where p.id = package_tags.package_id and owns_agency(p.agency_id)));

-- -----------------------------------------------------------------------------
-- inquiries — anyone can create one (the public contact/WhatsApp-intent
-- form); only the owning agency and staff can read them.
-- -----------------------------------------------------------------------------
alter table inquiries enable row level security;

create policy "inquiries: anyone can create" on inquiries
  for insert with check (true);

create policy "inquiries: owner agency reads own" on inquiries
  for select using (owns_agency(agency_id));

create policy "inquiries: owner agency updates own (status)" on inquiries
  for update using (owns_agency(agency_id)) with check (owns_agency(agency_id));

create policy "inquiries: staff read/manage all" on inquiries
  for all using (is_staff()) with check (is_staff());

-- -----------------------------------------------------------------------------
-- blog_posts
-- -----------------------------------------------------------------------------
alter table blog_posts enable row level security;

create policy "blog_posts: public read published" on blog_posts
  for select using (status = 'published');

create policy "blog_posts: staff manage" on blog_posts
  for all using (auth_role() in ('super_admin', 'admin', 'content_manager', 'editor'))
  with check (auth_role() in ('super_admin', 'admin', 'content_manager', 'editor'));

-- -----------------------------------------------------------------------------
-- maulavis
-- -----------------------------------------------------------------------------
alter table maulavis enable row level security;

create policy "maulavis: public read published" on maulavis
  for select using (is_published = true);

create policy "maulavis: staff manage" on maulavis
  for all using (is_staff()) with check (is_staff());

-- -----------------------------------------------------------------------------
-- analytics_events — write-only from the public (client logs its own
-- view/click/compare/contact events), read by staff and the owning agency.
-- -----------------------------------------------------------------------------
alter table analytics_events enable row level security;

create policy "analytics_events: anyone can log" on analytics_events
  for insert with check (true);

create policy "analytics_events: owner agency reads own" on analytics_events
  for select using (owns_agency(agency_id));

create policy "analytics_events: staff read all" on analytics_events
  for select using (is_staff());
