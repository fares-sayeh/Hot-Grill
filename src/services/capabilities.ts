export interface CapabilityReport {
  serviceWorker: boolean;
  indexedDb: boolean;
  webCrypto: boolean;
  webRtc: boolean;
  webBluetooth: boolean;
  installPrompt: boolean;
}

export function getCapabilityReport(): CapabilityReport {
  return {
    serviceWorker: 'serviceWorker' in navigator,
    indexedDb: 'indexedDB' in window,
    webCrypto: Boolean(window.crypto?.subtle),
    webRtc: 'RTCPeerConnection' in window,
    webBluetooth: 'bluetooth' in navigator,
    installPrompt: 'onbeforeinstallprompt' in window
  };
}

export function isStandalone(): boolean {
  return window.matchMedia('(display-mode: standalone)').matches || Boolean((navigator as Navigator & { standalone?: boolean }).standalone);
}

export async function requestBluetooth(): Promise<string> {
  if (!('bluetooth' in navigator)) return 'Web Bluetooth is not exposed by this browser.';
  const bluetooth = (navigator as Navigator & { bluetooth?: { requestDevice: (options: Record<string, unknown>) => Promise<{ name?: string }> } }).bluetooth;
  if (!bluetooth) return 'Web Bluetooth is unavailable in this environment.';
  try {
    const device = await bluetooth.requestDevice({ acceptAllDevices: true });
    return device.name ? `Authorized Bluetooth device: ${device.name}` : 'Bluetooth device permission granted.';
  } catch (error) {
    return error instanceof Error ? error.message : 'Bluetooth permission was cancelled.';
  }
}
