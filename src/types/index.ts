export type ConnectionState = 'online' | 'offline' | 'connecting';
export type MessageStatus = 'queued' | 'relaying' | 'delivered' | 'expired' | 'failed';
export type NavKey = 'chats' | 'network' | 'relay' | 'emergency' | 'settings';

export interface MessageEnvelope {
  id: string;
  conversationId: string;
  senderId: string;
  recipientId: string;
  ciphertext: string;
  iv: string;
  createdAt: number;
  expiresAt: number;
  ttl: number;
  maxHops: number;
  hops: number;
  status: MessageStatus;
  priority: 'normal' | 'high' | 'emergency';
}

export interface Conversation {
  id: string;
  title: string;
  avatar: string;
  lastMessage: string;
  lastAt: number;
  unread: number;
  online: boolean;
  contactId?: string;
}

export interface Contact {
  id: string;
  name: string;
  publicId: string;
  createdAt: number;
  pairedAt: number;
}

export interface RelayStats {
  messagesRelayed: number;
  bytesRelayed: number;
  storageBytes: number;
  batteryLimit: number;
  enabled: boolean;
}

export interface LocalIdentity {
  id: string;
  name: string;
  createdAt: number;
}

export interface EmergencyPacket {
  id: string;
  message: string;
  latitude?: number;
  longitude?: number;
  createdAt: number;
  priority: 'emergency';
  status: MessageStatus;
}
