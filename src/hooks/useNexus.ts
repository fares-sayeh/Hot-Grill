import { useCallback, useEffect, useMemo, useState } from 'react';
import { db, seedDatabase, type NexusSettings } from '../storage/db';
import type { Conversation, ConnectionState, EmergencyPacket, LocalIdentity, MessageEnvelope } from '../types';
import { encryptMessage } from '../crypto/encryption';
import { makeId } from '../utils/id';

export function useNexus() {
  const [identity, setIdentity] = useState<LocalIdentity | null>(null);
  const [settings, setSettings] = useState<NexusSettings | null>(null);
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [messages, setMessages] = useState<MessageEnvelope[]>([]);
  const [emergencies, setEmergencies] = useState<EmergencyPacket[]>([]);
  const [connection, setConnection] = useState<ConnectionState>(navigator.onLine ? 'online' : 'offline');
  const [pwaInstalled, setPwaInstalled] = useState(false);

  const refresh = useCallback(async () => {
    await seedDatabase();
    const [nextIdentity, nextSettings, nextConversations, nextMessages, nextEmergencies] = await Promise.all([
      db.getIdentity(), db.getSettings(), db.listConversations(), db.listMessages(), db.listEmergencies()
    ]);
    setIdentity(nextIdentity ?? null);
    setSettings(nextSettings ?? null);
    setConversations(nextConversations.sort((a, b) => b.lastAt - a.lastAt));
    setMessages(nextMessages.sort((a, b) => a.createdAt - b.createdAt));
    setEmergencies(nextEmergencies.sort((a, b) => b.createdAt - a.createdAt));
  }, []);

  useEffect(() => {
    void refresh();
    const online = () => setConnection('online');
    const offline = () => setConnection('offline');
    window.addEventListener('online', online);
    window.addEventListener('offline', offline);
    return () => { window.removeEventListener('online', online); window.removeEventListener('offline', offline); };
  }, [refresh]);

  const setRelayEnabled = useCallback(async (enabled: boolean) => {
    if (!settings) return;
    const next = { ...settings, relay: { ...settings.relay, enabled } };
    setSettings(next);
    await db.saveSettings(next);
  }, [settings]);

  const setBatteryLimit = useCallback(async (batteryLimit: number) => {
    if (!settings) return;
    const next = { ...settings, relay: { ...settings.relay, batteryLimit } };
    setSettings(next);
    await db.saveSettings(next);
  }, [settings]);

  const sendMessage = useCallback(async (conversationId: string, text: string) => {
    if (!identity || !text.trim()) return;
    const now = Date.now();
    const encrypted = await encryptMessage(text.trim());
    const envelope: MessageEnvelope = {
      id: makeId('msg'), conversationId, senderId: identity.id, recipientId: conversationId === 'conv-a' ? 'NEX-AVA' : 'NEX-REMOTE',
      ...encrypted, createdAt: now, expiresAt: now + 24 * 60 * 60 * 1000, ttl: 6, maxHops: 6, hops: 0,
      status: 'queued', priority: 'normal'
    };
    await db.saveMessage(envelope);
    const conversation = conversations.find((item) => item.id === conversationId);
    if (conversation) await db.saveConversation({ ...conversation, lastMessage: text.trim(), lastAt: now, unread: 0 });
    await refresh();
    return envelope;
  }, [conversations, identity, refresh]);

  const createEmergency = useCallback(async (message: string, location?: { latitude: number; longitude: number }) => {
    const packet: EmergencyPacket = { id: makeId('sos'), message, createdAt: Date.now(), priority: 'emergency', status: 'queued', ...location };
    await db.saveEmergency(packet);
    await refresh();
    return packet;
  }, [refresh]);

  const markFirstRunDone = useCallback(async () => {
    if (!settings) return;
    const next = { ...settings, firstRunDone: true };
    await db.saveSettings(next);
    setSettings(next);
  }, [settings]);

  const stats = useMemo(() => ({ outbox: messages.filter((m) => m.status === 'queued').length, storedBytes: messages.reduce((sum, m) => sum + m.ciphertext.length, 0) }), [messages]);

  return { identity, settings, conversations, messages, emergencies, connection, pwaInstalled, setPwaInstalled, refresh, setRelayEnabled, setBatteryLimit, sendMessage, createEmergency, markFirstRunDone, stats };
}
