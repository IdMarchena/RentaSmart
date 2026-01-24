import { http } from './httpClient'
import type { JsonResponse } from './types'

export interface LoginRequest {
  username: string
  password: string
}

export interface SignupRequest {
  nombre: string
  correo: string
  contrasenia: string  // Cambiado de 'clave' a 'contrasenia' para match backend
  cedula?: string
  cel: string  // Cambiado de 'telefono' a 'cel' para match backend
  rol: 'USER' | 'ADMIN' | 'ARRENDADOR' | 'ARRENDATARIO' | 'PRESTADOR_SERVICIO'
}

export async function backendLogin(credentials: LoginRequest): Promise<JsonResponse<any>> {
  return http<JsonResponse<any>>('/api/v1/auth/login', {
    method: 'POST',
    body: credentials,
  })
}

export async function backendSignup(userData: SignupRequest): Promise<JsonResponse<any>> {
  return http<JsonResponse<any>>('/api/v1/auth/signup', {
    method: 'POST',
    body: userData,
  })
}

export async function backendLogout(): Promise<JsonResponse<void>> {
  return http<JsonResponse<void>>('/api/v1/auth/logout', {
    method: 'POST',
  })
}

export async function getMe(): Promise<JsonResponse<any>> {
  return http<JsonResponse<any>>('/api/v1/auth/me', {
    method: 'GET',
  })
}
