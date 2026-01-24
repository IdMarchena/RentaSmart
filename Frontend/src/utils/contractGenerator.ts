export const generateLegalContractTemplate = (c: any): string => {
    const formatCurrency = (num: number) => {
        return new Intl.NumberFormat('es-CO', {
            style: 'currency',
            currency: 'COP',
            minimumFractionDigits: 0
        }).format(num);
    };

    const numberToWords = (num: number): string => {
        // Implementación básica de números a letras (simplificada)
        const units = ['cero', 'uno', 'dos', 'tres', 'cuatro', 'cinco', 'seis', 'siete', 'ocho', 'nueve'];
        const teens = ['diez', 'once', 'doce', 'trece', 'catorce', 'quince', 'dieciséis', 'diecisiete', 'dieciocho', 'diecinueve'];
        const tens = ['', '', 'veinte', 'treinta', 'cuarenta', 'cincuenta', 'sesenta', 'setenta', 'ochenta', 'noventa'];
        const hundreds = ['', 'ciento', 'doscientos', 'trescientos', 'cuatrocientos', 'quinientos', 'seiscientos', 'setecientos', 'ochocientos', 'novecientos'];
        
        if (num === 0) return 'cero';
        if (num < 10) return units[num];
        if (num < 20) return teens[num - 10];
        if (num < 100) {
            const ten = Math.floor(num / 10);
            const unit = num % 10;
            return unit > 0 ? `${tens[ten]} y ${units[unit]}` : tens[ten];
        }
        if (num < 1000) {
            const hundred = Math.floor(num / 100);
            const remainder = num % 100;
            return remainder > 0 ? `${hundreds[hundred]} ${numberToWords(remainder)}` : hundreds[hundred];
        }
        
        // Para números mayores, simplificación
        return formatCurrency(num);
    };

    const formatDate = (date: any): string => {
        if (!date) return '____________________';
        const d = new Date(date);
        return d.toLocaleDateString('es-ES', { 
            day: 'numeric', 
            month: 'long', 
            year: 'numeric' 
        });
    };

    const getArrendadorName = () => {
        if (c.usuarioArrendador?.nombre) {
            const nombre = c.usuarioArrendador.nombre.toUpperCase();
            const apellido = c.usuarioArrendador.apellido ? ` ${c.usuarioArrendador.apellido.toUpperCase()}` : '';
            return `${nombre}${apellido}`;
        }
        return '____________________';
    };

    const getArrendatarioName = () => {
        if (c.usuarioArrendatario?.nombre) {
            const nombre = c.usuarioArrendatario.nombre.toUpperCase();
            const apellido = c.usuarioArrendatario.apellido ? ` ${c.usuarioArrendatario.apellido.toUpperCase()}` : '';
            return `${nombre}${apellido}`;
        }
        return '____________________';
    };

    const getInmuebleDescription = () => {
        if (c.inmueble) {
            const tipo = c.inmueble.tipo || 'inmueble';
            const descripcion = c.inmueble.descripcion || 'destinado para vivienda';
            const ubicacion = c.inmueble.ubicacion?.nombre || c.inmueble.ubicacion || 'ubicación especificada';
            return `${tipo.toUpperCase()} identificado con ID ${c.inmueble.id}, ${descripcion}, ubicado en ${ubicacion}`;
        }
        return `inmueble identificado con ID ${c.idInmueble || 'P-000'}, destinado exclusivamente para vivienda`;
    };

    return `
CONTRATO DE ARRENDAMIENTO DE INMUEBLE URBANO

En la ciudad de ${c.inmueble?.ubicacion?.nombre || 'residencia del inmueble'}, siendo el día ${formatDate(new Date())}, comparecen por una parte:

I. IDENTIFICACIÓN COMPLETA DE LAS PARTES

ARRENDADOR: 
${getArrendadorName()}, mayor de edad, identificado con cédula de ciudadanía No. ${c.usuarioArrendador?.cedula || '____________________'}, quien para los efectos del presente contrato se denominará EL ARRENDADOR.

ARRENDATARIO:
${getArrendatarioName()}, mayor de edad, identificado con cédula de ciudadanía No. ${c.usuarioArrendatario?.cedula || '____________________'}, quien para los efectos de este contrato se denominará EL ARRENDATARIO.

II. DESCRIPCIÓN DETALLADA DEL INMUEBLE

EL ARRENDADOR es dueño y legítimo poseedor del ${getInmuebleDescription()}, el cual se encuentra en buen estado de conservación y es apto para el uso al que se destina.

III. OBJETO DEL CONTRATO

EL ARRENDADOR concede en arrendamiento a EL ARRENDATARIO el inmueble descrito en la cláusula anterior, quien lo acepta en el estado en que se encuentra, para uso exclusivo de vivienda.

IV. DURACIÓN DEL CONTRATO

El presente contrato tendrá una duración desde el día ${formatDate(c.fechaInicio)} hasta el día ${formatDate(c.fechaFinalizacion)}, entendiéndose prorrogable tácitamente por períodos iguales si ninguna de las partes manifiesta su voluntad de terminarlo con por lo menos treinta (30) días de anticipación.

V. PRECIO DEL ARRENDAMIENTO Y FORMA DE PAGO

EL ARRENDATARIO se obliga a pagar a EL ARRENDADOR por concepto de canon de arrendamiento la suma mensual de ${formatCurrency(c.precio || 0)} (${numberToWords(c.precio || 0).toUpperCase()}).

Dicha suma deberá ser cancelada en forma anticipada dentro de los primeros cinco (5) días de cada mes, específicamente el día ${c.diaDePago || '___'} de cada mes, mediante depósito bancario en la cuenta que EL ARRENDADOR señale para tal efecto.

VI. DEPÓSITO Y GARANTÍAS

EL ARRENDATARIO hace entrega en este acto a EL ARRENDADOR de la suma de ${formatCurrency(c.deposito || 0)} (${numberToWords(c.deposito || 0).toUpperCase()}) en concepto de depósito de garantía, el cual será devuelto al finalizar el contrato, previa verificación del buen estado del inmueble y sus accesorios.

VII. FINANCIACIÓN${c.financiacion ? ' Y CARGOS' : ''}

${c.financiacion ? 
    `El presente contrato registra un esquema de financiación por valor total de ${formatCurrency(c.financiacion.montoTotal)} (${numberToWords(c.financiacion.montoTotal).toUpperCase()}), diferido en ${c.financiacion.numeroCuotas} cuotas mensuales de ${formatCurrency(c.financiacion.valorCuota)} (${numberToWords(c.financiacion.valorCuota).toUpperCase()}) cada una, con una tasa de interés del ${c.financiacion.interes}% anual.` : 
    'No se registra financiación externa vinculada al presente contrato legal.'}

VIII. OBLIGACIONES DEL ARRENDADOR

Son obligaciones de EL ARRENDADOR:
1. Entregar el inmueble en buen estado de conservación y habitabilidad.
2. Garantizar el uso pacífico del inmueble durante la vigencia del contrato.
3. Realizar las reparaciones estructurales y de mantenimiento que no sean por cuenta del arrendatario.
4. Responder por los vicios o defectos ocultos del inmueble.

IX. OBLIGACIONES DEL ARRENDATARIO

Son obligaciones de EL ARRENDATARIO:
1. Pagar puntualmente el canon de arrendamiento y los servicios públicos.
2. Utilizar el inmueble exclusivamente para vivienda y mantenerlo en buen estado.
3. Realizar las reparaciones menores y de mantenimiento que le correspondan.
4. Permitir a EL ARRENDADOR las inspecciones periódicas del inmueble.
5. Restituir el inmueble al finalizar el contrato en las mismas condiciones en que lo recibió.

X. ESTADO CONTRACTUAL

El presente contrato se encuentra en estado ${c.estadoContrato?.toUpperCase() || 'ACTIVO'}, con plena vigencia y efectos legales entre las partes.

XI. CLÁUSULAS ESPECIALES

${c.clausulasEspeciales || 'No se han estipulado condiciones adicionales por las partes.'}

${c.contenido ? `XII. CONTENIDO ESPECÍFICO\n${c.contenido}` : ''}

${c.contenido ? 'XIII.' : 'XII.'} LEGISLACIÓN APLICABLE

El presente contrato se rige por las disposiciones del Código Civil, la Ley de Arrendamientos Urbanos, y las normas complementarias vigentes en la República. Para cualquier controversia, las partes se someten a la jurisdicción de los tribunales competentes de la ciudad.

XIV. LUGAR Y FECHA

El presente contrato se firma en ${c.inmueble?.ubicacion?.nombre || 'la ciudad de residencia del inmueble'}, el día ${formatDate(new Date())}.


ARRENDADOR
Firma: ___________________                                                    
Nombre:  ${getArrendadorName()}                        
C.C. No. ${c.usuarioArrendador?.cedula || '___________________'}    

Arrendatario
Nombre:  ${getArrendatarioName()}                                              
Firma: ___________________
C.C. No. ${c.usuarioArrendatario?.cedula || '___________________'}                     
    `.trim();
};  