import { useState, useEffect } from 'react'
import { supabase } from '../../lib/supabase'

export interface ActivityLog {
    id: string
    type: 'publicacion_creada' | 'publicacion_editada' | 'publicacion_eliminada' |
    'contrato_creado' | 'contrato_firmado' | 'contrato_finalizado'
    description: string
    timestamp: string
}

export const useActivity = (userId?: string) => {
    const [activities, setActivities] = useState<ActivityLog[]>([])
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (userId) {
            loadRecentActivities()
        }
    }, [userId])

    const loadRecentActivities = async () => {
        setLoading(true)
        try {
            const recentActivities: ActivityLog[] = []

            // Obtener últimas publicaciones
            const { data: publicaciones } = await supabase
                .from('publicaciones')
                .select('id, titulo, created_at, updated_at')
                .order('created_at', { ascending: false })
                .limit(5)

            publicaciones?.forEach(pub => {
                recentActivities.push({
                    id: `pub-${pub.id}`,
                    type: 'publicacion_creada',
                    description: `Nueva publicación: "${pub.titulo}"`,
                    timestamp: pub.created_at
                })
            })

            // Obtener últimos contratos
            const { data: contratos } = await supabase
                .from('contratos')
                .select(`
                    id, 
                    estado, 
                    created_at,
                    publicacion:publicaciones(titulo)
                `)
                .order('created_at', { ascending: false })
                .limit(5)

            contratos?.forEach(cont => {
                const publicacionData = cont.publicacion as any
                const titulo = publicacionData?.titulo || `Contrato #${cont.id}`
                let type: ActivityLog['type'] = 'contrato_creado'
                let description = `Nuevo contrato: ${titulo}`

                if (cont.estado === 'activo') {
                    type = 'contrato_firmado'
                    description = `Contrato firmado: ${titulo}`
                } else if (cont.estado === 'finalizado') {
                    type = 'contrato_finalizado'
                    description = `Contrato finalizado: ${titulo}`
                }

                recentActivities.push({
                    id: `cont-${cont.id}`,
                    type,
                    description,
                    timestamp: cont.created_at
                })
            })

            // Ordenar por fecha más reciente y limitar a 10
            const sortedActivities = recentActivities
                .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
                .slice(0, 10)

            setActivities(sortedActivities)
        } catch (error) {
            console.error('Error loading activities:', error)
        } finally {
            setLoading(false)
        }
    }

    return {
        activities,
        loading,
        refreshActivities: loadRecentActivities
    }
}
