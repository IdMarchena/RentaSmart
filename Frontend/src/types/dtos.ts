export interface CalificacionDto {
  id: number; // 'Long' en Java se mapea a 'number' en TypeScript
  puntaje: number; // 'Integer' en Java se mapea a 'number' en TypeScript
  comentario: string; // 'String' en Java se mapea a 'string' en TypeScript
  idUsuarioPostulante: number; // 'Long' en Java se mapea a 'number' en TypeScript
  idPublicacion: number | null; // 'Long' en Java se mapea a 'number' en TypeScript
  idServicio: number | null; // 'Long' en Java se mapea a 'number' en TypeScript
  fecha: string; // 'LocalDateTime' en Java se puede mapear a 'string' en TypeScript (usualmente en formato ISO 8601)
}
export interface ChattDto {
  id: number;
  nombre: string;
  idUsuarioA: number;
  idUsuarioB: number;
  idsMensaje: number[]; // Array de IDs de mensajes
  estado_chat:'LEIDO'| 'NO_LEIDO' | 'ENVIADO' | 'ENTREGADO' | 'ACTIVO'
                | 'INACTIVO' | 'ARCHIVADO' | 'BLOQUEADO' | 'ACTUALIZADO' | 'ELIMINADO';
  fechaCreacion: string; // LocalDateTime se representa como string en formato ISO
}
export interface CitaDto{
    id:number;
    fecha: string;
    idUsuarioCita:number;
    idUsuarioRemitente:number;
    estado:'SOLICITADA' | 'EN_REVISION' | 'CONFIRMADA' | 'REAGENDADA' | 'CANCELADA' | 'VENCIDA' | 'ASISTIDA' | 'NO_ASISTIDA';
    idServicio:number;
    idPublicacion:number;
}
export interface ContratoDto{
    id:number;
    contenido:string;
    idUsuarioArrendatario:number;
    idUsuarioArrendador:number;
    idInmueble:number;
    idFinanciacion:number;
    fechaInicio:string;
    fechaFinalizacion:string;
    precio:number;
    estadoContrato:'PENDIENTE' | 'SUSPENDIDO' | 'FINALIZADO' | 'CANCELADO' | 'ACTIVO';
    deposito:number;
    clausulasEspeciales: string;
    diaDePago:number;
}
export interface FacturaDto{
    id:number;
    fechaEmision:string;
    detalle:string;
    idUsuario:number;
    idPago:number;
    tipoFactura:'CONTRATO' | 'SERVICIO' | 'PRESTAMO' | 'MULTA' | 'FINANCIACION' | 'DEPOSITO';
    idOrigen:number;
    estadoFactura:'CREADO' | 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO' | 'CANCELADO' | 'REEMBOLSADO';
}
export interface FavoritoDto{
    id:number;
    idUsuario:number;
    idPublicacion:number;
    fechaCreacion:string;
}
export interface FinanciacionDto{
    id:number;
    numeroCuotas:number;
    valorCuota:number;
    montoTotal:number;
    interes:number;
}
export interface InmuebleDto{
    id:number;
    tipo:'APARTAMENTO' | 'APARTAESTUDIO' | 'CASA' | 'OFICINA' |
    'LOCAL_COMERCIAL' | 'PISO' | 'CHALET' | 'ESTUDIO' |
    'LOFT' | 'VIVIENDA_RURAL' | 'CASA_CAMPO' | 'BODEGA' | 'HABITACION';
    descripcion: string;
    idUbicacion:number;
    areaTotal:number;
    numeroBanos:number;
    numeroPisos:number;
    capacidadPersonas:number;
    estrato:number;
    estadoInmueble:'LIBRE_AMOBLADO' | 'LIBRE_NO_AMOBLADO' |
                    'OCUPADO' | 'EN_RESERVA' | 'DISPONIBLE';
    nombre:string;
    idArrendatario:number;
    numeroHabitaciones:number;
}
export interface MensajeDto{
    id:number;
    idChat:number;
    idEmisor:number;
    contenido:string;
    estado:'LEIDO'| 'NO_LEIDO' | 'ENVIADO' | 'ENTREGADO' | 'ACTIVO'
                | 'INACTIVO' | 'ARCHIVADO' | 'BLOQUEADO' | 'ACTUALIZADO' | 'ELIMINADO';
    fechaEnvio:string;
}
export interface MultimediaDto{
    id:number;
    url:string;
    tipo:'IMAGEN' | 'VIDEO' | 'TURNO_360' | 'AUDIO' | 'DOCUMENTO';
    idPublicacion:number;
    orden:number;
}
export interface PagoDto{
    id:number;
    fecha:string;
    monto:number;
    tipoPago:'TARJETA_CREDITO' | 'TARJETA_DEBITO' | 'TRANSFERENCIA' | 'APPLE_PAY' |
     'GOOGLE_PAY' | 'TRANSFERENCIA_BANCARIA' | 'SEPA_DIRECT_DEBIT' | 'EFECTIVO' | 'PAGO_LOCAL'| 'PAGO_EN_LINEA';
    estadoPago:'CREADO' | 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO' | 'CANCELADO' | 'REEMBOLSADO';
    moneda:string;
    stripePaymentIntentId:string;
    origenId:number;
    idUsuario:number;
}
export interface PublicacionDto{
    id:number;
    titulo:string;
    descripcion:string;
    idInmueble:number;
    fechaPublicacion:string;
    estadoPublicacion:'BORRADOR' | 'PUBLICADA' |'EDITADA'|'REPORTADA'| 'ELIMINADA' | 'PAUSADA';
    calificacionesIds:number[];
    idUsuario:number;
    precio:number;
    multimedia: MultimediaDto[];
}
export interface RequisitoDto{
    id:number;
    descripcion:string;
}
export interface ServicioDto{
    id:number;
    nombre:string;
    descripcion:string;
    idUsuario:number;
    tipoServicio:'PLOMERIA' | 'ELECTRICIDAD' | 'CARPINTERIA' | 'PINTURA' | 'REPARACION_ELECTRODOMESTICOS' |
    'ALBAÑILERIA' | 'LIMPIEZA_GENERAL' | 'INSTALACION_SISTEMAS_ALARMAS' | 'INSTALACION_SISTEMA_CAMARAS' |
    'INSTALACION_CERRADURAS' | 'RENOVACION_ACABADOS' | 'JARDINERIA' | 'MUDANZAS' | 'INSTALACION_INTERNET' |
    'TRANSPORTE_MERCANCIA' | 'OTRO';
    precio:number;
    estadoServicio:'SOLICITADO' | 'APROBADO' | 'PENDIENTE';
    idUbicacion:number;
    calificacionesIds:number[];
}
export interface UsuarioDto{
    id:number;
    nombre:string;
    correo:string;
    contrasenia:string;
}
export interface UsuarioRegistradoDto{
    id:number;
    rol:'USER'|'ADMINISTRADOR'|'ARRENDATARIO'|'ARRENDADOR'|'PRESTADOR_SERVICIO';
    nombre:string;
    correo:string;
    clave:string;
    idUbicacion:number;
    fechaRegistro:string;
    estado:'ACTIVO' | 'INACTIVO' | 'BLOQUEADO';
    telefono:string;
    cedula:string;
}
export interface SolicitudServicioDto{
    id:number;
    idServicio:number;
    idUsuario:number;
    idInmueble:number;
    fecha:string;
    estado:'SOLICITADA' | 'EN_REVISION' | 'CONFIRMADA' | 'REAGENDADA' | 'CANCELADA' | 'VENCIDA' | 'ASISTIDA' | 'NO_ASISTIDA';
    descripcionProblema:string;
}
export interface UbicacionDto{
    id:number;
    id_padre:number;
    nombre:string;
    latitud:number;
    longitud:number;
    estado: 'ACTIVA' | 'INACTIVA' | 'ELIMINADA';
}