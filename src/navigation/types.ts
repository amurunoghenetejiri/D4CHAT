export type RootStackParamList = {
  Splash: undefined;
  Welcome: undefined;
  PhoneNumber: undefined;
  VerifyCode: { phone?: string };
  ProfileSetup: undefined;
  MainTabs: undefined;
  Conversation: { chatId: string; name: string; isGroup?: boolean };
  ContactInfo: { chatId: string; name: string; isGroup?: boolean };
  Search: undefined;
  Archived: undefined;
  NewChat: undefined;
  NewGroup: undefined;
  InviteFriend: undefined;
  PostStatus: undefined;
  VoiceCall: { name: string };
  VideoCall: { name: string };
  Privacy: undefined;
  Notifications: undefined;
  StorageData: undefined;
  LinkedDevices: undefined;
  Account: undefined;
  Placeholder: { title: string };
};

export type MainTabParamList = {
  Chats: undefined;
  Updates: undefined;
  Calls: undefined;
  Settings: undefined;
};
