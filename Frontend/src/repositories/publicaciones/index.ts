import { DATA_SOURCE } from '@/api'
import { BackendPublicacionRepository } from './PublicacionRepository.backend'
import { SupabasePublicacionRepository } from './PublicacionRepository.supabase'
import type { PublicacionRepository } from './PublicacionRepository'
import type { PublicacionFilters } from './PublicacionRepository'

const backendRepository = new BackendPublicacionRepository()
const supabaseRepository = new SupabasePublicacionRepository()

export const publicacionRepository: PublicacionRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : supabaseRepository

export type { PublicacionRepository, PublicacionFilters }
