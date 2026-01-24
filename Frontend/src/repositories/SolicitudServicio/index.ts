import { DATA_SOURCE } from '@/api'
import { BackendSolicitudServicioRepository } from './SolicitudServicioBackendRepository'
import type { SolicitudServicioRepository } from './SolicitudServicioRepository'

const backendRepository = new BackendSolicitudServicioRepository()

export const solicitudServicioRepository: SolicitudServicioRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { SolicitudServicioRepository }
