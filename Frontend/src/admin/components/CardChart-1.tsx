import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { usePublicaciones } from '../../hooks/usePublicaciones';
import { useContrato } from '../../hooks/useContrato';
import imgChart from "../../assets/chart-2.png";

interface DashboardStats {
    publicacionesPorEstado: { estado: string, cantidad: number }[]
    contratosPorEstado: { estado: string, cantidad: number }[]
}

export const CardChart1 = () => {
    const [stats, setStats] = useState<DashboardStats>({
        publicacionesPorEstado: [],
        contratosPorEstado: []
    })
    const [loading, setLoading] = useState(true)
    
    const { publications } = usePublicaciones();
    const { contratos } = useContrato();

    useEffect(() => {
        loadStats()
    }, [publications, contratos])

    const loadStats = async () => {
        try {
            console.log('📊 CardChart1 - Cargando estadísticas...')
            console.log('📈 Datos disponibles:', {
                publications: publications.length,
                contratos: contratos.length
            })
            
            // Estadísticas de publicaciones usando los hooks del backend
            const publicacionesStats = publications.reduce((acc: any, pub) => {
                const estado = pub.estadoPublicacion || 'SIN_ESTADO';
                acc[estado] = (acc[estado] || 0) + 1
                return acc
            }, {})

            const publicacionesData = Object.entries(publicacionesStats).map(([estado, cantidad]) => ({
                estado,
                cantidad: cantidad as number
            }))

            console.log('📝 Estadísticas publicaciones:', publicacionesData)

            // Estadísticas de contratos usando los hooks del backend
            const contratosStats = contratos.reduce((acc: any, contrato) => {
                const estado = contrato.estadoContrato || 'SIN_ESTADO';
                acc[estado] = (acc[estado] || 0) + 1
                return acc
            }, {})

            const contratosData = Object.entries(contratosStats).map(([estado, cantidad]) => ({
                estado,
                cantidad: cantidad as number
            }))

            console.log('📋 Estadísticas contratos:', contratosData)

            setStats({
                publicacionesPorEstado: publicacionesData,
                contratosPorEstado: contratosData
            })
        } catch (error) {
            console.error('❌ Error loading stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="w-full h-full flex items-center justify-center">
                <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#EB8369]"></div>
            </div>
        )
    }

    // Preparar datos para el gráfico
    const categories = ['Publicaciones', 'Contratos']
    const pendientes = [
        stats.publicacionesPorEstado.find(p => p.estado === 'EDITADA')?.cantidad || 0,
        stats.contratosPorEstado.find(c => c.estado === 'PENDIENTE')?.cantidad || 0
    ]
    const activos = [
        stats.publicacionesPorEstado.find(p => p.estado === 'PUBLICADA')?.cantidad ||stats.publicacionesPorEstado.find(p => p.estado === 'ACTIVA')?.cantidad || 0,
        stats.contratosPorEstado.find(c => c.estado === 'ACTIVO')?.cantidad || 0
    ]
    const finalizados = [
        stats.publicacionesPorEstado.find(p => p.estado === 'ELIMINADA')?.cantidad || 0,
        stats.contratosPorEstado.find(c => c.estado === 'FINALIZADO')?.cantidad || 0
    ]

    console.log('📊 Datos del gráfico:', {
        categories,
        pendientes,
        activos,
        finalizados,
        stats
    })

    return (
        <div className="w-[60%] h-[400px] flex flex-col items-center justify-start bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] max-[908px]:w-full">
            <div className="w-full h-auto flex flex-row items-center justify-between">
                <div className="w-[70%] flex flex-col items-start justify-start p-6 gap-1">
                    <h1 className="text-[#393939] text-[14px] font-bold">Análisis General</h1>
                    <p className="text-[#393939] text-[8px] font-medium">Estado de tus publicaciones y contratos.</p>
                </div>
                <img src={imgChart} alt="Chart" className="w-[30px] h-[30px] object-cover mr-2" />
            </div>
            <div className="w-full h-[350px] flex items-center justify-center">
                <BarChart
                    xAxis={[{
                        scaleType: 'band',
                        data: categories,
                        categoryGapRatio: 0.3
                    }]}
                    colors={['#FCD34D', '#EB8369', '#393939']}
                    series={[
                        {
                            data: pendientes,
                            label: 'Editada/Borrador',
                            stack: 'total'
                        },
                        {
                            data: activos,
                            label: 'Activo/Publicado',
                            stack: 'total'
                        },
                        {
                            data: finalizados,
                            label: 'Finalizado',
                            stack: 'total'
                        }
                    ]}
                    width={500}
                    height={300}
                    borderRadius={8}
                    slotProps={{
                        legend: {
                            direction: 'row' as any,
                            position: { vertical: 'bottom', horizontal: 'center' as any }
                        } as any
                    }}
                />
            </div>
        </div>
    )
}