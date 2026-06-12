  import type { Ubicacion } from '@/types/entitys'
  import type { UbicacionRepository } from '@/repositories/Ubicacion/UbicacionRepository'

  /**
   * Repositorio que usa Google Maps API para obtener ubicaciones
   * Mantiene la funcionalidad actual del frontend
   */
  export class GoogleMapsUbicacionRepository implements UbicacionRepository {
    
    // Cache para ubicaciones ya procesadas
    private cache = new Map<string, Ubicacion>()
    
    // Obtener todas las ubicaciones (usando Google Maps)
    async getAll(): Promise<Ubicacion[]> {
      // Por ahora, retornamos un array vacío o caché existente
      // Esto mantiene la compatibilidad con el sistema actual
      return Array.from(this.cache.values())
    }

    // Obtener una ubicación por ID (usando Google Maps)
    async getById(id: number): Promise<Ubicacion | null> {
      // Buscar en caché primero
      for (const ubicacion of this.cache.values()) {
        if (ubicacion.id === id) {
          return ubicacion
        }
      }
      
      // Si no está en caché, podríamos buscar en Google Maps
      // Por ahora retornamos null para mantener compatibilidad
      return null
    }

    // Crear una nueva ubicación (usando Google Maps)
    async create(data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> {
      // Crear una ubicación basada en los datos proporcionados
      const newUbicacion: Ubicacion = {
        id: Date.now(), // ID temporal basado en timestamp
        ...data,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      // Guardar en caché
      this.cache.set(`${newUbicacion.id}`, newUbicacion)
      
      return newUbicacion
    }

    // Actualizar una ubicación (usando Google Maps)
    async update(id: number, data: Omit<Ubicacion, 'id'>): Promise<Ubicacion> {
      const existing = this.cache.get(`${id}`)
      if (!existing) {
        throw new Error('Ubicación no encontrada')
      }
      
      const updated: Ubicacion = {
        ...existing,
        ...data,
        updated_at: new Date().toISOString(),
      }
      
      this.cache.set(`${id}`, updated)
      return updated
    }

    // Eliminar una ubicación
    async delete(id: number): Promise<void> {
      this.cache.delete(`${id}`)
    }

    // Buscar ubicaciones por estado (usando Google Maps)
    async getByEstado(estado: string): Promise<Ubicacion[]> {
      return Array.from(this.cache.values()).filter(
        ubicacion => ubicacion.estado === estado
      )
    }

    // Método especial para crear ubicación desde Google Places
    async createFromGooglePlace(place: google.maps.places.PlaceResult): Promise<Ubicacion> {
      if (!place.place_id || !place.name || !place.geometry?.location) {
        throw new Error('Place inválido')
      }
      
      const ubicacion: Ubicacion = {
        id: parseInt(place.place_id.replace(/[^0-9]/g, '')) || Date.now(),
        padre: null as any,
        nombre: place.name,
        latitud: place.geometry.location.lat(),
        longitud: place.geometry.location.lng(),
        estado: 'ACTIVA',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString(),
      }
      
      this.cache.set(`${ubicacion.id}`, ubicacion)
      return ubicacion
    }

    // Método especial para buscar por coordenadas (usando Google Maps)
    async searchByCoordinates(lat: number, lng: number, radius: number = 1000): Promise<Ubicacion[]> {
      // Implementación futura con Google Places API
      // Por ahora, buscamos en caché
      return Array.from(this.cache.values()).filter(ubicacion => {
        const distance = this.calculateDistance(lat, lng, ubicacion.latitud, ubicacion.longitud)
        return distance <= radius
      })
    }

    // Método utilitario para calcular distancia
    private calculateDistance(lat1: number, lng1: number, lat2: number, lng2: number): number {
      const R = 6371 // Radio de la Tierra en km
      const dLat = this.toRad(lat2 - lat1)
      const dLon = this.toRad(lng2 - lng1)
      const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
                Math.cos(this.toRad(lat1)) * Math.cos(this.toRad(lat2)) *
                Math.sin(dLon/2) * Math.sin(dLon/2)
      const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
      return R * c * 1000 // Convertir a metros
    }

    private toRad(value: number): number {
      return value * Math.PI / 180
    }
  }
