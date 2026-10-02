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

const getCollection = (_name: CollectionName) => {
  const client = getSupabase();
  if (!client) {
    throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  }
  return client.from('app_records');
};

const readCollection = async (name: CollectionName): Promise<DataRecord[]> => {
  const { data, error } = await getCollection(name)
    .select('id,data')
    .eq('collection_name', name)
    .order('created_at', { ascending: false });

  if (error) throw new Error(`Could not load ${name} from Supabase: ${error.message}`);
  return (data || []).map(row => ({ ...row.data, id: row.id }));
};

const writeCollection = async (name: CollectionName, record: Record<string, any>): Promise<string> => {
  const id = record.id || newId();
  const { id: _recordId, ...data } = record;
  const { error } = await getCollection(name).insert({
    collection_name: name,
    id,
    data,
  });
  if (error) throw new Error(`Could not save ${name} to Supabase: ${error.message}`);
  return id;
};

const updateCollection = async (name: CollectionName, id: string, updates: Record<string, any>) => {
  const { id: _recordId, ...data } = updates;
  const { data: updated, error } = await getCollection(name)
    .update({ data, updated_at: new Date().toISOString() })
    .eq('collection_name', name)
    .eq('id', id)
    .select('id')
    .maybeSingle();
  if (error) throw new Error(`Could not update ${name} in Supabase: ${error.message}`);
  if (!updated) throw new Error(`Could not update ${name} in Supabase: record not found.`);
};

const deleteFromCollection = async (name: CollectionName, id: string) => {
  const { data: deleted, error } = await getCollection(name)
    .delete()
    .eq('collection_name', name)
    .eq('id', id)
    .select('id')
    .maybeSingle();
  if (error) throw new Error(`Could not delete ${name} from Supabase: ${error.message}`);
  if (!deleted) throw new Error(`Could not delete ${name} from Supabase: record not found.`);
};

const newId = () => {
  if (!globalThis.crypto?.randomUUID) {
    throw new Error('This browser cannot generate secure record IDs. Use a modern browser over HTTPS.');
  }
  return globalThis.crypto.randomUUID();
};

export const getBlogsFromSupabase = () => readCollection('blogPosts');
export const saveBlogToSupabase = (blog: Record<string, any>) => writeCollection('blogPosts', blog);
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

export const getChatMessagesFromSupabase = () => readCollection('chatMessages');
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
  const configuredUsername = import.meta.env.VITE_ADMIN_USERNAME as string | undefined;
  const adminEmail = import.meta.env.VITE_ADMIN_EMAIL as string | undefined;
  if (!configuredUsername || !adminEmail) {
    throw new Error('Set VITE_ADMIN_USERNAME and VITE_ADMIN_EMAIL in your app environment before admin login.');
  }
  if (username.trim().toLowerCase() !== configuredUsername.trim().toLowerCase()) {
    throw new Error('Invalid username or password.');
  }

  const client = getSupabase();
  if (!client) throw new Error('Supabase is not configured. Set VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY.');
  const { data, error } = await client.auth.signInWithPassword({ email: adminEmail, password });
  if (error) throw new Error(`Supabase login failed: ${error.message}`);

  const { data: admin, error: adminError } = await client
    .from('admin_users')
    .select('user_id')
    .eq('user_id', data.user.id)
    .maybeSingle();
  if (adminError || !admin) {
    await client.auth.signOut();
    throw new Error('This account is not authorized as an admin. Add it to the Supabase admin_users table first.');
  }
};

export const hasAdminSession = async () => {
  const client = getSupabase();
  if (!client) return false;
  const { data: { session }, error } = await client.auth.getSession();
  if (error) throw new Error(`Could not check Supabase session: ${error.message}`);
  if (!session) return false;

  const { data: admin, error: adminError } = await client
    .from('admin_users')
    .select('user_id')
    .eq('user_id', session.user.id)
    .maybeSingle();
  if (adminError) throw new Error(`Could not verify admin access: ${adminError.message}`);
  return Boolean(admin);
};

export const signOutAdmin = async () => {
  const client = getSupabase();
  if (!client) return;
  const { error } = await client.auth.signOut();
  if (error) throw new Error(`Could not sign out: ${error.message}`);
};
