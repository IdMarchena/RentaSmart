import { BarChart } from '@mui/x-charts/BarChart';
import { useEffect, useState } from 'react';
import { supabase } from '../../lib/supabase';

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

    useEffect(() => {
        loadStats()
    }, [])

    const loadStats = async () => {
        try {
            // Estadísticas de publicaciones
            const { data: pubData } = await supabase
                .from('publicaciones')
                .select('estado')

            const publicacionesStats = pubData?.reduce((acc: any, pub) => {
                acc[pub.estado] = (acc[pub.estado] || 0) + 1
                return acc
            }, {})

            // Estadísticas de contratos
            const { data: contData } = await supabase
                .from('contratos')
                .select('estado')

            const contratosStats = contData?.reduce((acc: any, cont) => {
                acc[cont.estado] = (acc[cont.estado] || 0) + 1
                return acc
            }, {})

            setStats({
                publicacionesPorEstado: Object.entries(publicacionesStats || {}).map(([estado, cantidad]) => ({
                    estado: estado.charAt(0).toUpperCase() + estado.slice(1),
                    cantidad: cantidad as number
                })),
                contratosPorEstado: Object.entries(contratosStats || {}).map(([estado, cantidad]) => ({
                    estado: estado.charAt(0).toUpperCase() + estado.slice(1),
                    cantidad: cantidad as number
                }))
            })
        } catch (error) {
            console.error('Error loading stats:', error)
        } finally {
            setLoading(false)
        }
    }

    if (loading) {
        return (
            <div className="w-full h-[400px] flex items-center justify-center bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px]">
                <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#EB8369]"></div>
            </div>
        )
    }

    // Preparar datos para la gráfica
    const categories = ['Publicaciones', 'Contratos']
    const pendientes = [
        stats.publicacionesPorEstado.find(p => p.estado.toLowerCase() === 'borrador')?.cantidad || 0,
        stats.contratosPorEstado.find(c => c.estado.toLowerCase() === 'pendiente')?.cantidad || 0
    ]
    const activos = [
        stats.publicacionesPorEstado.find(p => p.estado.toLowerCase() === 'publicada')?.cantidad || 0,
        stats.contratosPorEstado.find(c => c.estado.toLowerCase() === 'activo')?.cantidad || 0
    ]
    const finalizados = [
        stats.publicacionesPorEstado.find(p => p.estado.toLowerCase() === 'pausada')?.cantidad || 0,
        stats.contratosPorEstado.find(c => c.estado.toLowerCase() === 'finalizado')?.cantidad || 0
    ]

    return (
        <div className="w-full h-[400px] flex flex-col items-start justify-start bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] p-4">
            <h3 className="text-[#393939] text-[14px] font-bold mb-2">Resumen de Publicaciones y Contratos</h3>
            <div className="w-full flex-1">
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
                            label: 'Pendiente/Borrador',
                            stack: 'total'
                        },
                        {
                            data: activos,
                            label: 'Activo/Publicada',
                            stack: 'total'
                        },
                        {
                            data: finalizados,
                            label: 'Finalizado/Pausada',
                            stack: 'total'
                        }
                    ]}
                    height={350}
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