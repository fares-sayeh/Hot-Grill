import { useMemo, useState } from 'react';
import { Icon } from '../components/Icon';
import { formatRelative, formatTime } from '../utils/id';
import type { Conversation, MessageEnvelope } from '../types';

export function ChatsPage({ conversations, messages, onSend }: { conversations: Conversation[]; messages: MessageEnvelope[]; onSend: (id: string, text: string) => Promise<unknown>; }) {
  const [selected, setSelected] = useState(conversations[0]?.id ?? 'conv-a');
  const [text, setText] = useState('');
  const [query, setQuery] = useState('');
  const [attachment, setAttachment] = useState(false);
  const filtered = useMemo(() => conversations.filter((c) => `${c.title} ${c.lastMessage}`.toLowerCase().includes(query.toLowerCase())), [conversations, query]);
  const currentMessages = messages.filter((m) => m.conversationId === selected);
  const current = conversations.find((c) => c.id === selected) ?? conversations[0];

  return <div className="chat-layout">
    <aside className="chat-list panel"><div className="list-head"><div><p className="eyebrow">MESSAGES</p><h1>Chats</h1></div><button className="icon-btn" aria-label="New chat"><Icon name="plus" /></button></div>
      <label className="search"><Icon name="search" /><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Search conversations" /></label>
      <div className="conversation-list">{filtered.map((conversation) => <button key={conversation.id} className={`conversation ${conversation.id === selected ? 'active' : ''}`} onClick={() => setSelected(conversation.id)}><span className="avatar">{conversation.avatar}</span><span className="conversation-copy"><b>{conversation.title}</b><span>{conversation.lastMessage}</span></span><span className="conversation-meta"><small>{formatRelative(conversation.lastAt)}</small>{conversation.unread > 0 && <em>{conversation.unread}</em>}</span></button>)}</div>
    </aside>
    <section className="message-panel panel"><div className="chat-header"><div className="chat-person"><span className="avatar large">{current?.avatar}</span><div><b>{current?.title ?? 'Conversation'}</b><span><span className={`presence ${current?.online ? 'online' : ''}`} />{current?.online ? 'reachable' : 'offline-ready'}</span></div></div><span className="secure-tag"><Icon name="shield" size={15} /> encrypted envelope</span></div>
      <div className="message-stream"><div className="route-note"><span className="mini-node" /> Messages stay on-device until a delivery path exists.</div>{currentMessages.length === 0 && <div className="empty"><div className="empty-orb" /><h3>No messages yet</h3><p>Start a local-first conversation. Outgoing messages are stored in the NEXUS outbox.</p></div>}{currentMessages.map((message) => <article key={message.id} className={`bubble-row ${message.senderId.startsWith('NEX-') ? 'mine' : ''}`}><div className="bubble"><p>Encrypted message packet</p><footer><span>{formatTime(message.createdAt)}</span><span className={`message-status ${message.status}`}>{message.status}</span></footer></div></article>)}</div>
      <form className="composer" onSubmit={async (e) => { e.preventDefault(); if (!text.trim()) return; await onSend(selected, text); setText(''); }}><button type="button" className={`icon-btn attachment ${attachment ? 'active' : ''}`} onClick={() => setAttachment((v) => !v)} aria-label="Attachments"><Icon name="paperclip" /></button>{attachment && <div className="attachment-menu"><button type="button">Photo</button><button type="button">File</button><button type="button">Contact</button></div>}<input value={text} onChange={(e) => setText(e.target.value)} placeholder="Write a message…" /><button className="send-btn" type="submit" aria-label="Send"><Icon name="send" size={19} /></button></form>
    </section>
  </div>;
}
