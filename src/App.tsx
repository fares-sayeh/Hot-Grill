import { useEffect, useMemo, useState } from 'react';
import { Icon } from './components/Icon';
import { StatusPill } from './components/StatusPill';
import { InstallBanner } from './components/InstallBanner';
import { Modal } from './components/Modal';
import { ChatsPage } from './pages/ChatsPage';
import { NetworkPage } from './pages/NetworkPage';
import { RelayPage } from './pages/RelayPage';
import { EmergencyPage } from './pages/EmergencyPage';
import { SettingsPage } from './pages/SettingsPage';
import { useNexus } from './hooks/useNexus';
import type { NavKey } from './types';

const navigation: { key: NavKey; label: string; icon: string }[] = [
  { key: 'chats', label: 'Chats', icon: 'chat' },
  { key: 'network', label: 'Network', icon: 'network' },
  { key: 'relay', label: 'Relay', icon: 'relay' },
  { key: 'emergency', label: 'Emergency', icon: 'sos' },
  { key: 'settings', label: 'Settings', icon: 'settings' }
];

function getRoute(): NavKey {
  const value = window.location.hash.replace(/^#\/?/, '') as NavKey;
  return navigation.some((item) => item.key === value) ? value : 'chats';
}

export default function App() {
  const nexus = useNexus();
  const [route, setRoute] = useState<NavKey>(getRoute());
  const [showOnboarding, setShowOnboarding] = useState(false);
  const [welcomeStep, setWelcomeStep] = useState(0);

  useEffect(() => {
    const sync = () => setRoute(getRoute());
    window.addEventListener('hashchange', sync);
    return () => window.removeEventListener('hashchange', sync);
  }, []);

  useEffect(() => {
    if (nexus.settings && !nexus.settings.firstRunDone) setShowOnboarding(true);
  }, [nexus.settings]);

  const page = useMemo(() => {
    switch (route) {
      case 'network': return <NetworkPage />;
      case 'relay': return <RelayPage stats={nexus.settings?.relay ?? { enabled: false, messagesRelayed: 0, bytesRelayed: 0, storageBytes: 0, batteryLimit: 25 }} enabled={nexus.settings?.relay.enabled ?? false} batteryLimit={nexus.settings?.relay.batteryLimit ?? 25} onToggle={nexus.setRelayEnabled} onBattery={nexus.setBatteryLimit} />;
      case 'emergency': return <EmergencyPage emergencies={nexus.emergencies} onCreate={nexus.createEmergency} />;
      case 'settings': return <SettingsPage identity={nexus.identity} />;
      default: return <ChatsPage conversations={nexus.conversations} messages={nexus.messages} onSend={nexus.sendMessage} />;
    }
  }, [nexus, route]);

  return <div className="app-shell"><aside className="sidebar"><div className="brand"><div className="brand-mark">N</div><div><strong>NEXUS</strong><span>Messaging beyond the Internet.</span></div></div><nav aria-label="Primary navigation">{navigation.map((item) => <a href={`#/${item.key}`} key={item.key} className={route===item.key ? 'active' : ''}><Icon name={item.icon}/><span>{item.label}</span>{item.key==='chats' && nexus.stats.outbox>0 && <em>{nexus.stats.outbox}</em>}</a>)}</nav><div className="sidebar-foot"><div className="local-card"><Icon name="database" size={17}/><div><b>Local-first</b><span>{nexus.stats.storedBytes > 0 ? 'Encrypted data cached' : 'Ready for offline data'}</span></div></div><button className="profile-mini" onClick={() => { window.location.hash='#/settings'; }}><span className="avatar small">{nexus.identity?.name.slice(0,1).toUpperCase() ?? 'N'}</span><span><b>{nexus.identity?.name ?? 'Local user'}</b><small>{nexus.identity?.id ?? 'NEX-LOCAL'}</small></span><Icon name="arrow" size={16}/></button></div></aside><main className="main"><header className="topbar"><div><span className="mobile-brand">NEXUS</span><StatusPill state={nexus.connection}/><span className="boundary">No backend · no tracking · no hidden relays</span></div><div className="top-actions"><button className="icon-btn" title="Refresh local data" onClick={() => void nexus.refresh()}><Icon name="database"/></button><button className="btn subtle" onClick={() => setShowOnboarding(true)}><Icon name="info"/>How it works</button></div></header><div className="content"><InstallBanner onInstalled={() => nexus.setPwaInstalled(true)} />{page}</div></main>{showOnboarding && <Modal title="WELCOME TO NEXUS" onClose={() => { if (nexus.settings?.firstRunDone) setShowOnboarding(false); }}><div className="onboarding"><div className="onboard-art"><div className="orbit orbit-1"/><div className="orbit orbit-2"/><div className="orbit-core">N</div></div>{welcomeStep===0 && <><h2>Messaging beyond the Internet.</h2><p>NEXUS is an offline-first communication prototype. It stores conversations locally, encrypts message packets, and can demonstrate authorized store-and-forward routing.</p></>}{welcomeStep===1 && <><h2>1 · Local identity</h2><p>Your identity is created on this device. There is no mandatory server account in this static prototype.</p></>}{welcomeStep===2 && <><h2>2 · Privacy boundary</h2><p>Relay nodes handle opaque ciphertext and routing metadata. This prototype is not a substitute for an audited end-to-end messaging protocol.</p></>}{welcomeStep===3 && <><h2>3 · Relay Mode</h2><p>Relay Mode is always opt-in. A normal website cannot secretly turn arbitrary nearby phones into a mesh.</p></>}{welcomeStep===4 && <><h2>4 · Offline installation</h2><p>Visit NEXUS online once, install it, and the cached app shell can open later without Internet. Existing IndexedDB data remains on-device.</p></>}<div className="onboard-dots">{[0,1,2,3,4].map((step)=><span className={step===welcomeStep?'active':''} key={step}/>)}</div><button className="btn primary full" onClick={async()=>{ if(welcomeStep<4){setWelcomeStep((v)=>v+1);}else{await nexus.markFirstRunDone();setShowOnboarding(false);} }}>{welcomeStep<4?'CONTINUE':'ENTER NEXUS'}</button></div></Modal>}</div>;
}
