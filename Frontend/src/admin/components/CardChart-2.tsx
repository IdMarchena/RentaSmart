import { PieChart } from '@mui/x-charts/PieChart'

interface CardChart2Props {
    publications?: any[]
}

export const CardChart2 = ({ publications = [] }: CardChart2Props) => {
    // Calcular distribución por estado
    const publicadas = publications.filter(p => p.estado === 'publicada').length
    const pausadas = publications.filter(p => p.estado === 'pausada').length
    const borradores = publications.filter(p => p.estado === 'borrador').length

    const data = [
        { id: 0, value: publicadas, label: 'Publicadas' },
        { id: 1, value: pausadas, label: 'Pausadas' },
        { id: 2, value: borradores, label: 'Borradores' },
    ].filter(item => item.value > 0) // Solo mostrar categorías con datos

    const isEmpty = publications.length === 0

    return (
        <div className="w-[40%] h-[400px] flex flex-col items-center justify-center bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] max-[890px]:w-full">
            <h1 className="text-[#393939] text-[14px] font-bold mt-5">Estado de Publicaciones</h1>
            {isEmpty ? (
                <div className="flex flex-col items-center justify-center h-full">
                    <p className="text-[#393939] text-sm text-center px-4">
                        No hay datos para mostrar.<br />
                        Crea tu primera publicación.
                    </p>
                </div>
            ) : (
                <PieChart
                    series={[
                        {
                            data,
                            innerRadius: 30,
                            outerRadius: 100,
                            paddingAngle: 5,
                            cornerRadius: 5,
                        },
                    ]}
                    colors={['#5CA978', '#FFA500', '#A9ADB6']} // Verde, Naranja, Gris
                    width={350}
                    height={250}
                />
            )}
            <div className="text-center mt-2 mb-3">
                <span className="text-[#393939] text-xs font-semibold">
                    Total: {publications.length} publicación{publications.length !== 1 ? 'es' : ''}
                </span>
            </div>
        </div>
    )
}