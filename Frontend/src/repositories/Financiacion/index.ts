import { DATA_SOURCE } from '@/api'
import { BackendFinanciacionRepository } from './FinanciacionBackendRepository'
import type { FinanciacionRepository } from './FinanciacionRepository'

const backendRepository = new BackendFinanciacionRepository()

export const financiacionRepository: FinanciacionRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { FinanciacionRepository }
