import { useState } from 'react';
import { Icon } from '../components/Icon';
import type { EmergencyPacket } from '../types';

export function EmergencyPage({ emergencies, onCreate }: { emergencies: EmergencyPacket[]; onCreate: (message: string, location?: { latitude: number; longitude: number }) => Promise<unknown>; }) {
  const [message, setMessage] = useState('I need assistance. This is a NEXUS prototype alert.');
  const [locating, setLocating] = useState(false);
  const [created, setCreated] = useState(false);
  const send = () => {
    if (!message.trim()) return;
    setCreated(false);
    setLocating(true);
    if (!navigator.geolocation) { void onCreate(message.trim()).then(() => { setCreated(true); setLocating(false); }); return; }
    navigator.geolocation.getCurrentPosition(
      (pos) => void onCreate(message.trim(), { latitude: pos.coords.latitude, longitude: pos.coords.longitude }).then(() => { setCreated(true); setLocating(false); }),
      () => void onCreate(message.trim()).then(() => { setCreated(true); setLocating(false); }),
      { enableHighAccuracy: false, timeout: 5000, maximumAge: 60_000 }
    );
  };
  return <div className="page-grid"><section className="emergency-banner panel"><div className="sos-orb"><Icon name="sos" size={30}/></div><div><p className="eyebrow">OPTIONAL PROTOTYPE</p><h1>Emergency mode</h1><p>Prototype — not a replacement for official emergency communication systems.</p></div></section><section className="panel emergency-form"><label>Alert message<textarea value={message} onChange={(e) => setMessage(e.target.value)} rows={5} /></label><div className="location-card"><div className="location-icon"><Icon name="location" /></div><div><b>Approximate location</b><span>Requested only when you press SEND SOS and only if you grant the browser permission.</span></div><span className="optional">OPTIONAL</span></div><button className="btn danger large" disabled={locating} onClick={send}><Icon name="sos" />{locating ? 'CREATING ALERT…' : 'CREATE SOS PACKET'}</button>{created && <div className="success-notice"><Icon name="check" />SOS packet stored locally and marked high priority.</div>}</section><section className="panel history"><div className="section-head"><div><p className="eyebrow">LOCAL LOG</p><h2>Emergency packets</h2></div><span className="count">{emergencies.length}</span></div>{emergencies.length===0 ? <p className="muted">No SOS packets stored on this device.</p> : emergencies.map((item) => <div className="log-row" key={item.id}><span className="log-icon"><Icon name="sos"/></span><div><b>{item.message}</b><small>{new Date(item.createdAt).toLocaleString()} · {item.status}</small></div></div>)}</section></div>;
}
