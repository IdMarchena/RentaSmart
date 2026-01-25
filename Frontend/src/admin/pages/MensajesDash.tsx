import { useEffect, useState } from 'react';
import { Aside } from '../components/Aside';
import { CardChat } from '../components/CardChat';
import { CreateChatCard } from '../components/CreateChatCard';
import { ChatMessagesView } from '../components/ChatMessagesView';
import { useChat } from '@/hooks/useChat';
import type { Chat } from '@/types/entitys';

export const MensajesDash = () => {
    const [chats, setChats] = useState<Chat[]>([]);
    const [filteredChats, setFilteredChats] = useState<Chat[]>([]);
    const [selectedChat, setSelectedChat] = useState<Chat | null>(null);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const { getAllByUserId } = useChat();

    useEffect(() => {
        loadChats();
    }, []);

    const loadChats = async () => {
        try {
            setLoading(true);
            const userChats = await getAllByUserId();
            console.log('📋 Chats cargados:', userChats);
            setChats(userChats);
            setFilteredChats(userChats);
        } catch (error) {
            console.error('Error loading chats:', error);
        } finally {
            setLoading(false);
        }
    };

    // Filtrar chats por nombre
    useEffect(() => {
        if (searchTerm.trim() === '') {
            setFilteredChats(chats);
        } else {
            const filtered = chats.filter(chat => {
                const chatName = chat.nombre.toLowerCase();
                const searchLower = searchTerm.toLowerCase();
                return chatName.includes(searchLower);
            });
            setFilteredChats(filtered);
        }
    }, [searchTerm, chats]);

    const handleChatClick = (chat: Chat) => {
        setSelectedChat(chat);
        // Marcar mensajes como leídos al abrir el chat
        markMessagesAsRead(chat.id);
    };

    const markMessagesAsRead = async (chatId: number) => {
        try {
            console.log('📖 Marcando mensajes como leídos para chat:', chatId);
            // Aquí consumiríamos el endpoint para marcar mensajes como leídos
            // await mensajeRepository.markAsRead(chatId, user?.id);
        } catch (error) {
            console.error('❌ Error marcando mensajes como leídos:', error);
        }
    };

    const handleChatUpdate = (updatedChat: Chat) => {
        console.log('🔄 Chat actualizado en MensajesDash:', updatedChat);
        // Actualizar el chat en la lista
        setChats(prevChats => 
            prevChats.map(chat => 
                chat.id === updatedChat.id ? updatedChat : chat
            )
        );
    };

    const handleChatDelete = (chatId: number) => {
        console.log('🗑️ Chat eliminado en MensajesDash:', chatId);
        // Eliminar el chat de la lista
        setChats(prevChats => prevChats.filter(chat => chat.id !== chatId));
    };

    const handleCloseModal = () => {
        setSelectedChat(null);
        // Recargar chats para actualizar estados
        loadChats();
    };

    return (
        <div className="w-full h-screen flex flex-row">
            <Aside />
            <div className="w-[85%] h-full flex flex-col items-start justify-start p-5 overflow-y-scroll custom-scrollbar-2 max-[1082px]:w-[100%]">
                <div className="w-full h-[100px] flex flex-row items-center justify-between mt-3">
                    <h1 className="text-[#393939] text-[20px] font-bold">Tus Mensajes</h1>
                </div>
                
                <div className="w-full h-[100vh] flex flex-row items-start justify-start gap-10 mt-5 max-[890px]:flex-col max-[890px]:h-[200vh]">
                    {/* Lista de Chats - vuelve a ser vertical */}
                    <div className="w-[40%] h-[100vh] flex flex-col items-start justify-start gap-5 bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-y-scroll custom-scrollbar-1 overflow-x-hidden p-5 max-[890px]:w-full max-[890px]:h-[40vh]">
                        
                        {/* Card para crear nuevo chat */}
                        <CreateChatCard />

                        {/* Barra de búsqueda de chats */}
                        <div className="w-full">
                            <input
                                type="text"
                                placeholder="Buscar chats por nombre..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="w-full px-3 py-2 border border-[#BCBBB0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#393939] bg-white"
                            />
                        </div>
                        
                        {/* Lista de chats existentes en vertical */}
                        {loading ? (
                            <div className="w-full flex items-center justify-center py-10">
                                <span className="text-[#393939] text-sm">Cargando chats...</span>
                            </div>
                        ) : filteredChats.length > 0 ? (
                            filteredChats.map((chat) => (
                                <CardChat 
                                    key={chat.id} 
                                    chat={chat} 
                                    onClick={handleChatClick}
                                    onUpdate={handleChatUpdate}
                                    onDelete={handleChatDelete}
                                />
                            ))
                        ) : (
                            <div className="w-full flex items-center justify-center py-10">
                                <span className="text-[#666] text-sm">
                                    {searchTerm ? 'No se encontraron chats' : 'No tienes chats aún'}
                                </span>
                            </div>
                        )}
                    </div>
                    
                    {/* Vista de mensajes del chat seleccionado - más grande */}
                    <div className="w-[58%] h-[100vh] bg-[#EFEDDE] border-[1px] border-[#BCBBB0] rounded-[10px] overflow-hidden p-5 max-[890px]:w-full max-[890px]:h-[55vh]">
                        {selectedChat ? (
                            <ChatMessagesView 
                                chat={selectedChat}
                                onClose={() => setSelectedChat(null)}
                            />
                        ) : (
                            <div className="w-full h-full flex items-center justify-center">
                                <span className="text-[#666] text-sm">Selecciona un chat para ver los mensajes</span>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};