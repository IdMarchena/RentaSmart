import { useState, useEffect, useCallback, useMemo } from 'react'
import { usuariosRepository, calificacionRepository } from '@/repositories'
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
import { BackendServicioRepository } from '@/repositories/Servicio/ServicioBackendRepository'

export const usePublicaciones = () => {
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [publications, setPublications] = useState<Publicacion[]>([])
  const [publicationsHome, setPublicationsHome] = useState<Publicacion[]>([])
  
  const { user } = useAuthContext()

  const services = useMemo(() => {
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
    );


    return {
      repoPublicacion,
      repoInmueble,
      repoUbicacion,
      service,
      calificacionService
    };
  }, []); 

  const createPublicacionCompleta = async (data: {
    inmueble: Partial<Inmueble>
    publicacion: Partial<Publicacion>
    imagenes?: string[]
  }) => {
    setLoading(true)
    setError(null)
    
    try {
      if (!user?.id) throw new Error("Debes estar autenticado para publicar");

      const nuevaUbicacionReq = {
        nombre: data.inmueble.ubicacion?.nombre || "Ubicación sin nombre",
        latitud: data.inmueble.ubicacion?.latitud || 0,
        longitud: data.inmueble.ubicacion?.longitud || 0,
        estado: 'ACTIVA' as const,
        padre: { id: 1 } as any,
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      };

      
        const ubicacionGuardada = await services.repoUbicacion.create(nuevaUbicacionReq);
      console.log("📍 Ubicación guardada con ID:", ubicacionGuardada.id);
      console.log("Ubicación guardada:", ubicacionGuardada);
      
      const inmuebleDto = {
        tipo: data.inmueble.tipo?.toUpperCase(),
        descripcion: data.inmueble.descripcion,
        idUbicacion: ubicacionGuardada.id, 
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
      
      const resInmueble = await services.repoInmueble.create(inmuebleDto as any);
      
      const listaMultimedia = (data.imagenes || []).map((url, index) => {
        const esVideo = /\.(mp4|webm|ogg|mov)$/i.test(url);
        return {
          url: url,
          tipo: esVideo ? 'VIDEO' : 'FOTO',
          orden: index,
        };
      });

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
      const resPublicacion = await services.repoPublicacion.create(publicacionDto as any);

      return resPublicacion;
    } catch (err: any) {
      const errorMessage = err.message || 'Error en el proceso de publicación';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  }

  const getAll = useCallback(async (): Promise<Publicacion[]> => {
    setLoading(true);
    setError(null);
    try {
        const data = await services.repoPublicacion.getAll();
        const fullPublicacion = await Promise.all(data.map(pub => services.service.getFullPublicacion(pub.id)));
        setPublications(fullPublicacion);
        return fullPublicacion;
    } catch (err: any) {
        setError(err.message);
        throw err;
    } finally {
        setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);

  const getTop6 = useCallback(async (): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getTop6();
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublicationsHome(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);
  
  const getById = useCallback(async (id: number): Promise<Publicacion | null> => {
    setLoading(true);
    setError(null);
    try {
        const data = await services.repoPublicacion.getById(id);
        if (!data) return null;
        
        const fullPublication = await services.service.getFullPublicacion(data.id);
        return fullPublication;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);
    const getByTipoInmueble = useCallback(async (tipo: string): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getByTipoInmueble(tipo);
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublications(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);
    const getByUbicacion = useCallback(async (ubicacion: string): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getByUbicacion(ubicacion);
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublications(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);
      const getByEstrato = useCallback(async (estrato: string): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getByEstrato(estrato);
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublications(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);

  const getByPrecioMenor = useCallback(async (precio: number): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getByPrecioMenor(precio);
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublications(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);

  const getByPrecioMayor = useCallback(async (precio: number): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getByPrecioMayor(precio);
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublications(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);

  const getByPrecioRango = useCallback(async (precioMin: number, precioMax: number): Promise<Publicacion[]> => {
    setLoading(true);
    try {
        const data = await services.repoPublicacion.getByPrecioRango(precioMin, precioMax);
        const fullPublications = await Promise.all(
            data.map(dto => services.service.getFullPublicacion(dto.id))
        );
        const filtered = fullPublications.filter(p => p !== null) as Publicacion[];
        setPublications(filtered);
        return filtered;
    } catch (err: any) {
      setError(err.message);
      throw err;
    } finally {
      setLoading(false);
    }
  }, [services.repoPublicacion, services.service]);

  const getPublicationsByUser = async (userId: number) => {
    setLoading(true);
    try {
      const dtos = await services.repoPublicacion.getByIdUsuario(userId);
      const fullPublications = await Promise.all(
        dtos.map(dto => services.service.getFullPublicacion(dto.id))
      );
      setPublications(fullPublications.filter(p => p !== null) as Publicacion[]);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  
const getCalificaciones = async (idPublicacion: number) => {
    setLoading(true);
    try {
        
        const baseCalificaciones = await calificacionRepository.getByPublicacionId(idPublicacion);

        const calificacionesHidratadas = await Promise.all(
            baseCalificaciones.map(cal => services.calificacionService.getFullCalificacion(cal.id))
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
            servicio: null, 
            puntaje: puntuacion,
            comentario: comentario,
            fecha: new Date().toISOString()
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
    publicationsHome,
    create: createPublicacionCompleta,
    getAll,
    getTop6,
    getPublicationsByUser,
    getByTipoInmueble,
    getByUbicacion,
    getByEstrato,
    getByPrecioMenor,
    getByPrecioMayor,
    getByPrecioRango,
    getById,
    remove: (id: number) => services.repoPublicacion.delete(id),
    cambiarEstado: (id: number, estado: string) => services.repoPublicacion.cambiarEstado(id, estado),
    getCalificaciones,
    createCalificacion,
    getPromedioCalificacion
  }
}

export const usePublicacionesList = () => {
  const [publicaciones, setPublicaciones] = useState<Publicacion[]>([])
  const { loading, error, getAll, getByPrecioMenor, getByPrecioMayor, getByPrecioRango } = usePublicaciones()

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