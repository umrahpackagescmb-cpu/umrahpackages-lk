-- =============================================================================
-- UmrahPackages.lk — Initial schema
-- =============================================================================
-- Run in the Supabase SQL editor, or via `supabase db push` once the
-- Supabase CLI is linked to a project (see /supabase/README.md).
-- =============================================================================

create extension if not exists "pgcrypto";

-- -----------------------------------------------------------------------------
-- Enums
-- -----------------------------------------------------------------------------
create type user_role as enum (
  'super_admin',
  'admin',
  'content_manager',
  'travel_agency',
  'moderator',
  'editor'
);

create type trust_badge_type as enum (
  'gold_verified',
  'featured',
  'premium_partner',
  'recommended',
  'new_agency'
);

create type package_category as enum ('economy', 'standard', 'premium', 'luxury');
create type package_group_type as enum ('individual', 'group', 'family', 'vip');
create type inquiry_channel as enum ('whatsapp', 'phone', 'email', 'form');
create type inquiry_status as enum ('new', 'contacted', 'closed');
create type post_status as enum ('draft', 'published');
create type analytics_event_type as enum ('view', 'click', 'compare', 'contact');

-- -----------------------------------------------------------------------------
-- profiles — one row per auth.users row, carries the role.
-- -----------------------------------------------------------------------------
create table profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  role user_role not null default 'travel_agency',
  full_name text,
  phone text,
  avatar_url text,
  -- set for role = 'travel_agency': which agency this login manages.
  agency_id uuid,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

comment on table profiles is
  'Extends auth.users with app role + (for agency logins) which agency they manage.';

-- -----------------------------------------------------------------------------
-- agencies
-- -----------------------------------------------------------------------------
create table agencies (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  description text,
  logo_url text,
  cover_image_url text,
  city text,
  address text,
  lat double precision,
  lng double precision,
  phone text,
  whatsapp text,
  email text,
  website text,
  years_active integer,
  -- Business rule from the project brief: agency accounts are created
  -- disabled and only flipped on manually once vetted. Nothing about the
  -- dashboard changes when this flips — see RLS policies below.
  is_active boolean not null default false,
  owner_profile_id uuid references profiles (id) on delete set null,
  created_by uuid references profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table profiles
  add constraint profiles_agency_id_fkey
  foreign key (agency_id) references agencies (id) on delete set null;

create index agencies_city_idx on agencies (city);
create index agencies_is_active_idx on agencies (is_active);

-- -----------------------------------------------------------------------------
-- agency_badges — the trust system. Only Super Admin may assign/remove
-- (enforced by RLS below, not just app logic).
-- -----------------------------------------------------------------------------
create table agency_badges (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies (id) on delete cascade,
  badge_type trust_badge_type not null,
  assigned_by uuid references profiles (id) on delete set null,
  assigned_at timestamptz not null default now(),
  unique (agency_id, badge_type)
);

-- -----------------------------------------------------------------------------
-- packages
-- -----------------------------------------------------------------------------
create table packages (
  id uuid primary key default gen_random_uuid(),
  agency_id uuid not null references agencies (id) on delete cascade,
  slug text not null unique,
  title text not null,
  description text,
  cover_image_url text,
  price_lkr numeric(12, 2) not null,
  price_usd numeric(12, 2),
  duration_days integer not null,
  departure_city text not null default 'Colombo (CMB)',
  airline text,
  makkah_hotel text,
  makkah_hotel_stars smallint,
  madinah_hotel text,
  madinah_hotel_stars smallint,
  meal_plan text,
  transport text,
  visa_included boolean not null default true,
  group_type package_group_type not null default 'group',
  category package_category not null default 'standard',
  inclusions text[] not null default '{}',
  exclusions text[] not null default '{}',
  departure_date date,
  seats_available integer,
  is_featured boolean not null default false,
  -- Draft packages (is_published = false) never appear publicly — lets an
  -- agency prepare a listing before it goes live, and lets admins unpublish
  -- without deleting.
  is_published boolean not null default true,
  view_count integer not null default 0,
  click_count integer not null default 0,
  compare_count integer not null default 0,
  contact_count integer not null default 0,
  created_by uuid references profiles (id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index packages_agency_id_idx on packages (agency_id);
create index packages_category_idx on packages (category);
create index packages_is_published_idx on packages (is_published);
create index packages_price_idx on packages (price_lkr);
create index packages_departure_date_idx on packages (departure_date);

create table package_images (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages (id) on delete cascade,
  url text not null,
  alt_text text,
  sort_order integer not null default 0
);

create index package_images_package_id_idx on package_images (package_id);

create table package_brochures (
  id uuid primary key default gen_random_uuid(),
  package_id uuid not null references packages (id) on delete cascade,
  url text not null,
  filename text,
  uploaded_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- tags — auto-generated + manual tags, many-to-many with packages.
-- -----------------------------------------------------------------------------
create table tags (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null
);

create table package_tags (
  package_id uuid not null references packages (id) on delete cascade,
  tag_id uuid not null references tags (id) on delete cascade,
  primary key (package_id, tag_id)
);

-- -----------------------------------------------------------------------------
-- inquiries — WhatsApp/phone/email/contact-form leads routed to an agency.
-- This platform does not process bookings or payments; an inquiry is just a
-- contact event so agencies (and admins) can see interest.
-- -----------------------------------------------------------------------------
create table inquiries (
  id uuid primary key default gen_random_uuid(),
  package_id uuid references packages (id) on delete set null,
  agency_id uuid not null references agencies (id) on delete cascade,
  name text,
  phone text,
  email text,
  message text,
  channel inquiry_channel not null default 'whatsapp',
  status inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

create index inquiries_agency_id_idx on inquiries (agency_id);
create index inquiries_package_id_idx on inquiries (package_id);

-- -----------------------------------------------------------------------------
-- blog_posts
-- -----------------------------------------------------------------------------
create table blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title text not null,
  excerpt text,
  content text not null,
  cover_image_url text,
  category text,
  author_profile_id uuid references profiles (id) on delete set null,
  status post_status not null default 'draft',
  published_at timestamptz,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index blog_posts_status_idx on blog_posts (status);

-- -----------------------------------------------------------------------------
-- maulavis — directory of scholars/guides.
-- -----------------------------------------------------------------------------
create table maulavis (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  name text not null,
  photo_url text,
  specialization text,
  bio text,
  city text,
  languages text[] not null default '{}',
  years_experience integer,
  phone text,
  whatsapp text,
  is_published boolean not null default true,
  created_at timestamptz not null default now()
);

-- -----------------------------------------------------------------------------
-- analytics_events — raw event log feeding the automation engine
-- (trending / most-viewed / most-clicked / most-compared / most-contacted).
-- Aggregates are computed on read (or via a scheduled job into a materialized
-- view later) rather than maintained as running counters here, EXCEPT the
-- denormalized counters on `packages` which are incremented for fast reads
-- on package cards; this table is the source of truth for time-windowed
-- trending calculations.
-- -----------------------------------------------------------------------------
create table analytics_events (
  id bigint generated always as identity primary key,
  event_type analytics_event_type not null,
  package_id uuid references packages (id) on delete cascade,
  agency_id uuid references agencies (id) on delete cascade,
  session_id text,
  meta jsonb not null default '{}',
  created_at timestamptz not null default now()
);

create index analytics_events_package_id_idx on analytics_events (package_id);
create index analytics_events_created_at_idx on analytics_events (created_at);
create index analytics_events_type_idx on analytics_events (event_type);

-- -----------------------------------------------------------------------------
-- updated_at triggers
-- -----------------------------------------------------------------------------
create or replace function set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger profiles_set_updated_at before update on profiles
  for each row execute function set_updated_at();
create trigger agencies_set_updated_at before update on agencies
  for each row execute function set_updated_at();
create trigger packages_set_updated_at before update on packages
  for each row execute function set_updated_at();
create trigger blog_posts_set_updated_at before update on blog_posts
  for each row execute function set_updated_at();

-- -----------------------------------------------------------------------------
-- new profile bootstrap — every signup gets a profiles row automatically.
-- Default role is 'travel_agency' with agency_id null; an admin links the
-- profile to an agency and flips agencies.is_active once vetted.
-- -----------------------------------------------------------------------------
create or replace function handle_new_user()
returns trigger
language plpgsql
security definer set search_path = public
as $$
begin
  insert into public.profiles (id, full_name)
  values (new.id, new.raw_user_meta_data ->> 'full_name');
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute function handle_new_user();
