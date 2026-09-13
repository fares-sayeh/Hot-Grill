import type { Conversation, EmergencyPacket, LocalIdentity, MessageEnvelope, RelayStats } from '../types';

const DB_NAME = 'nexus-db';
const DB_VERSION = 1;

export interface NexusSettings {
  firstRunDone: boolean;
  relay: RelayStats;
  installDismissed: boolean;
}

interface Stores {
  conversations: Conversation;
  messages: MessageEnvelope;
  identity: LocalIdentity;
  settings: NexusSettings;
  emergencies: EmergencyPacket;
  crypto: CryptoKey;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const request = indexedDB.open(DB_NAME, DB_VERSION);
    request.onupgradeneeded = () => {
      const db = request.result;
      for (const name of ['conversations', 'messages', 'identity', 'settings', 'emergencies', 'crypto'] as const) {
        if (!db.objectStoreNames.contains(name)) db.createObjectStore(name);
      }
    };
    request.onsuccess = () => resolve(request.result);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB open failed'));
  });
}

async function put<K extends keyof Stores>(storeName: K, key: string, value: Stores[K]): Promise<void> {
  const db = await openDb();
  await new Promise<void>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readwrite');
    tx.objectStore(storeName).put(value, key);
    tx.oncomplete = () => resolve();
    tx.onerror = () => reject(tx.error ?? new Error('IndexedDB write failed'));
  });
  db.close();
}

async function get<K extends keyof Stores>(storeName: K, key: string): Promise<Stores[K] | undefined> {
  const db = await openDb();
  const value = await new Promise<Stores[K] | undefined>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const request = tx.objectStore(storeName).get(key);
    request.onsuccess = () => resolve(request.result as Stores[K] | undefined);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB read failed'));
  });
  db.close();
  return value;
}

async function getAll<K extends keyof Stores>(storeName: K): Promise<Stores[K][]> {
  const db = await openDb();
  const values = await new Promise<Stores[K][]>((resolve, reject) => {
    const tx = db.transaction(storeName, 'readonly');
    const request = tx.objectStore(storeName).getAll();
    request.onsuccess = () => resolve(request.result as Stores[K][]);
    request.onerror = () => reject(request.error ?? new Error('IndexedDB read failed'));
  });
  db.close();
  return values;
}

export async function seedDatabase(): Promise<void> {
  const identity = await get('identity', 'local');
  if (!identity) {
    await put('identity', 'local', { id: `NEX-${crypto.randomUUID().slice(0, 8).toUpperCase()}`, name: 'Local Pioneer', createdAt: Date.now() });
  }
  const settings = await get('settings', 'global');
  if (!settings) {
    await put('settings', 'global', {
      firstRunDone: false,
      installDismissed: false,
      relay: { enabled: false, messagesRelayed: 0, bytesRelayed: 0, storageBytes: 0, batteryLimit: 25 }
    });
  }
  const conversations = await getAll('conversations');
  if (conversations.length === 0) {
    const now = Date.now();
    const initial: Conversation[] = [
      { id: 'conv-a', title: 'Ava · NEXUS Lab', avatar: 'A', lastMessage: 'The route is ready.', lastAt: now - 90_000, unread: 2, online: true },
      { id: 'conv-d', title: 'Dylan', avatar: 'D', lastMessage: 'Stored securely for later.', lastAt: now - 4_200_000, unread: 0, online: false },
      { id: 'conv-team', title: 'NEXUS Core', avatar: 'N', lastMessage: 'Demo route recalculated.', lastAt: now - 86_400_000, unread: 0, online: true }
    ];
    for (const conversation of initial) await put('conversations', conversation.id, conversation);
  }
}

export const db = {
  getIdentity: () => get('identity', 'local'),
  getSettings: () => get('settings', 'global'),
  saveSettings: (settings: NexusSettings) => put('settings', 'global', settings),
  listConversations: () => getAll('conversations'),
  saveConversation: (conversation: Conversation) => put('conversations', conversation.id, conversation),
  listMessages: () => getAll('messages'),
  saveMessage: (message: MessageEnvelope) => put('messages', message.id, message),
  listEmergencies: () => getAll('emergencies'),
  saveEmergency: (packet: EmergencyPacket) => put('emergencies', packet.id, packet),
  getCryptoKey: () => get('crypto', 'conversation-key'),
  saveCryptoKey: (key: CryptoKey) => put('crypto', 'conversation-key', key)
};
