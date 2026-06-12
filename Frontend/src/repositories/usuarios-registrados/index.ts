import { DATA_SOURCE } from '@/api'
import { BackendUsuarioRegistradoRepository } from './UsuarioRegistradoRepository.backend'
import { SupabaseUsuarioRegistradoRepository } from './UsuarioRegistradoRepository.supabase'
import type { UsuarioRegistradoRepository } from './UsuarioRegistradoRepository'

const backendRepository = new BackendUsuarioRegistradoRepository()
const supabaseRepository = new SupabaseUsuarioRegistradoRepository()

export const usuarioRegistradoRepository: UsuarioRegistradoRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : supabaseRepository

export type { UsuarioRegistradoRepository }
