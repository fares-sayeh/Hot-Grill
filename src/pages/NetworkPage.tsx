import { useState } from 'react';
import { Icon } from '../components/Icon';

const initialNodes = [
  { id: 'A', label: 'USER A', x: 12, y: 52, kind: 'user', status: 'ready' },
  { id: 'B', label: 'NODE B', x: 35, y: 28, kind: 'relay', status: 'ready' },
  { id: 'C', label: 'NODE C', x: 60, y: 70, kind: 'relay', status: 'ready' },
  { id: 'D', label: 'USER D', x: 88, y: 50, kind: 'user', status: 'ready' }
] as const;

export function NetworkPage() {
  const [route, setRoute] = useState(['A', 'B', 'C', 'D']);
  const [connected, setConnected] = useState(true);
  const [running, setRunning] = useState(false);
  const startDemo = async () => { setRunning(true); setConnected(true); setRoute(['A','B','C','D']); await new Promise(r => setTimeout(r, 1200)); setConnected(false); await new Promise(r => setTimeout(r, 800)); setRoute(['A','C','D']); await new Promise(r => setTimeout(r, 900)); setConnected(true); setRunning(false); };
  return <div className="page-grid"><section className="hero panel network-hero"><div><p className="eyebrow">NETWORK / ROUTING LAB</p><h1>Authorized paths, not magic mesh.</h1><p>Real browser transport can be peer-to-peer, but arbitrary nearby phone relaying is not a generic web capability. This screen uses clearly labeled simulation nodes for the competition demo.</p></div><button className="btn primary" onClick={() => void startDemo()} disabled={running}><Icon name={running ? 'pause' : 'play'} />{running ? 'RUNNING…' : 'RUN ROUTE DEMO'}</button></section>
  <section className="panel network-canvas"><div className="canvas-head"><div><span className="live-dot" /> DEMO TOPOLOGY</div><span className="sim-badge">SIMULATION</span></div><div className="topology">{initialNodes.map((node, index) => <div key={node.id} className={`node node-${node.kind}`} style={{ left: `${node.x}%`, top: `${node.y}%` }}><div className="node-core">{node.id}</div><span>{node.label}</span><small>{node.kind === 'relay' ? 'SIMULATED NODE' : 'END USER'}</small></div>)}{[[0,1],[1,2],[2,3]].map(([a,b]) => { const n1=initialNodes[a]; const n2=initialNodes[b]; const active=route.includes(n1.id)&&route.includes(n2.id)&&route.indexOf(n2.id)===route.indexOf(n1.id)+1; return <div key={`${a}-${b}`} className={`edge ${active ? 'active' : 'muted'}`} style={{ left: `${n1.x}%`, top: `${n1.y}%`, width: `${Math.hypot(n2.x-n1.x,n2.y-n1.y)}%`, transform: `rotate(${Math.atan2(n2.y-n1.y,n2.x-n1.x)*180/Math.PI}deg)` }} />; })}<div className={`route-chip ${connected ? 'connected' : 'lost'}`}>{connected ? <><Icon name="check" size={14}/> ROUTE {route.join(' → ')}</> : <>ROUTE LOST · CALCULATING NEW ROUTE…</>}</div></div></section>
  <section className="stats-grid"><div className="metric panel"><span>AVAILABLE NODES</span><strong>03</strong><small>2 relay-capable · 1 endpoint</small></div><div className="metric panel"><span>ACTIVE PATH</span><strong>{route.length - 1} HOPS</strong><small>TTL budget: 6 hops</small></div><div className="metric panel"><span>NETWORK STATE</span><strong>{connected ? 'STABLE' : 'REBUILDING'}</strong><small>{connected ? 'authorized path found' : 're-routing packet'}</small></div></section></div>;
}
