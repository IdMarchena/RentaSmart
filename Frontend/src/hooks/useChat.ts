import { useState, useEffect } from 'react';
import { BackendMensajeRepository } from '@/repositories/Mensaje/MensajeBackendRepository';
import { BackendChatRepository } from '@/repositories/Chat/ChatBackendRepository';
import type { Chat } from '@/types/entitys';
import { ChatService } from '@/services/ChatService';
import { useAuthContext } from '../context/AuthContext'


export const useChat = () => {
  
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chats, setChats] = useState<Chat[]>([]);
  const { user } = useAuthContext()
  const userId = Number(user?.id);

  const chatRepository = new BackendChatRepository();
  const mensajeRepository = new BackendMensajeRepository();

  const serviceC = new ChatService(mensajeRepository, chatRepository);

  // Cargar chats automáticamente al montar el componente
  useEffect(() => {
    getAll();
  }, []);

  // Método que obtiene todos los chats con la hidratación completa
  const getAll = async (): Promise<Chat[]> => {
    setLoading(true);
    setError(null);

    try {
      const result = await chatRepository.getAll(); // Obtiene todos los chats básicos
      const fullChats = await Promise.all(
        result.map((chat) => serviceC.getFullChat(chat.id)) // Hidrata cada chat
      );
      setChats(fullChats.filter((s) => s !== null) as Chat[]); // Filtra y actualiza los chats
      return fullChats.filter((s) => s !== null) as Chat[]; // Devuelve los chats completos
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener chats';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };
const getAllByUserId = async (): Promise<Chat[]> => {
  setLoading(true);
  setError(null);

  // Verifica si el `user?.id` está definido
  if (!user?.id) {
    const errorMessage = 'User ID no disponible';
    setError(errorMessage);
    throw new Error(errorMessage);
  }

  try {
    const result = await chatRepository.getAllByUserId(userId);
    const fullChats = await Promise.all(
      result.map((chat) => serviceC.getFullChat(chat.id))
    );
    setChats(fullChats.filter((s) => s !== null) as Chat[]);
    return fullChats.filter((s) => s !== null) as Chat[];
  } catch (err: any) {
    const errorMessage = err.message || 'Error al obtener chats';
    setError(errorMessage);
    throw err;
  } finally {
    setLoading(false);
  }
};


  // Método que obtiene un chat por ID con la hidratación completa
  const getById = async (id: number): Promise<Chat | null> => {
    setLoading(true);
    setError(null);

    try {
      const chat = await chatRepository.getById(id); // Obtiene el chat básico por ID
      if (chat) {
        const fullChat = await serviceC.getFullChat(chat.id); // Hidrata el chat
        return fullChat;
      }
      return null;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener chat';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Método para crear un nuevo chat
  const create = async (data: Omit<Chat, 'id'>): Promise<Chat> => {
    setLoading(true);
    setError(null);

    try {
      console.log('🚀 useChat.create - Iniciando creación de chat...');
      console.log('📦 Datos recibidos:', data);
      
      const result = await chatRepository.create(data);
      console.log('✅ Chat creado en repositorio:', result);
      
      // Intentar hidratar el chat, pero si falla, devolver el chat creado
      try {
        const fullChat = await serviceC.getFullChat(result.id);
        console.log('🎯 Chat completo obtenido:', fullChat);
        return fullChat;
      } catch (hydrateError) {
        console.warn('⚠️ No se pudo hidratar el chat, devolviendo chat básico:', hydrateError);
        // Devolver el chat creado sin hidratación
        return result;
      }
      
    } catch (err: any) {
      const errorMessage = err.message || 'Error al crear chat';
      console.error('❌ useChat.create - Error detallado:', {
        error: err,
        message: err?.message,
        stack: err?.stack,
        data: data
      });
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Método para actualizar un chat
  const update = async (id: number, data: Partial<Chat>): Promise<Chat> => {
    setLoading(true);
    setError(null);

    try {
      const result = await chatRepository.update(id, data); // Actualiza el chat
      const fullChat = await serviceC.getFullChat(result.id); // Hidrata el chat actualizado
      return fullChat;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al actualizar chat';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Método para eliminar un chat
  const remove = async (id: number): Promise<void> => {
    setLoading(true);
    setError(null);

    try {
      await chatRepository.delete(id); // Elimina el chat
    } catch (err: any) {
      const errorMessage = err.message || 'Error al eliminar chat';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Método para obtener un chat por nombre
  const getByName = async (nombre: string): Promise<Chat | null> => {
    setLoading(true);
    setError(null);

    try {
      const chat = await chatRepository.getByName(nombre); // Obtiene el chat por nombre
      if (chat) {
        const fullChat = await serviceC.getFullChat(chat.id); // Hidrata el chat
        return fullChat;
      }
      return null;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al obtener chat por nombre';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  // Método para verificar si ya existe un chat entre dos usuarios
  const verificarSiExisteChatEntreUsuarios = async (idDuenoPublicacion: number, idArrendatario: number): Promise<boolean> => {
    setLoading(true);
    setError(null);

    try {
      const existe = await chatRepository.verificarSiExisteChatEntreUsuarios(idDuenoPublicacion, idArrendatario);
      return existe;
    } catch (err: any) {
      const errorMessage = err.message || 'Error al verificar si existe chat entre usuarios';
      setError(errorMessage);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    error,
    chats,
    getAll,
    getById,
    create,
    update,
    remove,
    getByName,
    getAllByUserId,
    verificarSiExisteChatEntreUsuarios,
  };
};
