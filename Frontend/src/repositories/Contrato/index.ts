import { DATA_SOURCE } from '@/api'
import { BackendContratoRepository } from './ContratoBackendRepository'
import type { ContratoRepository } from './ContratoRepository'

const backendRepository = new BackendContratoRepository()

export const contratoRepository: ContratoRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { ContratoRepository }
