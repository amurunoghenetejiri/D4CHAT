# D4CHAT

Private messaging UI built from the official Figma design  
**File:** [Figma – D4CHAT](https://www.figma.com/design/6Dq457z8WQkOP01MNVWQz8/Untitled)

> **Native Android & iOS** via [Expo](https://expo.dev) + React Native (TypeScript).  
> One codebase → real native apps.

## Status

- Figma design inspected (28 top-level frames).
- Auth flow + Chats list + Conversation implemented to match design tokens.
- Remaining screens (Updates, Calls, Settings sub-pages, groups, status, active calls, etc.) are scaffolded as placeholders and will be filled from Figma next.
- **Mock data only.** No backend, database, real OTP, push, or production encryption.

## Design tokens (from Figma)

| Token | Value |
|-------|-------|
| Primary text | `#17231e` |
| Secondary | `#727c80` |
| Accent | `#1b3fc2` / `#4f46e5` |
| Brand gradient | `#00e5ff` → `#3b82f6` → `#4c1d95` |
| Chat background | `#f2ede4` |
| Sent bubble | `#e3edff` |
| Font | System / Inter |

## Run

```bash
cd D4CHAT
npm install
npx expo start
```

Then press `a` for Android emulator / device, or `i` for iOS simulator.

### Build native binaries

```bash
# Android APK / AAB
npx expo run:android

# iOS (macOS only)
npx expo run:ios
```

Or use EAS Build:

```bash
npx eas build --platform android
npx eas build --platform ios
```

## Important disclaimers

- Messaging, OTP, voice/video calls, and encryption are **UI mocks only**.
- Not production-ready for real communication.

## License

MIT
