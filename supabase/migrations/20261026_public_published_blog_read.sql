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
    and (
      collection_name <> 'blogPosts'
      or (
        lower(coalesce(data->>'published', 'true')) not in ('false', '0')
        and lower(coalesce(data->>'isPublished', 'true')) not in ('false', '0')
        and lower(coalesce(data->>'status', 'published')) not in ('draft', 'unpublished', 'archived', 'deleted')
        and lower(coalesce(data->>'noindex', data->>'noIndex', 'false')) not in ('true', '1')
        and position('noindex' in lower(coalesce(data->>'robots', ''))) = 0
        and lower(coalesce(data->>'redirect', 'false')) in ('false', '0', '')
        and lower(coalesce(data->>'redirectTo', '')) in ('false', '0', '')
      )
    )
  );
