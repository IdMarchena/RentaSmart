import { useState, useEffect } from 'react'
import { publicacionRepository, inmuebleRepository, usuariosRepository, calificacionRepository } from '@/repositories'
import { useAuthContext } from '../context/AuthContext'
import type { Publicacion } from '@/types/entitys'
import type { Inmueble } from '@/types/entitys'
import { PublicacionService } from '@/services/PublicacionService'
import { BackendPublicacionRepository } from '@/repositories/publicaciones/PublicacionRepository.backend'
import { BackendInmuebleRepository } from '@/repositories/inmuebles/InmuebleRepository.backend'
import { BackendUbicacionRepository } from '@/repositories/Ubicacion/UbicacionBackendRepository'
import { BackendCalificacionRepository } from '@/repositories/Calificacion/CalificacionRepository'
import { BackendMultimediaRepository } from '@/repositories/multimedia/MultimediaRepository.backend'
import { CalificacionService } from '@/services/CalificacionService'
import { usuariosRepositoryBackend } from '@/repositories/usuarios/UsuariosRepository.backend'
import { BackendServicioRepository } from '@/repositories/Servicio/ServicioBackendRepository'
export const usePublicaciones = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [publications, setPublications] = useState<Publicacion[]>([])
  const { user } = useAuthContext()

  // Instanciamos los repositorios necesarios para la lógica compuesta
  const repoUbicacion = new BackendUbicacionRepository();
  const repoPublicacion = new BackendPublicacionRepository();
  const repoInmueble = new BackendInmuebleRepository();
  const repoMultimedia = new BackendMultimediaRepository();
  const repoCalificacion = new BackendCalificacionRepository();
  const repoServicio = new BackendServicioRepository();
  const calificacionService = new CalificacionService(
    repoCalificacion as any,
    repoServicio as any,
    repoPublicacion as any
  );

  const service = new PublicacionService(
    repoPublicacion as any,
    repoInmueble as any,
    usuariosRepository as any,
    repoUbicacion as any,
    repoCalificacion as any,
    repoMultimedia as any,
    calificacionService as any
  )

  // ==========================================
  // LÓGICA DE CREACIÓN COMPUESTA (ORQUESTADA)
  // ==========================================
  const createPublicacionCompleta = async (data: {
    inmueble: Partial<Inmueble>
    publicacion: Partial<Publicacion>
    imagenes?: string[]
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      if (!user?.id) throw new Error("Debes estar autenticado para publicar");

      // 1. Crear la Ubicación primero con los datos del mapa
      const nuevaUbicacionReq = {
        nombre: data.inmueble.ubicacion?.nombre || "Ubicación sin nombre",
        latitud: data.inmueble.ubicacion?.latitud || 0,
        longitud: data.inmueble.ubicacion?.longitud || 0,
        estado: 'ACTIVA' as const,
        padre: { id: 1 } as any, // ID de la ciudad base (ej. Santa Marta)
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      // CORRECCIÓN: Usamos la instancia 'repoUbicacion', no la clase
        const ubicacionGuardada = await repoUbicacion.create(nuevaUbicacionReq);
      console.log("📍 Ubicación guardada con ID:", ubicacionGuardada.id);
      console.log("Ubicación guardada:", ubicacionGuardada);
      // 2. Crear el Inmueble vinculado a la nueva ubicación
      const inmuebleDto = {
        tipo: data.inmueble.tipo?.toUpperCase(),
        descripcion: data.inmueble.descripcion,
        idUbicacion: ubicacionGuardada.id, // ID real retornado por el backend
        areaTotal: data.inmueble.areaTotal,
        numeroBanos: data.inmueble.numeroBanos,
        numeroPisos: data.inmueble.numeroPisos || 1,
        capacidadPersonas: data.inmueble.capacidadPersonas,
        estrato: data.inmueble.estrato,
        estadoInmueble: 'DISPONIBLE',
        nombre: `${data.publicacion.titulo} - ${Date.now()}`,
        idArrendatario: parseInt(user.id),
        numeroHabitaciones: data.inmueble.numeroHabitaciones
      };
      
      const resInmueble = await repoInmueble.create(inmuebleDto as any);
      
      // 3. Preparar Multimedia
      const listaMultimedia = (data.imagenes || []).map((url, index) => {
        const esVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
        return {
          url: url,
          tipo: esVideo ? 'VIDEO' : 'FOTO',
          orden: index,
        };
      });

      // 4. Crear la Publicación final vinculada al Inmueble
      const publicacionDto = {
        titulo: data.publicacion.titulo,
        descripcion: data.publicacion.descripcion,
        idInmueble: resInmueble.id,
        fechaPublicacion: new Date().toISOString(),
        estadoPublicacion: 'PUBLICADA',
        idUsuario: parseInt(user.id),
        precio: data.publicacion.precio,
        multimedia: listaMultimedia 
      };
      console.log("Publicación DTO:", publicacionDto);
      const resPublicacion = await repoPublicacion.create(publicacionDto as any);

      return resPublicacion;
    } catch (err: any) {
      const errorMessage = err.message || 'Error en el proceso de publicación';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  // ==========================================
  // MÉTODOS DE CONSULTA
  // ==========================================
const getAll = async (): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await repoPublicacion.getAll();
        setPublications(data); // <--- AGREGA ESTA LÍNEA
        return data;
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
}

  const getTop6 = async (): Promise<Publicacion[]> => {
    setLoading(true);
    try {
      return await repoPublicacion.getTop6();
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const getPublicationsByUser = async (userId: number) => {
    setLoading(true);
    try {
      const dtos = await repoPublicacion.getByIdUsuario(userId);
      const fullPublications = await Promise.all(
        dtos.map(dto => service.getFullPublicacion(dto.id))
      );
      setPublications(fullPublications.filter(p => p !== null) as Publicacion[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  // Métodos de calificaciones
// DENTRO DE usePublicaciones.ts

const getCalificaciones = async (idPublicacion: number) => {
    setLoading(true);
    try {
        // 1. Obtenemos las calificaciones base (solo IDs)
        const baseCalificaciones = await calificacionRepository.getByPublicacionId(idPublicacion);
        
        // 2. IMPORTANTE: Usamos el SERVICE para hidratar cada una
        // Esto activará los console.log que pusiste en CalificacionService
        const calificacionesHidratadas = await Promise.all(
            baseCalificaciones.map(cal => calificacionService.getFullCalificacion(cal.id))
        );

        console.log("Calificaciones hidratadas con éxito:", calificacionesHidratadas);
        
        return { success: true, data: calificacionesHidratadas };
    } catch (err: any) {
        console.error("Error hidratando calificaciones:", err);
        setError(err.message);
        return { success: false, error: err.message };
    } finally {
        setLoading(false);
    }
}

// En usePublicaciones.ts
const createCalificacion = async (idPublicacion: number, idUsuario: number, puntuacion: number, comentario: string) => {
    try {
        const payload = {
            publicacion: { id: idPublicacion },
            usuario: { id: idUsuario },
            servicio: null, // IMPORTANTE: Debe ser null para que el backend no proteste
            puntaje: puntuacion,
            comentario: comentario,
            fecha: new Date().toISOString() // Enviamos formato ISO estándar
        };
        
        const result = await calificacionRepository.create(payload as any);
        return { success: true, data: result };
    } catch (error: any) {
        console.error("Error detallado:", error);
        return { success: false, error: error.message };
    }
};

  const getPromedioCalificacion = async (idPublicacion: number) => {
    setLoading(true);
    try {
      const calificaciones = await calificacionRepository.getByPublicacionId(idPublicacion);
      if (calificaciones.length === 0) return { promedio: 0, total: 0 };
      
      const promedio = calificaciones.reduce((sum, cal) => sum + cal.puntaje, 0) / calificaciones.length;
      return { promedio, total: calificaciones.length };
    } catch (err: any) {
      setError(err.message);
      return { promedio: 0, total: 0 };
    } finally {
      setLoading(false);
    }
  }

  return {
    loading,
    error,
    publications,
    create: createPublicacionCompleta,
    getAll,
    getTop6,
    getPublicationsByUser,
    getById: (id: number) => service.getFullPublicacion(id),
    remove: (id: number) => repoPublicacion.delete(id),
    cambiarEstado: (id: number, estado: string) => repoPublicacion.cambiarEstado(id, estado),
    getCalificaciones,
    createCalificacion,
    getPromedioCalificacion
  }
}

// Hook secundario para lista reactiva
export const usePublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([])
  const { loading, error, getAll } = usePublicaciones()

  const loadPublicaciones = async () => {
    try {
      const data = await getAll()
      setPublicaciones(data || [])
    } catch (err) {
      console.error("Error cargando publicaciones:", err)
    }
  }

  useEffect(() => {
    loadPublicaciones()
  }, [])

  return {
    publicaciones,
    loading,
    error,
    refetch: loadPublicaciones
  }
}