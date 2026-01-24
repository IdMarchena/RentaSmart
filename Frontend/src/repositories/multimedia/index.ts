import { DATA_SOURCE } from '@/api'
import { BackendMultimediaRepository } from './MultimediaRepository.backend'
import { SupabaseMultimediaRepository } from './MultimediaRepository.supabase'
import type { MultimediaRepository } from './MultimediaRepository'

const backendRepository = new BackendMultimediaRepository()
const supabaseRepository = new SupabaseMultimediaRepository()

export const multimediaRepository: MultimediaRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : supabaseRepository

export type { MultimediaRepository }
