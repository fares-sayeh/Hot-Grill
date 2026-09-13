# NEXUS — Offline-first PWA (QR pairing fixed)

NEXUS is a dark, local-first messaging interface with:

- QR-based first-time contact pairing.
- IndexedDB persistence for conversations, contacts, and encrypted messages.
- AES-GCM message encryption before messages enter the local outbox.
- Offline PWA shell through the service worker.
- Audio/video call interface with an explicit WebRTC transport boundary.
- Relay, network, emergency and capability screens.

## Important transport limitation

A normal browser/PWA cannot magically make two arbitrary phones communicate after every network path disappears. WebRTC still needs signaling and a reachable peer path; Web Bluetooth is not a general-purpose browser mesh/audio transport.

For **true** internet-free messaging + calls with automatic reconnection, the production version should be a native Android/iOS app using Bluetooth LE / Wi-Fi Direct / Nearby Connections (or a similar platform transport), with the same NEXUS protocol and UI.

This repository deliberately avoids pretending that a simulated mesh is real.


## QR pairing button
The + button in Chats now explicitly opens the Pair a Contact dialog. A new service-worker filename is used so older cached PWA workers cannot keep serving the previous UI.
