import { DATA_SOURCE } from '@/api'
import { BackendInmuebleRepository } from './InmuebleRepository.backend'

import type { InmuebleRepository } from './InmuebleRepository'

const backendRepository = new BackendInmuebleRepository()


export const inmuebleRepository: InmuebleRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { InmuebleRepository }
