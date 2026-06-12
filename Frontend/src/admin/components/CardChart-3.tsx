import { BarChart } from '@mui/x-charts/BarChart'

interface CardChart3Props {
    publications?: any[]
}

export const CardChart3 = ({ publications = [] }: CardChart3Props) => {
    
    // 1. Mapa maestro de colores
    const colorPalette: Record<string, string> = {
        'APARTAMENTO': '#4CAF50',
        'CASA': '#FF9800',
        'HABITACION': '#2196F3',
        'APARTAESTUDIO': '#9C27B0',
        'OFICINA': '#FF5722',
        'LOCAL_COMERCIAL': '#F44336',
        'PISO': '#FFC107',
        'CHALET': '#673AB7',
        'ESTUDIO': '#3F51B5',
        'LOFT': '#00BCD4',
        'VIVIENDA_RURAL': '#009688',
        'CASA_CAMPO': '#8BC34A',
        'BODEGA': '#607D8B',
    }

    // 2. Conteo dinámico (más limpio que hacer 13 filtros manuales)
    const counts = publications.reduce((acc: Record<string, number>, p) => {
        const tipo = p.inmueble?.tipo;
        if (tipo) acc[tipo] = (acc[tipo] || 0) + 1;
        return acc;
    }, {});

    // 3. Preparamos los datos filtrando solo los que tienen valor > 0
    const chartLabels = Object.keys(counts).filter(key => counts[key] > 0);
    const chartValues = chartLabels.map(label => counts[label]);

    const isEmpty = publications.length === 0;

    return (
        <div className="w-full h-[400px] flex flex-col items-center justify-start bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] p-4">
            <h1 className="text-[#393939] text-[14px] font-bold mt-5 mb-3">Publicaciones por Tipo de Inmueble</h1>
            
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-[#393939] text-sm text-center px-4">
                        No hay datos para mostrar.<br />
                        Crea tu primera publicación.
                    </p>
                </div>
            ) : (
                <div className="w-full flex-1">
                    <BarChart
                        xAxis={[{
                            scaleType: 'band',
                            data: chartLabels,
                            // ESTO ASIGNA EL COLOR POR CATEGORÍA
                            colorMap: {
                                type: 'ordinal',
                                colors: chartLabels.map(label => colorPalette[label] || '#393939')
                            }
                        }]}
                        series={[{
                            data: chartValues,
                            label: 'Cantidad',
                        }]}
                        height={320}
                        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                        borderRadius={8}
                    />
                </div>
            )}
        </div>
    );
}