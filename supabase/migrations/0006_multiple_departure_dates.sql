-- A package can now list several departure dates that all share the price
-- entered on that listing (src/components/agency/package-form.tsx). If a
-- date needs a different price, the agency creates a separate package for
-- it instead — this table still has exactly one price per row.
alter table packages
  add column departure_dates date[] not null default '{}';

-- Backfill: every existing single departure_date becomes a one-element array.
update packages
  set departure_dates = array[departure_date]
  where departure_date is not null;

drop index if exists packages_departure_date_idx;
alter table packages drop column departure_date;

-- GIN index so "packages departing in month X" (the /packages and /compare
-- departure-month filter) can use an index instead of scanning every row.
create index packages_departure_dates_idx on packages using gin (departure_dates);

comment on column packages.departure_dates is 'Every scheduled departure date for this package, all at its listed price. Empty when the agency has not scheduled specific dates yet.';
