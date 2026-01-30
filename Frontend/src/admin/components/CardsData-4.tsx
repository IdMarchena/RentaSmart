import imgChart2 from "../../assets/chart-2.png"
import { useEffect, useState } from 'react'
import { useAuthContext } from '../../context/AuthContext'
import { useChat } from '@/hooks/useChat'
import { useMensaje } from '@/hooks/useMensaje'

export const CardsData4 = () => {
    const [unreadCount, setUnreadCount] = useState(0);
    const { user } = useAuthContext();
    const { chats } = useChat();
    const { mensajes } = useMensaje();

    useEffect(() => {
        if (!user?.id || !chats || !mensajes) return;

        // Filtrar chats donde el usuario es participante
        const userChats = chats.filter(chat => 
            chat.usuarioA?.id === Number(user.id) || 
            chat.usuarioB?.id === Number(user.id)
        );

        let totalUnread = 0;

        // Para cada chat del usuario, contar mensajes no leídos
        userChats.forEach(chat => {
            // Filtrar mensajes de este chat que estén en estado NO_LEIDO y no sean del usuario
            const unreadMessages = mensajes.filter(msg => 
                msg.chat.id === chat.id && 
                msg.estado === 'NO_LEIDO' &&
                msg.emisor.id !== Number(user.id) // No contar mensajes propios
            );

            totalUnread += unreadMessages.length;
        });

        setUnreadCount(totalUnread);
        console.log("Mensajes no leídos del usuario:", totalUnread);
    }, [user?.id, chats, mensajes]);

    return (
        <div className="w-full h-[150px] flex flex-row items-center justify-between bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[30px]">
            <div className="w-[70%] flex flex-col items-start justify-center p-6 gap-1 max-[1082px]:p-2">
                <h1 className="text-[#393939] text-[15px] font-bold max-[1082px]:text-[12px] max-[708px]:text-[13px]">Total de Mensajes</h1>
                <span className="text-[#393939] text-[30px] font-bold max-[1082px]:text-[25px] max-[708px]:text-[20px]">{unreadCount}</span>
                <p className="text-[#393939] text-[9px] font-medium max-[1082px]:text-[8px] max-[708px]:text-[10px]">Chats gestionados desde tu panel en tiempo real.</p>
            </div>
            <img src={imgChart2} alt="Banner Admin" className="w-[50px] h-[50px] object-cover mr-2 max-[1082px]:w-[40px] max-[1082px]:h-[40px]" />
        </div>
    )
}