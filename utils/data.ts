import { getSupabase, uploadBase64Image, uploadImage } from './supabase';

type CollectionName =
  | 'blogPosts'
  | 'caseStudies'
  | 'teamMembers'
  | 'chatMessages'
  | 'backlinks'
  | 'marketplaceListings'
  | 'communityPosts';

type DataRecord = Record<string, any> & { id: string };

export interface BlogDeploymentStatus {
  deploymentTriggered?: boolean;
  deploymentError?: string;
}

const getCollection = (_name: CollectionName) => {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return client.from('app_records');
};

const adminRequest = async <T>(action: string, method: 'GET' | 'POST', body?: Record<string, unknown>, query?: Record<string, string>): Promise<T> => {
  const url = new URL('/api/admin', window.location.origin);
  url.searchParams.set('action', action);
  if (query) {
    for (const [key, value] of Object.entries(query)) url.searchParams.set(key, value);
  }
  const response = await fetch(url, {
    method,
    credentials: 'same-origin',
    headers: method === 'POST' ? { 'Content-Type': 'application/json' } : undefined,
    body: method === 'POST' ? JSON.stringify({ action, ...body }) : undefined,
  });
  const result = await response.json().catch(() => ({}));
  if (!response.ok) throw new Error(result.error || `Admin request failed (${response.status}).`);
  return result as T;
};

const readCollection = async (name: CollectionName): Promise<DataRecord[]> => {
  const { data, error } = await getCollection(name)
    .select('id,data')
    .eq('collection_name', name)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Could not load ${name} from Supabase: ${error.message}`);
  return (data || []).map(row => ({ ...row.data, id: row.id }));
};

const newId = () => {
  if (!globalThis.crypto?.randomUUID) {
    throw new Error('This browser cannot generate secure record IDs. Use a modern browser over HTTPS.');
  }
  return globalThis.crypto.randomUUID();
};

const writeCollectionWithResult = (name: CollectionName, record: Record<string, any>) =>
  adminRequest<{ id: string } & BlogDeploymentStatus>('save', 'POST', {
    collection: name,
    record,
  });

const writeCollection = async (name: CollectionName, record: Record<string, any>): Promise<string> => {
  const result = await writeCollectionWithResult(name, record);
  return result.id;
};

const updateCollection = (name: CollectionName, id: string, updates: Record<string, any>) =>
  adminRequest<BlogDeploymentStatus>('update', 'POST', { collection: name, id, updates });

const deleteFromCollection = (name: CollectionName, id: string) =>
  adminRequest<BlogDeploymentStatus>('delete', 'POST', { collection: name, id });

export const getBlogsFromSupabase = () => readCollection('blogPosts');

const cleanText = (value: unknown, fallback = ''): string => {
  const text = typeof value === 'string' ? value.trim() : fallback;
  return text || fallback;
};

const toSlug = (value: string) => value.toLowerCase().trim().replace(/[^a-z0-9]+/g, '-').replace(/(^-|-$)/g, '') || 'post';

const normalizeLegacyBlog = (record: Record<string, any>) => {
  const title = cleanText(record?.title, 'Untitled post');
  const content = typeof record?.content === 'string' ? record.content : '';
  const excerpt = cleanText(record?.excerpt, content.replace(/<[^>]+>/g, ' ').replace(/\s+/g, ' ').slice(0, 170));
  const category = cleanText(record?.category, 'SEO');
  const author = cleanText(record?.author, 'NextGen SEO');
  const image = cleanText(record?.image, 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=1200&q=80');
  const date = cleanText(record?.date, record?.createdAt?.toDate ? record.createdAt.toDate().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }) : 'Recent');

  return {
    ...record,
    id: cleanText(record?.id, record?.slug || toSlug(title)),
    title,
    category,
    author,
    excerpt,
    content,
    image,
    date,
    slug: cleanText(record?.slug, toSlug(title)),
    readTime: cleanText(record?.readTime, '5 min'),
  };
};

export const getLegacyBlogPosts = async (): Promise<DataRecord[]> => {
  try {
    const response = await fetch('/database.json', { cache: 'no-store' });
    if (!response.ok) return [];
    const payload = await response.json();
    const records = payload?.blogPosts ? Object.values(payload.blogPosts) : Array.isArray(payload) ? payload : [];
    return (records as Record<string, any>[]).map(record => normalizeLegacyBlog(record));
  } catch {
    return [];
  }
};

export const getBlogsWithLegacyFallback = async (): Promise<DataRecord[]> => {
  try {
    const blogs = await getBlogsFromSupabase();
    if (blogs.length > 0) return blogs;
  } catch {
    // Ignore Supabase issues and fall back to the legacy JSON dataset.
  }
  return getLegacyBlogPosts();
};

export const saveBlogToSupabase = (blog: Record<string, any>) => writeCollectionWithResult('blogPosts', blog);
export const updateBlogInSupabase = (id: string, updates: Record<string, any>) => updateCollection('blogPosts', id, updates);
export const deleteBlogFromSupabase = (id: string) => deleteFromCollection('blogPosts', id);

export const getCasesFromSupabase = () => readCollection('caseStudies');
export const saveCaseToSupabase = (record: Record<string, any>) => writeCollection('caseStudies', record);
export const updateCaseInSupabase = (id: string, updates: Record<string, any>) => updateCollection('caseStudies', id, updates);
export const deleteCaseFromSupabase = (id: string) => deleteFromCollection('caseStudies', id);

export const getTeamFromSupabase = () => readCollection('teamMembers');
export const saveTeamToSupabase = (record: Record<string, any>) => writeCollection('teamMembers', record);
export const updateTeamInSupabase = (id: string, updates: Record<string, any>) => updateCollection('teamMembers', id, updates);
export const deleteTeamFromSupabase = (id: string) => deleteFromCollection('teamMembers', id);

export const getChatMessagesFromSupabase = async () => {
  const result = await adminRequest<{ records: DataRecord[] }>('list', 'GET', undefined, { collection: 'chatMessages' });
  return result.records;
};
export const saveChatMessageToSupabase = async (message: Record<string, any>): Promise<string> => {
  const id = newId();
  const { error } = await getCollection('chatMessages').insert({
    collection_name: 'chatMessages',
    id,
    data: { ...message, timestamp: new Date().toISOString() },
  });
  if (error) throw new Error(`Could not save chat message to Supabase: ${error.message}`);
  return id;
};
export const deleteChatMessageFromSupabase = (id: string) => deleteFromCollection('chatMessages', id);

export const getBacklinksFromSupabase = () => readCollection('backlinks');
export const saveBacklinkToSupabase = (record: Record<string, any>) => writeCollection('backlinks', record);
export const deleteBacklinkFromSupabase = (id: string) => deleteFromCollection('backlinks', id);

export const getMarketplaceListingsFromSupabase = async () => {
  const rows = await readCollection('marketplaceListings');
  return rows.map(data => ({
    ...data,
    guestPost: data.guestPost ?? data.guest_post ?? data.guestpost ?? undefined,
    linkInsertion: data.linkInsertion ?? data.link_insertion ?? data.linkinsertion ?? undefined,
  }));
};
export const saveMarketplaceListingToSupabase = (record: Record<string, any>) => writeCollection('marketplaceListings', record);
export const updateMarketplaceListingInSupabase = (id: string, updates: Record<string, any>) => updateCollection('marketplaceListings', id, updates);
export const deleteMarketplaceListingFromSupabase = (id: string) => deleteFromCollection('marketplaceListings', id);

export const getCommunityPostsFromSupabase = () => readCollection('communityPosts');
export const saveCommunityPostToSupabase = async (post: Record<string, any>): Promise<string> => {
  const id = newId();
  const { error } = await getCollection('communityPosts').insert({
    collection_name: 'communityPosts',
    id,
    data: { ...post, createdAt: new Date().toISOString(), likes: 0, comments: [] },
  });
  if (error) throw new Error(`Could not save community post to Supabase: ${error.message}`);
  return id;
};
export const likeCommunityPostInSupabase = async (postId: string, likes: number): Promise<void> => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured.');
  const current = await readCollection('communityPosts');
  const post = current.find(item => item.id === postId);
  if (!post) throw new Error('Community post not found.');
  const { id: _id, ...data } = post;
  const { error } = await client.from('app_records')
    .update({ data: { ...data, likes } })
    .eq('collection_name', 'communityPosts')
    .eq('id', postId);
  if (error) throw new Error(`Could not update community likes in Supabase: ${error.message}`);
};
export const addCommentToPostInSupabase = async (postId: string, comments: any[]): Promise<void> => {
  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured.');
  const current = await readCollection('communityPosts');
  const post = current.find(item => item.id === postId);
  if (!post) throw new Error('Community post not found.');
  const { id: _id, ...data } = post;
  const { error } = await client.from('app_records')
    .update({ data: { ...data, comments } })
    .eq('collection_name', 'communityPosts')
    .eq('id', postId);
  if (error) throw new Error(`Could not add community comment in Supabase: ${error.message}`);
};

export const uploadFileToStorage = async (
  file: File,
  folder: string,
  onProgress?: (percent: number) => void,
): Promise<string> => {
  return uploadImage(file, folder, onProgress);
};

export const uploadBlogImage = async (imageData: string): Promise<string> => {
  return uploadBase64Image(imageData, 'blogs');
};

export const signInAdmin = async (username: string, password: string) => {
  await adminRequest('login', 'POST', { username, password });
};

export const hasAdminSession = async () => {
  const result = await adminRequest<{ authenticated: boolean }>('session', 'GET');
  return result.authenticated;
};

export const signOutAdmin = async () => {
  await adminRequest('logout', 'POST');
};
