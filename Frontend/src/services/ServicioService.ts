import { usuariosRepositoryBackend } from '@/repositories/usuarios/UsuariosRepository.backend';
import type { Servicio } from '@/types/entitys';
import type { BackendUbicacionRepository } from '@/repositories/Ubicacion/UbicacionBackendRepository';
import type { CalificacionRepository } from '@/repositories/Calificacion/CalificacionRepositoryBackend';
import type { BackendServicioRepository } from '@/repositories/Servicio/ServicioBackendRepository';
import type {CalificacionService} from '@/services/CalificacionService';
export class ServicioService {
    private ubicacionRepo: BackendUbicacionRepository;
    private califRepo: CalificacionRepository;
    private servicioRepo: BackendServicioRepository;
    private CalificacionService: CalificacionService;

    constructor(
        ubicacionRepo: BackendUbicacionRepository,
        califRepo: CalificacionRepository,
        servicioRepo: BackendServicioRepository,
        califService: CalificacionService
    ) {
        this.ubicacionRepo = ubicacionRepo;
        this.califRepo = califRepo;
        this.servicioRepo = servicioRepo;
        this.CalificacionService = califService;
    }

    async getFullServicio(id: number): Promise<Servicio> {
        const servicio = await this.servicioRepo.getById(id);

        if (!servicio) throw new Error(`Servicio con ID ${id} no encontrado`);

        if (servicio.usuario?.id) {
            try {
                const user = await usuariosRepositoryBackend.getById(servicio.usuario.id);
                if (user) {
                    servicio.usuario.nombre = (user as any).nombre || (user as any).nombre_usuario || "Usuario Arrendador";
                }
            } catch (e) { console.error("Error Arrendador:", e); }
        }
        if (servicio.ubicacion?.id) {
            try {
                const idUbicacion = servicio.ubicacion.id;

                console.log(`🏠 Buscando datos completos para Ubicacion ID: ${idUbicacion}`);
                
                const ubicacionData = await this.ubicacionRepo.getById(idUbicacion);
                
                if (ubicacionData) {
                    const rawUbi = (ubicacionData as any).idUbicacion;
                    
                    if (rawUbi && typeof rawUbi === 'object') {
                        (ubicacionData as any).ubicacion = rawUbi;
                    } else if (rawUbi || (ubicacionData as any).id_ubicacion) {
                        const ubiId = Number(rawUbi || (ubicacionData as any).id_ubicacion);
                        console.log(`📍 Hidratando Ubicación ID: ${ubiId}`);
                        const ubiFull = await this.ubicacionRepo.getById(ubiId);
                        if (ubiFull) (ubicacionData as any) = ubiFull;
                    }
                    servicio.ubicacion = { ...ubicacionData };
                }
            } catch (error) {
                console.error(`⚠️ Error en cascada Inmueble/Ubicación:`, error);
            }
        }
        if (!servicio.calificaciones || servicio.calificaciones.length === 0) {
            console.log(`⭐ Obteniendo e HIDRATANDO calificaciones para publicación ID: ${id}`);
            try {
                const calificacionesBasicas = await this.califRepo.getByPublicacionId(id);
                const calificacionesCompletas = await Promise.all(
                calificacionesBasicas.map(c => this.CalificacionService.getFullCalificacion(c.id))
                );

                servicio.calificaciones = calificacionesCompletas;
                console.log(`📊 Calificaciones hidratadas con éxito:`, calificacionesCompletas);
    
        } catch (error) {
            console.log(`⚠️ Error hidratando calificaciones:`, error);
            servicio.calificaciones = [];
        }
    }

        console.log("✅ RESULTADO FINAL DE HIDRATACIÓN:", {
            id: servicio.id,
            usuario: servicio.usuario,
            ubicacion: (servicio.ubicacion as any).ubicacion
        });

        return servicio;
    }
}