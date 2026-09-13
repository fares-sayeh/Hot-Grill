import { db } from '../storage/db';

function bytesToBase64(bytes: Uint8Array): string {
  let binary = '';
  for (const byte of bytes) binary += String.fromCharCode(byte);
  return btoa(binary);
}

function base64ToBytes(value: string): Uint8Array {
  const binary = atob(value);
  return Uint8Array.from(binary, (char) => char.charCodeAt(0));
}

export async function getConversationKey(): Promise<CryptoKey> {
  const existing = await db.getCryptoKey();
  if (existing) return existing;
  const key = await crypto.subtle.generateKey({ name: 'AES-GCM', length: 256 }, true, ['encrypt', 'decrypt']);
  await db.saveCryptoKey(key);
  return key;
}

export async function encryptMessage(plaintext: string): Promise<{ ciphertext: string; iv: string }> {
  const key = await getConversationKey();
  const iv = crypto.getRandomValues(new Uint8Array(12));
  const encoded = new TextEncoder().encode(plaintext);
  const ciphertext = await crypto.subtle.encrypt({ name: 'AES-GCM', iv }, key, encoded);
  return { ciphertext: bytesToBase64(new Uint8Array(ciphertext)), iv: bytesToBase64(iv) };
}

export async function decryptMessage(ciphertext: string, iv: string): Promise<string> {
  const key = await getConversationKey();
  const plaintext = await crypto.subtle.decrypt({ name: 'AES-GCM', iv: base64ToBytes(iv) }, key, base64ToBytes(ciphertext));
  return new TextDecoder().decode(plaintext);
}

export function redactPacketForRelay(packet: { id: string; ciphertext: string; iv: string; ttl: number; hops: number; expiresAt: number }) {
  return { ...packet, visibleToRelay: false, plaintext: undefined };
}
