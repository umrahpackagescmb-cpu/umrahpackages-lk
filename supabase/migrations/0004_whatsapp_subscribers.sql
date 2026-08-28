-- =============================================================================
-- UmrahPackages.lk — WhatsApp community opt-in subscribers
-- =============================================================================
-- Powers the "Get daily Quran verses & hadith on WhatsApp" gate on the
-- Daily Quran Verse / Daily Hadith pages (src/components/islamic/
-- whatsapp-community-gate.tsx): a visitor enters their phone number and
-- explicitly consents, we log the submission here, then reveal the
-- WhatsApp Community join link. Separate from `contact_messages` and
-- `inquiries` — this is a marketing opt-in, not a support/sales lead, so it
-- carries its own `consented_at` timestamp as an audit trail (Sri Lanka's
-- PDPA and WhatsApp's own Business Messaging Policy both require being
-- able to show consent was actually given, not just claimed).
--
-- IMPORTANT — before this goes live: numbers stored here must only ever be
-- used for the purpose disclosed on the opt-in form (occasional WhatsApp
-- community updates). Do not repurpose this list for agency marketing,
-- bulk messaging, or sale/sharing with any third party without fresh,
-- explicit consent for that new purpose — that would contradict the
-- "we will never sell or share your number" promise made on the form.
-- =============================================================================

create table whatsapp_subscribers (
  id uuid primary key default gen_random_uuid(),
  phone text not null,
  -- Which page they opted in from — lets you see which content drives
  -- signups without needing analytics_events for this.
  source text not null,
  consented_at timestamptz not null default now(),
  created_at timestamptz not null default now()
);

create index whatsapp_subscribers_phone_idx on whatsapp_subscribers (phone);

alter table whatsapp_subscribers enable row level security;

-- Anyone can submit their number (the opt-in form is public and unauthenticated).
create policy "whatsapp_subscribers: anyone can create" on whatsapp_subscribers
  for insert with check (true);

-- Only staff can read the list back — never exposed to the public/agencies.
create policy "whatsapp_subscribers: staff read/manage" on whatsapp_subscribers
  for all using (is_staff()) with check (is_staff());
