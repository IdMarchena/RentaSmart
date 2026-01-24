import { DATA_SOURCE } from '@/api'
import { BackendCalificacionRepository } from './CalificacionRepository'
import type { CalificacionRepository } from './CalificacionRepositoryBackend'

const backendRepository = new BackendCalificacionRepository()

export const calificacionRepository: CalificacionRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { CalificacionRepository }
