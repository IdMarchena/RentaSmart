
import type { UsuarioResumen } from '@/types/entities';

export type RepoOk<T> = { success: true; data: T };
export type RepoFail<T> = { success: false; error: string; data?: T };

export interface UsuariosRepository {
  searchUsers(query: string): Promise<RepoOk<UsuarioResumen[]> | RepoFail<UsuarioResumen[]>>;
  getUserById(id: string): Promise<RepoOk<UsuarioResumen> | RepoFail<never>>;
  getAllUsers(): Promise<RepoOk<UsuarioResumen[]> | RepoFail<UsuarioResumen[]>>;

  getAll(): Promise<UsuarioResumen[]>
  getById(id: number): Promise<UsuarioResumen | null>
  create(data: Omit<UsuarioResumen, 'id'>): Promise<UsuarioResumen>
  update(id: number, data: Partial<UsuarioResumen>): Promise<UsuarioResumen>
  delete(id: number): Promise<void>
}

