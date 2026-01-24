import { usuariosRepositoryBackend } from '@/repositories/usuarios/UsuariosRepository.backend';
import type { BackendInmuebleRepository } from '@/repositories/inmuebles/InmuebleRepository.backend';
import type { BackendFinanciacionRepository } from '@/repositories/Financiacion/FinanciacionBackendRepository';
import type { Contrato } from '@/types/entitys';
import type { BackendContratoRepository } from '@/repositories/Contrato/ContratoBackendRepository';
import type { BackendUbicacionRepository } from '@/repositories/Ubicacion/UbicacionBackendRepository';

export class ContratoService {
    private inmuebleRepo: BackendInmuebleRepository;
    private financiacionRepo: BackendFinanciacionRepository;
    private contratoRepo: BackendContratoRepository;
    private ubicacionRepo: BackendUbicacionRepository;

    constructor(
        inmuebleRepo: BackendInmuebleRepository,
        financiacionRepo: BackendFinanciacionRepository,
        contratoRepo: BackendContratoRepository,
        ubicacionRepo: BackendUbicacionRepository
    ) {
        this.inmuebleRepo = inmuebleRepo;
        this.financiacionRepo = financiacionRepo;
        this.contratoRepo = contratoRepo;
        this.ubicacionRepo = ubicacionRepo;
    }

    async getFullContrato(id: number): Promise<Contrato> {
        const contrato = await this.contratoRepo.getById(id);

        if (!contrato) throw new Error(`Contrato con ID ${id} no encontrado`);

        // 1. Hidratar Arrendador
        if (contrato.usuarioArrendador?.id) {
            try {
                const user = await usuariosRepositoryBackend.getById(contrato.usuarioArrendador.id);
                if (user) {
                    contrato.usuarioArrendador.nombre = (user as any).nombre || (user as any).nombre_usuario || "Usuario Arrendador";
                }
            } catch (e) { console.error("Error Arrendador:", e); }
        }

        // 2. Hidratar Arrendatario
        if (contrato.usuarioArrendatario?.id) {
            try {
                const user = await usuariosRepositoryBackend.getById(contrato.usuarioArrendatario.id);
                if (user) {
                    contrato.usuarioArrendatario.nombre = (user as any).nombre || (user as any).nombre_usuario || "Usuario Arrendatario";
                }
            } catch (e) { console.error("Error Arrendatario:", e); }
        }

        // 3. Hidratar Inmueble y Ubicación (CORRECCIÓN CRÍTICA)
        if (contrato.inmueble?.id) {
            try {
                const idInmueble = contrato.inmueble.id;
                console.log(`🏠 Buscando datos completos para Inmueble ID: ${idInmueble}`);
                
                const inmuebleData = await this.inmuebleRepo.getById(idInmueble);
                
                if (inmuebleData) {
                    // Verificamos ubicación dentro del inmueble
                    const rawUbi = (inmuebleData as any).idUbicacion;
                    
                    if (rawUbi && typeof rawUbi === 'object') {
                        inmuebleData.ubicacion = rawUbi;
                    } else if (rawUbi || (inmuebleData as any).id_ubicacion) {
                        const ubiId = Number(rawUbi || (inmuebleData as any).id_ubicacion);
                        console.log(`📍 Hidratando Ubicación ID: ${ubiId}`);
                        const ubiFull = await this.ubicacionRepo.getById(ubiId);
                        if (ubiFull) inmuebleData.ubicacion = ubiFull;
                    }

                    // IMPORTANTE: Sobrescribimos el objeto del contrato con la data completa
                    contrato.inmueble = { ...inmuebleData };
                }
            } catch (error) {
                console.error(`⚠️ Error en cascada Inmueble/Ubicación:`, error);
            }
        }

        // 4. Hidratar Financiación
        if (contrato.financiacion?.id) {
            try {
                const finData = await this.financiacionRepo.getById(contrato.financiacion.id);
                if (finData) contrato.financiacion = { ...finData };
            } catch (e) { console.error("Error Financiación:", e); }
        }

        console.log("✅ RESULTADO FINAL DE HIDRATACIÓN:", {
            id: contrato.id,
            inmueble: contrato.inmueble,
            ubicacion: (contrato.inmueble as any).ubicacion
        });

        return contrato;
    }
}