import type { ReactNode } from 'react';

export function Icon({ name, size = 20 }: { name: string; size?: number }) {
  const paths: Record<string, ReactNode> = {
    chat: <><path d="M20 15a4 4 0 0 1-4 4H9l-5 3v-3a4 4 0 0 1-2-3.5V7a4 4 0 0 1 4-4h10a4 4 0 0 1 4 4Z"/><path d="M7 8h10M7 12h7"/></>,
    network: <><circle cx="5" cy="12" r="2.5"/><circle cx="19" cy="6" r="2.5"/><circle cx="19" cy="18" r="2.5"/><path d="m7.5 11 9-4M7.5 13l9 4"/></>,
    relay: <><path d="M12 3v18M5 8l7-5 7 5M5 16l7 5 7-5"/><path d="M3 12h18"/></>,
    sos: <><path d="M12 3 2.5 20h19L12 3Z"/><path d="M12 8v5M12 17h.01"/></>,
    settings: <><path d="M12 2v4M12 18v4M4.9 4.9l2.8 2.8M16.3 16.3l2.8 2.8M2 12h4M18 12h4M4.9 19.1l2.8-2.8M16.3 7.7l2.8-2.8"/><circle cx="12" cy="12" r="4"/></>,
    search: <><circle cx="11" cy="11" r="7"/><path d="m16 16 5 5"/></>,
    send: <path d="m3 11 18-8-8 18-2.8-7.2L3 11Z"/>,
    paperclip: <path d="m20 11-8.7 8.7a5 5 0 0 1-7.1-7.1L13 3.8a3.5 3.5 0 0 1 5 5l-8.3 8.3a2 2 0 0 1-2.8-2.8l7.6-7.6"/>,
    arrow: <path d="m9 18 6-6-6-6"/>,
    check: <path d="m5 12 4 4L19 6"/>,
    plus: <path d="M12 5v14M5 12h14"/>,
    shield: <path d="M12 3 5 6v5c0 4.8 3 8 7 10 4-2 7-5.2 7-10V6l-7-3Z"/><path d="m9 12 2 2 4-4"/>,
    wifi: <><path d="M5 13a11 11 0 0 1 14 0"/><path d="M8 16a6.5 6.5 0 0 1 8 0"/><path d="M11 19a2 2 0 0 1 2 0"/></>,
    install: <><path d="M12 3v12M7 10l5 5 5-5M5 21h14"/></>,
    info: <><circle cx="12" cy="12" r="9"/><path d="M12 10v6M12 7h.01"/></>,
    close: <><path d="m6 6 12 12M18 6 6 18"/></>,
    location: <><path d="M12 21s7-6.1 7-12A7 7 0 0 0 5 9c0 5.9 7 12 7 12Z"/><circle cx="12" cy="9" r="2.5"/></>,
    play: <path d="m8 5 11 7-11 7V5Z"/>,
    pause: <><path d="M8 5v14M16 5v14"/></>,
    database: <><ellipse cx="12" cy="5" rx="8" ry="3"/><path d="M4 5v7c0 1.7 3.6 3 8 3s8-1.3 8-3V5M4 12v7c0 1.7 3.6 3 8 3s8-1.3 8-3v-7"/></>
  };
  return <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">{paths[name] ?? paths.info}</svg>;
}
