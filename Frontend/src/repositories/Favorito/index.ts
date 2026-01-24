import { DATA_SOURCE } from '@/api'
import { BackendFavoritoRepository } from './FavoritoBackendRepository'
import type { FavoritoRepository } from './FavoritoRepository'

const backendRepository = new BackendFavoritoRepository()

export const favoritoRepository: FavoritoRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { FavoritoRepository }
