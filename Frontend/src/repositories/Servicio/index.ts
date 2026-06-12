import { DATA_SOURCE } from '@/api'
import { BackendServicioRepository } from './ServicioBackendRepository'
import type { ServicioRepository } from './ServicioRepository'

const backendRepository = new BackendServicioRepository()

export const servicioRepository: ServicioRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { ServicioRepository }
