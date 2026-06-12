import { usuariosRepositoryBackend } from '@/repositories/usuarios/UsuariosRepository.backend';
import  { BackendFavoritoRepository } from '@/repositories/Favorito/FavoritoBackendRepository';
import {BackendPublicacionRepository} from '@/repositories/publicaciones/PublicacionRepository.backend'
import {PublicacionService} from '@/services/PublicacionService'


import type {Favorito} from '@/types/entitys';

export class FavoritoService{
    private favoritoRepo: BackendFavoritoRepository;
    private publicacionService: PublicacionService;
    private pubRepo: BackendPublicacionRepository;

    constructor(
        favoritoRepo: BackendFavoritoRepository,
        publicacionService: PublicacionService,
        pubRepo: BackendPublicacionRepository
    ) {
        this.favoritoRepo = favoritoRepo;
        this.publicacionService = publicacionService;
        this.pubRepo = pubRepo;
    }
     
    private cache = new Map<number, Favorito>();

    async getFullFavorito(id: number): Promise<Favorito> {
        if (this.cache.has(id)) {
            console.log(`📦 Cache hit para favorito ${id}`);
            return this.cache.get(id)!;
        }
        console.log("🔍 Obteniendo favorito completo...");
        const favorito = await this.favoritoRepo.getById(id);
    
    if (!favorito) {
      throw new Error(`Favorito con ID ${id} no encontrado`);
    }
        
        const publicacion = await this.publicacionService.getFullPublicacion(favorito.publicacion.id);
        console.log("✅ Publicación completa obtenida:", publicacion);
        favorito.publicacion = publicacion;
        
        if(!favorito.usuario || !favorito.usuario.id){
            const usuario = await usuariosRepositoryBackend.getById(favorito.usuario.id) as any;
            console.log("✅ Usuario obtenido:", usuario);
            favorito.usuario = usuario;
        }
        
        console.log("este es el favorito completo:", favorito)
        return favorito;
    }
}
