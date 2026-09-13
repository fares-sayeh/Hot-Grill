import type { ConnectionState } from '../types';

export function StatusPill({ state }: { state: ConnectionState }) {
  const label = state === 'online' ? 'ONLINE' : state === 'offline' ? 'OFFLINE' : 'CONNECTING';
  return <div className={`status-pill ${state}`}><span className="status-dot" />{label}</div>;
}
