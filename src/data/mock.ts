export type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  pinned?: boolean;
  isGroup?: boolean;
  isTyping?: boolean;
  isSent?: boolean;
  isPhoto?: boolean;
  isYou?: boolean;
  groupIcon?: 'coffee' | 'people';
  phone?: string;
};

export type Message = {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'voice' | 'image' | 'doc';
  duration?: string;
  isPhoto?: boolean;
};

/** Logged-in user (mock) — used for "You" / Message yourself */
export const CURRENT_USER = {
  id: 'you',
  name: 'Destiny',
  fullName: 'Destiny Amurunoghenetejiri',
  phone: '+234 801 234 5678',
  about: 'Hey there! I am using d4chat',
  initial: 'D',
};

export const MOCK_CHATS: ChatPreview[] = [
  {
    id: 'you',
    name: 'You',
    lastMessage: 'Message yourself',
    time: '',
    unread: 0,
    isYou: true,
    pinned: true,
    phone: CURRENT_USER.phone,
  },
  { id: '1', name: 'Maya Patel', lastMessage: 'Perfect! See you at 10 \u2615', time: '9:41 AM', unread: 2, pinned: true },
  { id: '2', name: 'Weekend crew', lastMessage: "Alex: Who's up for a hike on Sunday?", time: '9:32 AM', unread: 5, pinned: true, isGroup: true, groupIcon: 'people' },
  { id: '3', name: 'Alex Morgan', lastMessage: 'typing\u2026', time: '9:28 AM', unread: 1, isTyping: true },
  { id: '4', name: 'Mom', lastMessage: "Don't forget your umbrella \u2764\ufe0f", time: '8:56 AM', unread: 0 },
  { id: '5', name: 'Coffee & co.', lastMessage: 'You: That place looks amazing!', time: 'Yesterday', unread: 0, isGroup: true, groupIcon: 'coffee', isSent: true },
  { id: '6', name: 'Daniel Kim', lastMessage: 'Thanks for sending these over!', time: 'Yesterday', unread: 0, isSent: true },
  { id: '7', name: 'Sophie Chen', lastMessage: 'Photo', time: 'Yesterday', unread: 0, isPhoto: true },
];

export const MOCK_MESSAGES: Message[] = [
  { id: 'm1', text: 'Hey! Are we still on for coffee?', time: '9:20 AM', fromMe: false },
  { id: 'm2', text: 'Yes! The place near the park?', time: '9:22 AM', fromMe: true, status: 'read' },
  { id: 'm3', text: 'Perfect! See you at 10 \u2615', time: '9:41 AM', fromMe: false },
];

export const SELF_MESSAGES: Message[] = [
  { id: 's1', text: 'Notes to myself \ud83d\udcdd', time: 'Yesterday', fromMe: true, status: 'read' },
  {
    id: 's2',
    text: 'Save important info here. Messages you send here also show a notification so you can test alerts.',
    time: 'Yesterday',
    fromMe: true,
    status: 'read',
  },
];

export const chats = MOCK_CHATS;
export const messagesByChat: Record<string, Message[]> = {
  '1': MOCK_MESSAGES,
  you: SELF_MESSAGES,
};

export const statuses = [
  { id: 's1', name: 'My status', time: 'Tap to add', isMe: true },
  { id: 's2', name: 'Maya Patel', time: '12 minutes ago' },
  { id: 's3', name: 'Alex Morgan', time: '1 hour ago' },
  { id: 's4', name: 'Sophie Chen', time: '3 hours ago' },
];

export const calls = [
  { id: 'c1', name: 'Maya Patel', type: 'video' as const, direction: 'outgoing' as const, time: 'Today, 9:12 AM' },
  { id: 'c2', name: 'Mom', type: 'voice' as const, direction: 'incoming' as const, time: 'Today, 8:40 AM' },
  { id: 'c3', name: 'Alex Morgan', type: 'voice' as const, direction: 'missed' as const, time: 'Yesterday' },
];

export const contacts = [
  { id: 'you', name: 'You', status: CURRENT_USER.about, isYou: true },
  { id: '1', name: 'Maya Patel', status: 'Available' },
  { id: '3', name: 'Alex Morgan', status: 'At work' },
  { id: '4', name: 'Mom', status: 'Hey there! I am using d4chat' },
];
