-- =============================================================================
-- UmrahPackages.lk — general contact-form messages
-- =============================================================================
-- Separate from `inquiries` (package/agency leads, agency_id NOT NULL) —
-- this is for the /contact page's general enquiry form, which isn't tied
-- to any agency or package.
-- =============================================================================

create table contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  phone text,
  email text,
  message text not null,
  status inquiry_status not null default 'new',
  created_at timestamptz not null default now()
);

alter table contact_messages enable row level security;

create policy "contact_messages: anyone can create" on contact_messages
  for insert with check (true);

create policy "contact_messages: staff read/manage" on contact_messages
  for all using (is_staff()) with check (is_staff());
