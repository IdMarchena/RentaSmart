import type { Publicacion, Inmueble, Multimedia } from '@/types/entitys';

import type { PublicacionRepository } from '@/repositories/publicaciones/PublicacionRepository';
import type { InmuebleRepository } from '@/repositories/inmuebles/InmuebleRepository';
import type { CalificacionRepository } from '@/repositories/Calificacion/CalificacionRepositoryBackend';
import type { MultimediaRepository } from '@/repositories/multimedia/MultimediaRepository';
import type { UbicacionRepository } from '@/repositories/Ubicacion/UbicacionRepository';
import type {CalificacionService} from '@/services/CalificacionService';
import { usuariosRepository } from '@/repositories/usuarios';

export class PublicacionService {
  private pubRepo: PublicacionRepository;
  private inmuebleRepo: InmuebleRepository;
  private userRepo: typeof usuariosRepository;
  private ubicacionRepo: UbicacionRepository;
  private califRepo: CalificacionRepository;
  private multiRepo: MultimediaRepository;
  private CalificacionService: CalificacionService;

  constructor(
    pubRepo: PublicacionRepository,
    inmuebleRepo: InmuebleRepository,
    userRepo: typeof usuariosRepository,
    ubicacionRepo: UbicacionRepository,
    califRepo: CalificacionRepository,
    multiRepo: MultimediaRepository,
    califService: CalificacionService
  ) {
    this.pubRepo = pubRepo;
    this.inmuebleRepo = inmuebleRepo;
    this.userRepo = userRepo;
    this.ubicacionRepo = ubicacionRepo;
    this.califRepo = califRepo;
    this.multiRepo = multiRepo;
    this.CalificacionService = califService;
  }

  async getFullPublicacion(id: number): Promise<Publicacion> {
    console.log("llamando al publicaciones aca esta el error")
    console.log(`🚀 Iniciando getFullPublicacion para ID: ${id}`);
    
    const publicacion = await this.pubRepo.getById(id);
    console.log(`📦 Publicación base obtenida:`, publicacion);
    
    if (!publicacion) {
      console.error(`❌ No se encontró publicación con ID: ${id}`);
      throw new Error(`Publicación con ID ${id} no encontrada`);
    }

    console.log(`🔍 Inmueble en la publicación:`, publicacion.inmueble);
    console.log(`🔍 Usuario en la publicación:`, publicacion.usuario);
    console.log(`🔍 Multimedia en la publicación:`, publicacion.multimedia);
    console.log(`🔍 Calificaciones en la publicación:`, publicacion.calificaciones);
    if (!publicacion.inmueble || !publicacion.inmueble.ubicacion) {
        console.log(`⚠️ El inmueble no está completamente hidratado, obteniendo por ID: ${publicacion.inmueble?.id}`);
        const inmuebleCompleto = await this.inmuebleRepo.getById(publicacion.inmueble?.id || 0);
      if (inmuebleCompleto) {
        publicacion.inmueble = inmuebleCompleto as Inmueble;
    
        const idUbi = (inmuebleCompleto as any).idUbicacion || inmuebleCompleto.ubicacion.id; 
    
        console.log(`🔎 ID de ubicación encontrado en el inmueble: ${idUbi}`);

        if (idUbi) {
          try {
            console.log(`🔎 ID de ubicación a encontrar: ${idUbi}`);
            const ubicacionReal = await this.ubicacionRepo.getById(idUbi);
            console.log("🌍 Datos de ubicación recuperados:", ubicacionReal);
            
            if (ubicacionReal) {
                publicacion.inmueble.ubicacion = ubicacionReal;
                (publicacion.inmueble as any).latitud = ubicacionReal.latitud;
                (publicacion.inmueble as any).longitud = ubicacionReal.longitud;
            }
          } catch (err) {
            console.error("❌ Error al llamar a ubicacionRepo:", err);
        }
      }
}
    }

if (!publicacion.multimedia || publicacion.multimedia.length === 0) {
    try {
        const multimediaRaw = await this.multiRepo.getByPublicacion(id);
        
        publicacion.multimedia = multimediaRaw.map(m => ({
            ...m,
              url:
    !m.url || m.url.startsWith('blob:')
      ? '/placeholder-image.jpg'
      : m.url,
            tipo: this.mapTipoMultimedia(m.tipo)
        }));

        console.log(`📸 Multimedia procesada:`, publicacion.multimedia);
    } catch (error) {
        publicacion.multimedia = [];
    }
}

if (!publicacion.calificaciones || publicacion.calificaciones.length === 0) {
  console.log(`⭐ Obteniendo e HIDRATANDO calificaciones para publicación ID: ${id}`);
  try {
  
    const calificacionesBasicas = await this.califRepo.getByPublicacionId(id);
  
    const calificacionesCompletas = await Promise.all(
      calificacionesBasicas.map(c => this.CalificacionService.getFullCalificacion(c.id))
    );

    publicacion.calificaciones = calificacionesCompletas;
    console.log(`📊 Calificaciones hidratadas con éxito:`, calificacionesCompletas);
    
  } catch (error) {
    console.log(`⚠️ Error hidratando calificaciones:`, error);
    publicacion.calificaciones = [];
  }
}

    console.log(`🎯 Publicación final completa:`, publicacion);
    return publicacion;
  }

  private mapTipoMultimedia(tipo: string): Multimedia['tipo'] {
    if (tipo === 'FOTO' || tipo === 'IMAGEN') return 'IMAGEN';
    if (tipo === 'TURNO_360') return 'TURNO_360';
    if (tipo === 'AUDIO') return 'AUDIO';
    if (tipo === 'DOCUMENTO') return 'DOCUMENTO';
    return 'VIDEO';
  }

}
