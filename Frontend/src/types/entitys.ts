import type { UsuarioResumen } from "./entities";
export interface Ubicacion{
    id:number;
    padre:Ubicacion | null;
    nombre:string;
    latitud:number;
    longitud:number;
    estado: 'ACTIVA' | 'INACTIVA' | 'ELIMINADA';
    created_at: string;
    updated_at: string;
}
export interface Multimedia {
  id: number;
  url: string;
  tipo: 'IMAGEN' | 'VIDEO' | 'TURNO_360' | 'AUDIO' | 'DOCUMENTO';
  orden: number;
  idPublicacion:number;
}
export interface Publicacion{
    id:number;
    titulo:string;
    descripcion:string;
    inmueble:Inmueble;
    fechaPublicacion:string;
    estadoPublicacion:'BORRADOR' | 'PUBLICADA' |'EDITADA'|'REPORTADA'| 'ELIMINADA' | 'PAUSADA';
    calificaciones:Calificacion[];
    usuario:UsuarioResumen;
    precio:number;
    multimedia:Multimedia[];
}
export interface Calificacion{
    id: number; 
    puntaje: number; 
    comentario: string; 
    usuario: UsuarioResumen; 
    publicacion: Publicacion | null; 
    servicio: Servicio | null;
    fecha: string;
}
export interface Servicio{
    id:number;
    nombre:string;
    descripcion:string;
    usuario:UsuarioResumen;
    tipoServicio:'PLOMERIA' | 'ELECTRICIDAD' | 'CARPINTERIA' | 'PINTURA' | 'REPARACION_ELECTRODOMESTICOS' |
    'ALBAÑILERIA' | 'LIMPIEZA_GENERAL' | 'INSTALACION_SISTEMAS_ALARMAS' | 'INSTALACION_SISTEMA_CAMARAS' |
    'INSTALACION_CERRADURAS' | 'RENOVACION_ACABADOS' | 'JARDINERIA' | 'MUDANZAS' | 'INSTALACION_INTERNET' |
    'TRANSPORTE_MERCANCIA' | 'OTRO';
    precio:number;
    estadoServicio:'SOLICITADO' | 'APROBADO' | 'PENDIENTE';
    ubicacion:Ubicacion;
    calificaciones:Calificacion[];
}
export interface Inmueble{
    id:number;
    tipo:'APARTAMENTO' | 'APARTAESTUDIO' | 'CASA' | 'OFICINA' |
    'LOCAL_COMERCIAL' | 'PISO' | 'CHALET' | 'ESTUDIO' |
    'LOFT' | 'VIVIENDA_RURAL' | 'CASA_CAMPO' | 'BODEGA' | 'HABITACION';
    descripcion: string;
    ubicacion:Ubicacion;
    areaTotal:number;
    numeroBanos:number;
    numeroPisos:number;
    capacidadPersonas:number;
    estrato:number;
    estadoInmueble:'LIBRE_AMOBLADO' | 'LIBRE_NO_AMOBLADO' |
                    'OCUPADO' | 'EN_RESERVA' | 'DISPONIBLE';
    nombre:string;
    arrendatario:UsuarioResumen;
    numeroHabitaciones:number;
}
export interface SolicitudServicio{
    id:number;
    servicio: Servicio;
    usuario:UsuarioResumen;
    inmueble:Inmueble;
    fecha:string;
    estado:'SOLICITADA' | 'EN_REVISION' | 'CONFIRMADA' | 'REAGENDADA' | 'CANCELADA' | 'VENCIDA' | 'ASISTIDA' | 'NO_ASISTIDA';
    descripcionProblema:string;
}
export interface Requisito{
    id:number;
    descripcion:string;
}
export interface Mensaje{
    id:number;
    chat:Chat;
    emisor:UsuarioResumen;
    contenido:string;
    estado:'LEIDO'| 'NO_LEIDO' | 'ENVIADO' | 'ENTREGADO' | 'ACTIVO'
                | 'INACTIVO' | 'ARCHIVADO' | 'BLOQUEADO' | 'ACTUALIZADO' | 'ELIMINADO';
    fechaEnvio:string;
}
export interface Chat{
  id: number;
  nombre: string;
  usuarioA: UsuarioResumen;
  usuarioB: UsuarioResumen;
  mensajes: Mensaje[]; 
  estado_chat:'LEIDO'| 'NO_LEIDO' | 'ENVIADO' | 'ENTREGADO' | 'ACTIVO'
                | 'INACTIVO' | 'ARCHIVADO' | 'BLOQUEADO' | 'ACTUALIZADO' | 'ELIMINADO';
  fechaCreacion: string; 
}
export interface Cita{
    id:number;
    fecha: string;
    usuario:UsuarioResumen;
    usuarioRemitente:UsuarioResumen;
    estado:'SOLICITADA' | 'EN_REVISION' | 'CONFIRMADA' | 'REAGENDADA' | 'CANCELADA' | 'VENCIDA' | 'ASISTIDA' | 'NO_ASISTIDA';
    servicio:Servicio;
    publicacion:Publicacion;
}
export interface Financiacion{
    id:number;
    numeroCuotas:number;
    valorCuota:number;
    montoTotal:number;
    interes:number;
}
export interface Contrato{
    id:number;
    contenido:string;
    usuarioArrendatario:UsuarioResumen;
    usuarioArrendador:UsuarioResumen;
    inmueble:Inmueble;
    financiacion:Financiacion;
    fechaInicio:string;
    fechaFinalizacion:string;
    precio:number;
    estadoContrato:'PENDIENTE' | 'SUSPENDIDO' | 'FINALIZADO' | 'CANCELADO' | 'ACTIVO';
    deposito:number;
    clausulasEspeciales:string;
    diaDePago:number;
}
export interface Pago{
    id:number;
    fecha:string;
    monto:number;
    tipoPago:'TARJETA_CREDITO' | 'TARJETA_DEBITO' | 'TRANSFERENCIA' | 'APPLE_PAY' |
     'GOOGLE_PAY' | 'TRANSFERENCIA_BANCARIA' | 'SEPA_DIRECT_DEBIT' | 'EFECTIVO' | 'PAGO_LOCAL'| 'PAGO_EN_LINEA';
    estadoPago:'CREADO' | 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO' | 'CANCELADO' | 'REEMBOLSADO';
    moneda:string;
    stripePaymentIntentId:string;
    origenId:number;
    usuario:UsuarioResumen;
}
export interface Factura{
    id:number;
    fechaEmision:string;
    detalle:string;
    usuario:UsuarioResumen;
    pago:Pago;
    tipoFactura:'CONTRATO' | 'SERVICIO' | 'PRESTAMO' | 'MULTA' | 'FINANCIACION' | 'DEPOSITO';
    idOrigen:number;
    estadoFactura:'CREADO' | 'PENDIENTE' | 'COMPLETADO' | 'FALLIDO' | 'CANCELADO' | 'REEMBOLSADO';
}
export interface Favorito{
    id:number;
    usuario:UsuarioResumen;
    publicacion:Publicacion;
    fechaCreacion:string;
}