import type { Chat, Mensaje } from '@/types/entitys';
import type { BackendMensajeRepository } from '@/repositories/Mensaje/MensajeBackendRepository';
import type { BackendChatRepository } from '@/repositories/Chat/ChatBackendRepository';
import { usuariosRepository } from '@/repositories/usuarios';

export class ChatService {
  private mensajeRepo: BackendMensajeRepository;
  private chatRepo: BackendChatRepository;

  constructor(
    mensajeRepo: BackendMensajeRepository,
    chatRepo: BackendChatRepository
  ) {
    this.mensajeRepo = mensajeRepo;
    this.chatRepo = chatRepo;
  }

  async getFullChat(id: number): Promise<Chat> {
    console.log(`🚀 Iniciando getFullChat para ID: ${id}`);
    
    const chat = await this.chatRepo.getById(id);
    console.log(`📦 Chat base obtenido:`, chat);
    
    if (!chat) {
      console.error(`❌ No se encontró chat con ID: ${id}`);
      throw new Error(`Chat con ID ${id} no encontrado`);
    }

    console.log(`🔍 usuario A en el chat:`, chat.usuarioA);
    console.log(`🔍 usuario B en el chat:`, chat.usuarioB);
    console.log(`🔍 Mensajes en el chat:`, chat.mensajes);

    // Hidratar usuario A si no tiene nombre (está incompleto)
    if (!chat.usuarioA.nombre || chat.usuarioA.nombre === 'Usuario desconocido') {
        console.log(`⚠️ El chat no está completamente hidratado, obteniendo usuario A por ID: ${chat.usuarioA.id}`);
        const usuarioCompletoA = await usuariosRepository.getById(chat.usuarioA.id || 0);
        if (usuarioCompletoA) {
            chat.usuarioA = usuarioCompletoA as any;
            console.log(`✅ Usuario A hidratado:`, chat.usuarioA);
        }
    }
    
    // Hidratar usuario B si no tiene nombre (está incompleto)
    if (!chat.usuarioB.nombre || chat.usuarioB.nombre === 'Usuario desconocido') {
        console.log(`⚠️ El chat no está completamente hidratado, obteniendo usuario B por ID: ${chat.usuarioB.id}`);
        const usuarioCompletoB = await usuariosRepository.getById(chat.usuarioB.id || 0);
        if (usuarioCompletoB) {
            chat.usuarioB = usuarioCompletoB as any;
            console.log(`✅ Usuario B hidratado:`, chat.usuarioB);
        }
    }

    if (!chat.mensajes || chat.mensajes.length === 0) {
      try {
        const mensajesRaw = await this.mensajeRepo.getByChat(id, 0, 20);
        
        const mensajesCompletos = await Promise.all(
          mensajesRaw.map(async (m) => await this.mensajeRepo.getById(m.id))
        );
        
        chat.mensajes = mensajesCompletos.filter((m) => m !== null) as Mensaje[];

        console.log(`📸 Mensajes procesados:`, chat.mensajes);
      } catch (error) {
        console.error(`⚠️ Error obteniendo mensajes:`, error);
        chat.mensajes = [];
      }
    }

    console.log(`🎯 Chat final completo:`, chat);
    return chat;
  }
}
