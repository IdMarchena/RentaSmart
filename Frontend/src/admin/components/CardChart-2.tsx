import { PieChart } from '@mui/x-charts/PieChart'

interface CardChart2Props {
    publications?: any[]
}

export const CardChart2 = ({ publications = [] }: CardChart2Props) => {
    console.log("Estas son las publicaciones que llegan->", publications);  // Asegúrate de que esto muestre las publicaciones correctamente
    console.log("Primer publicación:", publications[0]);

    // 1. Clasificamos cada estado individualmente
    const activas = publications.filter(p => p.estadoPublicacion === 'ACTIVA').length
    const borradores = publications.filter(p => p.estadoPublicacion === 'BORRADOR').length
    const publicadas = publications.filter(p => p.estadoPublicacion === 'PUBLICADA').length
    const editadas = publications.filter(p => p.estadoPublicacion === 'EDITADA').length
    const reportadas = publications.filter(p => p.estadoPublicacion === 'REPORTADA').length
    const eliminadas = publications.filter(p => p.estadoPublicacion === 'ELIMINADA').length

    // 2. Construimos la data para el gráfico, incluyendo un filtro para cada estado
    const data = [
        { id: 0, value: activas, label: 'Activas' },
        { id: 1, value: borradores, label: 'Borradores' },
        { id: 2, value: publicadas, label: 'Publicadas' },
        { id: 3, value: editadas, label: 'Editadas' },
        { id: 4, value: reportadas, label: 'Reportadas' },
        { id: 5, value: eliminadas, label: 'Eliminadas' },
    ].filter(item => item.value > 0) // Solo mostramos si hay al menos 1 en cada estado

    const isEmpty = publications.length === 0;

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
                    series={[{
                        data,
                        innerRadius: 30,
                        outerRadius: 100,
                        paddingAngle: 5,
                        cornerRadius: 5,
                        arcLabel: (item) => `${item.value}`, // Etiquetas de arco con valores
                    }]}

                    // Colores únicos para cada estado
                    colors={[
                        '#4CAF50',  // Activas (Verde)
                        '#FF9800',  // Borradores (Naranja)
                        '#2196F3',  // Publicadas (Azul)
                        '#9C27B0',  // Editadas (Morado)
                        '#FF5722',  // Reportadas (Rojo anaranjado)
                        '#F44336',  // Eliminadas (Rojo)
                    ]}

                    width={300} // Reducir el tamaño
                    height={300} // Reducir el tamaño
                    margin={{ top: 20, left: 20, right: 20, bottom: 20 }} // Ajustar márgenes
                    labelStyle={{
                        fontSize: '10px', // Reducir tamaño de la fuente
                        textAlign: 'center',
                        transform: 'rotate(-20deg)', // Rotar las etiquetas para que se ajusten mejor
                    }}
                />
            )}
            <div className="text-center mt-2 mb-3">
                <span className="text-[#393939] text-xs font-semibold">
                    Total: {publications.length} publicación{publications.length !== 1 }
                </span>
            </div>
        </div>
    )
}
