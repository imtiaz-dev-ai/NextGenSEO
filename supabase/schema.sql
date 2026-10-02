create table if not exists public.app_records (
  collection_name text not null check (
    collection_name in (
      'blogPosts',
      'caseStudies',
      'teamMembers',
      'chatMessages',
      'backlinks',
      'marketplaceListings',
      'communityPosts'
    )
  ),
  id text not null,
  data jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  primary key (collection_name, id)
);

create table if not exists public.admin_users (
  user_id uuid primary key references auth.users (id) on delete cascade,
  created_at timestamptz not null default now()
);

alter table public.admin_users enable row level security;
revoke all on public.admin_users from anon, authenticated;
grant select on public.admin_users to authenticated;

drop policy if exists "Admins can read their own admin membership" on public.admin_users;
create policy "Admins can read their own admin membership"
  on public.admin_users for select
  to authenticated
  using (user_id = (select auth.uid()));

create or replace function public.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select exists (
    select 1
    from public.admin_users
    where user_id = (select auth.uid())
  );
$$;

revoke all on function public.is_admin() from public;
grant execute on function public.is_admin() to authenticated;

alter table public.app_records enable row level security;

revoke all on public.app_records from anon, authenticated;
grant select on public.app_records to anon, authenticated;
grant insert, update, delete on public.app_records to anon, authenticated;

drop policy if exists "Public can read app records" on public.app_records;
create policy "Public can read app records"
  on public.app_records for select
  to anon, authenticated
  using (
    collection_name in (
      'blogPosts',
      'caseStudies',
      'teamMembers',
      'marketplaceListings',
      'communityPosts'
    )
  );

drop policy if exists "Public can submit chat messages" on public.app_records;
create policy "Public can submit chat messages"
  on public.app_records for insert
  to anon, authenticated
  with check (collection_name = 'chatMessages');

drop policy if exists "Public can create community posts" on public.app_records;
create policy "Public can create community posts"
  on public.app_records for insert
  to anon, authenticated
  with check (collection_name = 'communityPosts');

drop policy if exists "Public can update community posts" on public.app_records;
create policy "Public can update community posts"
  on public.app_records for update
  to anon, authenticated
  using (collection_name = 'communityPosts')
  with check (collection_name = 'communityPosts');

drop policy if exists "Admins can manage app records" on public.app_records;
create policy "Admins can manage app records"
  on public.app_records for all
  to authenticated
  using (public.is_admin())
  with check (public.is_admin());

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view public images" on storage.objects;
create policy "Public can view public images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'images');

drop policy if exists "Admins can upload images" on storage.objects;
create policy "Admins can upload images"
  on storage.objects for insert
  to authenticated
  with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "Admins can update images" on storage.objects;
create policy "Admins can update images"
  on storage.objects for update
  to authenticated
  using (bucket_id = 'images' and public.is_admin())
  with check (bucket_id = 'images' and public.is_admin());

drop policy if exists "Admins can delete images" on storage.objects;
create policy "Admins can delete images"
  on storage.objects for delete
  to authenticated
  using (bucket_id = 'images' and public.is_admin());

comment on table public.app_records is
  'Migrated Firestore-style app documents. Admin writes require a matching public.admin_users row.';

-- After creating the admin in Supabase Authentication, add the account here:
-- insert into public.admin_users (user_id)
-- select id from auth.users where email = 'YOUR_ADMIN_EMAIL'
-- on conflict do nothing;
