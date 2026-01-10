import { BarChart } from '@mui/x-charts/BarChart'

interface CardChart3Props {
    publications?: any[]
}

export const CardChart3 = ({ publications = [] }: CardChart3Props) => {
    // Calcular distribución por tipo de inmueble
    const apartamentos = publications.filter(p => p.inmueble?.tipo === 'apartamento').length
    const casas = publications.filter(p => p.inmueble?.tipo === 'casa').length
    const habitaciones = publications.filter(p => p.inmueble?.tipo === 'habitacion').length

    const isEmpty = publications.length === 0

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
                            data: ['Apartamentos', 'Casas', 'Habitaciones'],
                            categoryGapRatio: 0.4
                        }]}
                        series={[{
                            data: [apartamentos, casas, habitaciones],
                            label: 'Cantidad',
                            color: '#EB8369'
                        }]}
                        height={320}
                        margin={{ top: 20, right: 20, bottom: 40, left: 40 }}
                        borderRadius={20}
                    />
                </div>
            )}
        </div>
    )
}