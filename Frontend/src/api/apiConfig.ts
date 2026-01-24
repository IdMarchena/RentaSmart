export const API_BASE_URL =
  import.meta.env.VITE_API_BASE_URL ?? 'http://localhost:8080';

export type DataSource = 'supabase' | 'backend';

export const DATA_SOURCE = (import.meta.env.VITE_DATA_SOURCE ??
  'supabase') as DataSource;
