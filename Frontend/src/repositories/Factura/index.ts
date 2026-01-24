import { DATA_SOURCE } from '@/api'
import { BackendFacturaRepository } from './FacturaRepositoryBackend'
import type { FacturaRepository } from './FacturaRepository'

const backendRepository = new BackendFacturaRepository()

export const facturaRepository: FacturaRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { FacturaRepository }
