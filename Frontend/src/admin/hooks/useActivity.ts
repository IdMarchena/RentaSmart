import { useState, useEffect } from 'react'
import { usePublicaciones } from '../../hooks/usePublicaciones'
import { useContrato } from '../../hooks/useContrato'
import { useChat } from '../../hooks/useChat'
import { useMensaje } from '../../hooks/useMensaje'
import type { ActivityItem } from '../components/CardActivity'

export const useActivity = (userId?: string) => {
    const [activities, setActivities] = useState<ActivityItem[]>([])
    const [loading, setLoading] = useState(false)
    
    const { publications } = usePublicaciones();
    const { contratos, getAll: refreshContratos } = useContrato();
    const { chats, getAll: refreshChats } = useChat();
    const { mensajes, getAll: refreshMensajes } = useMensaje();

    useEffect(() => {
        if (userId) {
            loadRecentActivities()
        }
    }, [userId, publications, contratos, chats, mensajes])

    // Función para refrescar todos los datos manualmente
    const refreshAllData = async () => {
        try {
            console.log('🔄 Refrescando todos los datos...')
            await Promise.all([
                refreshContratos(),
                refreshChats(), 
                refreshMensajes()
            ])
            console.log('✅ Datos refrescados correctamente')
        } catch (error) {
            console.error('❌ Error refrescando datos:', error)
        }
    }

    const loadRecentActivities = async () => {
        setLoading(true)
        try {
            console.log('🔍 useActivity - Cargando actividades para userId:', userId)
            console.log('📊 Datos disponibles:', {
                publications: publications.length,
                contratos: contratos.length, 
                chats: chats.length,
                mensajes: mensajes.length
            })
            
            const recentActivities: ActivityItem[] = []

            // Obtener últimas publicaciones del usuario
            const userPublicaciones = publications.filter(pub => pub.usuario.id === Number(userId))
            console.log('📝 Publicaciones del usuario:', userPublicaciones.length)
            userPublicaciones.slice(0, 5).forEach(pub => {
                recentActivities.push({
                    id: `pub-${pub.id}`,
                    type: 'publicacion_creada',
                    description: `Creaste la publicación "${pub.titulo}"`,
                    timestamp: pub.fechaPublicacion || new Date().toISOString()
                })
            })

            // Obtener últimos contratos del usuario
            const userContratos = contratos.filter(contrato => 
                contrato.usuarioArrendador?.id === Number(userId) || 
                contrato.usuarioArrendatario?.id === Number(userId)
            )
            console.log('📋 Contratos del usuario:', userContratos.length)
            console.log('📋 Detalles de contratos:', userContratos.map(c => ({ id: c.id, estado: c.estadoContrato, fecha: c.fechaInicio })))
            userContratos.slice(0, 7).forEach(contrato => {
                recentActivities.push({
                    id: `contrato-${contrato.id}`,
                    type: 'contrato_creado',
                    description: `Creaste un contrato ${contrato.estadoContrato}`,
                    timestamp: contrato.fechaInicio || new Date().toISOString()
                })
            })

            // Obtener últimos chats del usuario
            const userChats = chats.filter(chat => 
                chat.usuarioA?.id === Number(userId) || 
                chat.usuarioB?.id === Number(userId)
            )
            console.log('💬 Chats del usuario:', userChats.length)
            userChats.slice(0, 3).forEach(chat => {
                console.log('💭 Chat encontrado:', chat.id, chat.nombre)
                recentActivities.push({
                    id: `chat-${chat.id}`,
                    type: 'chat_creado',
                    description: `Iniciaste un chat con ${chat.usuarioA?.id === Number(userId) ? chat.usuarioB?.nombre : chat.usuarioA?.nombre}`,
                    timestamp: chat.fechaCreacion || new Date().toISOString()
                })
            })

            // Obtener últimos mensajes del usuario
            const userMensajes = mensajes.filter(msg => msg.emisor.id === Number(userId))
            console.log('📨 Mensajes del usuario:', userMensajes.length)
            userMensajes.slice(0, 5).forEach(mensaje => {
                recentActivities.push({
                    id: `msg-${mensaje.id}`,
                    type: 'mensaje_enviado',
                    description: `Enviaste un mensaje en el chat con ${mensaje.chat.nombre}`,
                    timestamp: mensaje.fechaEnvio || new Date().toISOString()
                })
            })

            // Ordenar por fecha (más reciente primero)
            const sortedActivities = recentActivities.sort((a, b) => 
                new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
            )

            console.log('🎯 Actividades finales:', sortedActivities.length)
            console.log('🎯 Detalles de actividades:', sortedActivities.map(a => ({ id: a.id, type: a.type, description: a.description })))
            setActivities(sortedActivities.slice(0, 10)) // Mostrar solo las 10 más recientes
        } catch (error) {
            console.error('❌ Error loading activities:', error)
        } finally {
            setLoading(false)
        }
    }

    return { activities, loading, refreshAllData }
}
