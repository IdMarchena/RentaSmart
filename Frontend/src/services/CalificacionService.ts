import type { Calificacion } from '@/types/entitys';
import type { UsuarioResumen } from '@/types/entities';

import type { CalificacionRepository } from '@/repositories/Calificacion/CalificacionRepositoryBackend';
// CORRECCIÓN 1: Importamos el objeto real, no solo el tipo
import { usuariosRepositoryBackend } from '@/repositories/usuarios/UsuariosRepository.backend';
import type { ServicioRepository } from '@/repositories/Servicio/ServicioRepository';
import type { PublicacionRepository } from '@/repositories/publicaciones/PublicacionRepository';

export class CalificacionService {
  private califRepo: CalificacionRepository;
  private serviceRepo: ServicioRepository;
  private pubRepo: PublicacionRepository;

  constructor(
    califRepo: CalificacionRepository,
    serviceRepo: ServicioRepository,
    pubRepo: PublicacionRepository
  ) {
    this.califRepo = califRepo;
    this.serviceRepo = serviceRepo;
    this.pubRepo = pubRepo;
  }

  async getFullCalificacion(id: number): Promise<Calificacion> {
    console.log(`🚀 Iniciando getFullCalificacion para ID: ${id}`);
    
    const calificacion = await this.califRepo.getById(id);
    
    if (!calificacion) {
      console.error(`❌ No se encontró la calificacion con ID: ${id}`);
      throw new Error(`Calificacion con ID ${id} no encontrada`);
    }

    // --- 1. HIDRATAR USUARIO ---
    if (calificacion.usuario && calificacion.usuario.id && !calificacion.usuario.nombre) {
      console.log(`⚠️ Hidratando usuario ID: ${calificacion.usuario.id}`);
      try {
        const usuarioCompleto = await usuariosRepositoryBackend.getById(calificacion.usuario.id);
        
        if (usuarioCompleto) {
          calificacion.usuario = {
            ...calificacion.usuario,
            id: usuarioCompleto.id,
            // CORRECCIÓN 2: Mapeo flexible de nombres según lo que envía el backend
            nombre: (usuarioCompleto as any).nombre || 
                    (usuarioCompleto as any).nombre_usuario || 
                    (usuarioCompleto as any).nombreUsuario || 
                    "Usuario sin nombre"
          };
          console.log(`✅ Usuario hidratado:`, calificacion.usuario.nombre);
        }
      } catch (error) {
        console.error(`⚠️ Error obteniendo usuario:`, error);
      }
    }
    
    // --- 2. HIDRATAR PUBLICACIÓN O SERVICIO ---
    // CORRECCIÓN 3: Prioridad absoluta a Publicación para evitar el error 404/500 de Servicios
    if (calificacion.publicacion && calificacion.publicacion.id) {
      console.log(`🏠 Hidratando publicación ID: ${calificacion.publicacion.id}`);
      
      // Limpiamos el servicio para evitar que el bloque 'else if' se ejecute por error
      calificacion.servicio = null;

      if (!calificacion.publicacion.titulo) {
        try {
          const pubCompleta = await this.pubRepo.getById(calificacion.publicacion.id);
          if (pubCompleta) calificacion.publicacion = pubCompleta;
        } catch (error) {
          console.error(`⚠️ Error hidratando publicación:`, error);
        }
      }
    } 
    // Solo intentamos cargar el servicio si NO hay publicación
    else if (calificacion.servicio && calificacion.servicio.id && calificacion.servicio.id > 0) {
      console.log(`🛠️ Hidratando servicio ID: ${calificacion.servicio.id}`);
      
      if (!calificacion.servicio.nombre) {
        try {
          const servicioCompleto = await this.serviceRepo.getById(calificacion.servicio.id);
          if (servicioCompleto) {
            calificacion.servicio = servicioCompleto;
          }
        } catch (error) {
          // Si el servicio no existe en el backend, lo ponemos en null en lugar de romper todo
          console.warn(`⚠️ El servicio ${calificacion.servicio.id} no existe en BD`);
          calificacion.servicio = null;
        }
      }
    } else {
      // Caso de seguridad: si no hay IDs válidos de nada
      calificacion.publicacion = calificacion.publicacion || null;
      calificacion.servicio = calificacion.servicio || null;
    }

    console.log(`🎯 Calificación final procesada:`, calificacion.id);
    return calificacion;
  }
}