import type { Calificacion } from '@/types/entitys';
import type { UsuarioResumen } from '@/types/entities';

import type { CalificacionRepository } from '@/repositories/Calificacion/CalificacionRepositoryBackend';
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
    console.log("manito acabo de venir del servicio de publicacion porque intentaste llamarme alla y ahora ")
    console.log(`🚀 Iniciando getFullCalificacion para ID: ${id}`);
    
    const calificacion = await this.califRepo.getById(id);
    
    if (!calificacion) {
      console.error(`❌ No se encontró la calificacion con ID: ${id}`);
      throw new Error(`Calificacion con ID ${id} no encontrada`);
    }

    if (calificacion.usuario && calificacion.usuario.id && !calificacion.usuario.nombre) {
      console.log(`⚠️ Hidratando usuario ID: ${calificacion.usuario.id}`);
      try {
        const usuarioCompleto = await usuariosRepositoryBackend.getById(calificacion.usuario.id);
        
        if (usuarioCompleto) {
          calificacion.usuario = {
            ...calificacion.usuario,
            id: usuarioCompleto.id,
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
    
    else if (calificacion.servicio && calificacion.servicio.id && calificacion.servicio.id > 0) {
      console.log(`🛠️ Hidratando servicio ID: ${calificacion.servicio.id}`);
      
      if (!calificacion.servicio.nombre) {
        try {
          const servicioCompleto = await this.serviceRepo.getById(calificacion.servicio.id);
          if (servicioCompleto) {
            calificacion.servicio = servicioCompleto;
          }
        } catch (error) {
          console.warn(`⚠️ El servicio ${calificacion.servicio.id} no existe en BD`);
          calificacion.servicio = null;
        }
      }
    } else {
      calificacion.publicacion = calificacion.publicacion || null;
      calificacion.servicio = calificacion.servicio || null;
    }

    console.log(`🎯 Calificación final procesada:`, calificacion.id);
    return calificacion;
  }
}