-- =========================================================================
-- Shirdi Sai Marbles & Tiles - Supabase Setup Script
-- Run this in your Supabase Dashboard: SQL Editor -> New Query -> Run
-- =========================================================================

-- 1. Create Enquiries table
create table if not exists public.enquiries (
  id uuid default gen_random_uuid() primary key,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  name text not null,
  phone text not null,
  category text default 'General Enquiry',
  area text,
  message text,
  target_phone text
);

-- 2. Enable Row Level Security (RLS)
alter table public.enquiries enable row level security;

-- 3. Allow anonymous form submissions from the website
create policy "Allow anonymous submissions from website"
on public.enquiries
for insert
to anon
with check (true);

-- 4. Allow authenticated showroom staff to read and view all enquiries
create policy "Allow authenticated staff to read enquiries"
on public.enquiries
for select
to authenticated
using (true);

-- =========================================================================
-- That's it! Your enquiries table is now ready to receive customer leads.
-- =========================================================================
