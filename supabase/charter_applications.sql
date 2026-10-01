-- Run this once in Supabase: SQL Editor → New query → paste → Run.
-- Creates a private table for Charter applications.

create table if not exists public.charter_applications (
  id          uuid primary key default gen_random_uuid(),
  email       text not null unique,
  mission     text,
  disruptors  text[] not null default '{}',
  app_failure text,
  write_in    text,
  created_at  timestamptz not null default now(),
  updated_at  timestamptz not null default now()
);

-- Lock the table down: no public access at all.
alter table public.charter_applications enable row level security;
revoke all on public.charter_applications from anon, authenticated;

-- Only your website's server (using the secret key) can read and write.
grant select, insert, update on public.charter_applications to service_role;
