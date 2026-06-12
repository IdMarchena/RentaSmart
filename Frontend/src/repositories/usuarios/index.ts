import { DATA_SOURCE } from '@/api';
import { usuariosRepositoryBackend } from './UsuariosRepository.backend';
import { usuariosRepositorySupabase } from './UsuariosRepository.supabase';

export const usuariosRepository =
  DATA_SOURCE === 'backend' ? usuariosRepositoryBackend : usuariosRepositorySupabase;
