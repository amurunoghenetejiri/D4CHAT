export type ChatPreview = {
  id: string;
  name: string;
  lastMessage: string;
  time: string;
  unread: number;
  pinned?: boolean;
  isGroup?: boolean;
  isTyping?: boolean;
  avatar?: string | null;
  groupIcon?: 'users' | 'coffee';
  isPhoto?: boolean;
  isSent?: boolean;
};

export const MOCK_CHATS: ChatPreview[] = [
  {
    id: 'maya',
    name: 'Maya Patel',
    lastMessage: 'Perfect! See you at 10 ☕',
    time: '9:41 AM',
    unread: 2,
    pinned: true,
    avatar: null,
  },
  {
    id: 'weekend',
    name: 'Weekend crew',
    lastMessage: "Alex: Who's up for a hike on Sunday?",
    time: '9:32 AM',
    unread: 5,
    pinned: true,
    isGroup: true,
    groupIcon: 'users',
  },
  {
    id: 'alex',
    name: 'Alex Morgan',
    lastMessage: 'typing…',
    time: '9:28 AM',
    unread: 1,
    isTyping: true,
    avatar: null,
  },
  {
    id: 'mom',
    name: 'Mom',
    lastMessage: "Don't forget your umbrella ❤️",
    time: '8:56 AM',
    unread: 0,
    avatar: null,
  },
  {
    id: 'coffee',
    name: 'Coffee & co.',
    lastMessage: 'You: That place looks amazing!',
    time: 'Yesterday',
    unread: 0,
    isGroup: true,
    groupIcon: 'coffee',
    isSent: true,
  },
  {
    id: 'daniel',
    name: 'Daniel Kim',
    lastMessage: 'Thanks for sending these over!',
    time: 'Yesterday',
    unread: 0,
    isSent: true,
    avatar: null,
  },
  {
    id: 'sophie',
    name: 'Sophie Chen',
    lastMessage: 'Photo',
    time: 'Yesterday',
    unread: 0,
    isPhoto: true,
    avatar: null,
  },
];

export type Message = {
  id: string;
  text: string;
  time: string;
  fromMe: boolean;
  isPhoto?: boolean;
  photoUri?: string;
};

export const MOCK_MESSAGES: Message[] = [
  {
    id: '1',
    text: 'Morning! Still on for coffee today? ☀️',
    time: '9:35 AM',
    fromMe: false,
  },
  {
    id: '2',
    text: "Of course! I've been looking forward to it 😊",
    time: '9:36 AM',
    fromMe: true,
  },
  {
    id: '3',
    text: 'Found our spot. The little café on Oak Street?',
    time: '9:38 AM',
    fromMe: false,
    isPhoto: true,
  },
  {
    id: '4',
    text: "Yes! That place looks so good.\nI'll be there in 20 minutes.",
    time: '9:40 AM',
    fromMe: true,
  },
  {
    id: '5',
    text: 'Perfect! See you at 10 ☕',
    time: '9:41 AM',
    fromMe: false,
  },
];
