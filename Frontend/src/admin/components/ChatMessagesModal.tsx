import { useEffect, useState } from 'react';
import { CardMensaje } from './CardMensaje';
import type { Chat } from '@/types/entitys';
import { useChat } from '@/hooks/useChat';
import { useMensaje } from '@/hooks/useMensaje';
import { useAuthContext } from '@/context/AuthContext';

interface ChatMessagesModalProps {
  chat: Chat | null;
  onClose: () => void;
}

export const ChatMessagesModal = ({ chat, onClose }: ChatMessagesModalProps) => {
  const [fullChat, setFullChat] = useState<Chat | null>(null);
  const [newMessage, setNewMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const { getById } = useChat();
  const { create } = useMensaje();
  const { user } = useAuthContext();

  useEffect(() => {
    if (chat) {
      loadFullChat(chat.id);
    }
  }, [chat]);

  const loadFullChat = async (chatId: number) => {
    setLoading(true);
    try {
      const chatData = await getById(chatId);
      setFullChat(chatData);
    } catch (error) {
      console.error('Error loading chat:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleSendMessage = async () => {
    if (!newMessage.trim() || !fullChat || !chat) return;

    try {
      // Crear nuevo mensaje
      await create({
        contenido: newMessage,
        chat: { id: fullChat.id } as any,
        emisor: { id: user?.id } as any,
        estado: 'ENVIADO',
        fechaEnvio: new Date().toISOString()
      });

      // Recargar el chat para mostrar el nuevo mensaje
      await loadFullChat(fullChat.id);
      setNewMessage('');
      
    } catch (error) {
      console.error('Error sending message:', error);
    }
  };

  if (!chat) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="w-[90%] h-[90%] max-w-4xl bg-white rounded-lg shadow-xl flex flex-col">
        {/* Header */}
        <div className="w-full h-[60px] bg-[#393939] text-white flex items-center justify-between px-4 rounded-t-lg">
          <div className="flex items-center gap-3">
            <h2 className="text-lg font-semibold">
              {fullChat?.nombre || `Chat con ${chat.usuarioB?.nombre || 'Usuario'}`}
            </h2>
            <span className={`text-xs px-2 py-1 rounded-full ${
              chat.estado_chat === 'ACTIVO' ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
            }`}>
              {chat.estado_chat}
            </span>
          </div>
          <button
            onClick={onClose}
            className="text-white hover:text-gray-300 text-2xl font-bold"
          >
            ×
          </button>
        </div>

        {/* Messages Container */}
        <div className="flex-1 overflow-y-auto p-4 bg-gray-50">
          {loading ? (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500">Cargando mensajes...</span>
            </div>
          ) : fullChat?.mensajes && fullChat.mensajes.length > 0 ? (
            fullChat.mensajes.map((mensaje) => (
              <CardMensaje key={mensaje.id} mensaje={mensaje} />
            ))
          ) : (
            <div className="flex items-center justify-center h-full">
              <span className="text-gray-500">No hay mensajes en este chat</span>
            </div>
          )}
        </div>

        {/* Message Input */}
        <div className="w-full h-[60px] bg-white border-t border-gray-200 flex items-center px-4 rounded-b-lg">
          <input
            type="text"
            placeholder="Escribe un mensaje..."
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSendMessage()}
            className="flex-1 px-3 py-2 border border-gray-300 rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#393939]"
          />
          <button
            onClick={handleSendMessage}
            disabled={!newMessage.trim()}
            className="ml-3 px-4 py-2 bg-[#393939] text-white rounded-lg text-sm hover:bg-[#4a4a4a] disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
          >
            Enviar
          </button>
        </div>
      </div>
    </div>
  );
};
