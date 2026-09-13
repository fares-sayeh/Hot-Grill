import { useEffect, useState } from 'react';
import { Icon } from './Icon';
import { isStandalone } from '../services/capabilities';

type BeforeInstallPromptEvent = Event & { prompt: () => Promise<void>; userChoice: Promise<{ outcome: 'accepted' | 'dismissed' }> };

export function InstallBanner({ onInstalled }: { onInstalled: () => void }) {
  const [promptEvent, setPromptEvent] = useState<BeforeInstallPromptEvent | null>(null);
  const [showManual, setShowManual] = useState(false);

  useEffect(() => {
    const handler = (event: Event) => { event.preventDefault(); setPromptEvent(event as BeforeInstallPromptEvent); };
    window.addEventListener('beforeinstallprompt', handler);
    const installed = () => { onInstalled(); setPromptEvent(null); };
    window.addEventListener('appinstalled', installed);
    return () => { window.removeEventListener('beforeinstallprompt', handler); window.removeEventListener('appinstalled', installed); };
  }, [onInstalled]);

  if (isStandalone()) return null;
  if (!promptEvent && !showManual) {
    return <div className="install-card"><div className="install-icon"><Icon name="install" /></div><div><strong>Install NEXUS</strong><span>Install once to keep using the app when you're offline.</span></div><button className="btn ghost" onClick={() => setShowManual(true)}>HOW TO INSTALL</button></div>;
  }
  return <div className="install-card"><div className="install-icon"><Icon name="install" /></div><div><strong>{promptEvent ? 'Install NEXUS' : 'Add NEXUS to your home screen'}</strong><span>{promptEvent ? 'Install NEXUS once to keep using the app when you’re offline.' : 'Use your browser menu and choose “Add to Home Screen” or “Install app”. You must visit NEXUS online first.'}</span></div>{promptEvent ? <button className="btn primary" onClick={async () => { await promptEvent.prompt(); await promptEvent.userChoice; setPromptEvent(null); }}>ADD TO HOME SCREEN</button> : <button className="btn ghost" onClick={() => setShowManual(false)}>CLOSE</button>}</div>;
}
