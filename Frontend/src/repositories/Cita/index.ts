import { DATA_SOURCE } from '@/api'
import { BackendCitaRepository } from './CitaRepositoryBackend'
import type { CitaRepository } from './CitaRepository'

const backendRepository = new BackendCitaRepository()

export const citaRepository: CitaRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { CitaRepository }
