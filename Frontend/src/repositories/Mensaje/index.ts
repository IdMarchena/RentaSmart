import { DATA_SOURCE } from '@/api'
import { BackendMensajeRepository } from './MensajeBackendRepository'
import type { MensajeRepository } from './MensajeRepository'

const backendRepository = new BackendMensajeRepository()

export const mensajeRepository: MensajeRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { MensajeRepository }
