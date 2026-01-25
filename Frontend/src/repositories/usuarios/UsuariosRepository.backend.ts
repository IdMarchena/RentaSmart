import type { JsonResponse } from '@/api/types';
import { http } from '@/api/httpClient';
import type { UsuarioResumen } from '@/types/entities';
import type { UsuariosRepository } from './UsuariosRepository';

type UsuarioBackendDto = {
  id: number;
  nombre: string;
  correo: string;
  telefono?: string | null;
  cedula?: string | null;
  rol?: string | null;
};

function toUsuarioResumen(dto: UsuarioBackendDto): UsuarioResumen {
  return {
    id: dto.id,
    nombre: dto.nombre,
    correo: dto.correo,
    cedula: dto.cedula ?? undefined,
    telefono: dto.telefono ?? undefined,
    rol: dto.rol ?? 'user',
  };
}

export const usuariosRepositoryBackend: UsuariosRepository = {
  
  async searchUsers(query: string) {
    // Backend actual no expone un endpoint de búsqueda general.
    // Fallback temporal: listar y filtrar en el cliente.
    // Recomendación a futuro: implementar GET /api/usuarios?search=...&limit=10 en backend.
    const res = await http<JsonResponse<UsuarioBackendDto[]>>(`/api/usuarios`, {
      method: 'GET',
    });

    const users = Array.isArray(res.data) ? res.data : [];
    const q = query.trim().toLowerCase();

    const filtered = users.filter((u) => {
      const nombre = (u.nombre ?? '').toLowerCase();
      const correo = (u.correo ?? '').toLowerCase();
      const cedula = (u.cedula ?? '').toLowerCase();
      return nombre.includes(q) || correo.includes(q) || cedula.includes(q);
    });

    return { success: true as const, data: filtered.slice(0, 10).map(toUsuarioResumen) };
  },

  async getUserById(id: string) {
    const res = await http<JsonResponse<UsuarioBackendDto>>(`/api/usuarios/${id}`, {
      method: 'GET',
    });

    return { success: true as const, data: toUsuarioResumen(res.data) };
  },

  async getAllUsers() {
    const res = await http<JsonResponse<UsuarioBackendDto[]>>(`/api/usuarios`, {
      method: 'GET',
    });

    const users = Array.isArray(res.data) ? res.data : [];
    return { success: true as const, data: users.map(toUsuarioResumen) };
  },

  async getAll(): Promise<UsuarioResumen[]> {
      console.log('Iniciando getAll()...');
      const response = await http<JsonResponse<any[]>>('/api/usuarios')
      
      console.log('Response del backend:', response);
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Error al obtener usuarios')
      }
  
      console.log('Datos crudos del backend:', response.data);
      console.log('Cantidad de datos crudos:', response.data.length);
  
      // Mapear cada DTO a Entity y filtrar los nulos
      const mapped = response.data.map(dto => toUsuarioResumen(dto));
      console.log('Después de mapToEntity:', mapped);
      
      const filtered = mapped.filter(pub => pub !== null);
      console.log('Después de filtrar nulos:', filtered);
      console.log('Cantidad final:', filtered.length);
      
      return filtered;
    },
  
    async getById(id: number): Promise<UsuarioResumen | null> {
      try {
        const response = await http<JsonResponse<any>>(`/api/usuarios/${id}`)
        
        if(!response.success || !response.data) {
          return null
        }
  
        console.log('Datos del backend (raw):', response.data)
        
        // Aplicar mapeo manual para convertir DTO a Entity
        const mapped = toUsuarioResumen(response.data)
        console.log('Datos mapeados:', mapped)
        
        return mapped
      } catch {
        return null
      }
    },
  
    async create(data: Omit<UsuarioResumen, 'id'>): Promise<UsuarioResumen> {
      const response = await http<JsonResponse<UsuarioResumen>>('/api/usuarios', {
        method: 'POST',
        body: data
      })
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Error al crear usuario')
      }
  
      return response.data
    },
  
    async update(id: number, data: Partial<UsuarioResumen>): Promise<UsuarioResumen> {
      const response = await http<JsonResponse<UsuarioResumen>>(`/api/usuarios/${id}`, {
        method: 'PUT',
        body: data
      })
      
      if (!response.success || !response.data) {
        throw new Error(response.message || 'Error al actualizar usuario')
      }
  
      return response.data
    },

    async delete(id: number): Promise<void> {
      const response = await http<JsonResponse<void>>(`/api/usuarios/${id}`, {
        method: 'DELETE'
      })
      
      if (!response.success) {
        throw new Error(response.message || 'Error al eliminar usuario')
      }
    },

    async verificarRol(idUser: number, rol: string): Promise<boolean> {
      try {
        const response = await http<JsonResponse<boolean>>(`/api/usuarios/userVerificate/${idUser}/rol?rol=${rol}`, {
          method: 'GET',
        });
        
        console.log(`🔍 Verificando rol: usuario ${idUser}, rol ${rol}`, response);
        
        return response.success ? response.data : false;
      } catch (error) {
        console.error('❌ Error verificando rol:', error);
        return false;
      }
    },
  };
