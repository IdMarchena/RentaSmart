
export interface Usuario {
    id: string;
    nombre: string;
    correo: string;
    cedula: string;
    telefono: string;
    rol: 'user' | 'admin' | 'arrendador' | 'arrendatario' | 'prestador_servicio';
    ciudad?: string;
    departamento?: string;
    direccion?: string;
    avatar_url?: string;
    estado: 'activo' | 'inactivo' | 'bloqueado';
    created_at: string;
    updated_at: string;
}

export interface Inmueble {
    id: number;
    tipo: 'apartamento' | 'casa' | 'habitacion';
    titulo: string;
    descripcion: string;

    ciudad: string;
    departamento: string;
    direccion: string;
    latitud?: number;
    longitud?: number;

    area_total: number;
    num_habitaciones?: number;
    num_banos?: number;
    num_pisos?: number;
    capacidad_personas?: number;
    amoblado: boolean;

    precio_mensual: number;
    precio_diario?: number;

    propietario_id: string;


    estado: 'disponible' | 'ocupado' | 'mantenimiento' | 'inactivo';

    created_at: string;
    updated_at: string;
}

export interface Publicacion {
    id: number;
    inmueble_id: number;
    usuario_id: string;

    titulo: string;
    descripcion: string;

    estado: 'borrador' | 'publicada' | 'pausada' | 'eliminada';

    vistas: number;
    clicks: number;

    fecha_publicacion: string;
    fecha_vencimiento?: string;

    created_at: string;
    updated_at: string;
}

export interface MultimediaPublicacion {
    id: number;
    publicacion_id: number;
    url: string;
    tipo: 'imagen' | 'video' | 'tour_360';
    orden: number;
    es_portada: boolean;
    created_at: string;
}

export interface Contrato {
    id: number;
    publicacion_id: number;
    inmueble_id: number;

    arrendador_id: string;
    arrendatario_id: string;

    fecha_inicio: string;
    fecha_fin: string;

    precio_mensual: number;
    deposito_seguridad: number;
    dia_pago: number;
    terminos_condiciones: string;
    clausulas_especiales?: string;
    documento_url?: string;

    estado: 'pendiente' | 'activo' | 'finalizado' | 'cancelado';

    firma_arrendador?: string;
    firma_arrendatario?: string;
    fecha_firma?: string;

    created_at: string;
    updated_at: string;
}

export interface Pago {
    id: number;
    contrato_id: number;
    usuario_id: string;

    monto: number;
    concepto: string;
    tipo: 'arriendo' | 'deposito' | 'servicio' | 'mantenimiento' | 'otro';
    metodo_pago: 'efectivo' | 'transferencia' | 'tarjeta' | 'paypal' | 'otro';

    fecha_pago: string;
    fecha_vencimiento?: string;

    estado: 'pendiente' | 'completado' | 'fallido' | 'reembolsado';

    referencia?: string;
    comprobante_url?: string;

    created_at: string;
    updated_at: string;
}

export interface Servicio {
    id: number;
    prestador_id: string;

    nombre: string;
    descripcion: string;
    categoria: 'limpieza' | 'mantenimiento' | 'plomeria' | 'electricidad' | 'pintura' | 'jardineria' | 'mudanza' | 'otro';

    precio: number;
    unidad_precio: 'hora' | 'dia' | 'servicio' | 'metro_cuadrado';

    disponibilidad: string;
    ciudad: string;

    estado: 'activo' | 'pausado' | 'inactivo';

    calificacion_promedio: number;
    total_servicios: number;

    created_at: string;
    updated_at: string;
}

export interface SolicitudServicio {
    id: number;
    servicio_id: number;
    solicitante_id: string; // UUID
    inmueble_id?: number;

    descripcion_problema: string;
    fecha_preferida: string;
    urgencia: 'baja' | 'media' | 'alta' | 'urgente';

    estado: 'solicitada' | 'confirmada' | 'en_progreso' | 'completada' | 'cancelada';

    precio_acordado?: number;
    calificacion?: number; // 1-5
    comentario_calificacion?: string;

    created_at: string;
    updated_at: string;
}



export interface Calificacion {
    id: number;
    usuario_id: string;

    publicacion_id?: number;
    servicio_id?: number;
    contrato_id?: number;

    puntaje: number;
    comentario: string;

    fecha: string;
    created_at: string;
}

export interface Favorito {
    id: number;
    usuario_id: string;
    publicacion_id: number;
    created_at: string;
}



export interface Chat {
    id: number;
    usuario_a_id: string;
    usuario_b_id: string;
    publicacion_id?: number;

    ultimo_mensaje: string;
    ultimo_mensaje_fecha: string;


    no_leidos_a: number;
    no_leidos_b: number;

    estado: 'activo' | 'archivado' | 'bloqueado';

    created_at: string;
    updated_at: string;
}

export interface Mensaje {
    id: number;
    chat_id: number;
    remitente_id: string;

    contenido: string;
    tipo: 'texto' | 'imagen' | 'archivo' | 'ubicacion';
    archivo_url?: string;

    leido: boolean;
    fecha_lectura?: string;

    created_at: string;
}

export interface Notificacion {
    id: number;
    usuario_id: string;

    titulo: string;
    mensaje: string;
    tipo: 'info' | 'advertencia' | 'error' | 'exito';
    categoria: 'pago' | 'contrato' | 'servicio' | 'mensaje' | 'sistema' | 'otro';


    accion_url?: string;
    referencia_id?: number;

    leida: boolean;
    fecha_lectura?: string;

    created_at: string;
}


export interface ReporteMantenimiento {
    id: number;
    inmueble_id: number;
    reportado_por_id: string;
    asignado_a_id?: string;

    titulo: string;
    descripcion: string;
    categoria: 'plomeria' | 'electricidad' | 'pintura' | 'limpieza' | 'estructural' | 'otro';
    prioridad: 'baja' | 'media' | 'alta' | 'urgente';

    estado: 'reportado' | 'en_revision' | 'asignado' | 'en_progreso' | 'completado' | 'cancelado';

    costo_estimado?: number;
    costo_real?: number;

    fecha_reporte: string;
    fecha_asignacion?: string;
    fecha_completado?: string;

    imagenes?: string[];
    notas_tecnico?: string;

    created_at: string;
    updated_at: string;
}

export interface ReporteFinanciero {
    id: number;
    generado_por_id: string;

    periodo_inicio: string;
    periodo_fin: string;

    tipo: 'ingresos' | 'egresos' | 'balance' | 'ocupacion';


    total_ingresos: number;
    total_egresos: number;
    balance: number;


    detalles: any; // JSON con breakdown detallado

    created_at: string;
}


// Para respuestas de autenticación
export interface AuthResponse {
    token: string;
    user: Usuario;
}

// Para filtros en el frontend
export interface FiltrosPublicacion {
    ciudad?: string;
    tipo_inmueble?: 'apartamento' | 'casa' | 'habitacion';
    precio_min?: number;
    precio_max?: number;
    num_habitaciones?: number;
    amoblado?: boolean;
}

export interface FiltrosServicio {
    nombre?: string;
    categoria?: string;
    precio_min?: number;
    precio_max?: number;
    ciudad?: string;
}
