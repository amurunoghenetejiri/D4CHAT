# D4CHAT

Private messaging **UI** from the [Figma design](https://www.figma.com/design/6Dq457z8WQkOP01MNVWQz8/Untitled).

**Native Android & iOS** · **Fully offline** · Expo + React Native (TypeScript)

> Mock data only. No backend, no real SMS/OTP, no production encryption.

## Fully offline

- All screens and navigation (Splash → Welcome → Phone → Verify → Profile → Chats / Updates / Calls / Settings → Conversation) run **without internet**.
- Chat list, messages, status, calls, and settings use local mock data only.
- No API calls on startup or while navigating.

## Install on your Android phone

### Option A — Download APK from GitHub Actions (recommended)

1. Open **Actions**: https://github.com/amurunoghenetejiri/D4CHAT/actions  
2. Open the latest **Build Android APK** run (green check).  
3. Download the **D4CHAT-android** artifact and unzip it.  
4. Copy the `.apk` to your phone and open it to install.  
   - You may need: **Settings → Security → Allow install from unknown sources**.  
5. Open **D4CHAT** — works offline from splash to every screen.

Trigger a new build anytime: **Actions → Build Android APK → Run workflow**.

### Option B — Build on your machine

```bash
git clone https://github.com/amurunoghenetejiri/D4CHAT.git
cd D4CHAT
npm install
npx expo prebuild --platform android
cd android && ./gradlew assembleDebug
```

APK path: `android/app/build/outputs/apk/debug/app-debug.apk`

### Option C — Expo Go (dev)

```bash
npm install
npx expo start
```

## Navigation map (all offline)

| Screen | Actions |
|--------|--------|
| Splash | Auto → Welcome |
| Welcome | Get started → Phone number |
| Phone number | Continue → Verify · Back |
| Verify code | Verify → Profile · Back |
| Profile setup | Continue → Main tabs |
| Chats | Row → Conversation · FAB → New chat · Archived |
| Conversation | Back → Chats |
| Tabs | Chats / Updates / Calls / Settings |
| Settings | Rows → Account, Privacy, Notifications, etc. |

## License

MIT
