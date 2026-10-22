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
  groupIcon?: 'coffee' | 'people';
};

export type Chat = ChatPreview & {
  archived?: boolean;
  avatarColor?: string;
  initial?: string;
  typing?: boolean;
};

export type Message = {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  status?: 'sent' | 'delivered' | 'read';
  type?: 'text' | 'voice' | 'image' | 'doc';
  duration?: string;
};

export const MOCK_CHATS: ChatPreview[] = [
  { id: '1', name: 'Maya Patel', lastMessage: 'Perfect! See you at 10 \u2615', time: '9:41 AM', unread: 2, pinned: true },
  { id: '2', name: 'Weekend crew', lastMessage: "Alex: Who's up for a hike on Sunday?", time: '9:32 AM', unread: 5, pinned: true, isGroup: true, groupIcon: 'people' },
  { id: '3', name: 'Alex Morgan', lastMessage: 'typing\u2026', time: '9:28 AM', unread: 1, isTyping: true },
  { id: '4', name: 'Mom', lastMessage: "Don't forget your umbrella \u2764\ufe0f", time: '8:56 AM', unread: 0 },
  { id: '5', name: 'Coffee & co.', lastMessage: 'You: That place looks amazing!', time: 'Yesterday', unread: 0, isGroup: true, groupIcon: 'coffee', isSent: true },
  { id: '6', name: 'Daniel Kim', lastMessage: 'Thanks for sending these over!', time: 'Yesterday', unread: 0, isSent: true },
  { id: '7', name: 'Sophie Chen', lastMessage: 'Photo', time: 'Yesterday', unread: 0, isPhoto: true },
];

export const chats: Chat[] = MOCK_CHATS.map((c) => ({
  ...c,
  initial: c.name[0],
  typing: c.isTyping,
}));

export const archivedChats: Chat[] = [
  { id: 'a1', name: 'Old project team', lastMessage: 'Final files attached', time: 'Mon', unread: 0, isGroup: true, archived: true },
  { id: 'a2', name: 'Landlord', lastMessage: 'Rent received, thank you', time: 'Sun', unread: 0, archived: true, initial: 'L' },
];

export const messagesByChat: Record<string, Message[]> = {
  '1': [
    { id: 'm1', text: 'Hey! Are we still on for coffee?', time: '9:20 AM', fromMe: false },
    { id: 'm2', text: 'Yes! The place near the park?', time: '9:22 AM', fromMe: true, status: 'read' },
    { id: 'm3', text: 'Perfect! See you at 10 \u2615', time: '9:41 AM', fromMe: false },
  ],
  '2': [{ id: 'm1', text: "Who's up for a hike on Sunday?", time: '9:32 AM', fromMe: false }],
  '3': [{ id: 'm1', text: 'Can you send the deck?', time: '9:15 AM', fromMe: false }],
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
  { id: '1', name: 'Maya Patel', status: 'Available' },
  { id: '3', name: 'Alex Morgan', status: 'At work' },
  { id: '4', name: 'Mom', status: 'Hey there! I am using d4chat' },
  { id: '6', name: 'Daniel Kim', status: 'Busy' },
  { id: '7', name: 'Sophie Chen', status: 'In a meeting' },
];
