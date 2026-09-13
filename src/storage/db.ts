import type { Contact, Conversation, EmergencyPacket, LocalIdentity, MessageEnvelope, RelayStats } from '../types';

const DB_NAME = 'nexus-db';
const DB_VERSION = 2;
export interface NexusSettings { firstRunDone: boolean; relay: RelayStats; installDismissed: boolean; }
interface Stores { conversations: Conversation; messages: MessageEnvelope; identity: LocalIdentity; settings: NexusSettings; emergencies: EmergencyPacket; crypto: CryptoKey; contacts: Contact; }

function openDb(): Promise<IDBDatabase> { return new Promise((resolve, reject) => { const request=indexedDB.open(DB_NAME,DB_VERSION); request.onupgradeneeded=()=>{ const d=request.result; for(const n of ['conversations','messages','identity','settings','emergencies','crypto','contacts'] as const) if(!d.objectStoreNames.contains(n)) d.createObjectStore(n); }; request.onsuccess=()=>resolve(request.result); request.onerror=()=>reject(request.error??new Error('IndexedDB open failed')); }); }
async function put<K extends keyof Stores>(storeName:K,key:string,value:Stores[K]){const d=await openDb();await new Promise<void>((res,rej)=>{const tx=d.transaction(storeName,'readwrite');tx.objectStore(storeName).put(value,key);tx.oncomplete=()=>res();tx.onerror=()=>rej(tx.error??new Error('IndexedDB write failed'));});d.close();}
async function get<K extends keyof Stores>(storeName:K,key:string){const d=await openDb();const v=await new Promise<Stores[K]|undefined>((res,rej)=>{const r=d.transaction(storeName,'readonly').objectStore(storeName).get(key);r.onsuccess=()=>res(r.result);r.onerror=()=>rej(r.error??new Error('IndexedDB read failed'));});d.close();return v;}
async function getAll<K extends keyof Stores>(storeName:K){const d=await openDb();const v=await new Promise<Stores[K][]>((res,rej)=>{const r=d.transaction(storeName,'readonly').objectStore(storeName).getAll();r.onsuccess=()=>res(r.result as Stores[K][]);r.onerror=()=>rej(r.error??new Error('IndexedDB read failed'));});d.close();return v;}

export async function seedDatabase(){
 const identity=await get('identity','local'); if(!identity) await put('identity','local',{id:`NEX-${crypto.randomUUID().slice(0,8).toUpperCase()}`,name:'Local Pioneer',createdAt:Date.now()});
 const settings=await get('settings','global'); if(!settings) await put('settings','global',{firstRunDone:true,installDismissed:false,relay:{enabled:false,messagesRelayed:0,bytesRelayed:0,storageBytes:0,batteryLimit:25}});
 const conversations=await getAll('conversations'); if(!conversations.length){const now=Date.now(); for(const c of [
  {id:'conv-a',title:'Ava · NEXUS Lab',avatar:'A',lastMessage:'The route is ready.',lastAt:now-90000,unread:2,online:true},
  {id:'conv-d',title:'Dylan',avatar:'D',lastMessage:'Stored securely for later.',lastAt:now-4200000,unread:0,online:false},
  {id:'conv-team',title:'NEXUS Core',avatar:'N',lastMessage:'Demo route recalculated.',lastAt:now-86400000,unread:0,online:true}
 ]) await put('conversations',c.id,c); }
}
export const db={getIdentity:()=>get('identity','local'),getSettings:()=>get('settings','global'),saveSettings:(v:NexusSettings)=>put('settings','global',v),listConversations:()=>getAll('conversations'),saveConversation:(v:Conversation)=>put('conversations',v.id,v),listMessages:()=>getAll('messages'),saveMessage:(v:MessageEnvelope)=>put('messages',v.id,v),listEmergencies:()=>getAll('emergencies'),saveEmergency:(v:EmergencyPacket)=>put('emergencies',v.id,v),getCryptoKey:()=>get('crypto','conversation-key'),saveCryptoKey:(v:CryptoKey)=>put('crypto','conversation-key',v),listContacts:()=>getAll('contacts'),saveContact:(v:Contact)=>put('contacts',v.id,v)};
