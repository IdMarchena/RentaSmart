import { useState, useMemo } from 'react';
import imgUser from "../../assets/user.png";
import imgHistory from "../../assets/history.png";
import imgEdit from "../../assets/editar.png";
import imgDelete from "../../assets/borrar.png";
import type { Chat } from '@/types/entitys';
import { useAuthContext } from '@/context/AuthContext';
import { useChat } from '@/hooks/useChat';

interface CardChatProps {
  chat: Chat;
  onClick: (chat: Chat) => void;
  onUpdate?: (chat: Chat) => void;
  onDelete?: (chatId: number) => void;
}

export const CardChat = ({ chat, onClick, onUpdate, onDelete }: CardChatProps) => {
  const { user } = useAuthContext();
  const { update, remove } = useChat();
  const [showEditModal, setShowEditModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [newChatName, setNewChatName] = useState(chat.nombre);
  
  // Determinar qué usuario mostrar (el que no es el usuario autenticado)
  const otherUser = useMemo(() => {
    console.log('🔍 Analizando usuarios del chat:', {
      usuarioA: chat.usuarioA,
      usuarioB: chat.usuarioB,
      userId: user?.id,
      chatId: chat.id
    });

    // Si el chat tiene nombre, extraer el nombre del otro usuario del nombre del chat
    if (chat.nombre && chat.nombre.includes('Chat con ')) {
      const otherUserName = chat.nombre.replace('Chat con ', '');
      console.log('📝 Nombre extraído del chat:', otherUserName);
      return {
        id: Number(chat.usuarioA?.id) === Number(user?.id) ? chat.usuarioB?.id : chat.usuarioA?.id,
        nombre: otherUserName,
        correo: chat.usuarioA?.correo || chat.usuarioB?.correo || ''
      };
    }

    // Lógica original
    const isUserA = Number(chat.usuarioA?.id) === Number(user?.id);
    const other = isUserA ? chat.usuarioB : chat.usuarioA;
    
    console.log('👤 Usuario seleccionado:', other);
    return other;
  }, [chat, user]);
  
  // Obtener el último mensaje si existe
  const lastMessage = chat.mensajes && chat.mensajes.length > 0 
    ? chat.mensajes[chat.mensajes.length - 1] 
    : null;

  // Formatear fecha
  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('es-ES', { 
      day: 'numeric', 
      month: 'short', 
      year: 'numeric' 
    });
  };

  // Color según estado del chat
  const getEstadoColor = (estado: string) => {
    switch (estado) {
      case 'ACTIVO':
        return 'bg-green-100 text-green-800 border-green-300';
      case 'NO_LEIDO':
        return 'bg-blue-100 text-blue-800 border-blue-300';
      case 'LEIDO':
        return 'bg-gray-100 text-gray-800 border-gray-300';
      case 'ENVIADO':
        return 'bg-yellow-100 text-yellow-800 border-yellow-300';
      case 'ENTREGADO':
        return 'bg-purple-100 text-purple-800 border-purple-300';
      case 'INACTIVO':
        return 'bg-red-100 text-red-800 border-red-300';
      case 'ARCHIVADO':
        return 'bg-orange-100 text-orange-800 border-orange-300';
      case 'BLOQUEADO':
        return 'bg-red-200 text-red-900 border-red-400';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-300';
    }
  };

  // Handlers para acciones
  const handleEditChat = async () => {
    try {
      console.log('📝 Editando chat:', chat.id, 'con nuevo nombre:', newChatName);
      const updatedChat = await update(chat.id, { nombre: newChatName });
      console.log('✅ Chat actualizado:', updatedChat);
      setShowEditModal(false);
      if (onUpdate) onUpdate(updatedChat);
    } catch (error) {
      console.error('❌ Error actualizando chat:', error);
    }
  };

  const handleDeleteChat = async () => {
    try {
      console.log('🗑️ Eliminando chat:', chat.id);
      await remove(chat.id);
      console.log('✅ Chat eliminado exitosamente');
      setShowDeleteModal(false);
      if (onDelete) onDelete(chat.id);
    } catch (error) {
      console.error('❌ Error eliminando chat:', error);
    }
  };

  return (
    <div 
      className="w-full h-[80px] flex flex-row items-start justify-between bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-2 cursor-pointer hover:bg-[#D5D3C6] transition-colors"
      onClick={() => onClick(chat)}
    >
      <div className="w-[70%] flex flex-row items-start justify-start gap-2 ml-2">
        <img src={imgUser} alt="usuario" className="w-[30px] h-[30px] object-cover rounded-[20px] mt-2"/>
        <div className="w-[70%] flex flex-col items-start justify-center gap-1 mt-2">
            <h1 className="text-[#393939] md:text-[12px] text-[10px] font-bold">
                {otherUser?.nombre || 'Usuario desconocido'}
            </h1>
            <p className="text-[#393939] md:text-[10px] text-[8px] font-medium truncate">
                {lastMessage?.contenido || 'No hay mensajes'}
            </p>
        </div>
      </div>
      <div className="w-[30%] flex flex-col items-start justify-end gap-1 flex-nowrap mr-2 mt-1">
        <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
          <span className={`text-[8px] font-medium px-2 py-1 rounded-full border ${getEstadoColor(chat.estado_chat)}`}>
            {chat.estado_chat}
          </span>
        </div>  
        <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
          <img src={imgHistory} alt="history" className="w-[15px] h-[15px] object-cover"/>
          <span className="text-[#393939] text-[8px] font-medium">
            {formatDate(chat.fechaCreacion)}
          </span>
        </div>
        
        {/* Botones de acción */}
        <div className="w-full flex flex-row items-start justify-end gap-1 flex-nowrap">
          <img 
            src={imgEdit} 
            alt="edit" 
            className="w-[15px] h-[15px] object-cover cursor-pointer hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              setShowEditModal(true);
            }}
          />
          <img 
            src={imgDelete} 
            alt="delete" 
            className="w-[15px] h-[15px] object-cover cursor-pointer hover:scale-110 transition-transform"
            onClick={(e) => {
              e.stopPropagation();
              setShowDeleteModal(true);
            }}
          />
        </div>
      </div>

      {/* Modal de edición */}
      {showEditModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Editar Chat</h3>
            <input
              type="text"
              value={newChatName}
              onChange={(e) => setNewChatName(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg mb-4"
              placeholder="Nombre del chat"
            />
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowEditModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleEditChat}
                className="px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
              >
                Guardar
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Modal de eliminación */}
      {showDeleteModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded-lg p-6 w-96">
            <h3 className="text-lg font-semibold mb-4">Eliminar Chat</h3>
            <p className="text-gray-600 mb-6">
              ¿Estás seguro de que quieres eliminar este chat con {otherUser?.nombre}? Esta acción no se puede deshacer.
            </p>
            <div className="flex justify-end gap-3">
              <button
                onClick={() => setShowDeleteModal(false)}
                className="px-4 py-2 bg-gray-300 text-gray-700 rounded-lg hover:bg-gray-400"
              >
                Cancelar
              </button>
              <button
                onClick={handleDeleteChat}
                className="px-4 py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
              >
                Eliminar
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
