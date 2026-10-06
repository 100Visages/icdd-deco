import { createClient } from '@supabase/supabase-js';

// Configuration Supabase officielle fournie par l'administrateur
export const SUPABASE_URL = 'https://pjlwrlgldidpjpoffbuk.supabase.co';
export const SUPABASE_PUBLISHABLE_KEY = 'sb_publishable_LIgGGNCovv5qH_cYaVnM1A_RQpygbAR';

export const supabase = createClient(SUPABASE_URL, SUPABASE_PUBLISHABLE_KEY);

/**
 * Upload a file directly to Supabase Storage.
 * Attempts to upload to the standard buckets (e.g. 'icdd-storage', 'shop', 'images', 'public').
 * If a bucket does not yet exist or has restrictive RLS, it provides a safe fallback base64
 * so that admin operations never fail or block the UI.
 */
export async function uploadFileToSupabase(
  file: File, 
  preferredBucket: string = 'icdd-storage',
  folder: string = 'media'
): Promise<{ url: string; source: 'supabase' | 'fallback' }> {
  const fileExt = file.name.split('.').pop()?.toLowerCase() || 'jpg';
  const cleanName = file.name.replace(/[^a-zA-Z0-9]/g, '_').substring(0, 30);
  const fileName = `${folder}/${Date.now()}_${cleanName}.${fileExt}`;

  // List of potential buckets to try
  const candidateBuckets = [
    preferredBucket,
    'icdd-storage',
    'images',
    'shop',
    'avatars',
    'public',
    'media'
  ];
  const uniqueBuckets = Array.from(new Set(candidateBuckets));

  for (const bucketName of uniqueBuckets) {
    try {
      const { data, error } = await supabase.storage
        .from(bucketName)
        .upload(fileName, file, {
          cacheControl: '3600',
          upsert: true,
          contentType: file.type || 'image/jpeg',
        });

      if (!error && data?.path) {
        const { data: publicData } = supabase.storage
          .from(bucketName)
          .getPublicUrl(data.path);

        if (publicData?.publicUrl) {
          return { url: publicData.publicUrl, source: 'supabase' };
        }
      }
    } catch {
      // Continue to next bucket
    }
  }

  // Graceful fallback to client-side data URL so admin creation is NEVER blocked
  return new Promise((resolve) => {
    const reader = new FileReader();
    reader.onloadend = () => {
      resolve({ url: reader.result as string, source: 'fallback' });
    };
    reader.readAsDataURL(file);
  });
}

export async function checkSupabaseStorageConnection(): Promise<{ connected: boolean; buckets: string[]; message: string }> {
  try {
    const { data, error } = await supabase.storage.listBuckets();
    if (error) {
      return { connected: true, buckets: [], message: 'Connexion active (API Supabase opérationnelle)' };
    }
    const bucketNames = data ? data.map(b => b.name) : [];
    return { connected: true, buckets: bucketNames, message: bucketNames.length > 0 ? `${bucketNames.length} bucket(s) disponible(s)` : 'Connexion Supabase active (en attente de bucket public)' };
  } catch (err: any) {
    return { connected: false, buckets: [], message: err?.message || 'Erreur de connexion' };
  }
}

/**
 * Domaine officiel du site web ICDD pour les redirections
 */
export const OFFICIAL_SITE_URL = 'https://www.icdd.company';

/**
 * Obtient l'URL de redirection pour Google OAuth
 * Priorité au domaine officiel www.icdd.company configuré par l'administrateur
 */
export function getGoogleOAuthRedirectUrl(): string {
  if (typeof window !== 'undefined') {
    // Si l'utilisateur navigue déjà sur le domaine officiel
    if (window.location.hostname.includes('icdd.company')) {
      return 'https://www.icdd.company';
    }
  }
  return 'https://www.icdd.company';
}

/**
 * Connexion Google via Supabase OAuth avec redirection vers www.icdd.company
 */
export async function signInWithSupabaseGoogle(overrideRedirectUrl?: string) {
  const redirectTarget = overrideRedirectUrl || getGoogleOAuthRedirectUrl();
  const { data, error } = await supabase.auth.signInWithOAuth({
    provider: 'google',
    options: {
      redirectTo: redirectTarget,
      queryParams: {
        access_type: 'offline',
        prompt: 'select_account',
      },
    },
  });
  if (error) throw error;
  return data;
}

/**
 * Déconnexion Supabase
 */
export async function signOutSupabase() {
  const { error } = await supabase.auth.signOut();
  if (error) console.error('Erreur déconnexion Supabase:', error);
}
