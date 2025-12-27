import {
  Estado,
  EstadoChat,
  EstadoCita,
  EstadoContrato,
  EstadoInmueble,
  EstadoNotificacion,
  EstadoPago,
  EstadoPublicacion,
  EstadoReporteFinanciero,
  EstadoReporteMantenimiento,
  EstadoSancion,
  EstadoServicio,
  EstadoUbicacion,
  EstadoUsuarioRegistrado,
  Roles
} from './enums';

// Tipos base
export interface Usuario {
  id: number;
  nombre: string;
  correo: string;
  clave: string;
}

export interface UsuarioRegistrado extends Usuario {
  cedula: string;
  rol?: Rol;
  ubicacion?: Ubicacion;
  fechaRegistro: string; 
  estado: EstadoUsuarioRegistrado;
  telefono: string;
}

export interface Rol {
  id: number;
  role: Roles;
}

export interface Ubicacion {
  id: number;
  padre?: Ubicacion;
  nombre: string;
  latitud?: number;
  longitud?: number;
  estado?: EstadoUbicacion;
}

export interface Inmueble {
  id: number;
  descripcion?: string;
  ubicacion?: Ubicacion;
  areaTotal: number;
  estrato: number;
  estadoInmueble: EstadoInmueble;
  nombre?: string;
  servicio?: Servicio;
}

export interface Apartamento extends Inmueble {
  habitaciones?: Habitacion[];
  descripcion: string;
}

export interface Casa extends Inmueble {
  numeroPisos?: number;
}

export interface Habitacion {
  id: number;
  capacidad: number;
  precio: number;
  estado: Estado;
  apartamento?: Apartamento;
}

export interface Publicacion {
  id: number;
  titulo: string;
  desripcion: string; 
  inmueble?: Inmueble;
  fechaPublicacion: string; 
  estadoPublicacion: EstadoPublicacion;
  calificaciones?: Calificacion[];
}

export interface Alquiler {
  id: number;
  fechaInicio: string;
  fechaFin: string;
  historialInquilinos?: HistorialInquilino[];
  factura?: Factura[];
  servicios?: Servicio[];
  calificacion?: Calificacion[];
  citas?: Cita[];
  favorito?: Favorito[];
  publicacions?: Publicacion[];
  inmuebles?: Inmueble[];
  solicitudServicios?: SolicitudServicio[];
  chats?: Chat[];
}

export interface Contrato {
  id: number;
  contenido: string;
  usuarioArrendatario?: Usuario;
  usuarioArrendador?: Usuario;
  inmueble?: Inmueble;
  financiacion?: Financiacion;
  fechaInicio: string;
  fechaFinalizacion?: string;
  precio: number;
  deposito?: Deposito;
  estadoContrato: EstadoContrato;
}

export interface Calificacion {
  id: number;
  puntaje: number;
  comentario: string;
  usuario?: Usuario;
  publicacion?: Publicacion;
  servicio?: Servicio;
  fecha: string;
}

export interface Chat {
  id: number;
  usuarioa?: Usuario;
  usuariob?: Usuario;
  mensaje: string;
  estado_chat: EstadoChat;
  fechaCreacion: string;
}

export interface Cita {
  id: number;
  fecha: string;
  usuario?: Usuario;
  estado_cita: EstadoCita;
  servicio?: Servicio;
  solicitudServicio?: SolicitudServicio;
}

export interface Deposito {
  id: number;
  montoTotal?: number;
}

export interface Factura {
  id: number;
  fechaEmision: string;
  detalle: string;
  usuario?: Usuario;
  reporteMantenimiento?: ReporteMantenimiento;
  pago?: Pago;
  contrato?: Contrato;
  servicio?: Servicio;
  estado: EstadoPago;
}

export interface Favorito {
  id: number;
  usuario?: Usuario;
  publicacion?: Publicacion;
  fecha_favorito: string;
}

export interface Financiacion {
  id: number;
  numeroCuotas: number;
  valorCuota: number;
  montoTotal: number;
  interes: number;
}

export interface HistorialInquilino {
  id: number;
  fecha_historial_postulante: string;
  contrato?: Contrato;
  usuario?: Usuario;
}

export interface Multimedia {
  id: number;
  url: string;
  tipo?: TipoMultimedia;
  publicacion?: Publicacion;
}

export interface Notificacion {
  id: number;
  mensaje: string;
  fecha: string;
  usuario?: Usuario;
  servicio?: Servicio;
  estado: EstadoNotificacion;
}

export interface Pago {
  id: number;
  fecha: string;
  monto: number;
  tipo?: TipoPago;
  estado: EstadoPago;
}

export interface ReporteFinanciero {
  id: number;
  usuario?: Usuario;
  inmueble?: Inmueble;
  contenido: string;
  fecha: string;
  tipo?: TipoReporte;
  estado: EstadoReporteFinanciero;
}

export interface ReporteMantenimiento {
  id: number;
  descripcion: string;
  fecha: string;
  servicio?: Servicio;
  usuarioProfesional?: Usuario;
  ususarioGenerador?: Usuario;
  estado: EstadoReporteMantenimiento;
  severidad: string;
  tipoReporte?: TipoReporte;
}

export interface Requisito {
  id: number;
  descripcion: string;
  tipo?: TipoRequisito;
}

export interface Sancion {
  id: number;
  descripcion: string;
  usuario?: Usuario;
  publicacion?: Publicacion;
  fecha: string;
  estado: EstadoSancion;
}

export interface Servicio {
  id: number;
  nombre: string;
  descripcion: string;
  usuario?: Usuario;
  tipo?: TipoServicio;
  precio: number;
  estado: EstadoServicio;
}

export interface SolicitudServicio {
  id: number;
  servicio?: Servicio;
  usuario?: Usuario;
  inmueble?: Inmueble;
  fecha?: string;
  estado: EstadoCita;
}

export interface TipoMultimedia {
  id: number;
  tipo: string;
}

export interface TipoPago {
  id: number;
  descripcion: string;
}

export interface TipoReporte {
  id: number;
  descripcion: string;
  tipo: string;
}

export interface TipoRequisito {
  id: number;
  nombre: string;
}

export interface TipoServicio {
  id: number;
  descripcion: string;
}
