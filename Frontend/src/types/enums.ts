// Const objects (compatible with verbatimModuleSyntax and erasableSyntaxOnly)
export const Estado = {
    INACTIVO: 'INACTIVO',
    ACTIVO: 'ACTIVO',
    PENDIENTE: 'PENDIENTE',
    RESERVADA: 'RESERVADA',
    OCUPADA: 'OCUPADA',
    LIBRE: 'LIBRE'
} as const;
export type Estado = typeof Estado[keyof typeof Estado];

export const EstadoChat = {
    LEIDO: 'LEIDO',
    NO_LEIDO: 'NO_LEIDO',
    ENVIADO: 'ENVIADO',
    ENTREGADO: 'ENTREGADO',
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO'
} as const;
export type EstadoChat = typeof EstadoChat[keyof typeof EstadoChat];

export const EstadoCita = {
    SOLICITADA: 'SOLICITADA',
    EN_REVISION: 'EN_REVISION',
    CONFIRMADA: 'CONFIRMADA',
    REAGENDADA: 'REAGENDADA',
    CANCELADA: 'CANCELADA',
    VENCIDA: 'VENCIDA',
    ASISTIDA: 'ASISTIDA',
    NO_ASISTIDA: 'NO_ASISTIDA'
} as const;
export type EstadoCita = typeof EstadoCita[keyof typeof EstadoCita];

export const EstadoContrato = {
    PENDENTE: 'PENDENTE',
    SUSPENDIDO: 'SUSPENDIDO',
    FINALIZADO: 'FINALIZADO',
    ANULADO: 'ANULADO'
} as const;
export type EstadoContrato = typeof EstadoContrato[keyof typeof EstadoContrato];

export const EstadoInmueble = {
    AMOBLADO: 'AMOBLADO',
    NOAMOBLADO: 'NOAMOBLADO'
} as const;
export type EstadoInmueble = typeof EstadoInmueble[keyof typeof EstadoInmueble];

export const EstadoNotificacion = {
    PENDIENTE: 'PENDIENTE',
    VISTA: 'VISTA',
    ARCHIVADA: 'ARCHIVADA',
    ELIMINADA: 'ELIMINADA'
} as const;
export type EstadoNotificacion = typeof EstadoNotificacion[keyof typeof EstadoNotificacion];

export const EstadoPago = {
    CREADO: 'CREADO',
    PENDIENTE: 'PENDIENTE',
    COMPLETADO: 'COMPLETADO',
    FALLIDO: 'FALLIDO',
    CANCELADO: 'CANCELADO',
    REEMBOLSADO: 'REEMBOLSADO'
} as const;
export type EstadoPago = typeof EstadoPago[keyof typeof EstadoPago];

export const EstadoPublicacion = {
    BORRADOR: 'BORRADOR',
    PUBLICADA: 'PUBLICADA',
    EDITADA: 'EDITADA',
    REPORTADA: 'REPORTADA',
    ELIMINADA: 'ELIMINADA'
} as const;
export type EstadoPublicacion = typeof EstadoPublicacion[keyof typeof EstadoPublicacion];

export const EstadoReporteFinanciero = {
    ACTIVA: 'ACTIVA',
    VENCIDA: 'VENCIDA',
    RESUELTA: 'RESUELTA',
    ELIMINADA: 'ELIMINADA'
} as const;
export type EstadoReporteFinanciero = typeof EstadoReporteFinanciero[keyof typeof EstadoReporteFinanciero];

export const EstadoReporteMantenimiento = {
    ACTIVA: 'ACTIVA',
    VENCIDA: 'VENCIDA',
    RESUELTA: 'RESUELTA',
    ELIMINADA: 'ELIMINADA'
} as const;
export type EstadoReporteMantenimiento = typeof EstadoReporteMantenimiento[keyof typeof EstadoReporteMantenimiento];

export const EstadoSancion = {
    ACTIVA: 'ACTIVA',
    CUMPLIDA: 'CUMPLIDA',
    APELADA: 'APELADA',
    CANCELADA: 'CANCELADA',
    ELIMINADA: 'ELIMINADA'
} as const;
export type EstadoSancion = typeof EstadoSancion[keyof typeof EstadoSancion];

export const EstadoServicio = {
    SOLICITADO: 'SOLICITADO',
    APROBADO: 'APROBADO',
    PENDIENTE: 'PENDIENTE'
} as const;
export type EstadoServicio = typeof EstadoServicio[keyof typeof EstadoServicio];

export const EstadoUbicacion = {
    ACTIVA: 'ACTIVA',
    INACTIVA: 'INACTIVA',
    ELIMINADA: 'ELIMINADA'
} as const;
export type EstadoUbicacion = typeof EstadoUbicacion[keyof typeof EstadoUbicacion];

export const EstadoUsuarioRegistrado = {
    ACTIVO: 'ACTIVO',
    INACTIVO: 'INACTIVO',
    BLOQUEADO: 'BLOQUEADO',
    ELIMINADO: 'ELIMINADO'
} as const;
export type EstadoUsuarioRegistrado = typeof EstadoUsuarioRegistrado[keyof typeof EstadoUsuarioRegistrado];

export const EstadoUsuarioRol = {
    ACTIVO: 'ACTIVO',
    ASIGNADO: 'ASIGNADO',
    REVOCADO: 'REVOCADO',
    PENDIENTE: 'PENDIENTE',
    ELIMINADO: 'ELIMINADO'
} as const;
export type EstadoUsuarioRol = typeof EstadoUsuarioRol[keyof typeof EstadoUsuarioRol];

export const Roles = {
    USER: 'USER',
    ADMINISTRADOR: 'ADMINISTRADOR',
    ARRENDATARIO: 'ARRENDATARIO',
    ARRENDADOR: 'ARRENDADOR',
    PRESTADOR_SERVICIO: 'PRESTADOR_SERVICIO'
} as const;
export type Roles = typeof Roles[keyof typeof Roles];