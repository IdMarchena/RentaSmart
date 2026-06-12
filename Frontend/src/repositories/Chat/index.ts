import { DATA_SOURCE } from '@/api'
import { BackendChatRepository } from './ChatBackendRepository'
import type { ChatRepository } from './ChatRepository'

const backendRepository = new BackendChatRepository()

export const chatRepository: ChatRepository = 
  DATA_SOURCE === 'backend' ? backendRepository : backendRepository

export type { ChatRepository }
