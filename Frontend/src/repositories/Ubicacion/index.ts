import { DATA_SOURCE } from '@/api'
import { BackendUbicacionRepository } from './UbicacionBackendRepository'
import { GoogleMapsUbicacionRepository } from './GoogleMapsUbicacionRepository'
import type { UbicacionRepository } from './UbicacionRepository'

// Instancias de los repositorios
const backendRepository = new BackendUbicacionRepository()
const googleMapsRepository = new GoogleMapsUbicacionRepository()

/**
 * Selector híbrido que permite usar Google Maps o Backend
 * Por defecto usa Google Maps para mantener la funcionalidad actual
 */
export const ubicacionRepository: UbicacionRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : googleMapsRepository

/**
 * Exportamos también las instancias individuales para acceso directo
 * si se necesita usar una fuente específica
 */
export const googleMapsUbicacionRepository = googleMapsRepository
export const backendUbicacionRepository = backendRepository

export type { UbicacionRepository }
