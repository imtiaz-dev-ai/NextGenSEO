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

drop policy if exists "Admins can manage app records" on public.app_records;
drop policy if exists "Admins can upload images" on storage.objects;
drop policy if exists "Admins can update images" on storage.objects;
drop policy if exists "Admins can delete images" on storage.objects;
drop function if exists public.is_admin();

do $cleanup_legacy_admin$
begin
  if to_regclass('public.admin_users') is not null then
    execute 'drop policy if exists "Admins can read their own admin membership" on public.admin_users';
    execute 'drop table public.admin_users';
  end if;
end
$cleanup_legacy_admin$;

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

insert into storage.buckets (id, name, public)
values ('images', 'images', true)
on conflict (id) do update set public = excluded.public;

drop policy if exists "Public can view public images" on storage.objects;
create policy "Public can view public images"
  on storage.objects for select
  to anon, authenticated
  using (bucket_id = 'images');

comment on table public.app_records is
  'Migrated Firestore-style app documents. Admin writes and signed image uploads are handled by the server-side admin API.';
