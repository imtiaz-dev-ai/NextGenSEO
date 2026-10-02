/**
 * Shared Supabase client for the database and image storage.
 *
 * Required env vars (see .env.example):
 *   VITE_SUPABASE_URL
 *   VITE_SUPABASE_ANON_KEY
 *   VITE_SUPABASE_BUCKET   (defaults to "images")
 */

import { createClient, type SupabaseClient } from '@supabase/supabase-js';

const url = import.meta.env.VITE_SUPABASE_URL as string | undefined;
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY as string | undefined;
const bucket = (import.meta.env.VITE_SUPABASE_BUCKET as string | undefined) || 'images';

export const isSupabaseConfigured = Boolean(url && anonKey);

let _client: SupabaseClient | null = null;

/** Lazily created Supabase client. Returns null when env vars are missing. */
export const getSupabase = (): SupabaseClient | null => {
  if (!isSupabaseConfigured) return null;
  if (!_client) {
    _client = createClient(url!, anonKey!, {
      auth: { persistSession: true, autoRefreshToken: true },
      global: { headers: { 'x-client-info': 'nextgen-seo-web' } },
    });
  }
  return _client;
};

/** Human readable, URL-safe extension for a mime type. */
const mimeToExt = (mime: string) => {
  const map: Record<string, string> = {
    'image/jpeg': 'jpg',
    'image/jpg': 'jpg',
    'image/png': 'png',
    'image/webp': 'webp',
    'image/gif': 'gif',
    'image/avif': 'avif',
    'image/svg+xml': 'svg',
  };
  return map[mime?.toLowerCase()] || 'jpg';
};

/** Build a collision-resistant object key: `folder/1699999-ab12cd.jpg` */
const buildKey = (folder: string, mimeOrExt: string) => {
  const cleanFolder = (folder || 'misc').replace(/[^a-zA-Z0-9/_-]/g, '');
  const ext = mimeOrExt.includes('/') ? mimeToExt(mimeOrExt) : mimeOrExt.replace(/[^a-z0-9]/gi, '');
  const stamp = Date.now().toString(36);
  const rand = Math.random().toString(36).slice(2, 8);
  return `${cleanFolder}/${stamp}-${rand}.${ext}`;
};

export interface UploadResult {
  url: string;
  path: string;
}

/**
 * Upload a File to Supabase Storage.
 * Returns the public URL of the stored object.
 */
export const uploadImage = async (
  file: File,
  folder: string,
  onProgress?: (percent: number) => void,
): Promise<string> => {
  const client = getSupabase();
  if (!client) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
    );
  }

  if (!file || !file.type?.startsWith('image/')) {
    throw new Error('Only image files are allowed.');
  }
  if (file.size > 10 * 1024 * 1024) {
    throw new Error('Image is too large. Maximum size is 10MB.');
  }

  const key = buildKey(folder, file.type);

  // supabase-js v2 has no first-class progress callback on upload, so we emit
  // a coarse progress signal (start/end) to keep the caller API compatible.
  onProgress?.(0);

  const { error } = await client.storage.from(bucket).upload(key, file, {
    cacheControl: '31536000',
    upsert: false,
    contentType: file.type,
  });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const { data } = client.storage.from(bucket).getPublicUrl(key);
  if (!data?.publicUrl) {
    throw new Error('Supabase upload succeeded but no public URL was returned. Is the bucket public?');
  }

  onProgress?.(100);
  return data.publicUrl;
};

/**
 * Upload a base64 data URL (e.g. `data:image/png;base64,...`) to Supabase Storage.
 * Used by the admin panel, which works with canvas/base64 output.
 */
export const uploadBase64Image = async (dataUrl: string, folder: string): Promise<string> => {
  const client = getSupabase();
  if (!client) {
    throw new Error(
      'Supabase is not configured. Add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your environment.',
    );
  }

  if (!dataUrl?.startsWith('data:image/')) {
    throw new Error('Invalid image data.');
  }

  const match = /^data:(image\/[a-z0-9+.-]+);base64,(.+)$/i.exec(dataUrl);
  if (!match) {
    throw new Error('Malformed base64 image data.');
  }

  const mime = match[1];
  const base64 = match[2];

  const key = buildKey(folder, mime);

  const blob = base64ToBlob(base64, mime);

  const { error } = await client.storage.from(bucket).upload(key, blob, {
    cacheControl: '31536000',
    upsert: false,
    contentType: mime,
  });

  if (error) {
    throw new Error(`Supabase upload failed: ${error.message}`);
  }

  const { data } = client.storage.from(bucket).getPublicUrl(key);
  if (!data?.publicUrl) {
    throw new Error('Supabase upload succeeded but no public URL was returned. Is the bucket public?');
  }

  return data.publicUrl;
};

/** Decode a base64 string into a Blob without relying on `atob` in all runtimes. */
const base64ToBlob = (base64: string, mime: string): Blob => {
  if (typeof atob === 'function') {
    const binary = atob(base64);
    const len = binary.length;
    const bytes = new Uint8Array(len);
    for (let i = 0; i < len; i++) bytes[i] = binary.charCodeAt(i);
    return new Blob([bytes], { type: mime });
  }

  // Fallback for environments without atob (e.g. some SSR / worker contexts)
  const cleaned = base64.replace(/\s/g, '');
  const buffer = (globalThis as any).Buffer
    ? (globalThis as any).Buffer.from(cleaned, 'base64')
    : null;
  if (!buffer) throw new Error('No base64 decoder available in this environment.');
  return new Blob([new Uint8Array(buffer)], { type: mime });
};

/** Delete a previously uploaded object. Safe to call with a full public URL. */
export const deleteImage = async (pathOrUrl: string): Promise<boolean> => {
  const client = getSupabase();
  if (!client || !pathOrUrl) return false;

  const fileApi = client.storage.from(bucket);

  const path = pathOrUrl.includes(bucket)
    ? pathOrUrl.split(`/${bucket}/`)[1]?.split('?')[0]
    : pathOrUrl.replace(/^\/+/, '');

  if (!path) return false;

  const { error } = await fileApi.remove([path]);
  return !error;
};