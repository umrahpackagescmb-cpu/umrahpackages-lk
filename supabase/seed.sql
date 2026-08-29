-- =============================================================================
-- UmrahPackages.lk — Local/dev seed data
-- =============================================================================
-- Mirrors src/lib/mock-data.ts so the real database looks like the UI you
-- see in local dev before any agency signs up. Safe to run repeatedly
-- (uses fixed UUIDs + ON CONFLICT DO NOTHING).
-- Run with: supabase db reset   (applies migrations then this file)
-- =============================================================================

insert into agencies (id, slug, name, description, logo_url, cover_image_url, city, phone, whatsapp, email, years_active, is_active)
values
  ('00000000-0000-0000-0000-00000000a001', 'al-safa-travels', 'Al-Safa Travels & Tours',
   'One of Sri Lanka''s most established Umrah operators, running dedicated group departures from Colombo for over 15 years.',
   '/placeholders/logo-alsafa.png', '/placeholders/cover-1.jpg', 'Colombo', '+94 11 234 5678', '+94112345678', 'info@alsafatravels.lk', 15, true),
  ('00000000-0000-0000-0000-00000000a002', 'noor-al-haram-tours', 'Noor Al Haram Tours',
   'Boutique Umrah agency specializing in small VIP groups with 5-star Haram-view hotel placements.',
   '/placeholders/logo-noor.png', '/placeholders/cover-2.jpg', 'Kandy', '+94 81 222 3344', '+94812223344', 'hello@noorharam.lk', 6, true),
  ('00000000-0000-0000-0000-00000000a003', 'baytullah-travels', 'Baytullah Travels',
   'Budget-friendly, reliable Umrah packages with transparent pricing and full visa/transport support.',
   '/placeholders/logo-baytullah.png', '/placeholders/cover-3.jpg', 'Colombo', '+94 11 987 6543', '+94119876543', 'contact@baytullah.lk', 4, true),
  ('00000000-0000-0000-0000-00000000a004', 'madinah-express', 'Madinah Express Holidays',
   'New to the platform — competitive family packages with flexible payment plans.',
   '/placeholders/logo-madinah.png', '/placeholders/cover-4.jpg', 'Galle', '+94 91 456 7890', '+94914567890', 'info@madinahexpress.lk', 1, true)
on conflict (id) do nothing;

insert into agency_badges (agency_id, badge_type)
values
  ('00000000-0000-0000-0000-00000000a001', 'gold_verified'),
  ('00000000-0000-0000-0000-00000000a001', 'premium_partner'),
  ('00000000-0000-0000-0000-00000000a002', 'featured'),
  ('00000000-0000-0000-0000-00000000a002', 'recommended'),
  ('00000000-0000-0000-0000-00000000a003', 'gold_verified'),
  ('00000000-0000-0000-0000-00000000a004', 'new_agency')
on conflict (agency_id, badge_type) do nothing;

insert into packages (
  id, agency_id, slug, title, cover_image_url, price_lkr, price_usd, duration_days,
  departure_city, airline, makkah_hotel, makkah_hotel_stars, madinah_hotel, madinah_hotel_stars,
  meal_plan, transport, visa_included, group_type, category, inclusions, exclusions,
  departure_dates, seats_available, is_featured
) values
  ('00000000-0000-0000-0000-00000000p001', '00000000-0000-0000-0000-00000000a001',
   'premium-14-day-makkah-madinah', 'Premium 14-Day Makkah & Madinah Umrah', '/placeholders/cover-5.jpg',
   485000, 1620, 14, 'Colombo (CMB)', 'SriLankan Airlines', 'Swissôtel Al Maqam Makkah', 5,
   'Anwar Al Madinah Movenpick', 5, 'Half Board', 'Private AC Coach', true, 'group', 'premium',
   array['Return airfare', 'Umrah visa', '5-star Haram-view hotels', 'Ziyarat tours', 'Zamzam water 5L'],
   array['Personal expenses', 'Qurbani (optional add-on)'],
   array['2026-11-12', '2026-12-24', '2027-01-15']::date[], 6, true),
  ('00000000-0000-0000-0000-00000000p002', '00000000-0000-0000-0000-00000000a002',
   'standard-10-day-family-umrah', 'Standard 10-Day Family Umrah Package', '/placeholders/cover-3.jpg',
   335000, 1120, 10, 'Colombo (CMB)', 'flydubai (via Dubai)', 'Elaf Kinda Hotel', 4,
   'Dar Al Taqwa Hotel', 4, 'Full Board', 'Shared AC Coach', true, 'family', 'standard',
   array['Return airfare', 'Umrah visa', '4-star hotels', 'Airport transfers'],
   array['Ziyarat tours', 'Personal expenses'], array['2026-10-20']::date[], 12, true),
  ('00000000-0000-0000-0000-00000000p003', '00000000-0000-0000-0000-00000000a003',
   'budget-7-day-umrah', 'Budget 7-Day Umrah Getaway', '/placeholders/cover-6.jpg',
   215000, 720, 7, 'Colombo (CMB)', 'Saudia', 'Al Massa Plaza', 3,
   'Durrat Al Eiman', 3, 'Breakfast Only', 'Shared Coach', true, 'individual', 'economy',
   array['Return airfare', 'Umrah visa', '3-star hotels'],
   array['Meals (except breakfast)', 'Ziyarat tours'],
   array['2026-09-30', '2026-10-14', '2026-10-28', '2026-11-11']::date[], 20, false),
  ('00000000-0000-0000-0000-00000000p004', '00000000-0000-0000-0000-00000000a001',
   'vip-luxury-5-star-umrah', 'VIP Luxury 5-Star Umrah Experience', '/placeholders/cover-1.jpg',
   720000, 2400, 12, 'Colombo (CMB)', 'Emirates (via Dubai)', 'Fairmont Makkah Clock Royal Tower', 5,
   'The Oberoi Madinah', 5, 'Full Board', 'Private Luxury Van', true, 'vip', 'luxury',
   array['Business-class option', 'Umrah visa', '5-star Haram-view suites', 'Private guide'],
   array['Personal shopping'], array['2026-12-05']::date[], 4, true)
on conflict (id) do nothing;

insert into maulavis (slug, name, photo_url, specialization, city, languages, years_experience, phone, whatsapp)
values
  ('ustaz-mohamed-rizvi', 'Ustaz Mohamed Rizvi', '/placeholders/logo-rizvi.png', 'Umrah & Hajj Guidance', 'Colombo',
   array['Tamil', 'English', 'Arabic'], 12, '+94 77 111 2233', '+94771112233'),
  ('sheikh-abdul-hameed', 'Sheikh Abdul Hameed', '/placeholders/logo-hameed.png', 'Fiqh & Pilgrim Counselling', 'Kandy',
   array['Sinhala', 'English'], 9, '+94 77 222 3344', '+94772223344')
on conflict (slug) do nothing;

insert into blog_posts (slug, title, excerpt, content, cover_image_url, category, status, published_at)
values
  ('first-time-umrah-checklist', 'First-Time Umrah: The Complete Pre-Departure Checklist',
   'Everything Sri Lankan pilgrims need to prepare before their first Umrah journey.',
   'Full article content goes here — written in the admin dashboard.', '/placeholders/cover-3.jpg',
   'Guides', 'published', now()),
  ('best-time-to-perform-umrah', 'When Is the Best Time to Perform Umrah?',
   'Comparing crowd levels, weather, and pricing across the year.',
   'Full article content goes here — written in the admin dashboard.', '/placeholders/cover-4.jpg',
   'Planning', 'published', now())
on conflict (slug) do nothing;
