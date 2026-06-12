import { useState } from 'react';
import imgAdd from "../../assets/add.png";
import { usuariosRepository } from '@/repositories/usuarios';
import { useChat } from '@/hooks/useChat';
import { useAuthContext } from '@/context/AuthContext';
import type { UsuarioResumen } from '@/types/entities';

export const CreateChatCard = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [searchResults, setSearchResults] = useState<UsuarioResumen[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [showSearch, setShowSearch] = useState(false);
  const [allUsers, setAllUsers] = useState<UsuarioResumen[]>([]);
  const { create } = useChat();
  const { user } = useAuthContext();

  // Cargar todos los usuarios al montar el componente
  const loadAllUsers = async () => {
    try {
      console.log('🔄 Cargando todos los usuarios...');
      const users = await usuariosRepository.getAll();
      console.log('✅ Usuarios cargados:', users);
      // Filtrar para no mostrar al usuario autenticado
      const filteredUsers = users.filter(usuario => 
        Number(usuario.id) !== Number(user?.id)
      );
      setAllUsers(filteredUsers);
    } catch (error) {
      console.error('❌ Error cargando usuarios:', error);
      // Si falla, mostramos usuarios de ejemplo para desarrollo
      const mockUsers: UsuarioResumen[] = [
        { id: 2, nombre: 'Juan Pérez', correo: 'juan@example.com', rol: 'user' },
        { id: 3, nombre: 'María García', correo: 'maria@example.com', rol: 'user' },
        { id: 4, nombre: 'Carlos López', correo: 'carlos@example.com', rol: 'user' }
      ].filter(usuario => Number(usuario.id) !== Number(user?.id));
      setAllUsers(mockUsers);
      console.log('📝 Usando usuarios de ejemplo:', mockUsers);
    }
  };

  // Cargar usuarios cuando se abre la búsqueda
  const handleOpenSearch = () => {
    setShowSearch(true);
    if (allUsers.length === 0) {
      loadAllUsers();
    }
  };

  const handleSearch = async (query: string) => {
    setSearchTerm(query);
    
    if (query.length < 2) {
      setSearchResults([]);
      return;
    }

    setIsSearching(true);
    try {
      // Buscar en los usuarios ya cargados (búsqueda local)
      const filtered = allUsers.filter(usuario => {
        const nombre = usuario.nombre.toLowerCase();
        const correo = usuario.correo.toLowerCase();
        const searchTerm = query.toLowerCase();
        return nombre.includes(searchTerm) || correo.includes(searchTerm);
      });
      
      setSearchResults(filtered);
      console.log('🔍 Resultados de búsqueda local:', filtered);
    } catch (error) {
      console.error('❌ Error en búsqueda local:', error);
      setSearchResults([]);
    } finally {
      setIsSearching(false);
    }
  };

  const handleCreateChat = async (otherUser: UsuarioResumen) => {
    try {
      console.log('🚀 Iniciando creación de chat...');
      console.log('👤 Usuario autenticado:', user);
      console.log('👤 Otro usuario:', otherUser);
      
      const chatData = {
        nombre: `Chat con ${otherUser.nombre}`,
        usuarioA: user, // Usuario autenticado
        usuarioB: otherUser,
        mensajes: [], // Inicialmente sin mensajes
        estado_chat: 'ACTIVO',
        fechaCreacion: new Date().toISOString()
      };
      
      console.log('📦 Datos del chat a crear:', chatData);

      const newChat = await create(chatData as any);

      console.log('✅ Chat creado exitosamente:', newChat);
      
      // Cerrar la búsqueda y limpiar el formulario
      setShowSearch(false);
      setSearchTerm('');
      setSearchResults([]);
      
      // Recargar la página para mostrar el nuevo chat en la lista
      window.location.reload();
      
    } catch (error: any) {
      console.error('❌ Error creating chat:', error);
      console.error('❌ Detalles del error:', {
        message: error?.message || 'Error desconocido',
        stack: error?.stack || 'No stack disponible',
        user: user,
        otherUser: otherUser
      });
    }
  };

  return (
    <div className="w-full bg-[#E1DFD2] border-[1px] border-[#BCBBB0] rounded-[10px] p-4">
      {!showSearch ? (
        // Vista inicial - botón para crear chat
        <div 
          className="w-full h-[60px] flex flex-row items-center justify-center gap-3 cursor-pointer hover:bg-[#D5D3C6] rounded-lg transition-colors"
          onClick={handleOpenSearch}
        >
          <img src={imgAdd} alt="add" className="w-[20px] h-[20px] object-cover"/>
          <span className="text-[#393939] text-[14px] font-bold">Crear Nuevo Chat</span>
        </div>
      ) : (
        // Vista de búsqueda
        <div className="w-full">
          <div className="w-full flex flex-row items-center justify-between mb-3">
            <input
              type="text"
              placeholder="Buscar usuario por nombre..."
              value={searchTerm}
              onChange={(e) => handleSearch(e.target.value)}
              className="w-[80%] px-3 py-2 border border-[#BCBBB0] rounded-lg text-sm focus:outline-none focus:ring-2 focus:ring-[#393939]"
              autoFocus
            />
            <button
              onClick={() => {
                setShowSearch(false);
                setSearchTerm('');
                setSearchResults([]);
              }}
              className="w-[15%] px-2 py-2 bg-red-500 text-white rounded-lg text-xs hover:bg-red-600 transition-colors"
            >
              Cancelar
            </button>
          </div>

          {/* Resultados de búsqueda */}
          <div className="w-full max-h-[200px] overflow-y-auto">
            {isSearching ? (
              <div className="text-center py-3">
                <span className="text-[#393939] text-xs">Buscando...</span>
              </div>
            ) : searchResults.length > 0 ? (
              searchResults.map((usuario) => (
                <div
                  key={usuario.id}
                  className="w-full flex flex-row items-center justify-between p-2 mb-2 bg-white border border-[#BCBBB0] rounded-lg hover:bg-gray-50 transition-colors cursor-pointer"
                  onClick={() => handleCreateChat(usuario)}
                >
                  <div className="flex flex-row items-center gap-2">
                    <div className="w-[30px] h-[30px] bg-[#393939] rounded-full flex items-center justify-center">
                      <span className="text-white text-xs font-bold">
                        {usuario.nombre.charAt(0).toUpperCase()}
                      </span>
                    </div>
                    <div>
                      <p className="text-[#393939] text-xs font-semibold">{usuario.nombre}</p>
                      <p className="text-[#666] text-xs">{usuario.correo}</p>
                    </div>
                  </div>
                  <button className="px-3 py-1 bg-green-500 text-white rounded text-xs hover:bg-green-600 transition-colors">
                    Crear Chat
                  </button>
                </div>
              ))
            ) : searchTerm.length >= 2 ? (
              <div className="text-center py-3">
                <span className="text-[#666] text-xs">No se encontraron usuarios</span>
              </div>
            ) : (
              <div className="text-center py-3">
                <span className="text-[#666] text-xs">Escribe al menos 2 caracteres para buscar</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
